-- Torq OS Supabase migration v1
-- Generated from Torq Supabase Architecture v1 blueprint.

create extension if not exists vector;
create extension if not exists pgcrypto;

-- ============================================================================
-- Identity and workspace
-- ============================================================================

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete set null,
  full_name text,
  email text,
  role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  membership_role text not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, profile_id)
);

-- ============================================================================
-- Clients and operation state
-- ============================================================================

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  slug text,
  segment text,
  business_model text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_operation_briefs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  payload jsonb not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_operation_states (
  client_id uuid primary key references public.clients(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  current_module text,
  current_stage text,
  next_required_job_kind text,
  approval_owner_profile_id uuid references public.profiles(id) on delete set null,
  is_blocked boolean not null default false,
  block_reason text,
  last_transition_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.client_stage_history (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  from_stage text,
  to_stage text not null,
  transition_reason text,
  changed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Navigation and documents
-- ============================================================================

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  name text not null,
  slug text not null,
  icon text,
  display_order integer not null default 0,
  parent_id uuid references public.categories(id) on delete cascade,
  module text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, slug)
);

create table if not exists public.torq_docs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text,
  body_markdown text,
  doc_type text,
  status text not null default 'draft',
  approval_state text not null default 'draft',
  tags text[] not null default '{}',
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.doc_versions (
  id uuid primary key default gen_random_uuid(),
  doc_id uuid not null references public.torq_docs(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  title text,
  body_markdown text,
  change_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.attachments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  doc_id uuid references public.torq_docs(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  file_name text not null,
  storage_bucket text not null,
  storage_path text not null,
  mime_type text,
  public_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.doc_links (
  id uuid primary key default gen_random_uuid(),
  from_doc_id uuid not null references public.torq_docs(id) on delete cascade,
  to_doc_id uuid not null references public.torq_docs(id) on delete cascade,
  link_kind text not null default 'reference',
  created_at timestamptz not null default now(),
  unique (from_doc_id, to_doc_id, link_kind)
);

-- ============================================================================
-- Jobs and artifacts
-- ============================================================================

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  kind text not null,
  module text not null,
  status text not null default 'draft',
  approval_state text not null default 'draft',
  owner_profile_id uuid references public.profiles(id) on delete set null,
  source_record_id uuid,
  input_payload jsonb,
  output_payload jsonb,
  blocker_reason text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_dependencies (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  depends_on_job_id uuid not null references public.jobs(id) on delete cascade,
  dependency_kind text not null default 'requires',
  created_at timestamptz not null default now(),
  unique (job_id, depends_on_job_id)
);

create table if not exists public.job_assignments (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  assigned_role text,
  created_at timestamptz not null default now(),
  unique (job_id, profile_id)
);

create table if not exists public.job_outputs (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  artifact_id uuid,
  output_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.artifact_registry (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  job_id uuid references public.jobs(id) on delete set null,
  artifact_type text not null,
  title text,
  approval_state text not null default 'draft',
  storage_mode text,
  doc_id uuid references public.torq_docs(id) on delete set null,
  json_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.job_outputs
  add constraint job_outputs_artifact_id_fkey
  foreign key (artifact_id) references public.artifact_registry(id) on delete set null;

create table if not exists public.client_asset_links (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  artifact_id uuid not null references public.artifact_registry(id) on delete cascade,
  relation_kind text not null default 'belongs_to',
  created_at timestamptz not null default now(),
  unique (client_id, artifact_id, relation_kind)
);

-- ============================================================================
-- Memory and retrieval
-- ============================================================================

create table if not exists public.memory_entries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  memory_type text not null,
  title text not null,
  summary text,
  body_markdown text,
  source_kind text,
  source_record_id uuid,
  confidence_level text,
  approved_for_retrieval boolean not null default false,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memory_links (
  id uuid primary key default gen_random_uuid(),
  memory_id uuid not null references public.memory_entries(id) on delete cascade,
  linked_memory_id uuid not null references public.memory_entries(id) on delete cascade,
  relation_kind text not null default 'related',
  created_at timestamptz not null default now(),
  unique (memory_id, linked_memory_id, relation_kind)
);

create table if not exists public.knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  source_type text not null,
  source_record_id uuid,
  title text,
  approval_state text not null default 'draft',
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.knowledge_sources(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  chunk_index integer not null,
  chunk_text text not null,
  chunk_summary text,
  token_count integer,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz not null default now(),
  unique (source_id, chunk_index)
);

create table if not exists public.embedding_jobs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.knowledge_sources(id) on delete cascade,
  status text not null default 'pending',
  model_name text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.retrieval_feedback (
  id uuid primary key default gen_random_uuid(),
  session_id uuid,
  chunk_id uuid references public.knowledge_chunks(id) on delete cascade,
  score integer,
  feedback_note text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Approvals and distribution
-- ============================================================================

create table if not exists public.approval_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  artifact_id uuid references public.artifact_registry(id) on delete cascade,
  required_approver_profile_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending',
  risk_level text,
  review_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_decisions (
  id uuid primary key default gen_random_uuid(),
  approval_item_id uuid not null references public.approval_items(id) on delete cascade,
  decided_by uuid references public.profiles(id) on delete set null,
  decision text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.distribution_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  artifact_id uuid not null references public.artifact_registry(id) on delete cascade,
  destination_channel text not null,
  status text not null default 'draft',
  scheduled_for timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.distribution_events (
  id uuid primary key default gen_random_uuid(),
  distribution_job_id uuid not null references public.distribution_jobs(id) on delete cascade,
  event_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.performance_metrics (
  id uuid primary key default gen_random_uuid(),
  distribution_job_id uuid references public.distribution_jobs(id) on delete cascade,
  metric_name text not null,
  metric_value numeric,
  recorded_at timestamptz not null default now()
);

-- ============================================================================
-- Jarvis and agent runtime
-- ============================================================================

create table if not exists public.jarvis_sessions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  title text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jarvis_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.jarvis_sessions(id) on delete cascade,
  role text not null,
  input_mode text,
  content text,
  structured_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.jarvis_sessions(id) on delete cascade,
  parent_run_id uuid references public.agent_runs(id) on delete cascade,
  agent_name text not null,
  module text,
  status text not null default 'started',
  context_pack jsonb,
  result_payload jsonb,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists public.agent_context_packs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.jarvis_sessions(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  current_module text,
  current_stage text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.jarvis_actions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.jarvis_sessions(id) on delete cascade,
  agent_run_id uuid references public.agent_runs(id) on delete set null,
  action_type text not null,
  target_table text,
  target_record_id uuid,
  status text not null default 'proposed',
  approval_required boolean not null default true,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_events (
  id uuid primary key default gen_random_uuid(),
  agent_run_id uuid references public.agent_runs(id) on delete cascade,
  tool_name text not null,
  event_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Helpful indexes
-- ============================================================================

create index if not exists idx_clients_workspace_id on public.clients(workspace_id);
create index if not exists idx_torq_docs_workspace_id on public.torq_docs(workspace_id);
create index if not exists idx_torq_docs_client_id on public.torq_docs(client_id);
create index if not exists idx_jobs_workspace_id on public.jobs(workspace_id);
create index if not exists idx_jobs_client_id on public.jobs(client_id);
create index if not exists idx_jobs_kind on public.jobs(kind);
create index if not exists idx_jobs_module on public.jobs(module);
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_artifact_registry_client_id on public.artifact_registry(client_id);
create index if not exists idx_memory_entries_client_id on public.memory_entries(client_id);
create index if not exists idx_memory_entries_type on public.memory_entries(memory_type);
create index if not exists idx_knowledge_sources_client_id on public.knowledge_sources(client_id);
create index if not exists idx_knowledge_chunks_client_id on public.knowledge_chunks(client_id);
create index if not exists idx_approval_items_client_id on public.approval_items(client_id);
create index if not exists idx_distribution_jobs_client_id on public.distribution_jobs(client_id);
create index if not exists idx_jarvis_sessions_client_id on public.jarvis_sessions(client_id);
create index if not exists idx_agent_runs_session_id on public.agent_runs(session_id);

create index if not exists idx_knowledge_chunks_embedding
  on public.knowledge_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);
