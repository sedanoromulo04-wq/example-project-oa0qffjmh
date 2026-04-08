-- Torq security and RLS baseline

create or replace function public.current_workspace_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.workspace_id
  from public.profiles p
  where p.id = auth.uid()
  limit 1
$$;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid()
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('admin', 'owner'), false)
$$;

create or replace function public.same_workspace(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select target_workspace_id is not distinct from public.current_workspace_id()
$$;

create or replace function public.doc_in_current_workspace(doc_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.torq_docs d
    where d.id = doc_uuid
      and d.workspace_id = public.current_workspace_id()
  )
$$;

grant execute on function public.current_workspace_id() to authenticated, anon;
grant execute on function public.current_user_role() to authenticated, anon;
grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.same_workspace(uuid) to authenticated, anon;
grant execute on function public.doc_in_current_workspace(uuid) to authenticated, anon;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

alter table public.clients alter column workspace_id set default public.current_workspace_id();
alter table public.categories alter column workspace_id set default public.current_workspace_id();
alter table public.torq_docs alter column workspace_id set default public.current_workspace_id();
alter table public.attachments alter column workspace_id set default public.current_workspace_id();
alter table public.jobs alter column workspace_id set default public.current_workspace_id();
alter table public.artifact_registry alter column workspace_id set default public.current_workspace_id();
alter table public.memory_entries alter column workspace_id set default public.current_workspace_id();
alter table public.knowledge_sources alter column workspace_id set default public.current_workspace_id();
alter table public.approval_items alter column workspace_id set default public.current_workspace_id();
alter table public.distribution_jobs alter column workspace_id set default public.current_workspace_id();
alter table public.jarvis_sessions alter column workspace_id set default public.current_workspace_id();
alter table public.activity_log alter column workspace_id set default public.current_workspace_id();

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists trg_clients_updated_at on public.clients;
create trigger trg_clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
drop trigger if exists trg_client_operation_briefs_updated_at on public.client_operation_briefs;
create trigger trg_client_operation_briefs_updated_at before update on public.client_operation_briefs for each row execute function public.set_updated_at();
drop trigger if exists trg_client_operation_states_updated_at on public.client_operation_states;
create trigger trg_client_operation_states_updated_at before update on public.client_operation_states for each row execute function public.set_updated_at();
drop trigger if exists trg_categories_updated_at on public.categories;
create trigger trg_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
drop trigger if exists trg_torq_docs_updated_at on public.torq_docs;
create trigger trg_torq_docs_updated_at before update on public.torq_docs for each row execute function public.set_updated_at();
drop trigger if exists trg_jobs_updated_at on public.jobs;
create trigger trg_jobs_updated_at before update on public.jobs for each row execute function public.set_updated_at();
drop trigger if exists trg_artifact_registry_updated_at on public.artifact_registry;
create trigger trg_artifact_registry_updated_at before update on public.artifact_registry for each row execute function public.set_updated_at();
drop trigger if exists trg_memory_entries_updated_at on public.memory_entries;
create trigger trg_memory_entries_updated_at before update on public.memory_entries for each row execute function public.set_updated_at();
drop trigger if exists trg_embedding_jobs_updated_at on public.embedding_jobs;
create trigger trg_embedding_jobs_updated_at before update on public.embedding_jobs for each row execute function public.set_updated_at();
drop trigger if exists trg_approval_items_updated_at on public.approval_items;
create trigger trg_approval_items_updated_at before update on public.approval_items for each row execute function public.set_updated_at();
drop trigger if exists trg_distribution_jobs_updated_at on public.distribution_jobs;
create trigger trg_distribution_jobs_updated_at before update on public.distribution_jobs for each row execute function public.set_updated_at();
drop trigger if exists trg_jarvis_sessions_updated_at on public.jarvis_sessions;
create trigger trg_jarvis_sessions_updated_at before update on public.jarvis_sessions for each row execute function public.set_updated_at();

alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.workspace_members enable row level security;
alter table public.clients enable row level security;
alter table public.client_operation_briefs enable row level security;
alter table public.client_operation_states enable row level security;
alter table public.client_stage_history enable row level security;
alter table public.categories enable row level security;
alter table public.torq_docs enable row level security;
alter table public.doc_versions enable row level security;
alter table public.attachments enable row level security;
alter table public.doc_links enable row level security;
alter table public.jobs enable row level security;
alter table public.job_dependencies enable row level security;
alter table public.job_assignments enable row level security;
alter table public.job_outputs enable row level security;
alter table public.artifact_registry enable row level security;
alter table public.client_asset_links enable row level security;
alter table public.memory_entries enable row level security;
alter table public.memory_links enable row level security;
alter table public.knowledge_sources enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.embedding_jobs enable row level security;
alter table public.retrieval_feedback enable row level security;
alter table public.approval_items enable row level security;
alter table public.approval_decisions enable row level security;
alter table public.distribution_jobs enable row level security;
alter table public.distribution_events enable row level security;
alter table public.performance_metrics enable row level security;
alter table public.jarvis_sessions enable row level security;
alter table public.jarvis_messages enable row level security;
alter table public.agent_runs enable row level security;
alter table public.agent_context_packs enable row level security;
alter table public.jarvis_actions enable row level security;
alter table public.tool_events enable row level security;
alter table public.activity_log enable row level security;

drop policy if exists workspaces_select_same_workspace on public.workspaces;
create policy workspaces_select_same_workspace
on public.workspaces
for select
to authenticated
using (id = public.current_workspace_id());

drop policy if exists workspaces_update_admin on public.workspaces;
create policy workspaces_update_admin
on public.workspaces
for update
to authenticated
using (id = public.current_workspace_id() and public.is_admin())
with check (id = public.current_workspace_id() and public.is_admin());

drop policy if exists profiles_select_same_workspace on public.profiles;
create policy profiles_select_same_workspace
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.same_workspace(workspace_id));

