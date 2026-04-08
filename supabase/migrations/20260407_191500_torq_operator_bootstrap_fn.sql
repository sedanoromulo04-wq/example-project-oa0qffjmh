-- Helper function to bootstrap Torq operator runtime records from an existing auth user

create or replace function public.bootstrap_torq_operator(
  target_user_id uuid,
  workspace_name text default null,
  workspace_slug text default null,
  operator_full_name text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  auth_email text;
  resolved_workspace_id uuid;
  resolved_workspace_name text;
  resolved_workspace_slug text;
begin
  select u.email
  into auth_email
  from auth.users u
  where u.id = target_user_id
  limit 1;

  if auth_email is null then
    raise exception 'Auth user % not found', target_user_id;
  end if;

  select p.workspace_id
  into resolved_workspace_id
  from public.profiles p
  where p.id = target_user_id
  limit 1;

  if resolved_workspace_id is null then
    resolved_workspace_name := coalesce(
      nullif(workspace_name, ''),
      initcap(split_part(auth_email, '@', 1)) || ' Workspace'
    );

    resolved_workspace_slug := lower(regexp_replace(
      coalesce(nullif(workspace_slug, ''), split_part(auth_email, '@', 1)),
      '[^a-z0-9]+',
      '-',
      'g'
    ));

    insert into public.workspaces (name, slug)
    values (
      resolved_workspace_name,
      concat(resolved_workspace_slug, '-', substr(replace(target_user_id::text, '-', ''), 1, 8))
    )
    returning id into resolved_workspace_id;
  end if;

  insert into public.profiles (id, workspace_id, full_name, email, role)
  values (
    target_user_id,
    resolved_workspace_id,
    operator_full_name,
    auth_email,
    'owner'
  )
  on conflict (id) do update
  set
    workspace_id = coalesce(public.profiles.workspace_id, excluded.workspace_id),
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    email = coalesce(public.profiles.email, excluded.email),
    role = coalesce(public.profiles.role, excluded.role);

  insert into public.workspace_members (workspace_id, profile_id, membership_role)
  values (resolved_workspace_id, target_user_id, 'owner')
  on conflict (workspace_id, profile_id) do nothing;

  return resolved_workspace_id;
end;
$$;
