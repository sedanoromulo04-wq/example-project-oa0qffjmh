# skill-creator

Repositorio organizado como monorepo de skills. Aqui ficam as skills em
producao, seus assets, documentos de apoio e material-base para criar novas
skills sem depender de caminhos soltos fora do projeto.

## Estrutura

```text
skill-creator/
|-- skills/
|   |-- criar-skill/
|   |   |-- SKILL.md
|   |   |-- evals/
|   |   |-- references/
|   |   `-- assets/wizard/
|   |-- torq-brand-foundation/
|   |   |-- SKILL.md
|   |   |-- assets/
|   |   |-- evals/
|   |   |-- references/
|   |   |-- scripts/
|   |   `-- tmp/
|   `-- ...
|-- docs/
|   |-- setup/
|   `-- clients/grupo-torq/
|-- install.sh
|-- README.md
`-- LICENSE
```

## Skills atuais

- `skills/criar-skill`: skill-base para transformar workflows e sessoes em novas skills.
- `skills/torq-brand-foundation`: skill do Grupo Torq para Brand Foundation e Livrobrand.
- `skills/torq-market-intelligence`: pesquisa de mercado, concorrencia, voz do cliente e tese de categoria.
- `skills/torq-commercial-diagnostic`: qualificacao comercial, persona fit e escopo inicial.
- `skills/torq-content-planning`: planejamento editorial subordinado a tese, prova e oferta.
- `skills/torq-approval-governance`: checklist de claims, governanca de aprovacao e bloqueio de publicacao sem HITL.
- `skills/torq-distribution-ops`: fila de distribuicao, medicao e reingestao de aprendizados.
- `skills/torq-canva-production`: producao visual no Canva a partir de ativos aprovados.

## Como instalar `criar-skill`

```bash
curl -fsSL https://raw.githubusercontent.com/okjpg/skill-creator/main/install.sh | bash
```

O instalador baixa os arquivos de `skills/criar-skill/` e instala em
`~/.claude/skills/criar-skill/`.

Depois da instalacao:

```text
/criar-skill
```

## Wizard visual

Os arquivos do wizard vivem em `skills/criar-skill/assets/wizard/`.

Localmente:

```bash
open skills/criar-skill/assets/wizard/wizard.html
```

Depois de instalar a skill:

```bash
open ~/.claude/skills/criar-skill/wizard.html
```

## Documentacao

- Setup guiado: `docs/setup/prompt-instalacao.md`
- Documentos-base do Grupo Torq: `docs/clients/grupo-torq/`
- Operating model e contratos do Torq OS: `docs/knowledge-base/methodologies/`
- Esboco operacional do Torq OS: `docs/torq-os/`
- Referencias da skill `criar-skill`: `skills/criar-skill/references/`
- Referencias da skill `torq-brand-foundation`: `skills/torq-brand-foundation/references/`

## Skills externas agregadas agora

- `agent-memory-systems`
- `context-manager`
- `rag-engineer`
- `n8n-mcp-tools-expert`

As proximas skills externas candidatas ficaram documentadas para adocao futura
em `docs/knowledge-base/methodologies/2026-04-06_methodology_torq-os-external-skill-adoption.md`.

## Convencoes do repositorio

- Toda nova skill deve nascer em `skills/<nome-da-skill>/`.
- Material estatico e bibliotecas visuais devem ficar dentro de `assets/` da propria skill.
- Documentacao transversal ou de cliente deve ficar em `docs/`.
- Arquivos temporarios e saidas de execucao ficam em `tmp/` dentro da skill e sao ignorados pelo Git.

## Requisitos

- [Claude Code](https://claude.ai/code)
- Opcional: [GitHub CLI](https://cli.github.com/)
- Opcional: [1Password CLI](https://developer.1password.com/docs/cli/)
