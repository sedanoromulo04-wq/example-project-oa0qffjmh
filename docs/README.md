# Docs - Base de Conhecimento Torq

Este diretorio e a memoria viva do ecossistema Torq. Toda a inteligencia que
alimenta os agentes e skills vem daqui.

## Estrutura

```text
docs/
|-- vision_and_strategy/     -> Visao, ICP, valores e frameworks fundacionais
|-- voice/                   -> Tom de voz: transcricoes, calibracoes, exemplos reais
|   |-- transcripts/         -> Conversas brutas transcritas (Yan, Romulo, clientes)
|   `-- calibration/         -> Regras extraidas das transcricoes + exemplos aprovados
|-- knowledge-base/          -> Base RAG: documentos de referencia para consulta
|   |-- methodologies/       -> Metodologias proprietarias Torq e operating model do OS
|   |-- market/              -> Pesquisas, benchmarks, dados de mercado
|   `-- client-cases/        -> Historico anonimizado de casos de sucesso
|-- torq-os/                 -> Esboco operacional do sistema: ideia, backlog, execucao e orquestracao
|-- clients/                 -> Briefings e contexto por cliente ativo
`-- setup/                   -> Configuracoes, seeds e onboarding do sistema
```

## Regras de Alimentacao Diaria

### Para transcricoes de voz (`voice/transcripts/`)
- Nome do arquivo: `YYYY-MM-DD_[pessoa]_[tema].md`
- Exemplo: `2026-04-06_yan-romulo_posicionamento-torq.md`
- Conteudo: transcricao bruta + data + participantes

### Para a base RAG (`knowledge-base/`)
- Qualquer formato: `.md`, `.pdf`, `.txt`
- Prefira Markdown para melhor indexacao
- Adicione metadados no topo do arquivo

### Para clientes (`clients/`)
- Um subdiretorio por cliente
- Referenciar o briefing ativo

## Template de Metadados

```yaml
---
type: methodology | research | case-study | reference
source: "Origem do documento"
date: YYYY-MM-DD
tags: [tag1, tag2]
relevance: high | medium | low
---
```

## Artefatos estruturais novos

- `knowledge-base/methodologies/2026-04-06_methodology_torq-os-operating-model.md`
- `knowledge-base/methodologies/2026-04-06_methodology_torq-os-job-contracts.md`
- `knowledge-base/methodologies/2026-04-06_methodology_torq-os-external-skill-adoption.md`
- `knowledge-base/methodologies/2026-04-07_methodology_torq-os-client-operation-launch.md`
- `torq-os/README.md`
- `setup/torq-central-v1-categories.json`
- `setup/torq-central-v1-category-seed.sql`
