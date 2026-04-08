#!/usr/bin/env python
from __future__ import annotations

import argparse
import base64
import json
import os
import re
import textwrap
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DEFAULT_STRATEGY_MODEL = "gemini-2.5-flash"
DEFAULT_IMAGE_MODEL = "gemini-3.1-flash-image-preview"
DEFAULT_PREMIUM_IMAGE_MODEL = "gemini-3-pro-image-preview"


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "project"


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, payload: Any) -> None:
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def post_json(url: str, payload: dict[str, Any], api_key: str) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Gemini API error {exc.code}: {detail}") from exc


def extract_text(response: dict[str, Any]) -> str:
    candidates = response.get("candidates", [])
    if not candidates:
        raise ValueError("Gemini response did not include candidates.")
    parts = candidates[0].get("content", {}).get("parts", [])
    text_parts = [part.get("text", "") for part in parts if "text" in part]
    if not text_parts:
        raise ValueError("Gemini response did not include text parts.")
    return "".join(text_parts).strip()


def extract_inline_images(response: dict[str, Any]) -> list[dict[str, Any]]:
    candidates = response.get("candidates", [])
    if not candidates:
        return []
    parts = candidates[0].get("content", {}).get("parts", [])
    return [part["inlineData"] for part in parts if "inlineData" in part]


def visual_plan_schema() -> dict[str, Any]:
    return {
        "type": "object",
        "properties": {
            "client_name": {"type": "string"},
            "north_star": {"type": "string"},
            "creative_direction": {
                "type": "object",
                "properties": {
                    "mood_words": {"type": "array", "items": {"type": "string"}},
                    "visual_tension": {"type": "string"},
                    "palette_notes": {"type": "array", "items": {"type": "string"}},
                    "type_notes": {"type": "array", "items": {"type": "string"}},
                    "layout_notes": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["mood_words", "visual_tension", "palette_notes", "type_notes", "layout_notes"],
            },
            "chapter_system": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "slug": {"type": "string"},
                        "title": {"type": "string"},
                        "layout_role": {"type": "string"},
                        "art_direction": {"type": "string"},
                    },
                    "required": ["slug", "title", "layout_role", "art_direction"],
                },
            },
            "image_prompts": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "role": {"type": "string"},
                        "aspect_ratio": {"type": "string"},
                        "image_size": {"type": "string"},
                        "prompt": {"type": "string"},
                    },
                    "required": ["id", "role", "aspect_ratio", "image_size", "prompt"],
                },
            },
            "layout_prompts": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "role": {"type": "string"},
                        "prompt": {"type": "string"},
                    },
                    "required": ["id", "role", "prompt"],
                },
            },
        },
        "required": ["client_name", "north_star", "creative_direction", "chapter_system", "image_prompts", "layout_prompts"],
    }


def build_strategy_prompt(brief: dict[str, Any]) -> str:
    brief_dump = json.dumps(brief, ensure_ascii=False, indent=2)
    return textwrap.dedent(
        f"""
        Você é diretor de criação editorial do Grupo Torq.
        Converter o briefing abaixo em um visual plan para um Brand Bible premium.

        Regras:
        - responder somente JSON válido aderente ao schema
        - criar uma direção visual sóbria, editorial, premium e orientada a autoridade
        - evitar estética de guru, layout genérico de marketing digital e excesso de efeitos
        - tratar branding como infraestrutura para conversão futura
        - escrever todos os campos em português
        - criar prompts de imagem prontos para Gemini Image
        - considerar que a composição final será em HTML/CSS com aspecto de livro fundador

        Briefing:
        {brief_dump}
        """
    ).strip()


