---
type: roadmap
source: 'Torq Internal'
date: 2026-04-07
tags: [torq-os, jarvis, roadmap, frontend, implementation]
relevance: high
---

# Jarvis Implementation Roadmap v1

## Goal

Translate the Jarvis frontend spec into an implementation order that protects
the Torq OS from premature automation.

## Recommended Sequence

### Step 1. Lock the orchestration contract

Define and approve:

- request envelope
- response schema
- action taxonomy
- blocking rules
- approval policy tiers

Exit criterion:

- no ambiguity remains about what Jarvis may answer versus what it may execute

### Step 2. Add a Jarvis route to Torq Central

Create a dedicated route and shell inside the frontend.

Initial UI blocks:

- transcript panel
- text composer
- route and context sidebar
- blockers and approvals panel

Exit criterion:

- the interface can render mock structured responses cleanly on desktop and mobile

### Step 3. Build the Jarvis API wrapper

Create a backend service that:

- receives frontend envelopes
- fetches Torq context from Supabase
- calls OpenClaude
- returns structured responses
- stores audit logs

Exit criterion:

- one end-to-end text request completes with structured output and audit trail

### Step 4. Connect OpenClaude as runtime

Use OpenClaude as the execution engine for:

- torq-orchestrator
- module specialists
- teammate routing when needed

Exit criterion:

- runtime can answer with module, stage, blockers, and next safe action

### Step 5. Enable controlled actions

Introduce safe, explicit actions such as:

- create draft job
- prepare approval packet
- move to next stage when preconditions are met

Exit criterion:

- no state mutation occurs without explicit user confirmation and audit logging

### Step 6. Add voice

After text orchestration is stable:

- add microphone capture
- add speech-to-text
- add transcript confirmation
- optionally add text-to-speech

Exit criterion:

- voice input does not bypass the same control path used by text input

## Scope for V1

### Must have

- text-based Jarvis console
- structured orchestration responses
- context-aware routing
- blocker visibility
- approval visibility
- OpenClaude-backed runtime adapter

### Should have

- draft-only actions
- session history
- client-aware context loading

### Not in V1

- autonomous publication
- fully hands-free voice execution
- silent stage transitions
- uncontrolled agent autonomy

## Technical Recommendation

For this repository, the cleanest build path is:

1. keep the current Vite frontend as the Jarvis UI shell
2. introduce a backend wrapper service for orchestration
3. connect that service to OpenClaude
4. keep Supabase as the operational source of truth

## Success Metric

Jarvis V1 is successful when an operator can ask:

`What should happen next for this client, and why?`

and receive:

- the correct module
- the correct stage
- the correct blockers
- the correct next safe action
- without bypassing Torq governance
