---
type: methodology
source: "Torq Internal"
date: 2026-04-06
tags: [torq-os, operating-model, backoffice, hitl, conversion]
relevance: high
---

# Torq OS Operating Model v1

## Purpose

Torq OS is the internal operating system of Grupo Torq.

Its purpose is not to generate random content at scale. Its purpose is to
materialize the founder's mind, preserve brand memory, structure strategic
assets, produce conversion infrastructure, and only then derive editorial and
distribution outputs.

The operating posture for v1 is:

- internal backoffice
- human in the loop by default
- conversion first
- memory before volume
- strategy before design
- approval before publication

## Core Stack Already Validated

The current repository already contains the canonical strategic spine of the
system:

1. `skills/torq-brand-foundation/`
2. `skills/torq-offer-engineering/`
3. `skills/torq-storytelling/`
4. `skills/torq-editorial-copy/`
5. `skills/torq-c-level-strategy/`

The current `Torq Central` frontend acts as the workspace layer for:

- memory
- documentation
- attachments
- version history
- search
- collaboration

This means the product direction is already an operating system for knowledge,
not a simple content scheduler.

## Client Operation Entry Point

Every live client operation should start with an executive kickoff contract:

- `client-operation-brief`

Primary owner:

- `torq-c-level-strategy`

This contract exists to determine the true current stage of the client,
identify missing upstream assets, define the next required jobs, and keep the
rest of the system from starting in the wrong phase.

## The 6 Modules

### 1. Memory OS

Purpose:
capture and organize durable intelligence.

Owns:

- founder memory
- voice calibration
- vision and strategy documents
- client context
- approved proofs and cases
- reusable insights

Primary artifacts:

- `FounderMemoryEntry`
- `ClientProfile`
- `PerformanceInsight`

Primary workspace categories:

- Vision
- Voice
- Clients
- Cases

### 2. Research OS

Purpose:
turn raw context into market intelligence that can guide real decisions.

Owns:

- category analysis
- competitor mapping
- voice of customer
- demand signals
- market threats
- differentiation opportunities

Primary artifacts:

- `client-intake`
- `ResearchDossier`
- `research-dossier`

Primary skill:

- `torq-market-intelligence`

### 3. Strategy OS

Purpose:
define what the market should believe about the founder, the company, and the
offer.

Owns:

- positioning
- narrative thesis
- verbal system
- visual direction
- commercial framing

Primary artifacts:

- `BrandBible`
- `brand-bundle`
- `NarrativeAsset`

Primary skills:

- `torq-brand-foundation`
- `torq-storytelling`
- `torq-c-level-strategy`

### 4. Conversion OS

Purpose:
transform intelligence and positioning into assets that can drive buying
behavior.

Owns:

- qualification
- commercial diagnosis
- offer architecture
- pricing logic
- VSL logic
- copy architecture

Primary artifacts:

- `OfferArchitecture`
- `CopyAsset`
- `offer-job`
- `copy-job`

Primary skills:

- `torq-commercial-diagnostic`
- `torq-offer-engineering`
- `torq-editorial-copy`

### 5. Content OS

Purpose:
derive content from thesis, proof, narrative, and offer without collapsing into
trend-chasing.

Owns:

- editorial planning
- series design
- repurposing trees
- channel role definition
- Canva production briefs

Primary artifacts:

- `ContentPlan`
- `content-plan`

Primary skills:

- `torq-content-planning`
- `torq-canva-production`

### 6. Distribution OS

Purpose:
queue, govern, measure, and reingest content operations.

Owns:

- approval checkpoints
- publication queue
- campaign metadata
- measured outcomes
- learning loops

Primary artifacts:

- `ApprovalItem`
- `DistributionJob`
- `approval-job`
- `distribution-job`

Primary skills:

- `torq-approval-governance`
- `torq-distribution-ops`

## Mandatory Operating Rules

### Rule 1: Facts, Inferences, Hypotheses

