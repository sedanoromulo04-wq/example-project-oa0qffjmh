---
type: rag-index
source: "Torq Internal"
date: 2026-04-06
tags: [rag, knowledge-base, indice]
---

# Knowledge Base Torq - Indice RAG

Este e o indice central da base de dados para consulta via RAG. Atualize este
arquivo toda vez que adicionar um novo documento a base.

---

## Como Funciona

O sistema de RAG do Torq funciona em 4 camadas:

| Camada | Pasta | O que vai aqui |
|---|---|---|
| **Voz** | `docs/voice/` | Transcricoes, calibracao e exemplos de voz |
| **Visao** | `docs/vision_and_strategy/` | Fundamentos estrategicos permanentes |
| **Conhecimento** | `docs/knowledge-base/` | Metodologias, pesquisas e referencias |
| **Clientes** | `docs/clients/` | Contexto operacional por cliente |

---

## Indice de Documentos Ativos

### voice/calibration/
| Arquivo | Conteudo | Ultima atualizacao |
|---|---|---|
| `tom-de-voz-torq.md` | Guia mestre de calibracao de voz | 2026-04-06 |

### voice/transcripts/
| Arquivo | Participantes | Tema | Data |
|---|---|---|---|
| *(aguardando primeiras transcricoes)* | - | - | - |

### vision_and_strategy/
| Arquivo | Conteudo |
|---|---|
| `01_vision.md` | Manifesto de visao Torq |
| `02_icp_and_market.md` | ICP e mapeamento de mercado |
| `03_flg_framework.md` | Framework FLG |
| `04_core_values.md` | Valores fundamentais |

### knowledge-base/methodologies/
| Arquivo | Conteudo | Fonte |
|---|---|---|
| `2026-04-06_methodology_torq-os-operating-model.md` | Modelo operacional do Torq OS v1 | Torq Internal |
| `2026-04-06_methodology_torq-os-job-contracts.md` | Contratos canonicos de job e handoff | Torq Internal |
| `2026-04-06_methodology_torq-os-external-skill-adoption.md` | Politica de adocao de skills externas do Antigravity | Torq Internal |
| `2026-04-07_methodology_torq-os-client-operation-launch.md` | Blueprint de kickoff e estrutura da operacao de cliente | Torq Internal |

### knowledge-base/market/
| Arquivo | Conteudo | Fonte |
|---|---|---|
| *(aguardando documentos)* | - | - |

### knowledge-base/client-cases/
| Arquivo | Empresa | Setor | Resultado |
|---|---|---|---|
| *(aguardando casos)* | - | - | - |

---

## Protocolo de Adicao de Documentos

1. Adicionar o arquivo na pasta correta.
2. Usar o nome no formato `YYYY-MM-DD_[tipo]_[tema-curto].md`.
3. Incluir metadados no topo do arquivo:

```yaml
---
type: [methodology | research | case-study | reference | transcript]
source: "[Origem]"
date: YYYY-MM-DD
tags: [tag1, tag2]
relevance: high | medium | low
---
```

4. Atualizar este indice adicionando o arquivo na tabela correta.

---

## Documentos em Processamento

| Arquivo | Status | Responsavel |
|---|---|---|
| - | - | - |
