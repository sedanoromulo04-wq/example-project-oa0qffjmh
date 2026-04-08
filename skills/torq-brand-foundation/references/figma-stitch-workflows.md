# Figma + Stitch Workflows

Usar este arquivo quando a skill precisar transformar estratégia em sistema visual, template e handoff de design.

## 1. Situação atual

Não há MCP configurado nesta sessão.

Portanto, o workflow atual deve:

- pesquisar referências e seguir padrões oficiais
- gerar assets e layouts-base localmente
- preparar saída compatível com futura integração por API ou MCP

## 2. O que Figma oferece de forma útil para esta skill

### Figma REST API

A documentação oficial informa que a API REST permite:

- acessar arquivos
- extrair objetos e layers
- trabalhar com imagens
- comentar
- usar webhooks

Referência:
- `https://developers.figma.com/docs/rest-api/`

Trechos úteis:
- base URL: `https://api.figma.com`
- leitura estruturada de arquivos e nodes
- inspeção JSON do arquivo

### Figma Make templates

O help oficial do Figma Make mostra um fluxo muito útil para o Torq:

- construir um arquivo base polido
- publicar esse arquivo como template
- controlar guidelines no `guidelines.md`
- permitir experimentação sem perder consistência de estilo

Referência:
- `https://help.figma.com/hc/en-us/articles/34716344138519-Create-and-update-a-template-in-Figma-Make`

Ideia prática para o Torq:

- manter um arquivo-mestre do Brand Bible
- publicar um template por família de cliente
- restringir o que pode mudar em layouts, cor, grids e componentes

### Figma templates de apoio

Usar a Figma como biblioteca viva de referências para:

- brand guidelines
- workshops de marca
- estruturas editoriais

Referências:
- `https://www.figma.com/templates/brand-guidelines-template/`
- `https://www.figma.com/templates/branding-workshop-template/`
- `https://www.figma.com/solutions/ai-brand-guideline-generator/`

## 3. O que Stitch oferece de forma útil para esta skill

Segundo o anúncio oficial de I/O 2025:

- Stitch gera UI por prompt natural ou imagem
- permite iterar conversacionalmente
- permite ajustar temas
- exporta para CSS/HTML ou Figma

Referência:
- `https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-developer-updates-io-2025/`

Segundo o anúncio do Google Labs:

- Stitch com Gemini 3 melhorou a qualidade da geração
- ganhou Prototypes para conectar telas e fluxos

Referência:
- `https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-gemini-3/`

Uso prático no Torq:

- explorar rotas de layout para o Brand Bible
- explorar estruturas editoriais e módulos
- validar rapidamente diferentes sistemas de navegação visual
- exportar HTML/CSS como base de composição

## 4. Workflow recomendado para o Torq

### Workflow A — Estratégia para wireframe

1. Consolidar posicionamento e sistema verbal
2. Gerar JSON do visual plan com Gemini
3. Consultar a biblioteca local `assets/stitch-reference-library/` e ler primeiro `assets/stitch-reference-library/foundry_archive/DESIGN.md`
4. Traduzir esse plano em módulos de página usando as referencias locais como gramática editorial
5. Prototipar a sequência do Brand Bible

### Workflow B — Wireframe para template

1. Escolher uma rota editorial a partir das referencias locais de capa, manifesto, opener, capitulos e fechamento
2. Estruturar layout-base de capa, sumário e capítulos
3. Padronizar grids, margens, chamadas, citações e tabelas observando `code.html` e `screen.png`
4. Fixar o template em HTML/CSS e, se desejado, espelhar em Figma Make

### Workflow C — Template para escala

1. Criar arquivo-fonte consistente
2. Publicar template no Figma Make
3. Registrar guidelines de modificação
4. Manter uma família de templates por tipo de especialista

## 5. Biblioteca local de referencia do Livrobrand

Antes de gerar qualquer handoff final, consultar a biblioteca local de referencia em:

- `assets/stitch-reference-library/`

Procedimento minimo:

1. Ler `foundry_archive/DESIGN.md`.
2. Abrir `screen.png` das secoes relevantes para entender ritmo e hierarquia.
3. Abrir `code.html` das mesmas secoes para extrair grid, espacamento, tokens e padroes de composicao.
4. Mapear cada secao do novo livro a uma ou mais referencias da biblioteca.
5. Registrar no handoff o que deve ser preservado e o que deve ser reinterpretado.

## 6. Handoff recomendado

### Saída mínima para Figma

- `brand_bundle.json`
- pasta `images/`
- mapa de capítulos
- regras de tipografia
- tokens de cor
- notas de layout

### Saída mínima para Stitch

- manifesto visual resumido
- lista de módulos editoriais
- prompts por tipo de página
- exemplos de transição e hierarquia
- mapa de equivalencia entre secoes do livro atual e pastas da biblioteca local

## 7. Regras de composição premium

- usar ritmo editorial e páginas de respiro
- variar densidade de texto ao longo do documento
- usar imagens como amplificação de tese, não decoração vazia
- tratar capa, divisórias e manifesto como páginas de alto impacto
- manter consistência radical entre verbal e visual

## 8. Como pensar MCP no futuro

Quando houver um MCP real disponível, priorizar:

- `figma-files` para leitura de templates e tokens
- `figma-images` para export de frames
- `figma-comments` para revisão interna
- `stitch-export` para trazer HTML/CSS ou variações de layout

Até lá, manter o pipeline atual desacoplado e baseado em arquivos.

## 9. Referências oficiais usadas

- Figma REST API: `https://developers.figma.com/docs/rest-api/`
- Figma Make templates: `https://help.figma.com/hc/en-us/articles/34716344138519-Create-and-update-a-template-in-Figma-Make`
- Figma brand guidelines template: `https://www.figma.com/templates/brand-guidelines-template/`
- Figma branding workshop template: `https://www.figma.com/templates/branding-workshop-template/`
- Figma AI brand guidelines generator: `https://www.figma.com/solutions/ai-brand-guideline-generator/`
- Stitch at Google I/O 2025: `https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-developer-updates-io-2025/`
- Stitch with Gemini 3 update: `https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-gemini-3/`
