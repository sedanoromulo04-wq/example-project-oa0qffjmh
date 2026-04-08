---
name: torq-canva-production
description: >
  Converte ativos editoriais aprovados em briefs e especificacoes de producao
  para Canva, respeitando Brand Bible, templates fixos e a sobriedade do Grupo
  Torq. Usar quando o pedido envolver "producao no Canva", "brief para carrossel",
  "estrutura de slides", "adaptar conteudo aprovado para Canva", "pecas visuais"
  ou "template editorial". Nao use para definir posicionamento, pesquisar o
  mercado, aprovar publicacao, inventar tese nova ou substituir o modulo de
  estrategia por execucao visual.
---

# Torq Canva Production

Executar a traducao de um ativo ja aprovado para uma especificacao visual
disciplinada. Canva aqui e camada de producao, nunca camada de pensamento.

## Regra de Infraestrutura

- Assumir o Supabase como backend e system of record.
- Ler ativos aprovados, content plan, brand bible e status de producao a partir de registros do Supabase ou objetos trazidos pela API.
- Tratar `assets/templates/canva-production-job.json` apenas como schema de referencia.
- Nao pressupor execucao local na maquina do usuario.

## Workflow

1. Ler o ativo aprovado, o `content-plan` correspondente e o `BrandBible` vindos do Supabase, da API ou do front-end.
2. Confirmar que o pedido ja tem tese, CTA e estado de aprovacao adequados.
3. Definir o formato da peca: carrossel, post estatico, capa, apoio visual ou deck curto.
4. Traduzir a peca em frames, hierarquia textual, funcao visual e instrucoes de composicao.
5. Manter templates fixos, tipografia controlada, paleta aprovada e ausencia de ruido visual.
6. Se houver suposicoes visuais, marcar como `hypotheses`; nao disfarcar falta de estrategia com design.
7. Entregar um brief de producao pronto para Canva com checklist de exportacao e bloqueios restantes.
8. Encaminhar o resultado para `torq-approval-governance` se a peca ainda nao tiver validacao final.
9. Preparar a saida para persistencia no Supabase com status, owner e referencia ao ativo de origem.

## Output Format

Entregar em portugues com estas secoes:

### 1. Base Aprovada

- ativo de origem
- CTA
- tese
- prova usada

### 2. Especificacao da Peca

- formato
- numero de frames
- objetivo por frame
- texto por frame

### 3. Direcao Visual

- template indicado
- paleta
- tipografia
- imagem ou asset necessario

### 4. Facts, Inferences, Hypotheses

- `facts`
- `inferences`
- `hypotheses`

### 5. Checklist de Producao

- o que precisa ser montado
- o que precisa de revisao
- o que bloqueia exportacao

## Edge Cases

- Se o ativo nao estiver aprovado: nao produzir a especificacao final.
- Se faltarem prova ou CTA: devolver o brief incompleto como bloqueado.
- Se o pedido tentar reinventar a marca no Canva: recusar e devolver para estrategia.
- Se o usuario pedir "faz algo bonito" sem base: bloquear a producao.

## Bundled Resources

- Ler `docs/voice/calibration/tom-de-voz-torq.md` para manter sobriedade textual.
- Ler o `BrandBible` e o `content-plan` antes de definir frames.
- Usar `assets/templates/canva-production-job.json` como payload minimo.
- Tratar o template como referencia para registros do Supabase.

## Examples

### Exemplo 1

Input: "Temos um carrossel aprovado sobre um erro estrutural do nicho e preciso transformar isso em 8 slides para Canva."

Output: "A skill deve produzir um brief frame a frame, com hierarquia textual, direcao visual e checklist de producao."

### Exemplo 2

Input: "Nao temos estrategia ainda, mas faz um visual premium para ver se vende."

Output: "A skill deve bloquear a producao, explicar que Canva nao substitui tese nem oferta e recomendar retorno para estrategia."
