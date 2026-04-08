---
type: contract
source: "Torq Internal"
date: 2026-04-07
tags: [torq-os, jarvis, api, supabase, openclaude]
relevance: high
---

# Jarvis API Contract v1

## Purpose

Document the wrapper layer that now sits between the Torq Central frontend,
Supabase, and OpenClaude.

## Runtime shape

```text
Torq Central frontend
  -> Jarvis API wrapper
  -> Supabase context assembly
  -> OpenClaude orchestration
  -> Supabase persistence + audit
```

## Endpoints

### `GET /api/health`

Returns service status, current OpenClaude runtime config, and database time.

### `POST /api/auth/login`

Accepts:

```json
{
  "email": "operator@example.com",
  "password": "secret"
}
```

Returns the Torq operator profile resolved from `auth.users` plus
`public.profiles`.

### `GET /api/jarvis/sessions?user_id=<uuid>`

Returns the latest Jarvis sessions for the authenticated operator.

### `GET /api/jarvis/sessions/:id?user_id=<uuid>`

Returns one session plus transcript and proposed actions.

### `POST /api/jarvis/message`

Accepts the frontend request envelope and returns:

- `session`
- `new_messages`
- `context_summary`
- `response`
- `runtime`

## Request envelope

```json
{
  "session_id": "uuid-or-null",
  "user_id": "uuid",
  "input_mode": "text",
  "message": "What should happen next for this client?",
  "active_client_id": "uuid-or-null",
  "active_doc_id": "uuid-or-null",
  "ui_context": {
    "route": "/jarvis"
  }
}
```

## Structured response

The API normalizes OpenClaude output into:

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
- `answer`
- `confidence`
- `requested_mutations`
- `required_approvals`
- `evidence_refs`

## Persistence contract

Each successful Jarvis turn writes to:

- `jarvis_sessions`
- `jarvis_messages`
- `agent_context_packs`
- `agent_runs`
- `jarvis_actions`
- `activity_log`

## Current operational note

The runtime is now live, but it still depends on a valid Supabase Auth operator.

That means:

1. the operator must exist in `auth.users`
2. the operator must have a linked row in `public.profiles`
3. the operator must belong to a workspace

To support this, a bootstrap SQL helper now exists in the Supabase migrations.

The backend auth wrapper still exists as a fallback mode, but the frontend can
now authenticate directly against the Supabase project with the correct
publishable key.
