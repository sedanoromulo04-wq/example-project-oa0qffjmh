---
type: setup
source: "Torq Internal"
date: 2026-04-08
tags: [local, frontend, backend, jarvis]
relevance: high
---

# Torq Local Access

## Objetivo

Subir o sistema Jarvis localmente no Windows com um unico launcher.

## Launcher

No root do repositorio:

```powershell
.\start-torq-local.cmd
```

Para modo FULL com `OpenClaude` local:

```powershell
.\start-torq-local-full.cmd
```

Para modo SAFE com fallback heuristico:

```powershell
.\start-torq-local-safe.cmd
```

Para encerrar:

```powershell
.\stop-torq-local.cmd
```

## O que o launcher faz

- abre uma janela para o backend Jarvis
- abre uma janela para o frontend Vite
- no modo `full`, o backend roda com `JARVIS_RUNTIME_MODE=cli`
- no modo `safe`, o backend roda com `JARVIS_RUNTIME_MODE=heuristic`

## Enderecos locais

- backend health: `http://127.0.0.1:8787/api/health`
- frontend: `http://127.0.0.1:5173/jarvis`

## Pre-requisitos

- `node` e `npm` instalados
- `.env.local` ja preenchido em:
  - `Antigravity Skill/Antigravity skills/torq-central/backend/.env.local`
  - `Antigravity Skill/Antigravity skills/torq-central/frontend/.env.local`

## Observacao

O backend usa `npm start`.
O frontend usa `npm run dev -- --host 127.0.0.1`.
Para detalhes do modo full local, veja `docs/setup/local-openclaude-runtime.md`.
