---
type: setup
source: "Torq Internal"
date: 2026-04-08
tags: [local, openclaude, runtime, jarvis]
relevance: high
---

# Torq Jarvis Full Local Runtime

## Objetivo

Rodar o cockpit com o `OpenClaude` local de verdade, sem fallback heuristico.

## Pre-requisitos

- `openclaude.cmd` disponivel no `PATH`
- `openclaude.cmd --version` funcionando
- acesso do provider ja autenticado no ambiente local
- `.env.local` preenchido no backend e no frontend

## Launcher recomendado

No root do repositorio:

```powershell
.\start-torq-local-full.cmd
```

## Modos disponiveis

- `.\start-torq-local-full.cmd`
  Usa `JARVIS_RUNTIME_MODE=cli`
- `.\start-torq-local-safe.cmd`
  Usa `JARVIS_RUNTIME_MODE=heuristic`

## Como validar

- abrir `http://127.0.0.1:8787/api/health`
- confirmar `runtimeMode: "cli"`
- abrir `http://127.0.0.1:5173/jarvis`
- autenticar no frontend
- enviar uma pergunta simples ao Jarvis

## Observacoes

- o modo `cli` e o mais fiel para testar orquestracao real dos agentes
- o modo `heuristic` e o fallback seguro para quando o `OpenClaude` local nao estiver disponivel
