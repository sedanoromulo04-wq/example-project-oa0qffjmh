-- Torq Central frontend compatibility migration

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  entity_title text,
  category_name text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_log_workspace_id on public.activity_log(workspace_id);
create index if not exists idx_activity_log_created_at on public.activity_log(created_at desc);

create or replace function public.search_docs(search_query text)
returns table (
  id uuid,
  title text,
  body_markdown text,
  tags text[],
  updated_at timestamptz
)
language sql
stable
as $$
  with ranked_docs as (
    select
      d.id,
      d.title,
      d.body_markdown,
      d.tags,
      d.updated_at,
      ts_rank(
        to_tsvector(
          'simple',
          coalesce(d.title, '') || ' ' ||
          coalesce(d.body_markdown, '') || ' ' ||
          coalesce(array_to_string(d.tags, ' '), '')
        ),
        plainto_tsquery('simple', coalesce(search_query, ''))
      ) as rank
    from public.torq_docs d
    where coalesce(search_query, '') <> ''
      and to_tsvector(
        'simple',
        coalesce(d.title, '') || ' ' ||
        coalesce(d.body_markdown, '') || ' ' ||
        coalesce(array_to_string(d.tags, ' '), '')
      ) @@ plainto_tsquery('simple', search_query)
  )
  select
    id,
    title,
    body_markdown,
    tags,
    updated_at
  from ranked_docs
  order by rank desc, updated_at desc
  limit 20;
$$;
