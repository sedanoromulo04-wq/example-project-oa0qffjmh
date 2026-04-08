---
type: methodology
source: "Torq Internal"
date: 2026-04-07
tags: [torq-os, client-operations, kickoff, orchestration, supabase]
relevance: high
---

# Torq OS Client Operation Launch

## Purpose

This document defines how Torq OS should start or reorganize a live client
operation without chaos.

The goal is not to activate all agents at once. The goal is to activate the
right agent at the right stage, with clear ownership, blocking rules, and
Supabase records as the source of truth.

## Source of Truth

Supabase is the operational backend.

- all jobs must be representable as Supabase rows
- all state transitions must be traceable
- all handoffs should reference upstream record IDs
- local files are schemas and references, not runtime dependencies

## Kickoff Principle

Every client operation begins with one executive question:

`What is the next highest-leverage decision required to move this client safely through the Torq OS?`

The answer is coordinated by `torq-c-level-strategy`, not guessed by downstream
production modules.

## Canonical Boot Sequence

The default sequence for a client operation is:

`client-operation-brief -> commercial-diagnostic -> market-intelligence -> behavioral-persona -> brand-foundation -> offer/story/copy -> content-plan -> approval -> distribution`

### Allowed entry points

- start at `commercial-diagnostic` if the client is still unqualified
- start at `market-intelligence` if fit is already known but market truth is weak
- start at `behavioral-persona` only if research data already exists
- start at `brand-foundation` only if qualification, research, and persona layers are already approved
- start at `offer`, `story`, or `copy` only if the full strategic spine already exists

### Forbidden entry points

- `content-plan` without strategic assets
- `canva-production` without approved source asset
- `distribution` without approval metadata
- `copy` based only on intuition about the audience

## Phase Map

### Phase 0. Executive Intake

Owner:
- `torq-c-level-strategy`

Required record:
- `client-operation-brief`

Decision:
- where the client truly is now
- what must happen next
- which module owns the next move

### Phase 1. Commercial Qualification

Owner:
- `torq-commercial-diagnostic`

Required inputs:
- client context
- call notes
- founder constraints

Output:
- fit verdict
- scope recommendation
- next best stage

### Phase 2. Research and Market Truth

Owner:
- `torq-market-intelligence`

Required inputs:
- approved intake
- category context
- market questions

Output:
- `research-dossier`
- facts, inferences, hypotheses
- recommended strategic handoff

### Phase 3. Behavioral Intelligence

Owner:
- `behavioral-persona-architect`

Required inputs:
- business directive
- research dataset
- governance metadata

Output:
- approved `behavioral_persona_dossier`

### Phase 4. Strategic Foundation

Owners:
- `torq-brand-foundation`
- `torq-c-level-strategy`
- `torq-storytelling` when narrative framing is required

Required inputs:
- approved research
- approved behavioral dossier
- fit-confirmed client context

Output:
- `brand-bundle`
- narrative direction
- verbal and visual north star

### Phase 5. Conversion Assets

Owners:
- `torq-offer-engineering`
- `torq-storytelling`
- `torq-editorial-copy`

Required inputs:
- approved strategic foundation
- approved behavioral dossier

Output:
- offer logic
- narrative container
- copy assets

### Phase 6. Editorial Derivation

Owner:
- `torq-content-planning`

Required inputs:
- approved offer, story, or copy assets

Output:
- `content-plan`
- channel roles
- briefs for production

### Phase 7. Governance and Queue

Owners:
- `torq-approval-governance`
- `torq-distribution-ops`

Required inputs:
- approved public asset
- human approver metadata

Output:
- `approval-job`
- `distribution-job`
- measured learning loop

## Agent Alignment Rules

### Vision Chief

Owns:
- macro priority
- phase correction
- conflict arbitration

### COO Orchestrator

Owns:
- sequence
- ownership
- state progression

### CMO Architect

Owns:
- positioning relevance
- market interpretation
- demand logic

### CIO Engineer

Owns:
- data discipline
- record integrity
- system interoperability

### CAIO Architect

Owns:
- automation boundaries
- risk controls
- AI usage posture

## Launch Checklist

Before a client operation is considered active, confirm:

- a `client-operation-brief` exists in Supabase
- one human approval owner is named
- the current stage is explicit
- upstream assets are linked by record ID
- the next job is named and owned
- blocked stages are visible
- no downstream module is producing on guesswork

## 30-Day Default Operating Rhythm

### Week 1

- validate fit
- define stage
- create operation brief
- open first critical jobs

### Week 2

- complete research
- complete behavioral dossier
- resolve strategic unknowns

### Week 3

- finalize strategic foundation
- open offer, story, and copy jobs as needed

### Week 4

- derive content plan
- prepare first approved assets
- ready queue and measurement loop

## Decision Rule

If the client asks for speed, the system should compress steps only when the
upstream truth already exists.

If the truth does not exist, the system must slow down before it speeds up.
