---
name: torq-market-intelligence
description: >
  Pesquisa mercado, concorrencia, voz do cliente, sinais de demanda e tese de
  categoria para o ecossistema Torq. Usar quando o pedido envolver "pesquisa de
  mercado", "analise de concorrentes", "voz do cliente", "mapa competitivo",
  "demanda do nicho", "enquadramento de prospect", "categoria da marca" ou
  "oportunidades do mercado". Atua antes de copy, calendario ou publicacao.
  Nao use para escrever posts soltos, criar branding final, aprovar pecas,
  produzir no Canva ou publicar em rede social.
---

# Torq Market Intelligence

Transformar contexto bruto de prospect, cliente ou categoria em inteligencia de
mercado usavel pelo sistema Torq. Priorizar decisao, nao volume de pesquisa.

## Regra de Infraestrutura

- Assumir o Supabase como backend e system of record.
- Ler intake, contexto de projeto e datasets de pesquisa a partir de registros do Supabase ou objetos trazidos pela API.
- Tratar `assets/templates/client-intake.json` e `assets/templates/research-dossier.json` apenas como schemas de referencia.
- Nao pressupor execucao local na maquina do usuario.

## Workflow
1. Ler `docs/vision_and_strategy/` e `docs/clients/grupo-torq/nicho/nicho-publico-alvo-grupo-torq-v2.md` antes de interpretar o caso.
2. Ler o payload vindo do Supabase, da API ou do front-end.
3. Identificar o objeto de pesquisa: prospect, cliente ativo, categoria, subnicho ou concorrencia.
4. Registrar o que ja esta confirmado como `facts` antes de pesquisar ou inferir.
5. Mapear ICP, persona do Torq, estagio digital e principal gargalo comercial do caso.
6. Levantar mercado, concorrentes diretos, concorrentes indiretos, linguagem da audiencia, sinais de demanda e riscos de comoditizacao.
7. Organizar a leitura em `facts`, `inferences` e `hypotheses` sem misturar os tres niveis.
8. Definir categoria percebida, categoria desejada, pressao competitiva e janelas reais de diferenciacao.
9. Produzir um `research-dossier` estruturado com oportunidades, riscos, perguntas abertas e handoff recomendado.
10. Recomendar o proximo modulo do Torq OS: brand foundation, commercial diagnostic, offer engineering ou c-level strategy.
11. Preparar a saida para persistencia no Supabase com status, owner e referencia ao job de origem.

## Output Format

Entregar em portugues com estas secoes:

### 1. Contexto de Entrada
- objeto analisado
- objetivo da pesquisa
- qualidade do input

### 2. Diagnostico de Mercado
- categoria atual
- maturidade do nicho
- sinais de demanda
- sinais de saturacao

### 3. Mapa Competitivo
- concorrentes diretos
- concorrentes indiretos
- padroes repetidos
- lacunas exploraveis

### 4. Voz do Cliente
- dores
- desejos
- linguagem recorrente
- objecoes

### 5. Facts, Inferences, Hypotheses
- `facts`
- `inferences`
- `hypotheses`

### 6. Tese Estrategica Inicial
- oportunidade central
- risco principal
- angulo de categoria
- recomendacao de proximo passo

## Edge Cases

- Se faltarem produto, prova ou publico: reduzir o escopo e marcar a pesquisa como parcial.
- Se o caso nao for ICP do Grupo Torq: registrar `nao-fit` e explicar por que a pesquisa nao deve virar estrategia de conversao.
- Se o pedido vier como "quero ver concorrentes para fazer posts": redirecionar a saida para inteligencia, nao para calendario.
- Se a categoria estiver supercomoditizada: focar em linguagem da audiencia, prova, mecanismo e framing em vez de inventar autoridade.

## Bundled Resources

- Ler `assets/templates/client-intake.json` para o payload de entrada.
- Ler `assets/templates/research-dossier.json` como contrato minimo de saida.
- Ler `docs/vision_and_strategy/` para calibrar visao, ICP e valores.
- Tratar esses templates como contratos de referencia para registros do Supabase.

## Examples

### Exemplo 1
Input: "Preciso entender o mercado de um cirurgiao plastico premium com boa reputacao offline, pouco digital e concorrentes muito parecidos no Instagram."

Output: "A skill deve mapear a categoria, identificar concorrentes diretos e indiretos, separar fatos, inferencias e hipoteses, apontar janelas reais de diferenciacao e recomendar handoff para torq-brand-foundation."

### Exemplo 2
Input: "Quero uma lista de concorrentes para copiar trends e postar mais."

Output: "A skill deve recusar a logica de trend-chasing, devolver inteligencia de mercado em vez de imitacao taticista e explicar que o objetivo do modulo e orientar posicionamento e conversao."
