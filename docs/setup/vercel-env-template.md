---
type: setup
source: "Torq Internal"
date: 2026-04-08
tags: [vercel, env, jarvis]
relevance: high
---

# Vercel Env Template

Use estas variaveis no projeto da Vercel.

## Frontend

```text
VITE_SUPABASE_URL=https://hstavzaefqmofxtraytb.supabase.co
VITE_SUPABASE_ANON_KEY=<sua publishable key do Supabase>
VITE_AUTH_MODE=supabase
VITE_APP_MODE=jarvis
VITE_JARVIS_API_URL=
```

## Backend / API

```text
SUPABASE_DB_URL=<sua connection string postgres do Supabase>
SUPABASE_PROJECT_URL=https://hstavzaefqmofxtraytb.supabase.co
SUPABASE_SECRET_KEY=<sua sb_secret_... server-only>
JARVIS_ALLOWED_ORIGINS=https://<seu-projeto>.vercel.app
JARVIS_RUNTIME_MODE=heuristic
PG_FAMILY=4
PG_CONNECTION_TIMEOUT_MS=15000
OPENCLAUDE_AGENT=torq-orchestrator
OPENCLAUDE_MODEL=codexplan
```

## Notas

- deixe `VITE_JARVIS_API_URL` vazio para usar a API no mesmo dominio
- nao exponha `SUPABASE_SECRET_KEY` em nenhuma variavel `VITE_*`
- em Vercel, o valor recomendado de `JARVIS_RUNTIME_MODE` e `heuristic`