drop policy if exists profiles_update_self_or_admin on public.profiles;
create policy profiles_update_self_or_admin
on public.profiles
for update
to authenticated
using (id = auth.uid() or (public.same_workspace(workspace_id) and public.is_admin()))
with check (id = auth.uid() or (public.same_workspace(workspace_id) and public.is_admin()));

drop policy if exists workspace_members_select_same_workspace on public.workspace_members;
create policy workspace_members_select_same_workspace
on public.workspace_members
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists workspace_members_manage_admin on public.workspace_members;
create policy workspace_members_manage_admin
on public.workspace_members
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists clients_select_same_workspace on public.clients;
create policy clients_select_same_workspace
on public.clients
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists clients_manage_admin on public.clients;
create policy clients_manage_admin
on public.clients
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists client_operation_briefs_select_same_workspace on public.client_operation_briefs;
create policy client_operation_briefs_select_same_workspace
on public.client_operation_briefs
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists client_operation_briefs_manage_admin on public.client_operation_briefs;
create policy client_operation_briefs_manage_admin
on public.client_operation_briefs
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists client_operation_states_select_same_workspace on public.client_operation_states;
create policy client_operation_states_select_same_workspace
on public.client_operation_states
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists client_operation_states_manage_admin on public.client_operation_states;
create policy client_operation_states_manage_admin
on public.client_operation_states
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists client_stage_history_select_same_workspace on public.client_stage_history;
create policy client_stage_history_select_same_workspace
on public.client_stage_history
for select
to authenticated
using (
  exists (
    select 1
    from public.clients c
    where c.id = client_stage_history.client_id
      and public.same_workspace(c.workspace_id)
  )
);

