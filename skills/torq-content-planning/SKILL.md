---
name: torq-content-planning
description: >
  Planeja o sistema editorial da Torq a partir de tese, prova, oferta e
  narrativa aprovadas. Usar quando o pedido envolver "planejamento de conteudo",
  "calendario editorial", "series de conteudo", "repurpose", "cadencia por
  canal", "o que publicar nas proximas semanas" ou "como derivar conteudo da
  tese central". Nao use para pesquisar mercado do zero, inventar posicionamento,
  aprovar publicacao, desenhar no Canva sem contexto ou seguir trends como
  estrategia principal.
---

# Torq Content Planning

Construir um plano editorial disciplinado, subordinado a memoria, tese, prova e
oferta. Conteudo aqui e derivacao, nao improviso.

## Regra de Infraestrutura

- Assumir o Supabase como backend e system of record.
- Ler brand bundle, offer job, story job, copy job e metadados a partir de registros do Supabase ou objetos trazidos pela API.
- Tratar `assets/templates/content-plan.json` apenas como schema de referencia.
- Nao pressupor execucao local na maquina do usuario.

## Workflow

1. Ler o `brand-bundle`, `offer-job`, `story-job`, `copy-job` ou qualquer ativo estrategico ja aprovado vindo do Supabase, da API ou do front-end.
2. Confirmar que existe tese central, prova minima e CTA coerente antes de planejar.
3. Mapear os ativos aprovados que podem virar conteudo: tese, mecanismo, prova, objecoes, historias e casos.
4. Definir o papel de cada canal no sistema, sem assumir que todos os canais servem ao mesmo objetivo.
5. Organizar pilares, series, formatos, CTA, backlog e cadencia a partir dos ativos existentes.
6. Marcar o que e `facts`, `inferences` e `hypotheses` quando a performance futura depender de suposicoes.
7. Produzir um `content-plan` com janela temporal, prioridades, dependencia de aprovacao e briefs de derivacao.
8. Encerrar com handoff para `torq-canva-production` ou `torq-approval-governance` apenas quando houver maturidade suficiente.
9. Preparar a saida para persistencia no Supabase com status, owner e referencia aos ativos de origem.

## Output Format

Entregar em portugues com estas secoes:

### 1. Base Estrategica Usada

- tese central
- oferta ou CTA principal
- provas disponiveis

### 2. Papeis de Canal

- canal
- objetivo
- formato dominante
- risco de desalinhamento

### 3. Pilares e Series

- pilares
- series
- backlog inicial

### 4. Calendario Recomendado

- janela de planejamento
- cadencia por canal
- prioridades da semana

### 5. Facts, Inferences, Hypotheses

- `facts`
- `inferences`
- `hypotheses`

### 6. Handoff Operacional

- o que pode ir para Canva
- o que precisa de aprovacao
- o que ainda nao deve ser produzido

## Edge Cases

- Se nao houver tese ou prova suficiente: bloquear o calendario e pedir retorno para estrategia.
- Se o pedido for "me da 30 posts qualquer": recusar a logica de volume vazio e devolver um plano orientado por tese.
- Se o canal pedido nao fizer sentido para o caso: explicitar o conflito e sugerir um canal melhor.
- Se tudo depender de uma hipotese nao validada: marcar a hipotese e reduzir a cadencia recomendada.

## Bundled Resources

- Usar `assets/templates/content-plan.json` como contrato de saida.
- Ler os ativos aprovados de `torq-brand-foundation`, `torq-offer-engineering`, `torq-storytelling` e `torq-editorial-copy` quando existirem.
- Manter aderencia total ao tom em `docs/voice/calibration/tom-de-voz-torq.md`.
- Tratar o template como referencia para registros do Supabase, nao como runtime local.

## Examples

### Exemplo 1

Input: "Temos brand bundle aprovado, oferta definida e queremos um calendario de 30 dias para LinkedIn e Instagram sem cair em trend."

Output: "A skill deve construir um content-plan com papeis por canal, pilares, series, backlog, CTA e cadencia derivada da tese e da prova."

### Exemplo 2

Input: "Quero um monte de post mesmo sem oferta, sem tese e sem prova."

Output: "A skill deve bloquear o planejamento, explicar que faltam ativos estrategicos minimos e recomendar retorno para estrategia ou diagnostico."
