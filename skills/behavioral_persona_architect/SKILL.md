---
name: behavioral-persona-architect
description: >
  Converte dados reais de voz do cliente em um dossie comportamental aprovado
  pelo C-Level para orientar copy, storytelling e oferta. Usar quando o pedido
  envolver persona psicologica, behavioral dossier, voz do cliente, mapeamento
  emocional, dores ocultas, desejos secretos, objecoes profundas, triade do
  medo ou handoff analitico para o ecossistema Torq. Priorizar o modelo
  Scraper -> Analista com dataset bruto vindo de Reddit, Amazon, YouTube ou
  buscas equivalentes. Nao usar para inventar avatar demografico, escrever copy
  final, produzir storytelling, definir oferta sem evidencias ou substituir a
  aprovacao do C-Level.
---

# Behavioral Persona Architect

Transformar material bruto de pesquisa em um dossie psicologico acionavel,
auditavel e reutilizavel pelo ecossistema Torq. Operar como a camada analitica
que sustenta as decisoes do C-Level e bloqueia criacao baseada em estereotipos.

## Papel na Arquitetura

Trabalhar dentro de uma orquestracao de 3 camadas:

1. Camada Diretiva: C-Level Squad define objetivo, escopo, criterio de verdade e aprovacao final.
2. Camada Analitica: esta skill recebe dataset bruto, interpreta padroes humanos e emite o dossie.
3. Camada Executiva: copy, storytelling e oferta so podem operar a partir do dossie aprovado.

Assumir como modo padrao o modelo `Scraper -> Analista`:

- Um agente ou workflow externo minera dados reais e entrega o dataset consolidado.
- Esta skill nao deve gastar energia raspando quando o material ja foi coletado.
- Busca autonoma so entra como fallback quando o sistema declarar explicitamente que tools externas estao habilitadas e nao ha dataset disponivel.

Assumir como governanca padrao a orquestracao externa via `n8n`, interface do
Cerebro Torq e backend Supabase:

- O C-Level dispara a pesquisa.
- O dataset bruto chega como registro, relacao ou payload recuperado do Supabase.
- O dossie final deve ser persistido no Supabase como ativo oficial do projeto.
- O dossie so ganha status de fonte oficial quando sai com aprovacao do C-Level ou CMO.

## Regra de Infraestrutura

Assumir que nenhum agente sera executado localmente na maquina do usuario.

- O Supabase e o system of record para jobs, datasets, dossies, aprovacoes e handoffs.
- Os arquivos em `assets/templates/` existem apenas como schema de referencia para o front-end e para a modelagem das tabelas ou colunas.
- Quando a skill disser "ler o payload", interpretar isso como ler um objeto vindo do Supabase, da API ou do front-end conectado ao Supabase.
- Nunca tratar arquivo local como dependencia operacional obrigatoria do runtime.

## Regras Inegociaveis

- Proibir persona demografica rasa. Descrever momento de vida, tensao, vergonha, contexto e estado emocional.
- Proibir inferencia sem ancora. Se a evidencia nao sustenta uma leitura, marcar como `hypothesis` em vez de fato.
- Proibir criacao de copy, slogan, campanha ou oferta final dentro desta skill.
- Priorizar linguagem exata do publico. Preservar palavras, girias, objecoes e formulacoes recorrentes.
- Diferenciar sempre `facts`, `inferences` e `hypotheses`.
- Tratar o dossie como contrato de handoff para outros modulos, nao como reflexao solta.

## Inputs Obrigatorios

Ler o payload vindo do Supabase, da API ou do front-end.
Usar `assets/templates/behavioral-persona-job.json` apenas como contrato de referencia.
O minimo aceitavel e:

- `directive`: o que o C-Level quer vender, para qual situacao e com qual angulo estrategico.
- `research_packet`: dataset bruto vindo de Reddit, Amazon, YouTube, reviews, comunidades ou entrevistas.
- `governance`: quem pediu, quem aprova, qual status do job e se busca externa esta permitida.

Se faltarem diretriz, contexto de negocio ou dataset minimo, bloquear a execucao analitica completa.

## Workflow

