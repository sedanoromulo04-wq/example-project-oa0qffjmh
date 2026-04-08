#!/usr/bin/env python
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any


REFERENCE_SECTION_LABELS: list[tuple[str, str]] = [
    ("01._capa_monumental", "Capa monumental"),
    ("02._p_gina_manifesto", "Pagina manifesto"),
    ("03._sum_rio_editorial_opener", "Sumario editorial opener"),
    ("04._abertura_de_cap_tulo", "Abertura de capitulo"),
    ("05._p_gina_de_diagn_stico", "Pagina de diagnostico"),
    ("06._p_gina_de_posicionamento", "Pagina de posicionamento"),
    ("07._sistema_verbal", "Sistema verbal"),
    ("08._sistema_visual", "Sistema visual"),
    ("09._conte_do_editorial", "Conteudo editorial"),
    ("10._roadmap_e_fechamento", "Roadmap e fechamento"),
]


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def dump_json(path: Path, payload: Any) -> None:
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def md_list(items: list[str]) -> str:
    if not items:
        return "- Nenhum item registrado"
    return "\n".join(f"- {item}" for item in items)


def resolve_reference_library(explicit_path: str | None) -> Path | None:
    candidates: list[Path] = []
    if explicit_path:
        candidates.append(Path(explicit_path))

    env_path = os.environ.get("TORQ_STITCH_REFERENCE_LIBRARY")
    if env_path:
        candidates.append(Path(env_path))

    skill_root = Path(__file__).resolve().parent.parent
    candidates.append(skill_root / "assets" / "stitch-reference-library")

    for ancestor in Path(__file__).resolve().parents:
        candidates.append(ancestor / "stitch")
        candidates.append(ancestor / "Stitch")

    seen: set[Path] = set()
    for candidate in candidates:
        resolved = candidate.expanduser().resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        if resolved.exists() and resolved.is_dir():
            return resolved
    return None


def build_reference_map(reference_library: Path | None) -> list[str]:
    if reference_library is None:
        return []

    items: list[str] = []
    for folder_name, label in REFERENCE_SECTION_LABELS:
        folder = reference_library / folder_name
        if folder.exists():
            items.append(
                f"{label}: {folder_name} (usar screen.png para composicao e code.html para estrutura)"
            )
    return items


def build_reference_guidance(reference_library: Path | None) -> str:
    if reference_library is None:
        return """## Biblioteca local de referencia

- Biblioteca nao encontrada automaticamente.
- Registrar no handoff que a camada de referencia do Livrobrand nao foi aplicada.
- Manter a estrategia e o plano visual, sem inventar uma falsa aderencia ao acervo local.
"""

    north_star = reference_library / "foundry_archive" / "DESIGN.md"
    reference_map = build_reference_map(reference_library)
    return f"""## Biblioteca local de referencia

- Caminho: {reference_library}
- Ler primeiro: {north_star}
- Consultar cada secao relevante pelos pares `screen.png` + `code.html`
- Usar a biblioteca como gramatica editorial, sem copiar literalmente texto, imagem ou dados

### Mapa de secoes da biblioteca

{md_list(reference_map)}
"""


def build_design_md(
    bundle: dict[str, Any],
    visual_plan: dict[str, Any],
    reference_library: Path | None,
) -> str:
    summary = bundle["executive_summary"]
    positioning = bundle["positioning"]
    verbal = bundle["verbal_identity"]
    visual = bundle["visual_system"]
    market = bundle["market_map"]
    reference_guidance = build_reference_guidance(reference_library)
    return f"""# DESIGN.md

## Projeto

- Cliente: {bundle['meta']['client_name']}
- Slug: {bundle['meta']['project_slug']}
- Objetivo: construir um Brand Bible premium com estética de livro fundador

## Tese central

{positioning['message']}

## North star visual

{visual['north_star']}

## Fit e estágio

- Estágio: {summary.get('stage', 'n/d')}
- Fit: {summary.get('fit', 'n/d')}

## O que esta marca precisa transmitir

{md_list(visual['creative_direction'].get('mood_words', []))}

## Tensão visual

{visual['creative_direction'].get('visual_tension', '')}

## Paleta conceitual

{md_list(visual['creative_direction'].get('palette_notes', []))}

## Tipografia conceitual

{md_list(visual['creative_direction'].get('type_notes', []))}

## Regras editoriais

{md_list(visual.get('editorial_rules', []))}

{reference_guidance}

## O que evitar

{md_list(summary.get('gaps', []))}
- Não parecer infoproduto barato
- Não parecer deck genérico
- Não usar estética de guru
- Não tratar esporte como lifestyle vazio

## Sistema verbal

- Headline: {verbal['headline']}
- Bio: {verbal['bio']}
- Pitch curto: {verbal['pitch_short']}
- Voz: {verbal['voice']}
- Tom: {verbal['tone']}

## Módulos obrigatórios do livro

{md_list([
    "Capa",
    "Manifesto",
    "Diagnóstico executivo",
    "Mercado e concorrência",
    "Posicionamento",
    "Sistema verbal",
    "Sistema visual",
    "Sistema inicial de conteúdo",
    "Monetização por cenário",
    "Roadmap",
    "Encerramento"
])}

## Mercado

- Categoria: {market['category']}
- Tendências:
{md_list(market.get('trends', []))}

## Direção do Stitch

Gerar o design final diretamente no Stitch com aparência editorial premium.
Priorizar ritmo visual, grandes áreas de respiro, hierarquia tipográfica forte,
capítulos distintos, e consistência entre texto e composição.

## Saída esperada do Stitch

- HTML/CSS exportável ou
- export para Figma com frames consistentes
- documento com qualidade suficiente para virar PDF final
"""


