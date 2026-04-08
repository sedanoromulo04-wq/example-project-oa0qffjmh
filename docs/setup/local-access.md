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

Para encerrar:

```powershell
.\stop-torq-local.cmd
```

## O que o launcher faz

- abre uma janela para o backend Jarvis
- abre uma janela para o frontend Vite

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
