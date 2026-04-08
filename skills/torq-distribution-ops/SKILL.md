---
name: torq-distribution-ops
description: >
  Opera a fila de distribuicao do Torq OS, preparando agendamento, metadados,
  medicao e reingestao de aprendizados para ativos ja aprovados. Usar quando o
  pedido envolver "fila de publicacao", "queue de distribuicao", "agendamento",
  "medir resultado", "reingestar aprendizados", "status de publicacao" ou
  "operacao de distribuicao". Nao use para aprovar ativos, criar estrategia do
  zero, publicar sem revisao humana, escrever copy nova ou substituir ferramentas
  de automacao externas que ainda nao estejam integradas.
---

# Torq Distribution Ops

Executar a camada operacional posterior a aprovacao: preparar fila, organizar
metadados, acompanhar status e transformar resultado em aprendizado.

## Regra de Infraestrutura

- Assumir o Supabase como backend e system of record.
- Ler jobs de distribuicao, ativos aprovados, estados e metricas a partir de registros do Supabase ou objetos trazidos pela API.
- Tratar `assets/templates/distribution-job.json` apenas como schema de referencia.
- Nao pressupor execucao local na maquina do usuario.

## Workflow
1. Ler o distribution job vindo do Supabase, da API ou do front-end e verificar se o ativo alvo esta em estado `approved`.
2. Confirmar canal, janela de publicacao, owner, metadata e criterio de medicao.
3. Preparar a fila com status inicial, payload de canal e dependencia de automacao externa quando existir.
4. Nunca assumir publicacao autonoma em v1; tratar a acao como fila, handoff ou sincronizacao assistida.
5. Registrar o que e `facts`, `inferences` e `hypotheses` sobre destino, expectativa e leitura de resultado.
6. Atualizar o job para `queued` somente se houver `approval_id` ou aprovacao equivalente.
7. Quando houver resultado, consolidar medicao e gerar `PerformanceInsight` com aprendizado reaproveitavel.
8. Encerrar com proxima acao recomendada: manter, iterar, pausar, arquivar ou voltar para estrategia.
9. Persistir ou preparar a persistencia do novo estado, da fila e do aprendizado no Supabase.

## Output Format

Entregar em portugues com estas secoes:

### 1. Resumo Operacional
- asset id
- canal
- owner
- estado atual

### 2. Queue Readiness
- aprovacao encontrada
- metadata pronta
- janela sugerida
- bloqueios operacionais

### 3. Facts, Inferences, Hypotheses
- `facts`
- `inferences`
- `hypotheses`

### 4. Resultado do Job
- novo estado
- payload de handoff
- metrica principal observada
- aprendizado registrado

### 5. Proxima Acao
- manter
- iterar
- pausar
- arquivar
- retornar para estrategia

## Edge Cases

- Se o ativo nao estiver aprovado: bloquear a fila.
- Se faltarem canal, metadata ou owner: manter em `approved` e devolver lista de bloqueios.
- Se houver medicao sem contexto suficiente: registrar apenas fato observado e evitar inferencias fortes.
- Se a automacao externa estiver indisponivel: preservar o job, marcar dependencia externa e nao fingir que houve publicacao.

## Bundled Resources

- Usar `assets/templates/distribution-job.json` como contrato minimo.
- Respeitar o state machine canonico do Torq OS.
- Tratar `published` e `measured` como estados diferentes.
- Tratar o template como referencia para registros do Supabase.

## Examples

### Exemplo 1
Input: "Este post ja esta aprovado. Quero preparar a fila para LinkedIn na proxima semana e registrar o que medir."

Output: "A skill deve validar a aprovacao, montar o distribution-job, mover para queued e definir a metrica e o loop de aprendizado."

### Exemplo 2
Input: "Publica isso agora mesmo, ainda nao passou por aprovacao."

Output: "A skill deve bloquear o fluxo, manter o ativo fora da fila e apontar a quebra de governanca."
