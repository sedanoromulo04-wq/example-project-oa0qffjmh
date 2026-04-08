# Torq OS - System Flow

Este documento descreve o fluxo operacional do Torq OS no estado atual do
repositorio.

## Principio central

O sistema funciona melhor quando roda nesta ordem:

`memory -> research -> strategy -> conversion -> content -> distribution`

Cada etapa alimenta a proxima. Se a base estiver fraca, o sistema deve voltar
um nivel em vez de forcar a producao.

## Fluxo macro

### Boot sequence de cliente

Quando a operacao for de um cliente real, o sistema deve abrir com:

`client-operation-brief -> diagnostico -> pesquisa -> persona -> estrategia -> conversao -> conteudo -> aprovacao -> distribuicao`

Se o cliente ja tiver ativos validos em alguma etapa, o sistema pode entrar do
meio, mas apenas se o C-Level registrar explicitamente quais dependencias ja
estao satisfeitas.

### 1. Memory OS

Objetivo: capturar e organizar inteligencia duravel.

Entradas principais:

- founder notes
- contexto de cliente
- provas
- referencias
- historico de decisao

Saidas principais:

- `FounderMemoryEntry`
- `ClientProfile`
- `PerformanceInsight`

### 2. Research OS

Objetivo: transformar contexto bruto em inteligencia de mercado.

Entradas principais:

- briefing inicial
- sinais do mercado
- perguntas de posicionamento
- duvidas de fit

Saidas principais:

- `client-intake`
- `research-dossier`
- leitura de fatos, inferencias e hipoteses

### 3. Strategy OS

Objetivo: definir o que o mercado deve acreditar sobre a oferta, a marca e o
fundador.

Entradas principais:

- pesquisa aprovada
- memoria consolidada
- tese de categoria

Saidas principais:

- `brand-bundle`
- `BrandBible`
- `NarrativeAsset`

### 4. Conversion OS

Objetivo: converter estrategia em objeto comercial.

Entradas principais:

- brand bundle aprovado
- narrativa aprovada
- sinais de oferta

Saidas principais:

- `offer-job`
- `story-job`
- `copy-job`
- `OfferArchitecture`
- `CopyAsset`

### 5. Content OS

Objetivo: derivar conteudo a partir de tese, prova e oferta.

Entradas principais:

- copy aprovada
- story aprovada
- direcao de marca

Saidas principais:

- `content-plan`
- calendario editorial
- series
- roteiros de repurpose

### 6. Distribution OS

Objetivo: preparar, revisar, agendar, medir e reabsorver o que foi publicado.

Entradas principais:

- conteudo aprovado
- metadados de canal
- regras de aprovacao

Saidas principais:

- `approval-job`
- `distribution-job`
- `PerformanceInsight`

## State machine

O ciclo base do sistema e:

`draft -> strategist_review -> founder_review -> approved -> queued -> published -> measured -> archived`

### Regras do ciclo

- `draft` e o material bruto
- `strategist_review` valida a qualidade operacional
- `founder_review` valida a direcao humana e comercial
- `approved` libera o ativo para a proxima etapa
- `queued` significa que o ativo entrou na fila de execucao
- `published` significa que o ativo foi distribuido
- `measured` significa que houve leitura de resultado
- `archived` significa que o ativo continua acessivel para memoria e reuse

## Bloqueios importantes

- nenhum ativo de saida publica deve pular revisao humana
- nenhum planejamento de conteudo deve nascer sem base de memoria e pesquisa
- nenhuma publicacao deve acontecer sem aprovacao registrada
- nenhuma decisao visual deve virar prioridade antes da estrategia e da
  conversao
- nenhuma operacao de cliente deve comecar sem um `client-operation-brief`
  registrando etapa atual, owner e proxima decisao

## Leitura do fluxo por prioridade

### Precisa ser feito agora

- consolidar memoria e pesquisa como entrada obrigatoria
- padronizar os contratos de job
- manter os checkpoints de aprovacao
- desenhar o roteamento de agentes

### Esta sendo feito agora

- escrita do esboco operacional
- organizacao das pastas de orquestracao
- definicao do papel dos agentes
- separacao entre core e futuro

### Vai depois

- design de interface
- publicacao automatica completa
- ampliacao das automacoes de canal
- refinamento estetico do sistema

## Regra de ouro

Se a etapa seguinte depende de algo que ainda nao existe, o sistema nao deve
forcar execucao. Ele deve explicitar o bloqueio e retornar para a etapa
anterior.
