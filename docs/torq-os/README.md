# Torq OS - System Sketch

Este diretorio concentra o rascunho operacional do Torq OS.

O objetivo aqui nao e desenhar interface nem discutir estetica cedo demais.
Esta pasta existe para organizar a base do sistema em uma ordem util:
ideia principal, o que precisa ser feito, o que esta sendo feito, como a
operacao sera orquestrada e o que fica para design depois.

## Estrutura

```text
docs/torq-os/
|-- 00-main-idea/         -> tese central, principios e definicao do sistema
|-- 01-to-do/             -> o que precisa ser feito agora
|-- 02-in-progress/       -> o que ja esta em construcao
|-- 03-orchestration/     -> fluxo operacional e roteamento dos agentes
|-- 04-design-later/      -> frente de design, propositalmente adiada
`-- 99-roadmap-later/     -> camadas futuras que nao entram na urgencia atual
```

## Ordem de leitura

1. ler a ideia principal
2. revisar o que precisa ser feito
3. entender o que ja esta em andamento
4. estudar a orquestracao do sistema
5. deixar design para depois

## Regras desta fase

- V1 e interno e com HITL forte
- memoria vem antes de volume
- pesquisa vem antes de opiniao
- estrategia vem antes de design
- conversao vem antes de conteudo
- nenhuma automacao deve atropelar aprovacao humana

## Fontes de verdade conectadas

- `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-operating-model.md`
- `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-job-contracts.md`
- `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-external-skill-adoption.md`
- `docs/torq-os/03-orchestration/jarvis-frontend-spec.md`
- `docs/torq-os/03-orchestration/jarvis-implementation-roadmap.md`
- `docs/torq-os/03-orchestration/jarvis-api-contract.md`
- `docs/torq-os/03-orchestration/torq-supabase-architecture.md`
- `docs/torq-os/03-orchestration/torq-agent-context-runtime.md`
- `docs/torq-os/04-design-later/torq-frontend-implementation-architecture.md`
- `docs/torq-os/04-design-later/torq-frontend-skill-stack.md`
- `docs/torq-os/04-design-later/stitch-figma-mcp-integration-plan.md`
- `docs/torq-os/04-design-later/google-stitch-jarvis-mega-prompt.md`
- `docs/setup/torq-supabase-schema-v1.sql`
- `docs/setup/torq-central-v1-categories.json`
