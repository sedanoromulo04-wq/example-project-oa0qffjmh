---
type: audit
source: 'Torq Internal + Stitch MCP'
date: 2026-04-08
tags: [stitch, jarvis, frontend, figma, audit]
relevance: high
---

# Stitch Jarvis Screen Audit

## 1. Fonte de Verdade Visual

### Origem principal

- Projeto Stitch: `projects/2609524893764998424`
- Titulo: `Jarvis Executive Console`
- Origem: `STITCH`
- Device target: `DESKTOP`

### Artefatos usados

- `docs/torq-os/04-design-later/stitch-project-2609524893764998424/project.json`
- `docs/torq-os/04-design-later/stitch-project-2609524893764998424/screens.json`
- HTML exportado das telas principais do Stitch
- `docs/torq-os/03-orchestration/jarvis-frontend-spec.md`
- `docs/torq-os/03-orchestration/jarvis-api-contract.md`
- `docs/torq-os/03-orchestration/torq-agent-context-runtime.md`
- frontend atual em `Antigravity Skill/Antigravity skills/torq-central/frontend`

### Conflitos detectados

- O Stitch usa `Manrope + Inter`, enquanto o frontend atual usa apenas `Inter`.
- O Stitch trabalha com grafite, navy profundo e mudancas de superficie sem
  borda forte; o frontend atual ainda carrega `accent` roxo e bordas mais
  marcadas.
- O Stitch exporta HTML com Tailwind CDN, mas o projeto real usa React + CSS
  classico. O HTML do Stitch deve ser tratado como referencia visual, nao como
  base direta de implementacao.

## 2. Design Tokens Extraidos do Stitch

### Tipografia

- headline: `Manrope`
- body: `Inter`
- label: `Inter`
- regra: headlines editoriais com tracking apertado e texto operacional limpo

### Cores principais

- `background`: `#0e0e0e`
- `surface-container-low`: `#131313`
- `surface-container`: `#191a1a`
- `surface-container-high`: `#1f2020`
- `surface-container-highest`: `#252626`
- `primary`: `#bfc5e4`
- `primary-container`: `#3f465f`
- `on-surface`: `#e7e5e4`
- `on-surface-variant`: `#acabaa`
- `outline-variant`: `#484848`
- erro: `#ec7c8a` com container `#7f2737`

### Regras visuais centrais

- No-line rule: grandes secoes separadas por mudanca de superficie, nao por
  borda forte.
- Glass and gradient rule: modais e floating layers com vidro escuro e blur.
- CTA primario com gradiente metalico entre `primary` e `primary-container`.
- Elevacao por camada tonal, nao por sombra pesada de app generico.
- Raios pequenos: `sm` a `md`; evitar cards excessivamente arredondados.

## 3. Telas Canonicas para o Torq

O Stitch tem variacoes duplicadas. Para o produto real, o frontend deve fechar
em 7 superficies canonicas.

### 1. Login premium

- telas Stitch: `Operator Login`, `Login: Torq Jarvis Access`,
  `Login - Authorized Access Only`
- alvo no produto: `/login`
- papel: acesso interno de alta confianca para operador fundador
- dados exigidos: autenticacao Supabase, erro de login, loading state
- codigo atual: `src/pages/Login.tsx`, `src/pages/Login.css`
- acao recomendada: refatorar visualmente, preservar logica existente

### 2. Empty state do cockpit

- telas Stitch: `Ready for Command (Empty State)`,
  `Empty Console - Awaiting Command`, `Empty State: Ready for Command`
- alvo no produto: `/jarvis` sem sessao ou sem mensagens
- papel: ensinar postura operacional, exemplos de comando, modo do sistema
- dados exigidos:
  - sessoes vazias
  - exemplos de prompts
  - estado de modulo ainda nao selecionado
- codigo atual: vazio simples dentro de `JarvisConsole.tsx`
- acao recomendada: redesenhar do zero como hero operacional

### 3. Main console

- telas Stitch: `Main Console: Operational Flow`,
  `Main Console - Strategic Orchestration`, `Active Mission Control`
- alvo no produto: `/jarvis`
- papel: cockpit principal
- estrutura:
  - esquerda: historico de sessoes e atalhos
  - centro: transcript, summaries, composer
  - direita: inspector de contexto, rota, risco, approvals e blockers
- dados exigidos:
  - `session`
  - `new_messages`
  - `context_summary`
  - `response`
  - `runtime`
- codigo atual: `src/pages/JarvisConsole.tsx`, `src/pages/JarvisConsole.css`
- acao recomendada: refatorar pesado preservando o binding do backend

### 4. Thinking state

- telas Stitch: `Thinking State: AI Orchestration`,
  `Thinking State - Orchestration in Progress`,
  `Neural Orchestration Flow`
