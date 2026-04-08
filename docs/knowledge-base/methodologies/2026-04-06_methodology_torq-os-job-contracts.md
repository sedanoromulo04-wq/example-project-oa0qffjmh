---
type: methodology
source: 'Torq Internal'
date: 2026-04-06
tags: [torq-os, contracts, job-schemas, handoff]
relevance: high
---

# Torq OS Job Contracts v1

## Goal

This document standardizes the canonical contracts used across Torq OS.

Every contract exists to reduce ambiguity between modules, skills, operators,
and automations. The same naming should be preserved in prompt packs,
JSON payloads, queue items, API objects, and Supabase records.

Supabase is the default backend and system of record for Torq OS.
Template JSON files inside `skills/**/assets/templates/` are reference schemas
for front-end forms, API payloads, and Supabase rows. They are not evidence
that agents run locally on the operator machine.

## Canonical Contracts

| Contract                 | Primary Module  | Primary Owner              | Canonical Template                                                          |
| ------------------------ | --------------- | -------------------------- | --------------------------------------------------------------------------- |
| `client-operation-brief` | Executive OS    | `torq-c-level-strategy`    | `skills/torq-c-level-strategy/assets/templates/client-operation-brief.json` |
| `client-intake`          | Research OS     | `torq-market-intelligence` | `skills/torq-market-intelligence/assets/templates/client-intake.json`       |
| `research-dossier`       | Research OS     | `torq-market-intelligence` | `skills/torq-market-intelligence/assets/templates/research-dossier.json`    |
| `brand-bundle`           | Strategy OS     | `torq-brand-foundation`    | `skills/torq-brand-foundation/assets/templates/brand-bundle.json`           |
| `offer-job`              | Conversion OS   | `torq-offer-engineering`   | `skills/torq-offer-engineering/assets/templates/offer-job.json`             |
| `story-job`              | Strategy OS     | `torq-storytelling`        | `skills/torq-storytelling/assets/templates/story-job.json`                  |
| `copy-job`               | Conversion OS   | `torq-editorial-copy`      | `skills/torq-editorial-copy/assets/templates/copy-job.json`                 |
| `content-plan`           | Content OS      | `torq-content-planning`    | `skills/torq-content-planning/assets/templates/content-plan.json`           |
| `approval-job`           | Distribution OS | `torq-approval-governance` | `skills/torq-approval-governance/assets/templates/approval-job.json`        |
| `distribution-job`       | Distribution OS | `torq-distribution-ops`    | `skills/torq-distribution-ops/assets/templates/distribution-job.json`       |

## Global Contract Rules

- All strategic text must be in `pt-BR`.
- All strategic contracts must expose `facts`, `inferences`, and `hypotheses`
  whenever interpretation is part of the output.
- All public-facing assets must carry `approval_state`.
- All distribution work must include human approval metadata.
- All identifiers should be stable enough for downstream reuse.
- All runtime contracts should be representable as Supabase rows with stable IDs.
- If a required input is missing, the contract should preserve the field and mark
  it as `null` or surface it as a blocker instead of inventing data.

## Minimum Inter-Module Flow

The canonical dependency chain is:

`client-operation-brief -> client-intake -> research-dossier -> brand-bundle -> offer-job/story-job -> copy-job -> content-plan -> approval-job -> distribution-job`

### Allowed Shortcuts

- `brand-bundle -> content-plan` only when the goal is editorial planning
  grounded in an already approved thesis.
- `research-dossier -> commercial diagnostic` when qualification must happen
  before brand work.
- `copy-job -> approval-job` for one-off assets that do not require a full
  editorial plan.

### Forbidden Shortcuts

- `client-intake -> content-plan`
- `research-dossier -> distribution-job`
- `draft asset -> queued`
- `unapproved asset -> published`

## Contract Notes

### `client-intake`

Used to normalize a founder, client, or prospect before deep analysis.

Must capture:

- who the client is
- what they sell today
- proof signals
- channel reality
- constraints
- project objective

### `research-dossier`

Used to summarize market truth and strategic interpretation.

Must capture:

- market summary
- competitor map
- audience language
- demand signals
- category pressure
- facts, inferences, hypotheses

### `brand-bundle`

Used to bridge strategy to design, narrative, and conversion.

Must capture:

- executive summary
- positioning
- verbal identity
- visual system
- proof and readiness

### `offer-job`

Used to engineer the commercial object and value logic.

Must capture:

- problem
- desired outcome
- mechanism
- pricing logic
- risk reversal
- deliverables

### `story-job`

Used to shape the persuasive narrative container.

Must capture:

- audience
- narrative objective
- framing
- proof
- call to action

### `copy-job`

Used to generate copy from approved strategic inputs.

Must capture:

- awareness level
- offer objective
- founder inputs
- lexicon constraints
- output format requirements

### `content-plan`

Used to derive an editorial system from approved strategy.

Must capture:

- planning window
- thesis map
- pillars
- series
- channel roles
- cadence
- CTA logic

### `approval-job`

Used to review public assets before queueing or publication.

Must capture:

- asset reference
- owner
- claims
- proof status
- tone compliance
- decision
- blockers

### `distribution-job`

Used to queue, schedule, and measure approved assets.

Must capture:

- asset reference
- destination channel
- publication target
- metadata
- measurement target
- feedback loop

## Implementation Default

When a new module or automation needs a payload, it should extend one of the
canonical contracts above instead of inventing a new naming scheme.
