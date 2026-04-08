# Torq Jarvis Backend

Backend wrapper between the Torq Central frontend, Supabase runtime tables, and
the `OpenClaude` orchestration engine.

## Endpoints

- `POST /api/auth/login`
- `GET /api/health`
- `GET /api/jarvis/sessions`
- `GET /api/jarvis/sessions/:id`
- `POST /api/jarvis/message`
- `POST /api/jarvis/sessions/:id/actions/review`

## Environment

Copy `.env.example` and provide:

- `SUPABASE_DB_URL`
- `SUPABASE_PROJECT_URL`
- `SUPABASE_SECRET_KEY`
- `JARVIS_PORT`
- `JARVIS_ALLOWED_ORIGINS`
- `JARVIS_ALLOW_INSECURE_DEV_AUTH`
- `JARVIS_RUNTIME_MODE`
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

- In production, the Jarvis API now expects `Authorization: Bearer <supabase access token>`.
- In local development, `backend auth` can still be used behind `JARVIS_ALLOW_INSECURE_DEV_AUTH=true`.
- `SUPABASE_SECRET_KEY` is server-only. Do not expose it in any `VITE_*` variable.
- `JARVIS_RUNTIME_MODE=heuristic` is the safe fallback for Vercel or any environment
  where the `OpenClaude` CLI binary is not available.
- Storage bucket policies still need a privileged Supabase path outside the
  `postgres` role used for schema migrations.
- `backend auth` remains a fallback path, but production deploys should use the
  Supabase publishable key in the frontend and the server-only secret only in the API.
