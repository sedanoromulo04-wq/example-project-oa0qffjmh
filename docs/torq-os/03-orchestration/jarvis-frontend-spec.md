---
type: spec
source: "Torq Internal"
date: 2026-04-07
tags: [torq-os, jarvis, frontend, orchestration, openclaude, voice]
relevance: high
---

# Torq Jarvis Frontend Spec v1

## Purpose

This document defines the planning baseline for a Jarvis-style frontend inside
Torq Central.

The goal is to create a voice-and-text operator interface that can receive an
intent from the founder or operator, classify the request, assemble the right
context, route the work to the correct Torq agent layer, and return an answer
or action plan without breaking governance.

This document exists before implementation on purpose.

No frontend work should start until these boundaries are accepted.

## Executive Summary

The Jarvis frontend is not "a chatbot on top of the docs."

It is an operating console for Torq OS with four responsibilities:

1. receive input by voice or text
2. classify the request into the correct Torq module and stage
3. orchestrate the right agents with the right context and limits
4. return an answer, plan, or controlled action with explicit governance

OpenClaude can be the agent runtime at the core of this system.

OpenClaude is not the whole system by itself.

It is best used here as:

- the agent execution engine
- the teammate orchestration layer
- the tool-calling runtime
- the MCP-compatible bridge for backend capabilities

The rest of the system still needs to be designed around it:

- frontend experience
- voice input and output
- session storage
- context assembly
- Supabase record flow
- approval checkpoints
- hard operational limits

## Product Definition

### User Promise

The founder or operator can speak or type a request such as:

- "What is the next highest-leverage move for client X?"
- "Prepare the next safe handoff for Strategy OS."
- "Analyze whether we can move this asset into content planning."
- "Open a new approval job for this public asset."
- "Show me what is blocked and why."

Jarvis should respond as an operating system layer, not as an improvising AI.

### Primary Modes

The interface should support:

1. `voice mode`
   - browser microphone capture
   - speech-to-text
   - optional text-to-speech answer

2. `text mode`
   - typed command or conversational prompt
   - slash-like operational commands later if needed

3. `operator mode`
   - show route, context, blockers, approval state, and next action

4. `execution mode`
   - only for allowed actions within approved boundaries

## Core Decision

### Should OpenClaude be the engine?

Yes, with an important qualifier.

OpenClaude is capable of serving as the orchestration runtime because it
already supports:

- project-scoped context
- custom agents
- teammate routing
- MCP integration
- tool execution
- headless gRPC server mode

That makes it a strong engine for the backend orchestration layer of Jarvis.

But OpenClaude is not enough on its own to deliver the full Jarvis product.

It does not, by itself, give you:

- a polished browser voice experience
- persistent operator dashboards
- your business-specific approval state model
- a safe Supabase-first orchestration contract
- guaranteed phase-order enforcement without your own wrapper logic

Conclusion:

- use OpenClaude as the orchestration engine
- do not treat OpenClaude as the entire application

## Architecture Principle

Jarvis must be built as a layered system.

### Layer 1. Interface Layer

This is the frontend inside Torq Central.

Responsibilities:

- microphone capture
- text input
- transcript display
- response rendering
- session timeline
- visibility into route, module, blockers, approvals, and actions

### Layer 2. Jarvis API Layer

This is your application backend wrapper.

Responsibilities:

- authenticate the operator
- store session metadata
- classify input at a first-pass rule level
- fetch Supabase context
- call OpenClaude runtime
- enforce action permissions before tool execution
- persist transcripts, plans, and outcomes

### Layer 3. Orchestration Runtime

This is OpenClaude.

Responsibilities:

- reason over the request
- use project agents
- route work to the right specialist logic
- call tools and MCP capabilities when allowed
- return structured output to the Jarvis API layer

### Layer 4. Operational Source of Truth

This is Supabase plus the Torq repo knowledge layer.

Responsibilities:

- job records
- client operation stage
- approval metadata
- document references
- retrieval material
- audit trail

## Recommended System Shape

```text
Browser UI
  -> Jarvis frontend in Torq Central
  -> voice capture + text UI + operator dashboard

Jarvis API
  -> session manager
  -> context assembler
  -> authorization and guardrails
  -> runtime adapter

OpenClaude Runtime
  -> torq-orchestrator
  -> module specialists
  -> teammate execution
  -> MCP and tool use

Supabase + Repo Knowledge
  -> jobs
  -> approvals
  -> docs
  -> client state
  -> context inputs
```

## Orchestration Model

### Entry Question

Every operator request should be normalized into this question first:

`What is the safest high-leverage next action inside Torq OS for this request?`

### Required Output Fields

Every substantial Jarvis response should include:

- `intent_type`
- `current_module`
- `current_stage`
- `recommended_route`
- `required_context`
- `missing_upstream_assets`
- `allowed_actions`
- `blocked_actions`
- `approval_risk`
- `next_safe_action`

### Routing Steps

1. detect request type
2. identify client and object scope if any
3. detect current Torq module and stage
4. verify upstream dependencies
5. route to the primary specialist
6. pull a secondary specialist only if conflict risk exists
7. synthesize a single operating answer
8. if execution is requested, pass through policy checks first

## Agent Boundaries

### What agents may do

- read relevant documents and records
- assemble context for analysis
- produce recommendations
- draft artifacts
- propose next jobs
- update records only when action is explicitly allowed
- spawn specialist sub-agents through the orchestrator logic

### What agents may not do