def fallback_visual_plan(brief: dict[str, Any]) -> dict[str, Any]:
    client_name = brief["client_name"]
    niche = brief.get("niche", "especialidade")
    values = ", ".join(brief.get("values", [])[:4]) or "técnica, sobriedade e autoridade"
    return {
        "client_name": client_name,
        "north_star": f"Documento editorial que transforma {client_name} em referência sóbria e memorável em {niche}.",
        "creative_direction": {
            "mood_words": ["editorial", "sóbrio", "premium", "técnico"],
            "visual_tension": "seriedade silenciosa com magnetismo controlado",
            "palette_notes": [
                "papel quente com sensação de livro de coleção",
                "navy ou carvão como tinta principal",
                "terracota controlado para acento",
            ],
            "type_notes": [
                "serif expressiva para títulos e manifestos",
                "sans limpa e moderna para leitura longa",
            ],
            "layout_notes": [
                "capítulos com páginas de respiro",
                "mistura de páginas densas e spreads hero",
                "hierarquia forte e modular",
            ],
        },
        "chapter_system": [
            {"slug": "diagnostico", "title": "Diagnóstico", "layout_role": "dense", "art_direction": "dados, clareza, precisão"},
            {"slug": "posicionamento", "title": "Posicionamento", "layout_role": "hero", "art_direction": "tese, contraste, manifesto"},
            {"slug": "sistema-visual", "title": "Sistema Visual", "layout_role": "showcase", "art_direction": "paleta, tipografia, composição e ritmo"},
        ],
        "image_prompts": [
            {
                "id": "cover-hero",
                "role": "cover",
                "aspect_ratio": "4:5",
                "image_size": "2K",
                "prompt": (
                    f"Criar arte editorial premium para a capa de um brand bible de {client_name}, especialista em {niche}. "
                    f"Atmosfera: {values}. Estilo: livro fundador contemporâneo, sobriedade luxuosa, textura de papel quente, "
                    "contraste entre profundidade e clareza, sem estética de guru, sem clichês de marketing, sem tipografia renderizada."
                ),
            },
            {
                "id": "chapter-divider",
                "role": "divider",
                "aspect_ratio": "16:9",
                "image_size": "2K",
                "prompt": (
                    f"Criar arte abstrata editorial para divisória de capítulo do brand bible de {client_name}. "
                    "Formas orgânicas e geométricas equilibradas, ritmo silencioso, tinta escura, terracota controlado, "
                    "textura refinada de impressão premium, sem excesso de ornamento."
                ),
            },
            {
                "id": "content-texture",
                "role": "support",
                "aspect_ratio": "1:1",
                "image_size": "1K",
                "prompt": (
                    "Criar textura visual de apoio para páginas de conteúdo de um brand bible premium, "
                    "com camadas discretas, profundidade de papel, tinta suave, ar sofisticado, editorial e técnico."
                ),
            },
        ],
        "layout_prompts": [
            {
                "id": "cover-layout",
                "role": "editorial-layout",
                "prompt": "Layout de capa com tipografia serif dominante, selo discreto, grande área de respiro e painel lateral para arte hero.",
            },
            {
                "id": "chapter-layout",
                "role": "editorial-layout",
                "prompt": "Layout de capítulo com kicker em caixa alta, título monumental, colunas assimétricas e cartões de síntese para fatos, inferências e hipóteses.",
            },
        ],
    }


def request_structured_plan(api_key: str, model: str, brief: dict[str, Any]) -> dict[str, Any]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    payload = {
        "contents": [{"parts": [{"text": build_strategy_prompt(brief)}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseJsonSchema": visual_plan_schema(),
        },
    }
    response = post_json(url, payload, api_key)
    return json.loads(extract_text(response))


def request_image(api_key: str, model: str, prompt: str, aspect_ratio: str, image_size: str) -> tuple[str | None, list[dict[str, Any]]]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "imageConfig": {"aspectRatio": aspect_ratio, "imageSize": image_size},
        },
    }
    response = post_json(url, payload, api_key)
    try:
        text_result = extract_text(response)
    except ValueError:
        text_result = None
    return text_result, extract_inline_images(response)


