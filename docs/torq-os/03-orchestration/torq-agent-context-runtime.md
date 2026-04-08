---
type: architecture
source: "Torq Internal"
date: 2026-04-07
tags: [torq-os, agents, context, runtime, jarvis, supabase]
relevance: high
---

# Torq Agent Context Runtime v1

## Purpose

This document defines how agents should operate across the full Torq system
when Supabase is the backend.

It answers four questions:

1. how context is assembled
2. how routing happens
3. how far agents are allowed to go
4. how runtime state flows back into the system

## Runtime Roles

### Jarvis

Jarvis is the operator-facing entry point.

Jarvis should:

- receive text or voice input
- classify the request
- assemble the context pack
- ask OpenClaude to execute the right agent route
- render the result
- request confirmation for mutations

### `torq-orchestrator`

This is the lead runtime agent.

It should:

- classify the request
- identify current module and stage
- select the specialist route
- synthesize the final answer

It should not:

- directly improvise stage progression
- ignore blockers
- fabricate missing context

### Module specialists

These are:

- `torq-memory-os`
- `torq-research-os`
- `torq-strategy-os`
- `torq-conversion-os`
- `torq-content-os`
- `torq-distribution-os`

Their role is depth, not authority over the whole system.

## Context Assembly Pipeline

### Step 1. Identify scope

Jarvis must first determine:

- workspace
- operator
- client, if any
- active document or asset, if any
- current module or stage, if any

### Step 2. Load operational state

Read from Supabase:

- `client_operation_states`
- active `jobs`
- linked `artifact_registry`
- relevant `approval_items`

### Step 3. Load durable memory

Read:

- `memory_entries`
- linked client memories
- approved voice or founder memories

### Step 4. Run bounded retrieval

Use:

- `knowledge_chunks`
- current client scope first
- current stage dependencies second
- shared methodology third

### Step 5. Build the context pack

Produce a structured pack with:

- current stage
- active blockers
- upstream dependencies
- approved assets
- relevant memory
- RAG evidence references

### Step 6. Route to the right specialist

The orchestrator chooses the module specialist only after the context pack is
complete enough to avoid shallow routing.

## Routing Rules

### Memory OS

Use when the question is about:

- durable context
- retrieval quality
- memory structure
- client context integrity

### Research OS

Use when the question is about:

- market truth
- competitor interpretation
- demand signals
- voice of customer

### Strategy OS

Use when the question is about:

- positioning
- narrative thesis
- strategic framing
- brand foundation

### Conversion OS

Use when the question is about:

- offer
- pricing
- sales narrative
- copy readiness

### Content OS

Use when the question is about:

- content planning
- editorial derivation
- production briefs

### Distribution OS

Use when the question is about:

- approval
- queue state
- scheduling
- publication safety
- learning loops

## Agent Limits

### Agents may

- read structured records
- read approved context
- ask for more context
- produce structured recommendations
- draft outputs
- recommend state transitions

### Agents may not

- assume a stage that is not recorded
- use unapproved artifacts as approved truth
- move into distribution without approval data
- mutate external-facing state without confirmation
- bypass role-based permissions

## Action Taxonomy

Every runtime action should be one of:

- `answer`
- `diagnose`
- `plan`
- `draft`
- `propose_transition`
- `create_record`
- `update_record`
- `queue_action`
- `publish_action`

The last four require explicit policy checks.

## Runtime Output Contract

Every significant agent result should be normalized into:

- `route`
- `confidence`
- `current_stage`
- `detected_blockers`
- `recommended_next_action`
- `requested_mutations`
- `required_approvals`
- `evidence_refs`

## Mutation Protocol

### Proposed mutation

The runtime may propose:

- insert a job
- update a job status
- link an artifact
- prepare an approval item

### Confirmation gate

Before executing, Jarvis should show:

- what will change
- which records will change
- why it is allowed
- which approval owner is affected

### Persistence

After confirmation:

- persist the change in Supabase
- create an audit event
- append the result to the session log

## Session Model

Every Jarvis interaction should be resumable.

That means:

- one `jarvis_sessions` row per operating conversation
- one `jarvis_messages` row per exchange
- one `agent_runs` row per routed execution
- one `jarvis_actions` row per proposed or executed mutation

## Recommended Backend Flow

```text
Frontend message
  -> Jarvis API
  -> load operator and workspace
  -> load client state
  -> assemble context pack
  -> call OpenClaude with torq-orchestrator
  -> route to module specialist if needed
  -> normalize output
  -> require confirmation if mutation exists
  -> persist result and audit trail in Supabase
  -> return structured UI payload
```

## Final Recommendation

Think of agents as policy-bounded operators inside a stateful system.

Do not think of them as free-floating prompt personas.

That difference is what will let Torq scale with discipline.
