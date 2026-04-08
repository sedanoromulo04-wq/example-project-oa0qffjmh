---
type: skill-stack
source: "Torq Internal"
date: 2026-04-07
tags: [torq-os, frontend, skills, jarvis, stitch, figma]
relevance: high
---

# Torq Frontend Skill Stack

## Purpose

Definir quais skills constroem o frontend do Torq e em qual ordem elas entram.

## Core Stack

### 1. `torq-frontend-architect`

Papel:

- transformar Stitch, imagens, frontend atual e contratos do Jarvis em blueprint
  tecnico

Inputs:

- prompt do Stitch
- screenshots aprovadas
- referencias em Figma, quando existirem
- frontend atual do Torq Central
- `jarvis-api-contract.md`
- `torq-agent-context-runtime.md`

Outputs:

- layout system
- component map
- state map
- design tokens
- ordem de implementacao

### 2. `torq-frontend-builder`

Papel:

- implementar a interface com fidelidade ao blueprint aprovado

Inputs:

- blueprint do architect
- imagens aprovadas
- codigo atual do frontend
- contratos de dados do backend

Outputs:

- telas
- componentes
- estados
- responsividade
- integracao com dados reais

### 3. `torq-frontend-qa`

Papel:

- revisar fidelity, clareza operacional, regressao visual e consistencia

Inputs:

- codigo implementado
- blueprint aprovado
- screenshots alvo
- estados operacionais esperados

Outputs:

- findings priorizados
- riscos residuais
- refinamentos necessarios

## Execution Order

1. congelar referencias visuais
2. executar `torq-frontend-architect`
3. aprovar blueprint
4. executar `torq-frontend-builder`
5. executar `torq-frontend-qa`
6. refinar o que o QA apontar

## Mandatory Rules

- Jarvis nao pode parecer chatbot generico.
- O cockpit precisa mostrar modulo, etapa, blockers, risco e proximo passo
  seguro.
- Figma e Stitch ajudam a forma visual, mas a governanca vem do Torq.
- Nenhuma implementacao deve esconder estado operacional importante.

## Stitch and Figma Position

- Stitch: fonte visual externa
- Figma: camada estruturada de organizacao e refinamento
- Codigo: output final governado pelo blueprint do Torq

## Final Recommendation

Nao usar um unico agente generico para frontend. O trio
`architect -> builder -> qa` produz mais qualidade, menos improviso e mais
fidelidade.