def write_images(output_dir: Path, prompts: list[dict[str, Any]], api_key: str | None, quick_model: str, premium_model: str, dry_run: bool) -> list[dict[str, Any]]:
    images_dir = output_dir / "images"
    images_dir.mkdir(parents=True, exist_ok=True)
    assets: list[dict[str, Any]] = []
    for prompt_spec in prompts:
        role = prompt_spec["role"]
        model = premium_model if role in {"cover", "hero"} else quick_model
        asset_name = f"{prompt_spec['id']}.png"
        asset_path = images_dir / asset_name
        if dry_run or not api_key:
            assets.append(
                {
                    "id": prompt_spec["id"],
                    "role": role,
                    "path": f"images/{asset_name}",
                    "caption": f"Placeholder para {prompt_spec['id']}",
                    "prompt": prompt_spec["prompt"],
                    "model": model,
                    "status": "planned",
                }
            )
            continue

        try:
            text_result, blobs = request_image(api_key, model, prompt_spec["prompt"], prompt_spec["aspect_ratio"], prompt_spec["image_size"])
            status = "missing-image"
            if blobs:
                asset_path.write_bytes(base64.b64decode(blobs[0]["data"]))
                status = "generated"
            error_message = None
        except Exception as exc:
            text_result = None
            blobs = []
            status = "planned"
            error_message = str(exc)
        assets.append(
            {
                "id": prompt_spec["id"],
                "role": role,
                "path": f"images/{asset_name}",
                "caption": text_result or f"Asset gerado para {prompt_spec['id']}",
                "prompt": prompt_spec["prompt"],
                "model": model,
                "status": status,
                "error": error_message,
            }
        )
    return assets


