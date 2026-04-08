---
name: torq-approval-governance
description: >
  Governa a aprovacao de ativos publicos do ecossistema Torq com foco em claims,
  prova, tom e trilha de decisao. Usar quando o pedido envolver "aprovar post",
  "revisao final", "governanca editorial", "checklist de claims", "essa peca
  pode publicar?", "bloquear publicacao sem aprovacao" ou "trilha de aprovacao".
  Nao use para criar a estrategia original, pesquisar mercado, escrever a copy do
  zero, montar fila de distribuicao sem ativo aprovado ou publicar automaticamente.
---

# Torq Approval Governance

Garantir que nenhum ativo publico entre em fila ou seja tratado como pronto sem
validacao humana explicita, prova minima e aderencia ao tom Torq.

## Regra de Infraestrutura

- Assumir o Supabase como backend e system of record.
- Ler ativo, trilha de aprovacao e metadados a partir de registros do Supabase ou objetos trazidos pela API.
- Tratar `assets/templates/approval-job.json` apenas como schema de referencia.
- Nao pressupor execucao local na maquina do usuario.

## Workflow
1. Ler o ativo alvo e o payload vindo do Supabase, da API ou do front-end.
2. Confirmar o tipo do ativo, o dono do ativo e o estado operacional atual.
3. Validar claims, prova disponivel, aderencia ao tom, clareza do CTA e risco reputacional.
4. Identificar o que esta confirmado como `facts` e o que ainda e interpretacao ou promessa.
5. Registrar `facts`, `inferences` e `hypotheses` sobre risco, compliance editorial e prontidao.
6. Emitir uma decisao: `approved`, `changes_required` ou `blocked`.
7. Se o ativo for aprovado, devolver os requisitos minimos para mudanca de estado para `queued`.
8. Se o ativo nao for aprovado, listar bloqueadores objetivos e o dono da proxima acao.
9. Preparar a decisao para persistencia no Supabase com trilha de auditoria, owner e estado seguinte permitido.

## Output Format

Entregar em portugues com estas secoes:

### 1. Resumo do Ativo
- asset id
- asset type
- owner
- current state

### 2. Checklist de Governanca
- claims
- prova
- tom
- CTA
- risco reputacional

### 3. Facts, Inferences, Hypotheses
- `facts`
- `inferences`
- `hypotheses`

### 4. Decisao
- `approved`
- `changes_required`
- `blocked`

### 5. Proxima Acao
- owner
- ajustes necessarios
- estado seguinte permitido

## Edge Cases

- Se nao houver aprovador humano identificado: bloquear automaticamente.
- Se existir claim forte sem prova ou premissa clara: marcar `changes_required` ou `blocked`.
- Se a peca soar generica ou fora do tom Torq: devolver para revisao, mesmo que tecnicamente esteja correta.
- Se o ativo estiver em `draft` e pedirem fila direta: bloquear a transicao.

## Bundled Resources

- Usar `assets/templates/approval-job.json` como payload minimo.
- Manter o ciclo operacional canonico: `draft -> strategist_review -> founder_review -> approved -> queued -> published -> measured -> archived`.
- Ler `docs/vision_and_strategy/` e `docs/voice/calibration/tom-de-voz-torq.md` para calibrar o filtro final.
- Tratar o template como referencia para registros do Supabase.

## Examples

### Exemplo 1
Input: "Revisa este carrossel de LinkedIn que ja passou por conteudo e copy e me diz se pode entrar na fila."

Output: "A skill deve avaliar claims, prova, tom e CTA, emitir decisao e permitir `queued` apenas se houver aprovacao humana explicita."

### Exemplo 2
Input: "Pode publicar isso direto, ainda esta em draft mas eu confio."

Output: "A skill deve bloquear a solicitacao, apontar que o estado e invalido para publicacao e exigir estrategist review e founder review."
