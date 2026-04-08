# Skill Creator / Torq OS

Este repositorio e a base operacional do Torq OS e do monorepo de skills.

## O que este sistema contem

- `skills/`: skills de producao e seus assets, evals, referencias e scripts
- `agents/`: squads e papeis especializados usados no roteamento do sistema
- `docs/`: documentacao operacional, setup, conhecimento interno e arquitetura
- `Antigravity Skill/`: biblioteca externa agregada para comparacao, adocao e reaproveitamento

## Fontes de verdade

Leia nesta ordem antes de propor mudancas estruturais:

1. `README.md`
2. `docs/torq-os/README.md`
3. `docs/torq-os/03-orchestration/agent-routing.md`
4. `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-external-skill-adoption.md`

## Regras do sistema

- Memoria antes de volume
- Pesquisa antes de opiniao
- Estrategia antes de design
- Conversao antes de conteudo
- Aprovacao humana antes de automacao e distribuicao

## Como trabalhar aqui

- Nao trate skills externas como fonte estrategica final; elas sao aceleradores
- Preserve o filtro Torq-native nas decisoes de negocio, estrategia e aprovacao
- Prefira mudancas pequenas, reversiveis e explicitamente documentadas
- Antes de adicionar uma nova camada de automacao, verificar encaixe com `Memory OS`, `Research OS`, `Strategy OS`, `Conversion OS`, `Content OS` ou `Distribution OS`
- Se a mudanca afetar operacao ampla, documentar impacto em `docs/`

## Integracao com OpenClaude

- O launcher recomendado neste repo e `openclaude-torq.cmd`
- O backend inicial padrao e `codexplan` via auth ja existente no ambiente local
- Use o repo como raiz de trabalho ao iniciar a sessao para que este arquivo seja carregado
- Nao use modo `--bare` para trabalho normal, porque ele pula a descoberta automatica deste contexto