def build_brand_bundle(brief: dict[str, Any], visual_plan: dict[str, Any], image_assets: list[dict[str, Any]]) -> dict[str, Any]:
    return {
        "meta": {
            "client_name": brief["client_name"],
            "project_slug": brief.get("project_slug") or slugify(brief["client_name"]),
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
        "theme": {"paper": "#f6f1e8", "ink": "#101820", "accent": "#9a5c3f", "accent_soft": "#d8b59a"},
        "executive_summary": {
            "stage": brief.get("persona_type", "indefinido"),
            "fit": "fit presumido para Fase 1",
            "gaps": brief.get("constraints", []),
        },
        "facts": brief.get("proof_points", []),
        "inferences": [
            "A marca precisa converter autoridade existente em percepção digital consistente.",
            "O visual deve elevar valor percebido sem descolar da sobriedade do especialista.",
        ],
        "hypotheses": [
            "Uma direção editorial premium aumentará a confiança na futura oferta digital.",
            "A combinação de manifesto forte e visual sóbrio tende a diferenciar o cliente dos concorrentes genéricos.",
        ],
        "market_map": {
            "category": brief.get("niche", "Categoria não informada"),
            "trends": [
                "Mercados de experts seguem premiando clareza, prova e diferenciação narrativa.",
                "Estética genérica de infoproduto reduz percepção de sofisticação.",
            ],
            "opportunities": [
                "Transformar reputação local em ativo digital estruturado.",
                "Criar uma categoria verbal e visual menos ruidosa.",
            ],
            "risks": [
                "Comoditização do nicho se a comunicação ficar genérica.",
                "Perda de autoridade se o visual soar performático.",
            ],
        },
        "competitive_map": [
            {
                "name": name,
                "type": "referência percebida",
                "angle": "concorrente ou benchmark citado no briefing",
                "gap": "espaço para elevar sofisticação editorial e clareza do método",
            }
            for name in brief.get("competitors", [])
        ],
        "positioning": {
            "territory": visual_plan["north_star"],
            "promise": "Transformar conhecimento validado em percepção de autoridade organizada.",
            "mechanism": "Brand Foundation orientado a conversão",
            "differentiation": "Sobriedade editorial, rigor estratégico e sistema visual premium.",
            "message": "A marca precisa parecer tão séria quanto o conhecimento que sustenta o especialista.",
        },
        "verbal_identity": {
            "voice": "Clara, segura, técnica e sem performance desnecessária.",
            "tone": "Calmo, convincente, sóbrio e objetivo.",
            "allowed_words": ["método", "clareza", "estrutura", "prova", "autoridade"],
            "forbidden_words": ["hack", "segredo", "explodir", "viralizar", "guru"],
            "headline": f"{brief['client_name']} com presença de marca à altura do próprio método.",
            "bio": f"{brief['client_name']} traduz experiência validada em uma marca clara, respeitável e pronta para crescer.",
            "pitch_short": "Especialista validado, marca estruturada, base pronta para conversão.",
            "manifesto": visual_plan["north_star"],
        },
        "visual_system": {
            "north_star": visual_plan["north_star"],
            "palette": ["#101820", "#f6f1e8", "#9a5c3f", "#d8b59a"],
            "typography": {"display": "Cormorant Garamond", "body": "IBM Plex Sans"},
            "editorial_rules": visual_plan["creative_direction"]["layout_notes"],
            "image_assets": image_assets,
            "creative_direction": visual_plan["creative_direction"],
        },
        "content_system": {
            "pillars": ["autoridade técnica", "método próprio", "contraste com soluções genéricas"],
            "series": ["bastidores do método", "diagnósticos do mercado", "prova e transformação de cliente"],
            "formats": ["carrossel editorial", "vídeo curto com tese", "manifesto visual", "post de prova"],
            "cta": ["puxar para diagnóstico", "convite para lista de espera", "conversa sobre estruturação"],
        },
        "commercial_readiness": {
            "offer_paths": ["Diagnóstico premium", "Mentoria estruturada", "Oferta principal com VSL futura"],
            "roi_scenarios": [
                "Cenário conservador: ganho de percepção e clareza comercial antes de mídia paga.",
                "Cenário intermediário: melhora de conversão com narrativa e presença organizadas.",
                "Cenário agressivo: base pronta para VSL, funil e escala após prova de execução.",
            ],
            "next_steps": ["Refinar oferta e mecanismo", "Definir VSL", "Montar funil", "Preparar tráfego"],
        },
        "roadmap": {
            "30_days": ["fechar posicionamento", "aplicar identidade", "iniciar conteúdo-base"],
            "60_days": ["rodar sistema de conteúdo", "testar messaging", "estruturar oferta"],
            "90_days": ["validar prova social", "produzir VSL", "preparar funil"],
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Gera o bundle inicial do Torq Brand Foundation usando Gemini.")
    parser.add_argument("--brief", required=True, help="Caminho para o JSON de briefing do cliente.")
    parser.add_argument("--output", required=True, help="Diretório de saída.")
    parser.add_argument("--strategy-model", default=DEFAULT_STRATEGY_MODEL)
    parser.add_argument("--image-model", default=DEFAULT_IMAGE_MODEL)
    parser.add_argument("--premium-image-model", default=DEFAULT_PREMIUM_IMAGE_MODEL)
    parser.add_argument("--dry-run", action="store_true", help="Não chama a API; gera artefatos planejados.")
    args = parser.parse_args()

    brief_path = Path(args.brief)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    brief = load_json(brief_path)
    api_key = os.getenv("GEMINI_API_KEY")
    visual_plan = fallback_visual_plan(brief)
    if api_key and not args.dry_run:
        visual_plan = request_structured_plan(api_key, args.strategy_model, brief)

    save_json(output_dir / "visual-plan.json", visual_plan)
    image_assets = write_images(output_dir, visual_plan["image_prompts"], api_key, args.image_model, args.premium_image_model, args.dry_run)
    bundle = build_brand_bundle(brief, visual_plan, image_assets)
    save_json(output_dir / "brand-bundle.json", bundle)
    save_json(
        output_dir / "manifest.json",
        {
            "brief": str(brief_path),
            "visual_plan_path": str(output_dir / "visual-plan.json"),
            "brand_bundle_path": str(output_dir / "brand-bundle.json"),
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "strategy_model": args.strategy_model,
            "image_model": args.image_model,
            "premium_image_model": args.premium_image_model,
            "dry_run": args.dry_run or not api_key,
            "note": "Sem GEMINI_API_KEY o pipeline gera bundle e assets planejados, prontos para refino posterior.",
        },
    )
    print(f"Arquivos gerados em: {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
