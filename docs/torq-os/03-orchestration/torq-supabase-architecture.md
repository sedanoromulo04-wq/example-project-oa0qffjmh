---
type: architecture
source: "Torq Internal"
date: 2026-04-07
tags: [torq-os, supabase, backend, rag, memory, agents]
relevance: high
---

# Torq Supabase Architecture v1

## Purpose

This document defines the backend architecture of Torq OS assuming one
non-negotiable decision:

`Supabase is the official backend and system of record of the entire Torq system.`

This includes:

- documents
- memory
- RAG
- jobs
- approvals
- agent sessions
- operational state transitions
- audit history

The repository remains the strategic and reference layer.

Supabase becomes the runtime layer.

## Core Principle

The frontend, Jarvis layer, OpenClaude runtime, and automation services must all
behave as clients of the same Supabase-backed operating model.

That means:

- no hidden state outside Supabase for active operations
- no important runtime truth stored only in prompts
- no agent output considered final until representable as a Supabase record
- no downstream action without upstream record linkage

## System Layers

### 1. Reference Layer

Lives in this repository.

Owns:

- skills
- methodology docs
- templates
- orchestration policies
- category definitions

Role:

- strategic source of truth
- schemas and guardrails
- human-readable architecture

### 2. Runtime Data Layer

Lives in Supabase Postgres and Storage.

Owns:

- users
- workspaces
- clients
- jobs
- documents
- memories
- approvals
- distribution state
- vector search corpus
- session logs

Role:

- operational source of truth
- persistence
- auditability
- controlled state transitions

### 3. Retrieval Layer

Lives on top of Supabase tables and pgvector.

Owns:

- chunking
- embeddings
- retrieval metadata
- source linking
- context-pack assembly

Role:

- make memory and knowledge retrievable
- provide bounded context to Jarvis and specialists

### 4. Orchestration Layer

Owns:

- request classification
- context assembly
- agent routing
- policy enforcement
- action gating

Recommended engine:

- OpenClaude as runtime
- Torq wrapper service as policy and integration layer

## Supabase Domain Model

The backend should be designed by domains, not by random table growth.

### Domain A. Identity and Governance

Required entities:

- `profiles`
- `workspaces`
- `workspace_members`
- `roles`
- `user_preferences`

Purpose:

- authentication
- authorization
- workspace scoping
- operator identity
- approval rights

### Domain B. Documents and Attachments

Required entities:

- `categories`
- `torq_docs`
- `doc_versions`
- `attachments`
- `doc_links`

Purpose:

- structured workspace navigation
- versioned documents
- file references
- durable editorial and strategic assets

### Domain C. Clients and Operations

Required entities:

- `clients`
- `client_operation_briefs`
- `client_operation_states`
- `client_stage_history`
- `client_asset_links`

Purpose:

- client identity
- active stage
- operation kickoff
- state progression
- linkage to all upstream and downstream records

### Domain D. Jobs and Artifacts

Required entities:

- `jobs`
- `job_dependencies`
- `job_assignments`
- `job_outputs`
- `artifact_registry`

Purpose:

- normalized execution contracts
- dependency graph
- ownership
- linkage between canonical contracts and produced assets

Canonical `jobs.kind` values should include:

- `client-operation-brief`
- `client-intake`
- `research-dossier`
- `behavioral-persona`
- `brand-bundle`
- `offer-job`
- `story-job`
- `copy-job`
- `content-plan`
- `approval-job`
- `distribution-job`

### Domain E. Memory

Required entities:

- `memory_entries`
- `memory_links`
- `founder_memories`
- `client_memories`
- `voice_memories`
- `case_memories`

Purpose:

- durable intelligence
- reusable context
- memory records separate from generic docs

Memory must be typed.

Suggested `memory_entries.memory_type`:

- `founder`
- `client`
- `voice`
- `case`
- `market`
- `methodology`
- `approval`
- `performance_insight`

### Domain F. RAG and Retrieval

Required entities:

- `knowledge_sources`
- `knowledge_chunks`
- `embedding_jobs`
- `retrieval_feedback`

Purpose:

- make docs and memories retrievable
- preserve source lineage
- monitor retrieval quality

### Domain G. Approvals and Distribution

Required entities:

- `approval_items`
- `approval_decisions`
- `distribution_jobs`
- `distribution_events`
- `performance_metrics`

Purpose:

- govern public assets
- track queue and publication state
- close learning loops

### Domain H. Jarvis and Agent Runtime

Required entities:

- `jarvis_sessions`
- `jarvis_messages`
- `jarvis_actions`
- `agent_runs`
- `agent_context_packs`
- `tool_events`

Purpose:

- preserve operator conversations
- audit agent decisions
- make route and context visible
- track what the runtime actually did

## Recommended Table Logic

### `jobs`

This should be the normalized cross-module task table.

Must include:

