---
type: implementation-plan
source: 'Torq Internal'
date: 2026-04-08
tags: [torq, frontend, implementation, stitch, figma, jarvis]
relevance: high
---

# Torq Frontend Implementation Plan v2

## Executive Summary

O frontend sera construido com tres skills especializadas:

- `torq-frontend-architect`
- `torq-frontend-builder`
- `torq-frontend-qa`

Elas vao operar sobre uma base fixa:

- Stitch como fonte visual principal
- Figma como camada de organizacao quando houver canvas editavel
- frontend atual do `torq-central` como base tecnica
- Jarvis API + Supabase + OpenClaude como contrato operacional

## 1. Fonte de Verdade Visual

### Origem principal

- Stitch project `Jarvis Executive Console`

### Artefatos usados

- screenshots das telas
- HTML exportado das telas
- `project.json` com design system textual
- audit em `stitch-jarvis-screen-audit.md`

### Conflitos

- HTML de referencia usa Tailwind, repo usa CSS classico
- Figma nesta sessao esta autenticado, mas sem fluxo de escrita em canvas
- frontend atual ainda nao expressa blocked/approval/thinking como superficies
  de alto nivel

## 2. Estrutura do Produto

### Telas principais

1. `Login`
2. `Jarvis Empty`
3. `Jarvis Console`
4. `Thinking State`
5. `Blocked State`
6. `Approval State`
7. `Voice Capture`

### Fluxo entre telas

1. operador autentica
2. entra no shell do Torq
3. abre console Jarvis
4. inicia sessao
5. acompanha classificacao e orquestracao
6. recebe resposta, bloqueio ou proposta de mutacao
7. confirma ou cancela se houver mutacao

### Papel de cada tela

- login: seguranca e postura premium
- empty: onboarding operacional
- console: cockpit principal
- thinking: transparenciar raciocinio operacional
- blocked: ensinar governanca
- approval: proteger mutacoes
- voice: capturar entrada futura sem risco de misfire

## 3. Layout System

### Estrutura global

- shell premium escuro com hierarquia de superficies
- pagina Jarvis em tres colunas no desktop
- colapso para duas colunas em tablet
- pilha unica em mobile

### Grid do cockpit

- esquerda: `260-300px`
- centro: area flexivel principal
- direita: `320-360px`

### Responsividade

- o inspector vira grid horizontal em tablet
- composer e transcript continuam centrais
- historico pode colapsar em drawer em telas menores

## 4. Design Tokens

### Cores

- substituir roxo atual como cor dominante
- promover tokens Stitch para `index.css`
- manter cores de erro, sucesso e warning coerentes com governanca

### Tipografia

- adicionar `Manrope` para headlines e `Inter` para corpo
- usar `Manrope` em titulos grandes e cards estrategicos
- usar `Inter` em corpo, labels e dados operacionais

### Espacamento e superficie

- ritmo amplo entre secoes principais
- cards separados por camada tonal, nao por grade de linhas
- blur apenas em overlays e modais

### Motion

- sem bounce
- transicoes lentas e pesadas
- loading deve parecer pipeline de orquestracao, nao spinner genérico

## 5. Componentes Obrigatorios

### Shell

- `JarvisAppShell`
- `SessionHistoryRail`
- `OperationalInspector`

### Conversa e comando

- `JarvisHeroEmptyState`
- `JarvisTranscript`
- `TranscriptMessageCard`
- `CommandComposer`
- `VoiceTrigger`

### Governanca

- `RouteChipGroup`
- `RiskBadge`
- `BlockerCard`
- `DependencyList`
- `ActionProposalCard`
- `ApprovalSummaryCard`
- `ConfirmationModal`

### Runtime

- `OrchestrationStateCard`
- `ContextMetricsCard`

## 6. Estados Criticos

### Empty

- mostrar exemplos de comandos e promessa do sistema

### Loading

- mostrar `classify -> assemble context -> route specialist -> prepare answer`

### Blocked

- explicitar dependencia ausente e proximo passo seguro

### Approval

- listar records afetados, justificativa e impacto

### Voice

- waveform, transcript e confirmacao antes do envio

### Error

- mensagem clara, sem colapsar a pagina

## 7. Plano de Implementacao

### Fase A. Architect

Responsavel:

- `torq-frontend-architect`

Entregas:

- auditoria Stitch -> runtime
- mapa de componentes
- mapa de estados
- tokens finais

Status atual:

- praticamente concluido com os docs desta pasta

### Fase B. Builder sprint 1

Responsavel:

- `torq-frontend-builder`

Escopo:

- atualizar tokens globais
- refatorar `Login`
- criar shell premium do Jarvis
- reestruturar `JarvisConsole` em subcomponentes

### Fase C. Builder sprint 2

Escopo:

- thinking state
- blocked state
- approval state
- action proposal cards

### Fase D. Builder sprint 3

Escopo:

- voice surface visual
- refinamento mobile
- polish tipografico e motion

### Fase E. QA

Responsavel:

- `torq-frontend-qa`

Checklist:

- fidelidade ao Stitch
- aderencia ao contrato Jarvis
- legibilidade
- responsividade
- nao parecer dashboard generico

## 8. Ordem Tecnica de Arquivos

### Atualizar primeiro

- `frontend/src/index.css`
- `frontend/src/pages/Login.tsx`
- `frontend/src/pages/Login.css`
- `frontend/src/pages/JarvisConsole.tsx`
- `frontend/src/pages/JarvisConsole.css`

### Criar em seguida

- `frontend/src/components/jarvis/*`

### Preservar

- `frontend/src/lib/jarvisApi.ts`
- `frontend/src/contexts/AuthContext.tsx`

## 9. Ponte Stitch -> Figma -> Code

### Stitch

- fonte visual principal aprovada

### Figma

- nesta sessao, usado para regras e alinhamento de design system
- a importacao/push automatico para canvas depende de permissao e ferramenta de
  escrita nao expostas aqui

### Code

- implementacao segue o trio architect -> builder -> qa

## 10. Regra Final

Nenhuma tela deve ser implementada apenas porque ficou bonita no Stitch. Para
entrar no codigo, ela precisa:

- representar um estado real do runtime
- expor os dados certos do backend
- respeitar governanca e aprovacao
- caber no sistema de componentes do `torq-central`
