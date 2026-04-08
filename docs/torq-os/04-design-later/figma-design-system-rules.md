---
type: rules
source: 'Torq Internal + Figma MCP'
date: 2026-04-08
tags: [figma, design-system, torq, frontend]
relevance: high
---

# Figma Design System Rules for Torq Central

## Purpose

Documentar como o design vindo de Stitch e Figma deve ser traduzido para o
frontend real do `torq-central`.

## 1. Design System Structure

### Token definitions

- Os tokens globais atuais vivem em
  `Antigravity Skill/Antigravity skills/torq-central/frontend/src/index.css`.
- O formato atual e CSS variables em `:root`.
- O proximo ciclo deve expandir esse arquivo com tokens do Stitch, sem criar
  outra camada paralela de tema.

### Token groups que devem existir

- cores de fundo e superficie
- cor primario metalico
- tipografia editorial e operacional
- espacamento
- radius
- blur
- sombras atmosfericas
- badges de risco e bloqueio

### Component library

- O projeto ainda nao tem Storybook ou biblioteca formal.
- A arquitetura atual usa componentes React simples em `src/components` e
  paginas em `src/pages`.
- O cockpit Jarvis precisa virar a primeira biblioteca visual consistente do
  projeto.

## 2. Frameworks and Libraries

- framework: `React 18`
- linguagem: `TypeScript`
- bundler: `Vite`
- roteamento: `react-router-dom`
- dados: `@supabase/supabase-js` e Jarvis API propria
- estilo: CSS tradicional por arquivo + `index.css`

### Regra

Nao importar Tailwind, styled-components ou outra camada de estilo para seguir o
HTML do Stitch. O visual deve ser absorbido em CSS do projeto.

## 3. Asset Management

- Assets visuais do Stitch estao salvos em
  `docs/torq-os/04-design-later/stitch-project-2609524893764998424/`.
- O frontend atual nao tem uma pasta formal de design assets premium.
- Se novos assets forem necessarios, criar uma pasta previsivel dentro do
  frontend e manter nomes estaveis.

## 4. Icon System

- O projeto ja possui `src/components/Icons.tsx`.
- Novos icones devem preferir o sistema existente.
- Nao adicionar uma biblioteca externa de icones sem necessidade real.

## 5. Styling Approach

- Padrao atual: um arquivo `.css` por pagina/componente relevante.
- Estilos globais centralizados em `src/index.css`.
- Responsividade tratada com media queries simples.

### Regra para o Jarvis

- primeiro atualizar tokens globais
- depois estruturar o shell
- so entao polir componentes isolados

## 6. Project Structure

- `src/pages`: superficies grandes e rotas
- `src/components`: blocos reutilizaveis
- `src/lib`: integracoes e clients
- `src/contexts`: auth e estado transversal

### Estrutura recomendada para o cockpit

- `src/pages/JarvisConsole.tsx` como entry surface
- subcomponentes de Jarvis em `src/components/jarvis/`
- CSS modular por superficie mantendo o padrao do repo

## 7. Stitch -> Figma -> Code Rule

### Stitch

- fonte visual principal
- nao usar o HTML exportado como base de producao

### Figma

- camada de organizacao e refinamento quando houver canvas editavel
- nesta sessao, a conta autenticada esta em plano starter com seat `view`

### Code

- ultima camada da cadeia
- sempre fiel ao contrato do backend e aos estados do runtime

## 8. Mandatory Product Rules

- Jarvis nao pode parecer chat comum.
- O frontend precisa mostrar governanca, nao esconder risco.
- `blocked_actions`, `approval_risk` e `next_safe_action` precisam ter lugar
  proprio no layout.
- Estados `empty`, `loading`, `blocked`, `approval` e `error` sao parte do
  design system, nao excecao.

## 9. Practical Figma MCP Note

Nesta sessao foi possivel:

- validar a conta autenticada
- usar o Figma MCP para orientar regras de design system

Nesta sessao nao foi possivel:

- escrever frames em canvas diretamente
- automatizar uma importacao Stitch -> Figma por ferramenta nativa

Conclusao:

O uso correto do Figma MCP agora e guiar estrutura e alinhamento. A passagem
para canvas editavel depende de permissao/ferramenta de escrita em uma sessao
que exponha esse caminho.