- skip stage order without explicit override policy
- publish or distribute public assets without approval metadata
- create downstream work based on missing upstream truth
- silently mutate critical records
- bypass human approval for public claims
- treat intuition as market evidence

## Governance Rules

### Global Non-Negotiables

1. Memory before volume
2. Research before opinion
3. Strategy before design
4. Conversion before content
5. Approval before distribution

### Operational Blocking Rules

Jarvis must hard-block or soft-block these cases:

- content planning without strategic spine
- canva production without approved source asset
- distribution without approval metadata
- copy requests based only on vague audience intuition
- direct automation that affects client records without traceability

### Approval Policy Tiers

#### Tier A. Read-only

Allowed:

- answer questions
- summarize state
- diagnose blockers
- recommend next moves

#### Tier B. Drafting

Allowed with audit logging:

- draft plans
- draft jobs
- prepare approval packets
- prepare research or strategy outputs

#### Tier C. State mutation

Allowed only with explicit operator confirmation:

- create or update jobs
- move stage state
- write linked records
- trigger downstream workflows

#### Tier D. Publication and external impact

Never automatic.

Requires explicit human approval owner and approval metadata.

## Query Rules

### Query Classification

Every request must be classified as one of:

- `status_query`
- `diagnostic_query`
- `planning_query`
- `drafting_query`
- `execution_query`
- `approval_query`
- `system_query`

### Context Assembly Rules

Jarvis should assemble context in this order:

1. current user identity and role
2. current client or workspace scope
3. current stage and active jobs
4. required upstream approved assets
5. only then broader supporting docs

### Retrieval Limits

To reduce drift:

- prefer approved records over raw notes
- prefer current-stage records over unrelated archive material
- prefer direct dependencies over broad global search
- cap context to what is needed for the current decision

### Answering Rules

If context is missing, Jarvis should say so explicitly.

It must not pretend certainty when one of these is missing:

- client identity
- current stage
- upstream approval
- required research basis
- record linkage

## Voice UX Rules

### Voice Input Flow

1. user clicks microphone
2. browser records short utterance
3. speech-to-text produces transcript
4. transcript is shown before execution
5. user can confirm, edit, or resend

This confirmation step matters.

Do not execute operational actions directly from raw voice transcription.

### Voice Output Flow

Two modes:

- `silent operator mode`: text only
- `assistant mode`: optional text-to-speech response

Text-to-speech should be optional because many operator contexts require quiet
or auditable text.

## Frontend Scope

### Recommended First Frontend Slice

Do not start with full voice automation.

Start with a focused operator console inside Torq Central:

- left: session history
- center: Jarvis transcript
- right: route, module, blockers, approvals, and context summary

Initial capabilities:

- text input
- structured response cards
- route visibility
- no direct destructive automation

Voice should come after the operator console works.

## Data Contracts

The frontend should not send a raw prompt only.

It should send a request envelope like:

```json
{
  "session_id": "uuid",
  "user_id": "uuid",
  "input_mode": "text",
  "message": "What is the next highest-leverage move for client X?",
  "active_client_id": "uuid-or-null",
  "active_doc_id": "uuid-or-null",
  "ui_context": {
    "route": "/jarvis",
    "selected_module": null
  }
}
```

The orchestration layer should return a structured envelope like:

```json
{
  "answer": "High-level operating answer",
  "intent_type": "planning_query",
  "current_module": "Strategy OS",
  "current_stage": "brand-foundation",
  "recommended_route": ["torq-strategy-os", "torq-conversion-os"],
  "missing_upstream_assets": [],
  "blocked_actions": [],
  "allowed_actions": ["draft_offer_job"],
  "approval_risk": "low",
  "next_safe_action": "Open an offer-engineering draft from the approved brand bundle"
}
```

## Implementation Phases

### Phase 0. Planning and Contracts

Deliverables:

- this spec
- policy rules
- response schema
- request envelope
- action taxonomy

### Phase 1. Jarvis Operator Console

Deliverables:

- new frontend route
- text interaction
- structured responses
- no voice yet
- no direct mutation by default

### Phase 2. Jarvis API Wrapper

Deliverables:

- session persistence
- context assembly from Supabase
- OpenClaude adapter
- audit logs

### Phase 3. Controlled Actions

Deliverables:

- explicit confirm dialogs
- state mutation permissions
- approval-aware actions

### Phase 4. Voice Mode

Deliverables:

- microphone capture
- speech-to-text
- transcript confirmation
- optional text-to-speech

### Phase 5. Deeper Runtime Integration

Deliverables:

- OpenClaude gRPC or long-running adapter
- teammate orchestration visibility
- richer job-aware automation

## Risks

### Risk 1. Fake omniscience

If Jarvis sounds like it knows everything but works from thin context, trust
will collapse fast.

Mitigation:

- always show route, basis, blockers, and missing context

### Risk 2. Over-automation

If Jarvis can mutate state too early, it will create operational chaos.

Mitigation:

- tiered permissions
- explicit confirmations
- approval gates

### Risk 3. Architecture split

If the frontend talks to OpenClaude directly without a Torq wrapper, business
governance will leak.

Mitigation:

- place a Jarvis API layer between frontend and runtime

### Risk 4. Voice misfire

Speech transcription can mishear names, stages, and numbers.

Mitigation:

- transcript confirmation before execution

## Final Recommendation

Proceed, but do not begin by "adding a chatbot" to the frontend.

The correct move is:

1. define Jarvis as an operating console
2. keep OpenClaude as the orchestration engine
3. build a Torq-controlled backend wrapper
4. start with text mode and structured routing visibility
5. add voice only after the orchestration contract is stable
