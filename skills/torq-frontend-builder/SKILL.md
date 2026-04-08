---
name: torq-frontend-builder
description: >
  Implementa o frontend do Torq com fidelidade visual ao Stitch, Figma, imagens
  de referencia e arquitetura aprovada. Usar quando o pedido envolver "construir
  tela", "implementar layout", "fazer o frontend ficar igual", "traduzir o design
  em codigo", "criar componentes", "montar estados de interface", "ajustar responsividade"
  ou evolucao visual ampla do Jarvis. Nao use para decidir arquitetura do zero,
  redefinir estrategia do produto, conectar ferramentas MCP sem plano, ou fazer
  apenas revisao final sem implementar codigo.
---

# Torq Frontend Builder

Construir o frontend com fidelidade, ritmo visual e coerencia operacional. A
implementacao deve parecer intencional, premium e funcional, nunca um wireframe
bonito sem lastro no sistema.

## Workflow
1. Ler a arquitetura de frontend, o prompt do Stitch, imagens, exports visuais e o codigo atual.
2. Identificar exatamente qual tela, secao ou estado sera implementado neste ciclo.
3. Mapear os componentes que ja existem e decidir o que reaproveitar, refatorar ou substituir.
4. Implementar primeiro a estrutura principal: layout, containers, superficies, colunas e hierarquia.
5. Implementar os componentes de maior peso visual e operacional: transcript, session cards, inspector, composer, badges, blockers e modais.
6. Aplicar tokens visuais consistentes de cor, tipografia, espacamento, radius, sombra e motion.
7. Garantir que os dados exibidos tenham aderencia ao contrato do Jarvis e do Supabase.
8. Tratar responsividade como parte da implementacao, nao como remendo final.
9. Validar os estados criticos da interface: vazio, loading, blocked, approval, error e interactive.
10. Encerrar com build limpo, resumo dos ajustes e pontos que ainda dependem de design ou backend.

## Output Format

Responder com foco em:

### 1. O que foi implementado
- areas alteradas
- comportamento esperado

### 2. O que foi preservado
- componentes reaproveitados
- padroes mantidos

### 3. O que ainda falta
- dependencias externas
- partes bloqueadas

## Regras Operacionais

- Construir com fidelidade ao Stitch, sem copiar cegamente erros de UX.
- Nao simplificar o Jarvis para um chat comum.
- Nao usar UI generica de dashboard quando o contexto pede cockpit operacional.
- Garantir legibilidade e operabilidade em desktop e mobile.
- Preservar consistencia do codigo existente quando isso nao degradar o resultado.
- Validar o build sempre que possivel.

## Bundled Resources

- Ler `docs/torq-os/04-design-later/google-stitch-jarvis-mega-prompt.md`.
- Ler `docs/torq-os/04-design-later/torq-frontend-implementation-architecture.md`.
- Ler `docs/torq-os/03-orchestration/jarvis-api-contract.md`.
- Usar o frontend em `Antigravity Skill/Antigravity skills/torq-central/frontend/` como base de implementacao.

## Edge Cases

- Se o design importado for bonito mas impraticavel: ajustar mantendo a atmosfera visual.
- Se o backend ainda nao expor um dado: criar estado claro de placeholder ou loading, sem mentir informacao.
- Se a referencia visual depender de assets externos ausentes: registrar a dependencia e construir uma fallback premium.
- Se um componente antigo atrapalhar a fidelidade final: substituir em vez de insistir no reaproveitamento.

## Examples

### Exemplo 1
Input: "Implemente a tela principal do Jarvis com base nessas imagens e no blueprint aprovado."

Output: "A skill deve codificar layout, componentes centrais, inspector e estados principais."

### Exemplo 2
Input: "Quero que o login e o cockpit fiquem com o visual do Stitch, mas sem quebrar o que ja funciona."

Output: "A skill deve traduzir o design para codigo preservando integracoes e build limpo."