- `id`
- `workspace_id`
- `client_id`
- `kind`
- `module`
- `status`
- `owner_profile_id`
- `approval_state`
- `source_record_id`
- `input_payload`
- `output_payload`
- `created_at`
- `updated_at`

Suggested `status` values:

- `draft`
- `ready`
- `in_progress`
- `blocked`
- `pending_review`
- `approved`
- `queued`
- `published`
- `measured`
- `archived`

### `client_operation_states`

This should hold one current row per client operation.

Must include:

- `client_id`
- `workspace_id`
- `current_module`
- `current_stage`
- `next_required_job_kind`
- `approval_owner_profile_id`
- `is_blocked`
- `block_reason`
- `last_transition_at`

This table is critical for Jarvis.

It prevents the system from guessing where a client really is.

### `artifact_registry`

This should unify strategic and execution assets.

Must include:

- `artifact_id`
- `artifact_type`
- `workspace_id`
- `client_id`
- `job_id`
- `title`
- `approval_state`
- `storage_mode`
- `doc_id`
- `json_payload`

Purpose:

- central lookup for all relevant assets
- support downstream routing and approval checks

### `memory_entries`

This should not be treated as a generic notes dump.

Must include:

- `id`
- `workspace_id`
- `client_id`
- `memory_type`
- `title`
- `summary`
- `body_markdown`
- `source_kind`
- `source_record_id`
- `confidence_level`
- `approved_for_retrieval`
- `tags`

### `knowledge_chunks`

This is the core RAG table.

Must include:

- `id`
- `source_id`
- `workspace_id`
- `client_id`
- `chunk_text`
- `chunk_summary`
- `embedding`
- `token_count`
- `source_type`
- `source_record_id`
- `metadata`

Purpose:

- retrieval by semantic similarity
- optional hybrid search with keywords + embeddings

## RAG Strategy

### What enters RAG

Allowed:

- approved methodology docs
- voice calibration docs
- founder transcripts after cleaning
- approved client context
- approved research dossiers
- approved brand bundles
- approved copy and approval records when relevant

Not allowed by default:

- raw draft garbage
- ambiguous notes with no source linkage
- private records without retrieval approval
- stale output with unknown status

### Chunking policy

Chunk by semantic unit, not arbitrary fixed size only.

Preferred order:

1. preserve document section
2. split into bounded semantic chunks
3. keep chunk metadata rich

Each chunk should carry:

- source file or record
- module
- artifact type
- client scope
- approval state
- recency

### Retrieval policy

Jarvis and agents should retrieve in this order:

1. active client scope
2. current stage dependencies
3. approved artifacts for that stage
4. shared methodology if needed
5. broader memory only if still necessary

This avoids fake omniscience.

## Jarvis Context Model

Jarvis should never send an unconstrained prompt to the runtime.

It should assemble a `context pack`.

### `agent_context_packs`

Must include:

- `session_id`
- `client_id`
- `current_module`
- `current_stage`
- `primary_records`
- `secondary_records`
- `memory_ids`
- `retrieval_ids`
- `blockers`
- `approval_state_snapshot`

Purpose:

- make context explicit
- let the frontend show what Jarvis actually used
- let operators challenge or refine context assembly

## Agent Runtime Model

OpenClaude should be treated as a runtime worker behind your wrapper service.

### OpenClaude responsibilities

- execute `torq-orchestrator`
- run specialist agent prompts
- use tools or MCP services when allowed
- produce structured reasoning outputs

### Wrapper service responsibilities

- load Supabase context
- enforce policy
- map requests to runtime
- decide what actions are allowed
- persist agent outputs back to Supabase

### Why this split matters

Without a wrapper, the runtime becomes too powerful and too blind at the same
time:

- too powerful because it can act without your business policy
- too blind because it lacks system state semantics by default

## Agent Permission Model

### Read tier

Allowed:

- select client state
- load docs and memories
- run retrieval
- inspect approvals and blockers

### Draft tier

Allowed:

- create draft job outputs
- prepare structured recommendations
- assemble approval packets

### Mutate tier

Allowed only with explicit operator confirmation:

- insert jobs
- update stage state
- attach outputs
- move queue state

### External impact tier

Never automatic:

- publish
- send external messages
- trigger irreversible automation

## Implementation Recommendation

### Do not model each skill as a separate random table

That will create fragmentation and reporting pain.

Instead:

- use normalized runtime tables for jobs, artifacts, memories, approvals
- store skill-specific payloads as validated JSON payloads inside those rows
- keep a small number of structurally important tables

### Do not store active runtime truth only in documents

Documents are useful for humans.

Operational truth should live in structured tables.

### Do not couple frontend directly to agent prompts

The frontend should talk to a backend contract.

The backend contract should talk to Supabase and OpenClaude.

## Final Direction

The correct mental model is:

`Repo = reference brain`

`Supabase = operational memory and state`

`OpenClaude = orchestration engine`

`Jarvis frontend = operator console`

That is the architecture that can scale without dissolving into prompt chaos.
