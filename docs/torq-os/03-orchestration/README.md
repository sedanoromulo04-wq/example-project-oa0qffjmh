# Torq OS - Orchestration

Este diretorio guarda o rascunho operacional do Torq OS.

## Papel desta pasta

Aqui a gente documenta como o sistema se movimenta no estado atual do repo:
o que precisa ser feito, o que ja esta sendo construido, qual e a ideia
principal e como os agentes devem se coordenar entre memoria, pesquisa,
estrategia, conversao, conteudo e distribuicao.

## O que entra aqui

- esboco da orquestracao do sistema
- fluxo entre os modulos do Torq OS
- regras de roteamento entre agentes
- ordem correta das operacoes
- pontos de aprovacao humana
- limites do V1

## O que nao entra aqui ainda

- design de interface
- identidade visual final
- refinamento estetico
- automacao de publicacao sem revisao
- features avancadas que dependem de mais maturidade

## Ideia principal

Torq OS nao e um gerador de conteudo solto. Ele e um backoffice de operacao
intelectual e comercial. A ordem certa e:

1. preservar memoria
2. entender o mercado
3. definir estrategia
4. estruturar conversao
5. derivar conteudo
6. preparar distribuicao

Se uma etapa anterior estiver fraca, a etapa seguinte deve parar e sinalizar o
bloqueio em vez de inventar resposta.

## Base de verdade

Este esboco conversa diretamente com:

- `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-operating-model.md`
- `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-job-contracts.md`
- `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-external-skill-adoption.md`
- `docs/knowledge-base/methodologies/2026-04-07_methodology_torq-os-client-operation-launch.md`
- `docs/torq-os/00-main-idea/README.md`
- `docs/torq-os/01-to-do/README.md`
- `docs/torq-os/02-in-progress/README.md`
- `docs/torq-os/99-roadmap-later/README.md`

## Agentes que ja entram como base

- `Vision Chief`
- `COO Orchestrator`
- `CMO Architect`
- `CTO Architect`
- `CAIO Architect`
- `CIO Engineer`
- `Copy Chief`
- `Story Chief`
- `Hormozi Chief`

## Skills Torq que sustentam o fluxo

- `torq-brand-foundation`
- `torq-offer-engineering`
- `torq-storytelling`
- `torq-editorial-copy`
- `torq-c-level-strategy`
- `torq-market-intelligence`
- `torq-commercial-diagnostic`
- `torq-content-planning`
- `torq-approval-governance`
- `torq-distribution-ops`

## Skills externas ja adotadas

Estas quatro ja entram como infraestrutura de apoio:

- `agent-memory-systems`
- `context-manager`
- `rag-engineer`
- `n8n-mcp-tools-expert`

## O que esta sendo feito agora

- organizar a operacao em modulos claros
- definir o fluxo entre artefatos
- explicar o papel de cada agente
- registrar os bloqueios e checkpoints de aprovacao
- deixar design e refinamento visual para depois

## Como usar esta pasta

- leia primeiro a ideia principal
- depois siga o fluxo operacional
- por ultimo consulte o roteamento por agente
- em operacoes reais de cliente, comece pelo `client-operation-brief`
- sempre preserve a separacao entre fato, inferencia e hipotese quando houver
  interpretacao
