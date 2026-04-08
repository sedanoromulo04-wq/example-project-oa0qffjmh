---
type: setup
source: 'Torq Internal'
date: 2026-04-08
tags: [vercel, deployment, jarvis, frontend, backend]
relevance: high
---

# Torq Jarvis on Vercel

## Deploy shape

- frontend build: `Antigravity Skill/Antigravity skills/torq-central/frontend`
- API runtime: root `/api/index.js`
- shared origin in production: frontend calls `/api/...`

## Required Vercel environment variables

- `SUPABASE_DB_URL`
- `SUPABASE_PROJECT_URL`
- `SUPABASE_SECRET_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_AUTH_MODE=supabase`
- `VITE_APP_MODE=jarvis`
- `VITE_JARVIS_API_URL=`

## Recommended runtime variables

- `JARVIS_ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app`
- `JARVIS_RUNTIME_MODE=heuristic`
- `OPENCLAUDE_AGENT=torq-orchestrator`
- `OPENCLAUDE_MODEL=codexplan`

## Copy/paste helper

Use `docs/setup/vercel-env-template.md` como base para preencher as variaveis do projeto.

## Notes

- In production, the browser should authenticate with Supabase and send the access token to the Jarvis API automatically.
- The API should never trust `user_id` coming from the browser when a Supabase bearer token is available.
- `JARVIS_RUNTIME_MODE=heuristic` keeps the cockpit operational on Vercel even if the `OpenClaude` CLI is not installed in the serverless runtime.
