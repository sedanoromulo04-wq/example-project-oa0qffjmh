# Output Schema

Usar este arquivo como contrato mínimo entre pesquisa, geração visual e composição editorial.

## 1. Brand brief de entrada

```json
{
  "client_name": "Nome do especialista",
  "project_slug": "nome-do-projeto",
  "niche": "Nicho principal",
  "subniche": "Subnicho ou recorte",
  "persona_type": "persona_1 | persona_2",
  "history": "Resumo profissional",
  "offers": [
    {
      "name": "Oferta atual",
      "type": "curso | consultoria | mentoria | serviço",
      "price": "R$ 0"
    }
  ],
  "proof_points": ["Case 1", "Depoimento forte", "Autoridade visível"],
  "goals": ["Estruturar marca", "Preparar entrada no digital"],
  "constraints": ["Não soar guru", "Não usar estética genérica"],
  "values": ["Família", "Sobriedade", "Técnica"],
  "channels": ["Instagram", "YouTube"],
  "competitors": ["Concorrente A", "Concorrente B"],
  "visual_references": [
    {
      "label": "Referência editorial",
      "url": "https://..."
    }
  ]
}
```

## 2. Visual plan intermediário

```json
{
  "client_name": "Nome do especialista",
  "north_star": "Frase que resume a direção visual",
  "creative_direction": {
    "mood_words": ["sóbrio", "editorial", "técnico"],
    "visual_tension": "seriedade com magnetismo",
    "palette_notes": ["navy profundo", "papel quente", "terracota controlado"],
    "type_notes": ["serif expressiva para títulos", "sans limpa para leitura"]
  },
  "chapter_system": [
    {
      "slug": "diagnostico",
      "title": "Diagnóstico",
      "layout_role": "dense"
    }
  ],
  "image_prompts": [
    {
      "id": "cover-hero",
      "role": "cover",
      "aspect_ratio": "4:5",
      "image_size": "2K",
      "prompt": "Prompt final de imagem"
    }
  ]
}
```

## 3. Brand bundle final

```json
{
  "meta": {
    "client_name": "Nome do especialista",
    "project_slug": "nome-do-projeto",
    "created_at": "2026-04-05T18:00:00Z"
  },
  "theme": {
    "paper": "#f6f1e8",
    "ink": "#101820",
    "accent": "#9a5c3f",
    "accent_soft": "#d8b59a"
  },
  "executive_summary": {
    "stage": "especialista consolidado offline",
    "fit": "fit aprovado",
    "gaps": ["presença digital", "narrativa", "organização visual"]
  },
  "facts": ["..."],
  "inferences": ["..."],
  "hypotheses": ["..."],
  "market_map": {
    "category": "Categoria",
    "trends": ["..."],
    "opportunities": ["..."],
    "risks": ["..."]
  },
  "positioning": {
    "territory": "Território",
    "promise": "Promessa",
    "mechanism": "Mecanismo",
    "differentiation": "Tese de diferenciação",
    "message": "Mensagem central"
  },
  "verbal_identity": {
    "voice": "Descrição da voz",
    "tone": "Descrição do tom",
    "headline": "Headline",
    "bio": "Bio",
    "pitch_short": "Pitch curto",
    "manifesto": "Manifesto curto"
  },
  "visual_system": {
    "north_star": "Direção central",
    "palette": ["#101820", "#f6f1e8", "#9a5c3f"],
    "typography": {
      "display": "Cormorant Garamond",
      "body": "IBM Plex Sans"
    },
    "image_assets": [
      {
        "id": "cover-hero",
        "path": "images/cover-hero.png",
        "caption": "Arte de capa"
      }
    ]
  }
}
```

## 4. Regras do schema

- Todos os textos estratégicos devem ser escritos em português.
- `facts`, `inferences` e `hypotheses` são obrigatórios como listas separadas.
- `visual_system.image_assets` deve conter caminhos relativos ao diretório de saída.
- `commercial_readiness.roi_scenarios` deve mencionar premissas.
- `theme` deve conter variáveis utilizáveis pelo template HTML/CSS.
