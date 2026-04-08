-- Torq Supabase Schema v1
-- Planning draft only.
-- This file is a structural blueprint for implementation, not yet a full migration.

create extension if not exists vector;
create extension if not exists pgcrypto;

-- ============================================================================
-- Identity and workspace
-- ============================================================================

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid references workspaces(id) on delete set null,
  full_name text,
  email text,
  role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  membership_role text not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, profile_id)
);

-- ============================================================================
-- Navigation and documents
-- ============================================================================

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text not null,
  slug text not null,
  icon text,
  display_order int default 0,
  parent_id uuid references categories(id) on delete cascade,
  module text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, slug)
);

create table if not exists torq_docs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid,
  category_id uuid references categories(id) on delete set null,
  title text not null,
  slug text,
  body_markdown text,
  doc_type text,
  status text default 'draft',
  approval_state text default 'draft',
  tags text[] default '{}',
  created_by uuid references profiles(id) on delete set null,
  updated_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists doc_versions (
  id uuid primary key default gen_random_uuid(),
  doc_id uuid not null references torq_docs(id) on delete cascade,
  profile_id uuid references profiles(id) on delete set null,
  title text,
  body_markdown text,
  change_summary text,
  created_at timestamptz not null default now()
);

create table if not exists attachments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  doc_id uuid references torq_docs(id) on delete cascade,
  client_id uuid,
  file_name text not null,
  storage_bucket text not null,
  storage_path text not null,
  mime_type text,
  public_url text,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Clients and operation state
-- ============================================================================

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  slug text,
  segment text,
  business_model text,
  status text default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists client_operation_briefs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  payload jsonb not null,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists client_operation_states (
  client_id uuid primary key references clients(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  current_module text,
  current_stage text,
  next_required_job_kind text,
  approval_owner_profile_id uuid references profiles(id) on delete set null,
  is_blocked boolean not null default false,
  block_reason text,
  last_transition_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists client_stage_history (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  from_stage text,
  to_stage text not null,
  transition_reason text,
  changed_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Jobs and artifacts
-- ============================================================================

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  kind text not null,
  module text not null,
  status text not null default 'draft',
  approval_state text default 'draft',
  owner_profile_id uuid references profiles(id) on delete set null,
  source_record_id uuid,
  input_payload jsonb,
  output_payload jsonb,
  blocker_reason text,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists job_dependencies (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  depends_on_job_id uuid not null references jobs(id) on delete cascade,
  dependency_kind text default 'requires',
  created_at timestamptz not null default now(),
  unique (job_id, depends_on_job_id)
);

create table if not exists artifact_registry (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  job_id uuid references jobs(id) on delete set null,
  artifact_type text not null,
  title text,
  approval_state text default 'draft',
  doc_id uuid references torq_docs(id) on delete set null,
  json_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- Memory and RAG
-- ============================================================================

create table if not exists memory_entries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  memory_type text not null,
  title text not null,
  summary text,
  body_markdown text,
  source_kind text,
  source_record_id uuid,
  confidence_level text,
  approved_for_retrieval boolean not null default false,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  source_type text not null,
  source_record_id uuid,
  title text,
  approval_state text default 'draft',
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references knowledge_sources(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  chunk_index int not null,
  chunk_text text not null,
  chunk_summary text,
  token_count int,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz not null default now(),
  unique (source_id, chunk_index)
);

-- ============================================================================
-- Approvals and distribution
-- ============================================================================

create table if not exists approval_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  artifact_id uuid references artifact_registry(id) on delete cascade,
  required_approver_profile_id uuid references profiles(id) on delete set null,
  status text not null default 'pending',
  risk_level text,
  review_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists approval_decisions (
  id uuid primary key default gen_random_uuid(),
  approval_item_id uuid not null references approval_items(id) on delete cascade,
  decided_by uuid references profiles(id) on delete set null,
  decision text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists distribution_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  artifact_id uuid not null references artifact_registry(id) on delete cascade,
  destination_channel text not null,
  status text not null default 'draft',
  scheduled_for timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- Jarvis and agent runtime
-- ============================================================================

create table if not exists jarvis_sessions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  profile_id uuid references profiles(id) on delete set null,
  client_id uuid references clients(id) on delete set null,
  title text,
  status text default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists jarvis_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references jarvis_sessions(id) on delete cascade,
  role text not null,
  input_mode text,
  content text,
  structured_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references jarvis_sessions(id) on delete cascade,
  parent_run_id uuid references agent_runs(id) on delete cascade,
  agent_name text not null,
  module text,
  status text not null default 'started',
  context_pack jsonb,
  result_payload jsonb,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists jarvis_actions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references jarvis_sessions(id) on delete cascade,
  agent_run_id uuid references agent_runs(id) on delete set null,
  action_type text not null,
  target_table text,
  target_record_id uuid,
  status text not null default 'proposed',
  approval_required boolean not null default true,
  payload jsonb,
  created_at timestamptz not null default now()
);