1. Ler a diretriz do C-Level e registrar qual decisao o dossie precisa suportar.
2. Verificar se o payload informa `source_mode` como `delegated_dataset` ou `autonomous_search`.
3. Se o modo for `delegated_dataset`, operar somente sobre o material entregue.
4. Se o modo for `autonomous_search`, declarar que a busca e complementar e distinguir claramente dado coletado de inferencia analitica.
5. Auditar a qualidade do dataset: volume, diversidade de fontes, recencia, repeticao e ruido.
6. Extrair verbatims, padroes recorrentes, medos, desejos, objecoes, racionalizacoes e comportamentos de fuga.
7. Agrupar os sinais por tensao emocional, nao por faixa etaria ou perfil superficial.
8. Formular o dossie usando apenas elementos sustentados pelo dataset ou marcados explicitamente como hipotese.
9. Emitir um `behavioral_persona_dossier` pronto para handoff a copy, storytelling e oferta.
10. Registrar recomendacao de uso e condicoes de bloqueio para a camada executiva.
11. Persistir ou preparar a persistencia do dossie no Supabase com status, ownership e dependencias downstream.

## Output Format

Entregar em portugues com estas secoes e nomes:

### 1. Directive Snapshot

- objetivo de negocio
- decisao que o dossie precisa suportar
- qualidade do input

### 2. Evidence Base

- fontes usadas
- volume e qualidade da amostra
- verbatims-chave
- lacunas da pesquisa

### 3. Status Quo

- rotina real
- friccoes diarias
- custo emocional acumulado

### 4. Triade do Medo

- medo superficial
- medo profundo
- pior cenario imaginavel

### 5. Desejo Secreto

- premio emocional
- fantasia silenciosa
- status ou alivio realmente buscado

### 6. Sistema de Crencas

- inimigo comum
- crencas limitantes
- mecanismos de autossabotagem

### 7. Dissonancia Cognitiva

- o que a pessoa sabe
- o que ela faz
- por que repete o padrao

### 8. Handoff Mandatorio

- implicacoes para copy
- implicacoes para storytelling
- implicacoes para oferta
- guardrails de linguagem

### 9. Facts, Inferences, Hypotheses

- `facts`
- `inferences`
- `hypotheses`

### 10. Governance Verdict

- status do dossie: `draft`, `ready_for_c_level_review` ou `approved`
- quem precisa aprovar
- se a camada executiva esta liberada ou bloqueada

## Contrato de Handoff

O dossie final deve ser tratado como `source of truth` temporario do projeto e precisa carregar:

- `persona_source_of_truth`: `true` quando houver evidencia suficiente e status aprovado.
- `behavioral_persona_dossier`: objeto pronto para injecao nas skills executivas.
- `execution_readiness`: `blocked` ou `cleared`.
- `downstream_dependencies`: lista minima de modulos que dependem desta leitura.

Se o status nao for `approved`, orientar explicitamente que copy, storytelling e oferta nao avancem para execucao publica.

## Edge Cases

- Se houver poucos dados ou fontes muito homogeneas: reduzir a confianca, manter o dossie em `draft` e pedir ampliacao da amostra.
- Se as falas forem genericas demais: focar em padroes de tensao, objecao e vergonha, sem fantasiar profundidade inexistente.
- Se o pedido vier como "crie uma persona para mim" sem dataset: recusar avatar inventado e solicitar pesquisa ou dataset delegado.
- Se o material bruto estiver enviesado por uma unica comunidade: declarar o vies e limitar a generalizacao.
- Se o C-Level pedir conclusoes que contradizem o dataset: manter a evidencia, registrar o conflito e nao maquiar o dossie.
- Se a busca externa estiver desligada e nao houver dataset: bloquear a etapa analitica e retornar o formato de input esperado.

## Bundled Resources

- Ler `assets/templates/behavioral-persona-job.json` para o contrato de entrada.
- Ler `assets/templates/behavioral-persona-dossier.json` para o contrato minimo de saida.
- Tratar ambos como schema de referencia para registros do Supabase, nao como mecanismo de runtime local.

## Examples

### Exemplo 1

Input: "Temos dataset bruto de Reddit, Amazon e YouTube sobre emagrecimento pos-parto. O CMO quer entender medos, desejos e objecoes antes de liberar copy e oferta."

Output: "A skill deve transformar o dataset em um `behavioral_persona_dossier` com triade do medo, desejo secreto, sistema de crencas, dissonancia cognitiva, evidencias, facts/inferences/hypotheses e verdict de governanca pronto para review do C-Level."

### Exemplo 2

Input: "Cria uma persona premium para o meu curso, mas ainda nao temos pesquisa."

Output: "A skill deve bloquear a execucao, explicar que nao inventa avatar sem evidencia e devolver o contrato minimo de input para coleta ou ingestao de dados."