def build_prompt(
    bundle: dict[str, Any],
    visual_plan: dict[str, Any],
    reference_library: Path | None,
) -> str:
    chapters = "\n".join(
        f"- {item['title']}: {item['art_direction']}"
        for item in visual_plan.get("chapter_system", [])
    )
    reference_block = ""
    if reference_library is None:
        reference_block = """
Biblioteca local:
- biblioteca de referencia do Livrobrand nao encontrada automaticamente
- registrar essa ausencia no resultado e nao simular aderencia ao acervo
"""
    else:
        reference_block = f"""
Biblioteca local obrigatoria:
- caminho: {reference_library}
- ler primeiro: {reference_library / 'foundry_archive' / 'DESIGN.md'}
- consultar `screen.png` e `code.html` das secoes relevantes antes de compor o livro
- usar essas referencias como linguagem-base para os proximos livrosbrand
- preservar ritmo, respiro, tipografia, tensao visual e sobriedade editorial
"""

    return f"""Criar no Stitch um Brand Bible premium para {bundle['meta']['client_name']}.

Contexto:
- especialidade: {bundle['market_map']['category']}
- promessa: {bundle['positioning']['promise']}
- mecanismo: {bundle['positioning']['mechanism']}
- mensagem central: {bundle['positioning']['message']}
- north star visual: {bundle['visual_system']['north_star']}

Direção:
- estética editorial
- livro fundador
- sobriedade premium
- autoridade técnica
- sem estética de guru
- sem layout genérico de marketing digital

Tipografia:
- display: {bundle['visual_system']['typography']['display']}
- body: {bundle['visual_system']['typography']['body']}

Paleta base:
{md_list(bundle['visual_system']['palette'])}

Capítulos obrigatórios:
{chapters}

{reference_block}

Entregar:
- composição final do livro
- sistema de páginas consistente
- layout pronto para export HTML/CSS ou Figma
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Gera o handoff para Stitch a partir do bundle do Torq.")
    parser.add_argument("--bundle", required=True, help="Caminho para o brand-bundle.json.")
    parser.add_argument("--visual-plan", required=True, help="Caminho para o visual-plan.json.")
    parser.add_argument("--output", required=True, help="Diretório de saída do handoff.")
    parser.add_argument(
        "--reference-library",
        help="Caminho opcional para a biblioteca local de referencias do Stitch/Livrobrand.",
    )
    args = parser.parse_args()

    bundle = load_json(Path(args.bundle))
    visual_plan = load_json(Path(args.visual_plan))
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    reference_library = resolve_reference_library(args.reference_library)

    design_md = build_design_md(bundle, visual_plan, reference_library)
    prompt = build_prompt(bundle, visual_plan, reference_library)
    reference_sections = build_reference_map(reference_library)

    (output_dir / "DESIGN.md").write_text(design_md, encoding="utf-8")
    (output_dir / "stitch-prompt.md").write_text(prompt, encoding="utf-8")
    dump_json(
        output_dir / "stitch-run.json",
        {
            "client_name": bundle["meta"]["client_name"],
            "bundle_path": str(Path(args.bundle)),
            "visual_plan_path": str(Path(args.visual_plan)),
            "reference_library_path": str(reference_library) if reference_library else None,
            "reference_sections": reference_sections,
            "required_output": ["HTML/CSS export", "ou Figma export", "ou páginas consistentes do livro"],
            "status": "ready_for_stitch_mcp",
        },
    )
    print(f"Handoff do Stitch gerado em: {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