Every strategic artifact in the system must explicitly separate:

- facts
- inferences
- hypotheses

This rule applies to research, diagnosis, offer work, planning, and performance
review.

### Rule 2: Human Approval Is Mandatory

No asset can move into queue or publish state without explicit human approval.

V1 is not autonomous publishing software.

### Rule 3: Content Is Downstream

Content planning may only happen after the system has enough signal from:

- founder memory
- market research
- brand positioning
- offer logic
- narrative direction

If these layers are missing, the system must pause and surface the gap.

### Rule 4: Conversion Beats Activity

The system optimizes for:

- stronger positioning
- better offers
- clearer proof
- better diagnosis
- tighter messaging

It does not optimize for post count as an end in itself.

## State Machine

The canonical lifecycle for operating assets is:

`draft -> strategist_review -> founder_review -> approved -> queued -> published -> measured -> archived`

### State Definitions

- `draft`: raw artifact, not yet validated
- `strategist_review`: reviewed by Torq operator or lead strategist
- `founder_review`: waiting for founder or account authority signoff
- `approved`: cleared for production or queueing
- `queued`: accepted into publishing or execution queue
- `published`: distributed to the destination channel
- `measured`: performance data collected and interpreted
- `archived`: inactive but retained for reuse, RAG, and comparison

### Blocking Rules

- `draft` cannot jump directly to `approved`
- `strategist_review` cannot be skipped
- `founder_review` is mandatory for public-facing assets in v1
- `queued` requires explicit approval timestamp and approver identity
- `published` requires channel metadata
- `measured` requires at least one observable output

## Core Models

### `FounderMemoryEntry`

Minimum fields:

- `entry_id`
- `founder_id`
- `source_type`
- `source_reference`
- `topic`
- `raw_excerpt`
- `normalized_thesis`
- `facts`
- `inferences`
- `hypotheses`
- `tags`
- `confidence`
- `created_at`

### `ClientProfile`

Minimum fields:

- `client_id`
- `client_name`
- `persona_type`
- `niche`
- `subniche`
- `offers`
- `proof_points`
- `channels`
- `constraints`
- `fit_status`
- `next_best_stage`

### `ResearchDossier`

Minimum fields:

- `dossier_id`
- `client_id`
- `market_summary`
- `competitor_map`
- `voice_of_customer`
- `demand_signals`
- `facts`
- `inferences`
- `hypotheses`
- `opportunities`
- `risks`

### `BrandBible`

Minimum fields:

- `brand_id`
- `client_id`
- `category`
- `territory`
- `promise`
- `mechanism`
- `verbal_identity`
- `visual_direction`
- `proof_library`
- `content_north_star`

### `OfferArchitecture`

Minimum fields:

- `offer_id`
- `client_id`
- `offer_name`
- `problem`
- `desired_outcome`
- `mechanism`
- `pricing_logic`
- `risk_reversal`
- `deliverables`
- `proof_requirements`

### `NarrativeAsset`

Minimum fields:

- `narrative_id`
- `client_id`
- `asset_type`
- `audience`
- `big_idea`
- `story_structure`
- `key_tension`
- `proof`
- `cta`

### `CopyAsset`

Minimum fields:

- `copy_id`
- `client_id`
- `asset_type`
- `offer_id`
- `awareness_level`
- `core_claim`
- `supporting_proof`
- `cta`
- `approval_state`

### `ContentPlan`

Minimum fields:

- `plan_id`
- `client_id`
- `planning_window`
- `thesis_map`
- `pillar_set`
- `series`
- `channel_roles`
- `cadence`
- `approved_inputs`

### `ApprovalItem`

Minimum fields:

- `approval_id`
- `asset_id`
- `asset_type`
- `reviewer_role`
- `claim_risk`
- `evidence_status`
- `tone_status`
- `decision`
- `decision_notes`
- `approved_at`

