---
type: architecture
source: 'Torq Internal'
date: 2026-04-07
tags: [torq-os, frontend, jarvis, stitch, figma, architecture]
relevance: high
---

# Torq Frontend Implementation Architecture

## Purpose

Definir a arquitetura de implementacao do frontend do Torq antes de plugar
Stitch, Figma ou uma rodada mais pesada de execucao visual.

## Executive Summary

O frontend do Torq deve ser construido como um sistema visual governado por
contexto, workflow e bloqueios operacionais.

Ele nao pode ser tratado como:

- chatbot comum
- dashboard generico
- conjunto de telas bonitas sem lastro no runtime

Ele deve ser tratado como:

- cockpit operacional do Jarvis
- shell principal do Torq Central
- camada visual do runtime `Supabase + Jarvis API + OpenClaude`

## Core Build Strategy

### Phase 1. Architecture

Responsavel:

- `torq-frontend-architect`

Objetivo:

- transformar Stitch, imagens e frontend atual em blueprint tecnico

Entregas:

- layout global
- design tokens
- hierarchy map
- component map
- state map
- implementation order

### Phase 2. Build

Responsavel:

- `torq-frontend-builder`

Objetivo:

- codificar o shell e as telas com fidelidade ao blueprint

Entregas:

- login
- shell principal
- console Jarvis
- inspector operacional
- estados de loading, blocked e approval

### Phase 3. QA

Responsavel:

- `torq-frontend-qa`

Objetivo:

- validar fidelidade visual e clareza operacional

Entregas:

- findings priorizados
- riscos residuais
- checklist de refinamento

## Design Source of Truth

Prioridade de referencia:

1. prompt mestre do Stitch
2. imagens exportadas e screenshots aprovadas
3. Figma, quando o design entrar em canvas estruturado
4. frontend atual do Torq Central

Regra:

Se essas fontes divergirem, a prioridade e preservar o cockpit operacional do
Jarvis com clareza, governanca e hierarquia.

## Product Surfaces

### 1. Login

Papel:

- entrada premium e segura
- sensacao de sistema interno de alto nivel

### 2. Shell Principal

Papel:

- navegacao, contexto, identidade do sistema

### 3. Jarvis Console

Papel:

- area central de comando

Estrutura:

- coluna esquerda: sessoes e navegacao
- coluna central: transcript e composer
- coluna direita: inspector operacional

### 4. Operational States

Papel:

- mostrar restricao, loading, approval e proximos passos

## Component System

Componentes obrigatorios:

- `AppShell`
- `SessionHistoryRail`
- `JarvisTranscript`
- `CommandComposer`
- `MicrophoneTrigger`
- `InspectorPanel`
- `RouteChips`
- `RiskBadge`
- `BlockerCard`
- `ApprovalCard`
- `ActionProposalCard`
- `ConfirmationModal`
- `LoadingState`
- `BlockedState`

## Data Binding Rules

O frontend deve refletir o contrato do Jarvis:

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
- `requested_mutations`

## Stitch and Figma Integration Plan

### Current reality in this environment

- Figma MCP esta disponivel neste ambiente
- Stitch MCP nao esta exposto como conector disponivel nesta sessao

### Practical plan

1. Usar o Stitch como fonte visual externa e humana de conceito.
2. Exportar imagens, HTML ou referencias visuais aprovadas.
3. Estruturar o frontend com as skills do Torq.
4. Quando necessario, levar os frames principais para Figma via MCP para:
   - organizacao visual
   - refinamento
   - mapeamento para componentes
5. Implementar no codigo com fidelidade controlada.

## Token and Secret Handling

- Nao persistir tokens crus de Stitch em arquivos do repositorio.
- Nao colocar `sb_secret_*` em variaveis `VITE_*`.
- Guardar credenciais server-only apenas no backend.

## Recommended Build Order

1. congelar referencias visuais
2. fechar blueprint com `torq-frontend-architect`
3. implementar login e shell
4. implementar console Jarvis
5. implementar estados criticos
6. revisar com `torq-frontend-qa`
7. so depois abrir rodada Figma de refinamento

## Final Recommendation

Construir o frontend como sistema em tres agentes:

- architect
- builder
- qa

Essa separacao aumenta fidelidade, reduz improviso e protege a qualidade final.
