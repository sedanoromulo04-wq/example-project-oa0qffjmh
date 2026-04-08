---
name: torq-frontend-qa
description: >
  Revisa o frontend do Torq com foco em fidelidade visual, hierarquia, consistencia,
  responsividade, acessibilidade e alinhamento ao cockpit operacional do Jarvis.
  Usar quando o pedido envolver "review visual", "QA do frontend", "o que esta
  desalinhado", "auditar responsividade", "validar se parece premium", "comparar
  contra Stitch/Figma" ou revisao final antes de aprovar a interface. Nao use
  para implementar a tela do zero, redefinir arquitetura sem contexto, ou revisar
  somente logica de backend.
---

# Torq Frontend QA

Revisar o frontend como produto premium operacional. O objetivo nao e so achar
bug, mas detectar onde a experiencia perdeu clareza, poder visual, governanca
ou consistencia.

## Workflow
1. Ler o blueprint de frontend, o prompt do Stitch, as referencias visuais e o codigo implementado.
2. Comparar a tela implementada contra a fonte de verdade visual e contra o papel operacional da interface.
3. Avaliar hierarquia visual, leitura, contraste, ritmo, espacamento, densidade e uso de superficie.
4. Verificar se transcript, session history, inspector e acoes propostas estao claros e bem priorizados.
5. Validar se estados criticos existem e sao coerentes: loading, blocked, approval, empty, error e voice.
6. Revisar mobile e tablet sem tratar adaptacao como corte bruto da versao desktop.
7. Identificar regressao de identidade: quando algo ficou generico, fraco, poluido ou com cara de dashboard comum.
8. Reportar findings por severidade e com indicacao de arquivo quando aplicavel.
9. Se nao houver findings graves, registrar riscos residuais e pontos de refinamento.

## Output Format

Entregar findings primeiro, ordenados por severidade:

### Findings
- severidade
- problema
- impacto
- referencia de arquivo quando houver

### Riscos Residuais
- gaps nao criticos
- pontos ainda dependentes de asset ou design

### Veredito
- pronto para iterar
- pronto para polir
- pronto para aprovar

## Regras Operacionais

- Priorizar bugs visuais e regressao de UX antes de opinioes subjetivas.
- Tratar genericidade visual como problema real quando o produto precisa parecer diferenciado.
- Nao elogiar uma tela so porque ela esta "limpa"; ela precisa estar correta, clara e poderosa.
- A revisao precisa considerar funcao operacional, nao so estetica.

## Bundled Resources

- Ler `docs/torq-os/04-design-later/torq-frontend-implementation-architecture.md`.
- Ler `docs/torq-os/04-design-later/google-stitch-jarvis-mega-prompt.md`.
- Ler `docs/torq-os/03-orchestration/jarvis-frontend-spec.md`.

## Edge Cases

- Se a implementacao ainda estiver em fase muito inicial: separar o que e bloqueio estrutural do que e polish.
- Se a tela estiver fiel visualmente mas ruim operacionalmente: apontar isso como finding, nao como sucesso.
- Se a responsividade estiver incompleta: marcar como risco operacional, nao como detalhe.

## Examples

### Exemplo 1
Input: "Revise essa implementacao do Jarvis contra o Stitch."

Output: "A skill deve listar findings de fidelidade, hierarquia, estados e responsividade."

### Exemplo 2
Input: "Quero saber se esse frontend ja parece um cockpit premium ou ainda esta genérico."

Output: "A skill deve avaliar identidade visual e apontar exatamente onde caiu para um padrao comum."
