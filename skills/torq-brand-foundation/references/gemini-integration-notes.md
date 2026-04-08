# Gemini Integration Notes

Usar este arquivo ao implementar ou ajustar a camada de IA da skill.

## 1. Papel do Gemini nesta skill

O Gemini cumpre dois papéis diferentes:

- `camada estratégica`: síntese, estruturação, JSON estruturado, prompts e racional
- `camada visual`: geração e edição de imagens, rotas criativas, páginas hero e assets

A skill não deve usar o modelo visual para decidir a estratégia. O modelo visual materializa uma estratégia já decidida.

## 2. Modelos de referência

Modelos usados como defaults no pipeline inicial:

- `gemini-2.5-flash` para síntese rápida e estruturada
- `gemini-3.1-flash-image-preview` para geração visual de alto volume
- `gemini-3-pro-image-preview` para composições premium e páginas críticas

Os nomes ativos dos modelos podem mudar. Confirmar no momento da implementação final.

## 3. Structured output

Usar structured output para gerar:

- visual plans
- shot lists
- schemas do Brand Bible
- metadata de composição

Segundo a documentação oficial do Gemini, o fluxo recomendado é configurar:

- `responseMimeType: "application/json"`
- `responseJsonSchema: {...}`

Referência oficial:
- Gemini structured output: `https://ai.google.dev/gemini-api/docs/structured-output`

## 4. Image generation

Segundo a documentação oficial:

- `gemini-3.1-flash-image-preview` suporta geração e edição de imagem
- multi-turn image editing é recomendado para iterar visualmente
- `responseModalities: ["TEXT", "IMAGE"]` é a configuração certa quando se quer racional + asset

Referência oficial:
- Gemini image generation: `https://ai.google.dev/gemini-api/docs/image-generation`

Pontos úteis do fluxo:

- usar geração inicial para moodboards e rotas
- usar edição multi-turn para refinar uma rota escolhida
- usar controle de `aspectRatio` e `imageSize` nas páginas hero do Brand Bible

## 5. Function calling e MCP

Gemini já suporta function calling e o SDK oficial tem suporte embutido a MCP.

Referência oficial:
- Gemini function calling e MCP: `https://ai.google.dev/gemini-api/docs/function-calling`

Pontos importantes:

- Gemini 3 retorna `id` único em function calls
- o SDK consegue autoexecutar tools MCP em Python e JavaScript
- o suporte embutido a MCP ainda é experimental
- o suporte embutido atual é focado em tools, não resources ou prompts

## 6. O que isso significa para o Torq

Como não há MCP configurado nesta sessão, o pipeline inicial deve:

- funcionar com REST puro e `GEMINI_API_KEY`
- tratar Figma e Stitch como integrações futuras ou externas
- gerar artefatos intermediários que possam ser consumidos por um futuro conector MCP

Ou seja, o pipeline já nasce `MCP-ready`, mesmo sem depender de MCP hoje.

## 7. Workflow recomendado do Gemini

### Fase A — Estratégia visual estruturada

Usar modelo textual para gerar JSON com:
- tese visual
- paleta conceitual
- sistema tipográfico
- shot list
- prompts de hero image
- prompts de divisórias
- prompts de assets auxiliares

### Fase B — Geração de assets

Usar modelo de imagem para gerar:
- hero cover
- chapter opener
- textura ou arte de apoio
- composições editoriais

### Fase C — Curadoria

Avaliar cada asset por:
- aderência ao posicionamento
- clareza
- sofisticação
- consistência
- viabilidade editorial

### Fase D — Composição

Injetar tudo no template editorial do Brand Bible.

## 8. Regras de segurança operacional

- Não afirmar que um asset gerado é identidade final sem curadoria humana.
- Não inferir ROI como certeza.
- Não usar imagem gerada para simular prova social, cases ou resultados inexistentes.
- Não entregar design visual sem manifesto estratégico mínimo.

## 9. Referências oficiais usadas

- Structured output: `https://ai.google.dev/gemini-api/docs/structured-output`
- Image generation: `https://ai.google.dev/gemini-api/docs/image-generation`
- Function calling + MCP: `https://ai.google.dev/gemini-api/docs/function-calling`
- Google AI I/O 2025 updates: `https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-developer-updates-io-2025/`
