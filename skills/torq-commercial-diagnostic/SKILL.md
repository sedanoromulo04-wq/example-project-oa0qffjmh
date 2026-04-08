---
name: torq-commercial-diagnostic
description: >
  Qualifica leads e clientes do ecossistema Torq, define fit, persona, estagio,
  escopo inicial e melhor handoff comercial. Usar quando o pedido envolver
  "qualificar lead", "diagnostico comercial", "esse prospect e fit?", "qual
  escopo oferecer", "fase 1 ou oferta direta", "qual persona do Torq" ou
  "preciso montar um diagnostico antes da proposta". Nao use para criar copy
  final, planejar conteudo, aprovar publicacao, produzir design ou fazer
  gestao de social media.
---

# Torq Commercial Diagnostic

Fazer triagem comercial seria, alinhada ao ICP do Grupo Torq, antes que a
operacao invista energia em branding, oferta ou conteudo.

## Regra de Infraestrutura

- Assumir o Supabase como backend e system of record.
- Ler client intake, call notes, qualificacao e historico do prospect a partir de registros do Supabase ou objetos trazidos pela API.
- Tratar `assets/templates/commercial-diagnostic-job.json` apenas como schema de referencia.
- Nao pressupor execucao local na maquina do usuario.

## Workflow
1. Ler `docs/clients/grupo-torq/nicho/nicho-publico-alvo-grupo-torq-v2.md` como fonte primaria de qualificacao.
2. Ler `docs/vision_and_strategy/` para preservar o filtro de voz, valores e posicionamento.
3. Receber o briefing do prospect, call notes ou um `client-intake` vindo do Supabase, da API ou do front-end.
4. Verificar criterios obrigatorios, eliminatorios, persona do Torq e estagio atual.
5. Identificar se o caso precisa de Fase 1, de engenharia de oferta, de VSL/funil ou se ainda e `nao-fit`.
6. Registrar `facts`, `inferences` e `hypotheses` sobre fit, risco, maturidade e potencial de handoff.
7. Produzir um diagnostico executivo com recomendacao de escopo, pre-requisitos e proximo modulo.
8. Se houver risco alto de desalinhamento, bloquear a proposta e explicar por que.
9. Preparar a saida para persistencia no Supabase com veredito, owner e proximo handoff.

## Output Format

Entregar em portugues com estas secoes:

### 1. Veredito
- `fit aprovado`
- `fit condicional`
- `nao-fit`

### 2. Classificacao
- persona do Torq
- estagio do cliente
- ponto de entrada

### 3. Validacao de Criterios
- obrigatorios atendidos
- obrigatorios ausentes
- eliminatorios encontrados

### 4. Facts, Inferences, Hypotheses
- `facts`
- `inferences`
- `hypotheses`

### 5. Escopo Recomendado
- fase inicial indicada
- entrega recomendada
- ativos minimos necessarios
- riscos comerciais

### 6. Handoff
- skill ou modulo seguinte
- perguntas que ainda precisam resposta

## Edge Cases

- Se o prospect quiser delegar 100% da face do negocio: classificar como `nao-fit`.
- Se o prospect nao tiver prova, metodo ou historico minimo: bloquear o avancar e listar pre-requisitos.
- Se o caso estiver entre Fase 1 e oferta direta: devolver `fit condicional` com o gatilho de decisao.
- Se o pedido vier como "faz uma proposta sem diagnostico": interromper e exigir triagem.

## Bundled Resources

- Usar `docs/clients/grupo-torq/nicho/nicho-publico-alvo-grupo-torq-v2.md` como regra principal.
- Usar `docs/clients/grupo-torq/nicho/posicionamento-grupo-torq-v1.md` para calibrar o enquadramento.
- Usar `assets/templates/commercial-diagnostic-job.json` como payload de entrada.
- Tratar o template como referencia para registros do Supabase.

## Examples

### Exemplo 1
Input: "Temos um professor de esporte com metodo validado, centros fisicos, casos reais e quase nenhum digital. Ele aceita aparecer e quer escalar."

Output: "A skill deve aprovar o fit, classificar como Persona 2, indicar entrada por Fase 1 e recomendar handoff para torq-brand-foundation."

### Exemplo 2
Input: "Tenho um mentor novo, sem case, sem oferta clara e quero terceirizar todo meu Instagram para vender rapido."

Output: "A skill deve classificar como nao-fit, explicar os eliminatorios encontrados e impedir que a operacao trate o caso como cliente pronto para a esteira Torq."
