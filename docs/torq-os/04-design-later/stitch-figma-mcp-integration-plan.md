---
type: integration-plan
source: "Torq Internal"
date: 2026-04-07
tags: [stitch, figma, mcp, torq, frontend]
relevance: high
---

# Stitch and Figma MCP Integration Plan

## Objective

Preparar a ponte entre as referencias do Stitch, a organizacao em Figma e a
implementacao no frontend do Torq.

## Current Connector Status

### Figma

- Figma MCP disponivel neste ambiente
- conta autenticada: `sedanoromulo04@gmail.com`
- plano detectado: `starter`
- seat detectado: `view`

### Stitch

- Stitch MCP foi configurado no Codex local e validado com chamadas reais ao
  endpoint oficial
- o projeto `projects/2609524893764998424` foi lido com sucesso
- as telas e HTML exportados ja foram baixados para
  `docs/torq-os/04-design-later/stitch-project-2609524893764998424/`

## Safe Handling Rule

- Nao salvar token bruto de Stitch em arquivos rastreaveis do repo
- Nao assumir que URL do projeto substitui export estruturado

## Working Model

1. Stitch gera direcao visual e composicao
2. Export visual aprovado vira referencia
3. Figma organiza e refina os frames chave quando houver canvas editavel
4. Skills do Torq traduzem isso em arquitetura e codigo

## Expected Assets from Stitch

- screenshots das telas principais
- estados especiais
- variacoes de layout se existirem
- html exportado, se houver
- nome e papel de cada tela

## Figma MCP Role

Usar Figma MCP para:

- validar conta autenticada
- orientar regras de design system
- criar estrutura ou ler contexto de frames quando o design estiver em Figma e
  a sessao expuser escrita em canvas
- mapear componentes para codigo quando necessario

Limitacao atual:

- esta sessao nao expoe um fluxo de escrita direta em canvas
- portanto, a integracao Figma nesta etapa e de alinhamento estrutural, nao de
  sincronizacao automatica de tela

## Implementation Dependency

O time de codigo nao deve esperar MCP do Stitch para comecar.

Pode comecar assim:

1. Stitch project auditado
2. imagens e HTML aprovados
3. blueprint aprovado
4. implementacao

## Final Recommendation

Tratar Stitch como fonte visual externa e Figma como camada estruturada de
refino quando necessario. O codigo deve continuar ancorado no blueprint do Torq,
nao em dependencias opacas de ferramenta.
