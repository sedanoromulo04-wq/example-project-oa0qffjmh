# Figma Design System Rules

Estas regras definem como agentes devem implementar design no frontend do Torq
Central a partir de Stitch, Figma ou screenshots aprovadas.

## Project Context

- Frontend alvo: `Antigravity Skill/Antigravity skills/torq-central/frontend`
- Framework: React 18 + TypeScript + Vite
- Roteamento: `react-router-dom`
- Dados: Supabase client e Jarvis API
- Estilo atual: CSS tradicional por arquivo, sem Tailwind

## Required Skill Flow

- Use `torq-frontend-architect` para transformar referencia visual em blueprint.
- Use `torq-frontend-builder` para implementar.
- Use `torq-frontend-qa` para revisar fidelidade e riscos.
- Nao pule direto para codigo final quando a referencia visual ainda nao estiver
  congelada.

## UI Structure Rules

- Paginas vivem em `frontend/src/pages`.
- Componentes reutilizaveis vivem em `frontend/src/components`.
- Integracoes e clients vivem em `frontend/src/lib`.
- Auth e sessao ficam em `frontend/src/contexts`.
- Cada pagina ou componente visual relevante deve ter seu proprio arquivo `.css`
  ao lado do `.tsx` quando isso seguir o padrao atual do projeto.

## Styling Rules

- Nao usar Tailwind neste projeto.
- Nao introduzir styled-components, emotion ou outra camada nova sem motivo
  forte.
- Usar CSS classico com variaveis CSS para tokens.
- Tokens globais atuais vivem em
  `frontend/src/index.css`.
- Nao hardcodar cores, fontes, sombras ou raios direto dentro dos componentes
  React quando isso puder virar token CSS.
- Se um novo token for necessario, promover para `:root` em `index.css` em vez
  de repetir valores em varios arquivos.

## Current Token Conventions

- Cor de fundo e superficies usam variaveis como `--bg`, `--surface`,
  `--surface-2`, `--border`.
- Texto usa `--text`, `--text-muted`, `--text-subtle`.
- Estados usam `--error` e `--success`.
- Tipografia base usa `--font` e `--font-mono`.
- Raios e profundidade usam `--radius`, `--radius-sm` e `--shadow`.

## Product Rules

- Jarvis nao pode parecer chatbot generico.
- O cockpit precisa deixar visivel:
  - modulo atual
  - etapa atual
  - blockers
  - approval risk
  - next safe action
- O frontend precisa reforcar governanca, nao esconder riscos em UI bonita.
- Fluxo de voz e camada posterior; o texto e a governanca visivel sao a base.

## Component Reuse Rules

- Antes de criar algo novo, revisar:
  - `frontend/src/components/Sidebar.tsx`
  - `frontend/src/components/GlobalSearch.tsx`
  - `frontend/src/components/Icons.tsx`
  - `frontend/src/pages/DashboardLayout.tsx`
  - `frontend/src/pages/JarvisConsole.tsx`
- Preferir expandir componentes existentes quando isso nao comprometer a clareza.
- Nao criar outra biblioteca de icones; reaproveitar `Icons.tsx` ou assets
  fornecidos pelo design.

## Figma MCP Required Flow

1. Rodar `get_design_context` para o node certo.
2. Se o contexto vier grande demais, usar `get_metadata` e depois refinar pelos
   nodes necessarios.
3. Rodar `get_screenshot` para validar a referencia visual.
4. Traduzir o resultado para React + CSS do projeto, nao copiar estilos
   genericos de saida.
5. Comparar implementacao final com a screenshot antes de concluir.

## Stitch Workflow Rules

- Tratar Stitch como fonte visual externa.
- Nao depender de Stitch MCP para comecar implementacao.
- Se houver screenshot, HTML exportado ou prompt aprovado, isso ja basta para o
  architect fechar o blueprint.
- Nao salvar tokens crus de Stitch em arquivos rastreaveis do repo.

## Asset Rules

- Se Figma fornecer asset valido, usar o asset fornecido.
- Nao instalar novos pacotes de icones para substituir assets do design.
- Colocar novos assets em uma pasta previsivel do frontend quando necessario e
  manter nomes claros e estaveis.

## Responsiveness Rules

- Toda tela nova precisa funcionar em desktop e tablet.
- Mobile deve ser considerado desde o inicio para paines, grids e composer.
- Nao confiar em layout fixo de 3 colunas sem comportamento de colapso.

## Quality Bar

- Fidelidade visual alta, mas sem sacrificar legibilidade.
- Estados vazios, loading, blocked, error e approval precisam existir.
- Nenhuma tela critica deve depender apenas de cor para comunicar risco ou
  bloqueio.
