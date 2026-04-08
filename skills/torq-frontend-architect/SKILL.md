---
name: torq-frontend-architect
description: >
  Define a arquitetura de frontend do Torq a partir de Stitch, imagens de referencia,
  frontend existente, contratos de API e regras operacionais do Jarvis. Usar quando
  o pedido envolver "arquitetura do frontend", "como organizar as telas", "como
  transformar o Stitch em produto", "design system do Jarvis", "estrutura de layout",
  "componentes obrigatorios", "tokens visuais", "estados da interface" ou planejamento
  tecnico antes da implementacao visual. Nao use para implementar componentes finais,
  fazer microajustes de CSS isolados, desenhar logo, ou revisar bugs pequenos sem
  necessidade de reestruturar a interface.
---

# Torq Frontend Architect

Definir a estrutura do frontend como sistema operacional visual, nao como soma
de telas soltas. Toda decisao de interface deve proteger a logica do Torq OS:
contexto, roteamento, bloqueios, aprovacao e visibilidade operacional.

## Workflow

1. Ler o prompt do Stitch, imagens de referencia, frontend existente, contratos da API do Jarvis e documentos de orquestracao do Torq.
2. Confirmar qual e a fonte de verdade visual principal: Stitch, Figma, screenshots, HTML exportado ou layout ja existente.
3. Identificar o modo do produto: cockpit Jarvis, biblioteca documental, area de cliente ou modo hibrido.
4. Mapear as telas obrigatorias antes de qualquer detalhe estetico: login, shell principal, console Jarvis, estados de loading, bloqueio, confirmacao e voice state.
5. Separar a arquitetura em camadas: layout global, navegacao, sistema de superficie, componentes, estados e integracoes de dados.
6. Definir a hierarquia de informacao principal para o cockpit: historico, transcript, inspector operacional e acoes propostas.
7. Especificar os componentes obrigatorios e os estados obrigatorios, sempre ligados a modulo, etapa, blockers, route, approval risk e next safe action.
8. Definir tokens de design: cor, tipografia, espacamento, sombras, raios, motion, badges, chips e niveis de superficie.
9. Marcar o que deve vir do frontend atual, o que precisa ser refatorado e o que deve ser criado do zero.
10. Produzir um blueprint tecnico de implementacao para o builder do frontend e um checklist de QA visual para o reviewer.

## Output Format

Entregar em portugues com estas secoes:

### 1. Fonte de Verdade Visual

- origem principal
- artefatos usados
- conflitos detectados

### 2. Estrutura do Produto

- telas principais
- fluxo entre telas
- papel de cada tela

### 3. Layout System

- estrutura global
- colunas
- grids
- comportamento responsivo

### 4. Design Tokens

- cores
- tipografia
- espacamento
- superficies
- motion

### 5. Componentes Obrigatorios

- nome
- papel
- dados exibidos
- estados

### 6. Estados Criticos

- empty
- loading
- blocked
- approval
- voice
- error

### 7. Plano de Implementacao

- o que reaproveitar
- o que refatorar
- o que criar do zero
- ordem de entrega

### 8. Checklist de QA

- fidelidade visual
- responsividade
- governanca
- legibilidade
- consistencia

## Regras Operacionais

- O Jarvis nao pode parecer um chatbot generico.
- O frontend deve mostrar estrutura, contexto e governanca, nao so conversa.
- Toda tela relevante precisa expor estado atual, risco e proximo passo seguro.
- Nao criar estetica desconectada da operacao do sistema.
- Priorizar arquitetura de layout e hierarquia antes de polish.
- Preservar o que ja funciona no frontend atual quando isso nao reduzir qualidade.

## Bundled Resources

- Ler `docs/torq-os/03-orchestration/jarvis-frontend-spec.md`.
- Ler `docs/torq-os/03-orchestration/jarvis-api-contract.md`.
- Ler `docs/torq-os/03-orchestration/torq-agent-context-runtime.md`.
- Ler `docs/torq-os/04-design-later/google-stitch-jarvis-mega-prompt.md`.
- Ler `docs/torq-os/04-design-later/torq-frontend-implementation-architecture.md` quando existir.

## Edge Cases

- Se o Stitch e o frontend atual divergirem muito: priorizar o sistema operacional do Jarvis e registrar as divergencias.
- Se houver imagens bonitas mas sem estado operacional: completar a arquitetura antes de implementar.
- Se a referencia for forte visualmente mas fraca em UX: preservar o clima, nao a estrutura ruim.
- Se faltarem estados de bloqueio, aprovacao ou carregamento: considerar a referencia incompleta e especificar esses estados manualmente.

## Examples

### Exemplo 1

Input: "Transforma esse prompt do Stitch e essas screenshots na arquitetura do Jarvis."

Output: "A skill deve devolver telas, componentes, layout, tokens, estados criticos e ordem de implementacao."

### Exemplo 2

Input: "Quero saber se o frontend atual suporta o cockpit do Jarvis ou se precisamos reestruturar."

Output: "A skill deve comparar frontend atual vs cockpit alvo e devolver o que reaproveitar, refatorar e criar do zero."