drop policy if exists client_stage_history_manage_admin on public.client_stage_history;
create policy client_stage_history_manage_admin
on public.client_stage_history
for all
to authenticated
using (
  exists (
    select 1
    from public.clients c
    where c.id = client_stage_history.client_id
      and public.same_workspace(c.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.clients c
    where c.id = client_stage_history.client_id
      and public.same_workspace(c.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists categories_select_scoped on public.categories;
create policy categories_select_scoped
on public.categories
for select
to authenticated
using (workspace_id is null or public.same_workspace(workspace_id));

drop policy if exists categories_manage_admin on public.categories;
create policy categories_manage_admin
on public.categories
for all
to authenticated
using (workspace_id is not null and public.same_workspace(workspace_id) and public.is_admin())
with check (workspace_id is not null and public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists torq_docs_select_same_workspace on public.torq_docs;
create policy torq_docs_select_same_workspace
on public.torq_docs
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists torq_docs_manage_admin on public.torq_docs;
create policy torq_docs_manage_admin
on public.torq_docs
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists doc_versions_select_doc_workspace on public.doc_versions;
create policy doc_versions_select_doc_workspace
on public.doc_versions
for select
to authenticated
using (public.doc_in_current_workspace(doc_id));

drop policy if exists doc_versions_manage_admin on public.doc_versions;
create policy doc_versions_manage_admin
on public.doc_versions
for all
to authenticated
using (public.doc_in_current_workspace(doc_id) and public.is_admin())
with check (public.doc_in_current_workspace(doc_id) and public.is_admin());

drop policy if exists attachments_select_scoped on public.attachments;
create policy attachments_select_scoped
on public.attachments
for select
to authenticated
using (
  public.same_workspace(workspace_id)
  or (doc_id is not null and public.doc_in_current_workspace(doc_id))
);

drop policy if exists attachments_manage_admin on public.attachments;
create policy attachments_manage_admin
on public.attachments
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists doc_links_select_doc_workspace on public.doc_links;
create policy doc_links_select_doc_workspace
on public.doc_links
for select
to authenticated
using (
  public.doc_in_current_workspace(from_doc_id)
  and public.doc_in_current_workspace(to_doc_id)
);

drop policy if exists doc_links_manage_admin on public.doc_links;
create policy doc_links_manage_admin
on public.doc_links
for all
to authenticated
using (
  public.doc_in_current_workspace(from_doc_id)
  and public.doc_in_current_workspace(to_doc_id)
  and public.is_admin()
)
with check (
  public.doc_in_current_workspace(from_doc_id)
  and public.doc_in_current_workspace(to_doc_id)
  and public.is_admin()
);

drop policy if exists jobs_select_same_workspace on public.jobs;
create policy jobs_select_same_workspace
on public.jobs
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists jobs_manage_admin on public.jobs;
create policy jobs_manage_admin
on public.jobs
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists job_dependencies_select_job_workspace on public.job_dependencies;
create policy job_dependencies_select_job_workspace
on public.job_dependencies
for select
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    where j.id = job_dependencies.job_id
      and public.same_workspace(j.workspace_id)
  )
);

drop policy if exists job_dependencies_manage_admin on public.job_dependencies;
create policy job_dependencies_manage_admin
on public.job_dependencies
for all
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    where j.id = job_dependencies.job_id
      and public.same_workspace(j.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.jobs j
    where j.id = job_dependencies.job_id
      and public.same_workspace(j.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists job_assignments_select_job_workspace on public.job_assignments;
create policy job_assignments_select_job_workspace
on public.job_assignments
for select
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    where j.id = job_assignments.job_id
      and public.same_workspace(j.workspace_id)
  )
);

drop policy if exists job_assignments_manage_admin on public.job_assignments;
create policy job_assignments_manage_admin
on public.job_assignments
for all
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    where j.id = job_assignments.job_id
      and public.same_workspace(j.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.jobs j
    where j.id = job_assignments.job_id
      and public.same_workspace(j.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists job_outputs_select_job_workspace on public.job_outputs;
create policy job_outputs_select_job_workspace
on public.job_outputs
for select
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    where j.id = job_outputs.job_id
      and public.same_workspace(j.workspace_id)
  )
);

drop policy if exists job_outputs_manage_admin on public.job_outputs;
create policy job_outputs_manage_admin
on public.job_outputs
for all
to authenticated
using (
  exists (
    select 1
    from public.jobs j
    where j.id = job_outputs.job_id
      and public.same_workspace(j.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.jobs j
    where j.id = job_outputs.job_id
      and public.same_workspace(j.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists artifact_registry_select_same_workspace on public.artifact_registry;
create policy artifact_registry_select_same_workspace
on public.artifact_registry
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists artifact_registry_manage_admin on public.artifact_registry;
create policy artifact_registry_manage_admin
on public.artifact_registry
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists client_asset_links_select_workspace on public.client_asset_links;
create policy client_asset_links_select_workspace
on public.client_asset_links
for select
to authenticated
using (
  exists (
    select 1
    from public.clients c
    where c.id = client_asset_links.client_id
      and public.same_workspace(c.workspace_id)
  )
);

drop policy if exists client_asset_links_manage_admin on public.client_asset_links;
create policy client_asset_links_manage_admin
on public.client_asset_links
for all
to authenticated
using (
  exists (
    select 1
    from public.clients c
    where c.id = client_asset_links.client_id
      and public.same_workspace(c.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.clients c
    where c.id = client_asset_links.client_id
      and public.same_workspace(c.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists memory_entries_select_same_workspace on public.memory_entries;
create policy memory_entries_select_same_workspace
on public.memory_entries
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists memory_entries_manage_admin on public.memory_entries;
create policy memory_entries_manage_admin
on public.memory_entries
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists memory_links_select_workspace on public.memory_links;
create policy memory_links_select_workspace
on public.memory_links
for select
to authenticated
using (
  exists (
    select 1
    from public.memory_entries m
    where m.id = memory_links.memory_id
      and public.same_workspace(m.workspace_id)
  )
);

drop policy if exists memory_links_manage_admin on public.memory_links;
create policy memory_links_manage_admin
on public.memory_links
for all
to authenticated
using (
  exists (
    select 1
    from public.memory_entries m
    where m.id = memory_links.memory_id
      and public.same_workspace(m.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.memory_entries m
    where m.id = memory_links.memory_id
      and public.same_workspace(m.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists knowledge_sources_select_same_workspace on public.knowledge_sources;
create policy knowledge_sources_select_same_workspace
on public.knowledge_sources
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists knowledge_sources_manage_admin on public.knowledge_sources;
create policy knowledge_sources_manage_admin
on public.knowledge_sources
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists knowledge_chunks_select_same_workspace on public.knowledge_chunks;
create policy knowledge_chunks_select_same_workspace
on public.knowledge_chunks
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists knowledge_chunks_manage_admin on public.knowledge_chunks;
create policy knowledge_chunks_manage_admin
on public.knowledge_chunks
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists embedding_jobs_select_workspace on public.embedding_jobs;
create policy embedding_jobs_select_workspace
on public.embedding_jobs
for select
to authenticated
using (
  exists (
    select 1
    from public.knowledge_sources s
    where s.id = embedding_jobs.source_id
      and public.same_workspace(s.workspace_id)
  )
);

drop policy if exists embedding_jobs_manage_admin on public.embedding_jobs;
create policy embedding_jobs_manage_admin
on public.embedding_jobs
for all
to authenticated
using (
  exists (
    select 1
    from public.knowledge_sources s
    where s.id = embedding_jobs.source_id
      and public.same_workspace(s.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.knowledge_sources s
    where s.id = embedding_jobs.source_id
      and public.same_workspace(s.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists retrieval_feedback_select_scoped on public.retrieval_feedback;
create policy retrieval_feedback_select_scoped
on public.retrieval_feedback
for select
to authenticated
using (
  (chunk_id is not null and exists (
    select 1
    from public.knowledge_chunks kc
    where kc.id = retrieval_feedback.chunk_id
      and public.same_workspace(kc.workspace_id)
  ))
  or (session_id is not null and exists (
    select 1
    from public.jarvis_sessions js
    where js.id = retrieval_feedback.session_id
      and public.same_workspace(js.workspace_id)
  ))
);

drop policy if exists retrieval_feedback_insert_scoped on public.retrieval_feedback;
create policy retrieval_feedback_insert_scoped
on public.retrieval_feedback
for insert
to authenticated
with check (
  (chunk_id is not null and exists (
    select 1
    from public.knowledge_chunks kc
    where kc.id = retrieval_feedback.chunk_id
      and public.same_workspace(kc.workspace_id)
  ))
  or (session_id is not null and exists (
    select 1
    from public.jarvis_sessions js
    where js.id = retrieval_feedback.session_id
      and public.same_workspace(js.workspace_id)
  ))
);

drop policy if exists approval_items_select_same_workspace on public.approval_items;
create policy approval_items_select_same_workspace
on public.approval_items
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists approval_items_manage_admin on public.approval_items;
create policy approval_items_manage_admin
on public.approval_items
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists approval_decisions_select_workspace on public.approval_decisions;
create policy approval_decisions_select_workspace
on public.approval_decisions
for select
to authenticated
using (
  exists (
    select 1
    from public.approval_items ai
    where ai.id = approval_decisions.approval_item_id
      and public.same_workspace(ai.workspace_id)
  )
);

drop policy if exists approval_decisions_manage_admin on public.approval_decisions;
create policy approval_decisions_manage_admin
on public.approval_decisions
for all
to authenticated
using (
  exists (
    select 1
    from public.approval_items ai
    where ai.id = approval_decisions.approval_item_id
      and public.same_workspace(ai.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.approval_items ai
    where ai.id = approval_decisions.approval_item_id
      and public.same_workspace(ai.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists distribution_jobs_select_same_workspace on public.distribution_jobs;
create policy distribution_jobs_select_same_workspace
on public.distribution_jobs
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists distribution_jobs_manage_admin on public.distribution_jobs;
create policy distribution_jobs_manage_admin
on public.distribution_jobs
for all
to authenticated
using (public.same_workspace(workspace_id) and public.is_admin())
with check (public.same_workspace(workspace_id) and public.is_admin());

drop policy if exists distribution_events_select_workspace on public.distribution_events;
create policy distribution_events_select_workspace
on public.distribution_events
for select
to authenticated
using (
  exists (
    select 1
    from public.distribution_jobs dj
    where dj.id = distribution_events.distribution_job_id
      and public.same_workspace(dj.workspace_id)
  )
);

drop policy if exists distribution_events_manage_admin on public.distribution_events;
create policy distribution_events_manage_admin
on public.distribution_events
for all
to authenticated
using (
  exists (
    select 1
    from public.distribution_jobs dj
    where dj.id = distribution_events.distribution_job_id
      and public.same_workspace(dj.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.distribution_jobs dj
    where dj.id = distribution_events.distribution_job_id
      and public.same_workspace(dj.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists performance_metrics_select_workspace on public.performance_metrics;
create policy performance_metrics_select_workspace
on public.performance_metrics
for select
to authenticated
using (
  exists (
    select 1
    from public.distribution_jobs dj
    where dj.id = performance_metrics.distribution_job_id
      and public.same_workspace(dj.workspace_id)
  )
);

drop policy if exists performance_metrics_manage_admin on public.performance_metrics;
create policy performance_metrics_manage_admin
on public.performance_metrics
for all
to authenticated
using (
  exists (
    select 1
    from public.distribution_jobs dj
    where dj.id = performance_metrics.distribution_job_id
      and public.same_workspace(dj.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.distribution_jobs dj
    where dj.id = performance_metrics.distribution_job_id
      and public.same_workspace(dj.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists jarvis_sessions_select_same_workspace on public.jarvis_sessions;
create policy jarvis_sessions_select_same_workspace
on public.jarvis_sessions
for select
to authenticated
using (public.same_workspace(workspace_id));

drop policy if exists jarvis_sessions_insert_self on public.jarvis_sessions;
create policy jarvis_sessions_insert_self
on public.jarvis_sessions
for insert
to authenticated
with check (
  public.same_workspace(workspace_id)
  and profile_id = auth.uid()
);

drop policy if exists jarvis_sessions_update_self_or_admin on public.jarvis_sessions;
create policy jarvis_sessions_update_self_or_admin
on public.jarvis_sessions
for update
to authenticated
using (
  public.same_workspace(workspace_id)
  and (profile_id = auth.uid() or public.is_admin())
)
with check (
  public.same_workspace(workspace_id)
  and (profile_id = auth.uid() or public.is_admin())
);

drop policy if exists jarvis_messages_select_session_workspace on public.jarvis_messages;
create policy jarvis_messages_select_session_workspace
on public.jarvis_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = jarvis_messages.session_id
      and public.same_workspace(js.workspace_id)
  )
);

drop policy if exists jarvis_messages_insert_session_owner on public.jarvis_messages;
create policy jarvis_messages_insert_session_owner
on public.jarvis_messages
for insert
to authenticated
with check (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = jarvis_messages.session_id
      and public.same_workspace(js.workspace_id)
      and (js.profile_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists agent_runs_select_session_workspace on public.agent_runs;
create policy agent_runs_select_session_workspace
on public.agent_runs
for select
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = agent_runs.session_id
      and public.same_workspace(js.workspace_id)
  )
);

drop policy if exists agent_runs_manage_admin on public.agent_runs;
create policy agent_runs_manage_admin
on public.agent_runs
for all
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = agent_runs.session_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = agent_runs.session_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists agent_context_packs_select_session_workspace on public.agent_context_packs;
create policy agent_context_packs_select_session_workspace
on public.agent_context_packs
for select
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = agent_context_packs.session_id
      and public.same_workspace(js.workspace_id)
  )
);

drop policy if exists agent_context_packs_manage_admin on public.agent_context_packs;
create policy agent_context_packs_manage_admin
on public.agent_context_packs
for all
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = agent_context_packs.session_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = agent_context_packs.session_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists jarvis_actions_select_session_workspace on public.jarvis_actions;
create policy jarvis_actions_select_session_workspace
on public.jarvis_actions
for select
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = jarvis_actions.session_id
      and public.same_workspace(js.workspace_id)
  )
);

drop policy if exists jarvis_actions_manage_admin on public.jarvis_actions;
create policy jarvis_actions_manage_admin
on public.jarvis_actions
for all
to authenticated
using (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = jarvis_actions.session_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.jarvis_sessions js
    where js.id = jarvis_actions.session_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists tool_events_select_run_workspace on public.tool_events;
create policy tool_events_select_run_workspace
on public.tool_events
for select
to authenticated
using (
  exists (
    select 1
    from public.agent_runs ar
    join public.jarvis_sessions js on js.id = ar.session_id
    where ar.id = tool_events.agent_run_id
      and public.same_workspace(js.workspace_id)
  )
);

drop policy if exists tool_events_manage_admin on public.tool_events;
create policy tool_events_manage_admin
on public.tool_events
for all
to authenticated
using (
  exists (
    select 1
    from public.agent_runs ar
    join public.jarvis_sessions js on js.id = ar.session_id
    where ar.id = tool_events.agent_run_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
)
with check (
  exists (
    select 1
    from public.agent_runs ar
    join public.jarvis_sessions js on js.id = ar.session_id
    where ar.id = tool_events.agent_run_id
      and public.same_workspace(js.workspace_id)
      and public.is_admin()
  )
);

drop policy if exists activity_log_select_same_workspace on public.activity_log;
create policy activity_log_select_same_workspace
on public.activity_log
for select
to authenticated
using (workspace_id is null or public.same_workspace(workspace_id));

drop policy if exists activity_log_manage_admin on public.activity_log;
create policy activity_log_manage_admin
on public.activity_log
for all
to authenticated
using (public.is_admin() and (workspace_id is null or public.same_workspace(workspace_id)))
with check (public.is_admin() and (workspace_id is null or public.same_workspace(workspace_id)));

-- Note: storage.objects is owned by an internal Supabase role (supabase_storage_admin)
-- in this project, so bucket-level policies must be applied via the Supabase dashboard
-- or a privileged path outside this migration. Public schema RLS remains fully managed here.
