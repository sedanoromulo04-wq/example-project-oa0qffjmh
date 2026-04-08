# Torq OS - Agent Routing

Este documento explica quais agentes entram em cada etapa do Torq OS e como a
orquestracao deve acontecer.

## Regra geral

Nenhum agente trabalha no vazio. A regra e sempre:

1. diagnosticar o tipo de problema
2. escolher o agente primario
3. chamar um agente secundario quando houver risco de desalinhamento
4. consolidar a saida
5. passar adiante apenas se o checkpoint anterior estiver aprovado

## Camada executiva

### Vision Chief

Usar quando:

- a pergunta e de direcao geral
- existe conflito entre modulos
- a decisao afeta a visao do sistema

Papel:

- definir o norte
- arbitrar conflitos
- decidir prioridade entre areas
- manter o sistema alinhado ao objetivo maior

### COO Orchestrator

Usar quando:

- o problema e de fluxo
- ha gargalo operacional
- ha necessidade de organizacao do trabalho

Papel:

- transformar visao em rotina operacional
- mapear processos
- definir sequencia e ownership
- proteger o sistema de caos

### CMO Architect

Usar quando:

- a duvida e sobre posicionamento
- existe problema de demanda
- o conteudo precisa servir a estrategia de mercado

Papel:

- olhar para cliente e mercado
- traduzir estrategia em demanda
- estruturar narrativa de mercado
- orientar o que o sistema deve comunicar

### CTO Architect

Usar quando:

- a decisao envolve arquitetura
- ha trade-off tecnico
- precisa pensar em build vs buy

Papel:

- proteger a viabilidade tecnica
- recomendar caminho de implementacao
- evitar complexidade desnecessaria

### CAIO Architect

Usar quando:

- a operacao pode usar AI
- existe chance de automacao com risco
- a decisao envolve RAG, agentes ou LLM

Papel:

- definir maturidade de AI
- escolher o tipo de automacao
- impor limites de governanca

### CIO Engineer

Usar quando:

- existe tema de dados
- ha integracao entre sistemas
- existe risco de seguranca ou compliance

Papel:

- mapear infraestrutura de informacao
- validar integracoes
- proteger dados e acessos

## Camada de narrativa e conversao

### Story Chief

Usar quando:

- o problema e narrativa
- a historia precisa carregar estrategia
- o sistema precisa de coerencia de mensagem

Papel:

- diagnosticar o tipo de historia
- chamar o especialista certo
- revisar estrutura narrativa

### Copy Chief

Usar quando:

- a demanda e copy
- a questao e conversao
- o asset precisa vender

Papel:

- diagnosticar medio, audiencia e awareness
- escolher o copywriter certo
- garantir alinhamento com o objetivo comercial

### Hormozi Chief

Usar quando:

- o problema e oferta
- a oferta precisa de mais valor percebido
- a conversao depende da estrutura comercial

Papel:

- diagnosticar o problema de negocio
- chamar o especialista certo
- validar valor, preco, leads e escala

## Roteamento por modulo

### Memory OS

Agentes principais:

- Vision Chief
- CIO Engineer
- CAIO Architect

Motivo:

- memoria e contexto dependem de governanca, estrutura e contexto de dados

### Research OS

Agentes principais:

- CMO Architect
- Vision Chief
- COO Orchestrator

Motivo:

- pesquisa precisa conectar mercado, prioridade e criterio de uso

### Strategy OS

Agentes principais:

- Vision Chief
- CMO Architect
- Story Chief

Motivo:

- estrategia junta direcao, posicionamento e narrativa

### Conversion OS

Agentes principais:

- Hormozi Chief
- Copy Chief
- Story Chief

Motivo:

- conversao mistura oferta, copy e narrativa

### Content OS

Agentes principais:

- CMO Architect
- Story Chief
- Copy Chief

Motivo:

- conteudo precisa sair da estrategia e voltar para a demanda

### Distribution OS

Agentes principais:

- COO Orchestrator
- CIO Engineer
- CAIO Architect

Motivo:

- distribuicao precisa processo, integracao e automacao segura

## Roteamento por situacao

### Se a duvida e "como comecar a operacao deste cliente?"

Chamar:

- `torq-c-level-strategy`
- `COO Orchestrator`
- `CMO Architect`

Fluxo esperado:

1. abrir `client-operation-brief`
2. diagnosticar etapa atual real
3. nomear o proximo job obrigatorio
4. atribuir owner e aprovador
5. bloquear qualquer modulo fora de ordem

### Se a duvida e "o que fazer agora?"

Chamar:

- Vision Chief
- COO Orchestrator

### Se a duvida e "o que o mercado quer?"

Chamar:

- CMO Architect
- torq-market-intelligence

### Se a duvida e "como vender melhor?"

Chamar:

- Hormozi Chief
- Copy Chief

### Se a duvida e "como contar isso melhor?"

Chamar:

- Story Chief
- Copy Chief

### Se a duvida e "como automatizar sem quebrar o sistema?"

Chamar:

- CTO Architect
- CAIO Architect
- CIO Engineer

## Skills Torq que apoiam o roteamento

- `torq-c-level-strategy`
- `torq-market-intelligence`
- `torq-commercial-diagnostic`
- `torq-brand-foundation`
- `torq-offer-engineering`
- `torq-storytelling`
- `torq-editorial-copy`
- `torq-content-planning`
- `torq-approval-governance`
- `torq-distribution-ops`

## Skills externas ja entram como suporte

- `agent-memory-systems`
- `context-manager`
- `rag-engineer`
- `n8n-mcp-tools-expert`

## Decisao final

O Torq OS deve sempre privilegiar:

- memoria antes de volume
- pesquisa antes de opiniao
- estrategia antes de design
- conversao antes de conteudo
- aprovacao antes de distribuicao

Design continua importante, mas fica explicitamente em segundo plano nesta
fase.
