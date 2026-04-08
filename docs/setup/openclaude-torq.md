# OpenClaude no Torq OS

Este documento registra a forma recomendada de usar o `openclaude` neste
repositorio sem quebrar a arquitetura que ja existe.

## Resumo executivo

`openclaude` e um CLI de agente de codigo. Ele pode operar como camada de
execucao e orquestracao, mas nao substitui sozinho o desenho do Torq OS.

Neste repositorio, ele deve ser tratado como:

- interface operacional para navegar, editar e automatizar com contexto
- camada compativel com skills, MCP, agentes e fluxo tipo Claude Code
- ponto de entrada para trabalho tecnico sobre o sistema

Ele nao deve ser tratado como:

- dono automatico da estrategia do negocio
- substituto das skills Torq-native
- aprovador final de publicacao, claims ou distribuicao

## Analise critica do encaixe

### O que favorece a adocao

- O repositorio ja foi desenhado em torno de `skills/`, `agents/` e `docs/`
- O sistema valoriza roteamento, memoria, contexto e checkpoints humanos
- O `openclaude` expoe uma interface compativel com esse estilo de trabalho
- O ambiente atual ja possui `~/.claude/` e `~/.codex/`
- O auth do Codex ja existe na maquina, entao o primeiro setup nao depende de
  nova chave de API

### O que exige cuidado

- O Torq OS nao e um app unico; ele e uma combinacao de monorepo de skills,
  documentacao operacional, squads e um frontend separado
- `openclaude` gerencia sessoes e ferramentas, nao a governanca do negocio
- Se ele for tratado como "controlador total", voce corre risco de misturar
  execucao tecnica com decisao estrategica sem checkpoint humano
- No Windows desta maquina, o wrapper `openclaude.ps1` instalado pelo npm fica
  bloqueado pela policy do PowerShell; por isso o launcher recomendado aqui usa
  `.cmd`

## Estrategia adotada

Em vez de tentar acoplar o `openclaude` de forma invasiva ao sistema inteiro,
foi adotada uma estrategia em tres camadas:

1. Instalar o CLI globalmente via npm
2. Usar `codexplan` como backend inicial, aproveitando o auth ja presente
3. Ancorar o comportamento do agente no contexto do repo com `CLAUDE.md`

Essa abordagem reduz risco, evita build local com Bun e preserva a arquitetura
existente do Torq OS.

## Camada de roteamento e contexto

Agora o projeto tambem possui integracao nativa de projeto para o OpenClaude:

- `.claude/settings.json` define `torq-orchestrator` como agente principal
- `.claude/agents/` registra especialistas por modulo do Torq OS
- `CLAUDE.md` ancora o contexto transversal do repositorio
- `openclaude-torq.cmd` sobe o CLI com `codexplan` e teammates em processo

### Agentes registrados

- `torq-orchestrator`
- `torq-memory-os`
- `torq-research-os`
- `torq-strategy-os`
- `torq-conversion-os`
- `torq-content-os`
- `torq-distribution-os`

### O que isso muda na pratica

Quando o OpenClaude entra por este repositorio, ele deixa de abrir como agente
generico e passa a operar como lider do Torq OS.

Isso significa que ele deve:

- identificar o modulo e a etapa atual antes de agir
- bloquear atalhos proibidos
- rotear profundidade para o especialista de modulo correto
- manter aprovacao humana como trava obrigatoria para distribuicao
- preservar o espaco entre memoria, pesquisa, estrategia, conversao, conteudo e distribuicao

## Como iniciar

No root do repositorio:

```powershell
.\openclaude-torq.cmd
```

Ou com prompt inicial:

```powershell
.\openclaude-torq.cmd "estude a arquitetura atual e proponha o proximo passo"
```

Para listar os agentes do projeto:

```powershell
openclaude.cmd agents --setting-sources project,local
```

## Quando usar

Use `openclaude` para:

- estudar codigo e documentacao do monorepo
- editar skills, docs, scripts e integracoes
- operar com MCPs e ferramentas de shell
- revisar arquitetura e trade-offs tecnicos

Nao use sozinho para:

- aprovar claims sensiveis
- publicar distribuicao sem HITL
- pular a ordem operacional do Torq OS

## Verificacao minima feita

- instalacao global do pacote `@gitlawb/openclaude`
- validacao do binario com `openclaude.cmd --version`
- teste real de inferencia com:

```powershell
openclaude.cmd -p --bare --provider openai --model codexplan "Reply with OK and nothing else."
```

Resposta observada:

```text
OK
```

## Limites atuais

- O frontend em `Antigravity Skill/Antigravity skills/torq-central/frontend/`
  continua sendo um subsistema separado; `openclaude` ajuda a operar nele, mas
  nao o transforma automaticamente em plataforma orquestrada
- Se voce quiser que o `openclaude` entre tambem como camada de automacao
  persistente, o proximo passo correto e desenhar uma ponte explicita com n8n,
  memoria, RAG e aprovacao, em vez de depender apenas do CLI
