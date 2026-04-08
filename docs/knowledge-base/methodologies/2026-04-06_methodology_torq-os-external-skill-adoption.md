---
type: methodology
source: 'Torq Internal'
date: 2026-04-06
tags: [torq-os, external-skills, adoption, antigravity]
relevance: high
---

# Torq OS External Skill Adoption Policy v1

## Purpose

This document records which external skills from the Antigravity bundle are
officially adopted now, which are deferred for later, and how they relate to
the Torq-native stack.

The goal is to avoid ambiguity.

External skills are accelerators. They are not the strategic source of truth.

## Adopted Now

These four external skills are officially aggregated into the current Torq OS
design:

### 1. `agent-memory-systems`

Why now:

- Torq OS is already a memory-centric system
- founder memory and brand memory are first-class concerns
- memory quality directly affects diagnosis, planning, and derivation

Role in Torq OS:

- supports `Memory OS`
- informs `FounderMemoryEntry` design
- improves retrieval architecture decisions

### 2. `context-manager`

Why now:

- Torq OS depends on multi-step handoffs between research, strategy, copy, and
  distribution
- context drift is one of the main long-term risks of the system

Role in Torq OS:

- supports `Memory OS`, `Research OS`, and `Strategy OS`
- informs context assembly between modules
- helps preserve relevance and token discipline across workflows

### 3. `rag-engineer`

Why now:

- Torq already has a knowledge base, voice files, client files, and a search
  mindset
- retrieval quality will determine whether Torq OS behaves like memory or like
  a loose document dump

Role in Torq OS:

- supports `Memory OS` and `Research OS`
- informs chunking, indexing, search, and retrieval design
- complements Torq Central search evolution

### 4. `n8n-mcp-tools-expert`

Why now:

- the intended future stack already points to n8n
- workflow quality matters before full automation goes live
- early workflow patterns reduce future rewrite cost

Role in Torq OS:

- supports `Distribution OS` and future operational integrations
- informs node selection, validation, and workflow assembly
- reduces implementation ambiguity for n8n-connected steps

## Planned for Later

These skills are explicitly documented for later adoption.

They are useful, but they are not part of the first aggregated external layer.

### Memory and Retrieval Expansion

- `agent-memory-mcp`
- `hybrid-search-implementation`
- `embedding-strategies`
- `clarity-gate`

### Research Expansion

- `deep-research`
- `competitive-landscape`
- `market-sizing-analysis`

### Systems and Automation Expansion

- `workflow-automation`
- `supabase-automation`

### Execution Layer Expansion

- `canva-automation`
- `linkedin-automation`
- `instagram-automation`
- `twitter-automation`
- `youtube-automation`
- `whatsapp-automation`
- `hubspot-automation`
- `close-automation`
- `googlesheets-automation`

## Non-Negotiable Rule

Even when external skills are adopted, the final judgement layer remains Torq-native.

The strategic and editorial filter must continue to pass through:

- `torq-market-intelligence`
- `torq-commercial-diagnostic`
- `torq-brand-foundation`
- `torq-offer-engineering`
- `torq-storytelling`
- `torq-editorial-copy`
- `torq-approval-governance`

## Implementation Default

When a new external skill is adopted:

1. Document it in this file.
2. Update the operating model.
3. Define which Torq OS module it supports.
4. State whether it is advisory, infrastructural, or executional.
5. Preserve Torq-native approval and strategic filters.