- alvo no produto: estado de envio e espera do `/jarvis`
- papel: mostrar pipeline real do runtime, nao spinner generico
- dados exigidos:
  - etapa atual do runtime
  - rota principal
  - especialista acionado
  - contexto sendo montado
- codigo atual: apenas botao `Orquestrando...`
- acao recomendada: criar componente novo `OrchestrationStateCard`

### 5. Blocked state

- telas Stitch: `System Blocked (Governance)`,
  `Blocked State - Governance Dependency`,
  `Blocked State: Governance Notice`
- alvo no produto: retorno com `blocked_actions` ou dependencia ausente
- papel: explicar por que o sistema nao executa e qual o proximo passo seguro
- dados exigidos:
  - `blocked_actions`
  - `missing_upstream_assets`
  - `approval_risk`
  - `next_safe_action`
- codigo atual: inexistente como estado proprio
- acao recomendada: criar `BlockedStateCard` e `DependencyList`

### 6. Approval / confirmation

- telas Stitch: `Action Approval (Governance)`,
  `Action Approval: Founder Consent`,
  `Confirmation - Proposed Action Approval`
- alvo no produto: confirmacao antes de `create_record`, `update_record`,
  `queue_action` ou `publish_action`
- papel: materializar a governanca do runtime
- dados exigidos:
  - `requested_mutations`
  - `required_approvals`
  - records afetados
  - justificativa
- codigo atual: lista passiva de acoes propostas
- acao recomendada: criar `ConfirmationModal` e `ApprovalCard`

### 7. Voice capture

- telas Stitch: `Voice Command Capture`, `Voice Capture: Command Review`
- alvo no produto: fase 4 do roadmap
- papel: capturar voz, transcrever, revisar e confirmar antes de enviar
- dados exigidos:
  - estado do microfone
  - transcript intermediario
  - confirmacao do usuario
- codigo atual: inexistente
- acao recomendada: documentar e reservar espaco visual, nao implementar agora

## 4. Mapa Frontend -> Backend

### Campos estruturados que precisam aparecer na UI

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
- `required_approvals`
- `evidence_refs`

### Leitura operacional obrigatoria

O cockpit nao pode mostrar apenas resposta em texto. Cada resposta relevante
deve aparecer com:

- modulo atual
- etapa atual
- risco
- rota
- blockers
- contexto carregado
- proximo passo seguro

## 5. Componentes Obrigatorios

- `JarvisAppShell`
- `SessionHistoryRail`
- `SessionHistoryCard`
- `JarvisHeroEmptyState`
- `JarvisTranscript`
- `TranscriptMessageCard`
- `CommandComposer`
- `OperationalInspector`
- `RouteChipGroup`
- `RiskBadge`
- `ContextMetricsCard`
- `BlockerCard`
- `DependencyList`
- `ActionProposalCard`
- `ApprovalSummaryCard`
- `ConfirmationModal`
- `OrchestrationStateCard`
- `VoiceCapturePanel`

## 6. O que Reaproveitar, Refatorar e Criar do Zero

### Reaproveitar

- auth flow de `Login.tsx`
- chamadas de API em `src/lib/jarvisApi.ts`
- carregamento de sessoes e selecao atual em `JarvisConsole.tsx`
- `AuthContext.tsx`

### Refatorar

- `src/index.css`: promover novos tokens do Stitch e remover dependencia visual
  do roxo atual
- `src/pages/Login.css`: trocar linguagem visual por quiet luxury operacional
- `src/pages/JarvisConsole.css`: reestruturar superficies, tipografia, ritmo e
  estados
- `src/pages/JarvisConsole.tsx`: separar em subcomponentes menores

### Criar do zero

- componentes de approval
- componentes de blocked state
- thinking/orchestration timeline
- voice capture state
- modal de confirmacao de mutacao

## 7. Implicacoes para Figma

### O que esta pronto

- o Stitch ja entregou a linguagem visual e as telas-alvo
- o projeto tem um design system textual forte dentro de `project.json`
- a conta Figma desta sessao esta autenticada

### O que falta

- nesta sessao, o acesso Figma disponivel e de `view`
- nao ha ferramenta de escrita direta em canvas exposta aqui
- portanto, a integracao com Figma nesta etapa e de alinhamento de design
  system e documentacao de implementacao, nao de empurrar frames automaticamente

## 8. Veredito

O Stitch esta bom o bastante para virar a fonte visual principal do Jarvis. O
frontend atual nao precisa ser refeito do zero, mas precisa de uma refatoracao
estrutural forte para subir ao nivel do cockpit desenhado no Stitch sem quebrar
o contrato do backend.
