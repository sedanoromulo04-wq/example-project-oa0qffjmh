# Torq Jarvis Backend

Backend wrapper between the Torq Central frontend, Supabase runtime tables, and
the `OpenClaude` orchestration engine.

## Endpoints

- `POST /api/auth/login`
- `GET /api/health`
- `GET /api/jarvis/sessions?user_id=<uuid>`
- `GET /api/jarvis/sessions/:id?user_id=<uuid>`
- `POST /api/jarvis/message`

## Environment

Copy `.env.example` and provide:

- `SUPABASE_DB_URL`
- `SUPABASE_PROJECT_URL`
- `SUPABASE_SECRET_KEY`
- `JARVIS_PORT`
- `JARVIS_ALLOWED_ORIGINS`
- `OPENCLAUDE_BIN`
- `OPENCLAUDE_PROVIDER`
- `OPENCLAUDE_MODEL`
- `OPENCLAUDE_AGENT`

## Run

The backend auto-loads `.env.local` and `.env` if they exist.

```powershell
node .\src\server.js
```

## Current limits

- In `backend auth` mode, the login form authenticates directly against
  `auth.users` and resolves the operator profile from the Torq runtime.
- `SUPABASE_SECRET_KEY` is server-only. Do not expose it in any `VITE_*` variable.
- Storage bucket policies still need a privileged Supabase path outside the
  `postgres` role used for schema migrations.
- `backend auth` remains available as a fallback path, but the frontend can now
  authenticate directly with the correct Supabase publishable key.