### `DistributionJob`

Minimum fields:

- `job_id`
- `asset_id`
- `channel`
- `scheduled_for`
- `status`
- `metadata`
- `approval_id`

### `PerformanceInsight`

Minimum fields:

- `insight_id`
- `asset_id`
- `channel`
- `period`
- `observed_signal`
- `facts`
- `inferences`
- `hypotheses`
- `recommended_action`

## Agent and Skill Mapping

### Routing and Executive Layer

- `Vision Chief`: macro decisions, prioritization, cross-functional synthesis
- `CMO Architect`: positioning, demand, content role, measurement logic
- `CAIO Architect`: AI maturity, automation boundaries, agent governance
- `CTO Architect`: architecture, build-vs-buy, system roadmap
- `COO Orchestrator`: operating cadence, review flow, queue ownership
- `CIO Engineer`: compliance, security, data governance, vendor posture

### Conversion and Narrative Layer

- `Hormozi Chief`: routes offer, pricing, leads, scale, audit questions
- `Copy Chief`: routes copy work and quality review
- `Story Chief`: routes narrative and presentation work

### Priority Specialists for Torq

- `David Ogilvy`
- `David Deutsch`
- `Eugene Schwartz`
- `Stefan Georgi`
- `Andre Chaperon`
- `Park Howell`
- `Nancy Duarte`
- `Kindra Hall`
- `Matthew Dicks`
- `Oren Klaff`
- `Hormozi Offers`
- `Hormozi Pricing`
- `Hormozi Leads`
- `Hormozi Content`
- `Hormozi Audit`
- `Hormozi Scale`
- `Hormozi Ads`

## External Skills as Infrastructure

These skills are valuable to the Torq OS stack as infrastructure and execution
accelerators. They do not replace Torq's strategic filter.

### Adopted Now

The following external skills are officially adopted now as the first external
infrastructure layer of Torq OS:

- `agent-memory-systems`
- `context-manager`
- `rag-engineer`
- `n8n-mcp-tools-expert`

Their role in the current architecture is:

- `agent-memory-systems`: memory architecture patterns for founder memory,
  retrieval boundaries, and memory-layer design
- `context-manager`: context assembly, relevance control, and multi-module
  context orchestration
- `rag-engineer`: chunking, indexing, retrieval, and hybrid search design for
  Torq knowledge systems
- `n8n-mcp-tools-expert`: workflow construction patterns for future n8n-based
  automation and operational handoffs

### Planned for Later Adoption

The following external skills are documented for later adoption, after the
first memory and orchestration layer is stable:

#### Memory and RAG Expansion

- `agent-memory-mcp`
- `hybrid-search-implementation`
- `embedding-strategies`
- `clarity-gate`

#### Research Expansion

- `deep-research`
- `competitive-landscape`
- `market-sizing-analysis`

#### Automation and Systems Expansion

- `workflow-automation`
- `supabase-automation`

#### Future Execution Layer

- `canva-automation`
- `linkedin-automation`
- `instagram-automation`
- `twitter-automation`
- `youtube-automation`
- `whatsapp-automation`
- `hubspot-automation`
- `close-automation`
- `googlesheets-automation`

### Governance Default

Whenever one of the external skills above is introduced into a live workflow,
the final strategic judgement must still remain with Torq-native modules,
especially:

- `torq-market-intelligence`
- `torq-commercial-diagnostic`
- `torq-brand-foundation`
- `torq-offer-engineering`
- `torq-storytelling`
- `torq-editorial-copy`
- `torq-approval-governance`

## V1 Boundaries

Included in v1:

- internal operation
- memory
- research
- diagnosis
- strategy
- offer and copy architecture
- content planning
- approval governance
- queue preparation
- measurement loop

Explicitly outside v1:

- autonomous publishing without review
- client-facing product area
- trend-based content generation as a primary use case
- Canva as a strategic brain
- social media management as the main product of Torq
