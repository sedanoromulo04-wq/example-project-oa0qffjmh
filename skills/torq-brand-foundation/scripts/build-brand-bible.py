#!/usr/bin/env python
from __future__ import annotations

import argparse
import html
import json
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Any


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def escape(value: str) -> str:
    return html.escape(value, quote=True)


def list_items(items: list[str]) -> str:
    if not items:
        return "<p class='text-block'>Nenhum item registrado.</p>"
    return "<ul class='clean'>" + "".join(f"<li>{escape(item)}</li>" for item in items) + "</ul>"


def card(title: str, body: str) -> str:
    return f"<article class='card'><h4>{escape(title)}</h4>{body}</article>"


def section(title: str, inner: str, kicker: str | None = None) -> str:
    kicker_html = f"<p class='chapter-kicker'>{escape(kicker)}</p>" if kicker else ""
    return f"<section class='page section'>{kicker_html}<h2 class='section-title'>{escape(title)}</h2>{inner}</section>"


def chapter(title: str, left: str, right: str, kicker: str) -> str:
    return (
        "<section class='page chapter'>"
        f"<p class='chapter-kicker'>{escape(kicker)}</p>"
        f"<h2 class='chapter-title'>{escape(title)}</h2>"
        f"<div class='chapter-grid'><div>{left}</div><div>{right}</div></div>"
        "</section>"
    )


def figure_gallery(image_assets: list[dict[str, Any]], output_root: Path) -> str:
    if not image_assets:
        return "<p class='text-block'>Nenhum asset visual registrado.</p>"
    figures: list[str] = []
    for asset in image_assets:
        rel_path = asset.get("path", "")
        caption = asset.get("caption", asset.get("id", "Asset visual"))
        asset_file = output_root / rel_path
        if asset_file.exists():
            media = f"<img src='{escape(rel_path)}' alt='{escape(caption)}'>"
        else:
            media = (
                f"<div class='hero-fallback'><h2>{escape(asset.get('id', 'Asset'))}</h2>"
                f"<p>{escape(caption)}</p></div>"
            )
        figures.append(f"<figure>{media}<figcaption>{escape(caption)}</figcaption></figure>")
    return f"<div class='visual-showcase'>{''.join(figures)}</div>"


def persona_card(persona: dict[str, Any]) -> str:
    body = "".join(
        [
            f"<p><strong>Quem e:</strong> {escape(persona.get('who', 'n/d'))}</p>",
            f"<p><strong>Dor principal:</strong> {escape(persona.get('pain', 'n/d'))}</p>",
            f"<p><strong>O que quer:</strong> {escape(persona.get('desire', 'n/d'))}</p>",
            f"<p><strong>Frase:</strong> {escape(persona.get('quote', 'n/d'))}</p>",
        ]
    )
    return f"<article class='card'><h4>{escape(persona.get('name', 'Persona'))}</h4>{body}</article>"


def render_cover(bundle: dict[str, Any], output_root: Path) -> str:
    hero = next((asset for asset in bundle["visual_system"]["image_assets"] if asset["role"] in {"cover", "hero"}), None)
    if hero and (output_root / hero["path"]).exists():
        hero_block = (
            f"<div class='hero-card'><img src='{escape(hero['path'])}' "
            f"alt='{escape(hero.get('caption', 'Arte de capa'))}'></div>"
        )
    else:
        hero_block = (
            "<div class='hero-card'><div class='hero-fallback'><h2>Livro fundador</h2>"
            f"<p>{escape(bundle['visual_system']['north_star'])}</p></div></div>"
        )
    return (
        "<section class='page cover'>"
        "<div class='cover-copy'>"
        "<div>"
        "<span class='eyebrow'>Torq Brand Foundation</span>"
        f"<h1 class='display-title'>{escape(bundle['meta']['client_name'])}</h1>"
        f"<p class='subtitle'>{escape(bundle['positioning']['message'])}</p>"
        "</div>"
        "<div class='seal'>Brand Bible<br>Edition 01</div>"
        "</div>"
        f"<div class='cover-art'>{hero_block}</div>"
        "</section>"
    )


def render_manifesto(bundle: dict[str, Any]) -> str:
    return (
        "<section class='page manifesto'>"
        f"<blockquote>{escape(bundle['verbal_identity']['manifesto'])}</blockquote>"
        f"<p>{escape(bundle['positioning']['differentiation'])}</p>"
        "</section>"
    )


def render_summary(bundle: dict[str, Any]) -> str:
    summary = bundle["executive_summary"]
    metric_strip = (
        "<div class='metric-strip'>"
        f"<div class='metric'><div class='metric-label'>Estagio</div><div class='metric-value'>{escape(summary.get('stage', 'n/d'))}</div></div>"
        f"<div class='metric'><div class='metric-label'>Fit</div><div class='metric-value'>{escape(summary.get('fit', 'n/d'))}</div></div>"
        f"<div class='metric'><div class='metric-label'>Headline</div><div class='metric-value'>{escape(bundle['verbal_identity']['headline'])}</div></div>"
        f"<div class='metric'><div class='metric-label'>Mecanismo</div><div class='metric-value'>{escape(bundle['positioning']['mechanism'])}</div></div>"
        "</div>"
    )
    cards = (
        "<div class='card-grid'>"
        f"{card('Gaps criticos', list_items(summary.get('gaps', [])))}"
        f"{card('Fatos confirmados', list_items(bundle.get('facts', [])))}"
        f"{card('Inferencias', list_items(bundle.get('inferences', [])))}"
        f"{card('Hipoteses', list_items(bundle.get('hypotheses', [])))}"
        "</div>"
    )
    return section("Diagnostico Executivo", metric_strip + cards, kicker="Fundacao")


def render_market(bundle: dict[str, Any]) -> str:
    market = bundle["market_map"]
    left = (
        f"<div class='text-block'><p><strong>Categoria:</strong> {escape(market['category'])}</p>"
        f"<p><strong>Mensagem central:</strong> {escape(bundle['positioning']['message'])}</p></div>"
        f"{card('Tendencias', list_items(market.get('trends', [])))}"
        f"{card('Oportunidades', list_items(market.get('opportunities', [])))}"
    )
    competitors = bundle.get("competitive_map", [])
    if competitors:
        comp_cards = "".join(
            card(
                comp.get("name", "Concorrente"),
                f"<p><strong>Angulo:</strong> {escape(comp.get('angle', 'n/d'))}</p>"
                f"<p><strong>Lacuna:</strong> {escape(comp.get('gap', 'n/d'))}</p>",
            )
            for comp in competitors
        )
    else:
        comp_cards = "<p class='text-block'>Nenhum concorrente mapeado.</p>"
    right = f"{card('Riscos', list_items(market.get('risks', [])))}<div class='card-grid'>{comp_cards}</div>"
    return chapter("Mercado e Concorrencia", left, right, "Contexto")


def render_audience(bundle: dict[str, Any]) -> str:
    personas = bundle.get("audience_system", [])
    if not personas:
        return ""
    cards = "".join(persona_card(persona) for persona in personas)
    return section("Personas Prioritarias", f"<div class='card-grid'>{cards}</div>", kicker="Publico")


def render_positioning(bundle: dict[str, Any]) -> str:
    positioning = bundle["positioning"]
    left = (
        f"{card('Territorio', f'<p>{escape(positioning['territory'])}</p>')}"
        f"{card('Promessa', f'<p>{escape(positioning['promise'])}</p>')}"
        f"{card('Mecanismo', f'<p>{escape(positioning['mechanism'])}</p>')}"
    )
    right = (
        f"{card('Diferenciacao', f'<p>{escape(positioning['differentiation'])}</p>')}"
        f"{card('Mensagem central', f'<p>{escape(positioning['message'])}</p>')}"
        f"{card('Voz da marca', f'<p>{escape(bundle['verbal_identity']['voice'])}</p>')}"
    )
    return chapter("Posicionamento", left, right, "Tese")


def render_verbal(bundle: dict[str, Any]) -> str:
    verbal = bundle["verbal_identity"]
    inner = (
        "<div class='card-grid'>"
        f"{card('Headline', f'<p>{escape(verbal['headline'])}</p>')}"
        f"{card('Bio', f'<p>{escape(verbal['bio'])}</p>')}"
        f"{card('Pitch curto', f'<p>{escape(verbal['pitch_short'])}</p>')}"
        f"{card('Tom', f'<p>{escape(verbal['tone'])}</p>')}"
        f"{card('Palavras permitidas', list_items(verbal.get('allowed_words', [])))}"
        f"{card('Palavras proibidas', list_items(verbal.get('forbidden_words', [])))}"
        "</div>"
    )
    return section("Sistema Verbal", inner, kicker="Linguagem")


def render_visual(bundle: dict[str, Any], output_root: Path) -> str:
    visual = bundle["visual_system"]
    left = (
        f"{card('North star', f'<p>{escape(visual['north_star'])}</p>')}"
        f"{card('Paleta', list_items(visual.get('palette', [])))}"
        f"{card('Tipografia', f'<p><strong>Display:</strong> {escape(visual['typography']['display'])}</p><p><strong>Body:</strong> {escape(visual['typography']['body'])}</p>')}"
    )
    right = f"{card('Regras editoriais', list_items(visual.get('editorial_rules', [])))}{figure_gallery(visual.get('image_assets', []), output_root)}"
    return chapter("Sistema Visual", left, right, "Materializacao")


def render_content(bundle: dict[str, Any]) -> str:
    content = bundle["content_system"]
    inner = (
        "<div class='card-grid'>"
        f"{card('Pilares', list_items(content.get('pillars', [])))}"
        f"{card('Series', list_items(content.get('series', [])))}"
        f"{card('Formatos', list_items(content.get('formats', [])))}"
        f"{card('CTA', list_items(content.get('cta', [])))}"
        f"{card('Cadencia', list_items(content.get('cadence', [])))}"
        "</div>"
    )
    return section("Sistema Inicial de Conteudo", inner, kicker="Presenca")


def render_roadmap(bundle: dict[str, Any]) -> str:
    roadmap = bundle["roadmap"]
    cards = (
        "<div class='roadmap'>"
        f"<article class='card'><h3>30 dias</h3>{list_items(roadmap.get('30_days', []))}</article>"
        f"<article class='card'><h3>60 dias</h3>{list_items(roadmap.get('60_days', []))}</article>"
        f"<article class='card'><h3>90 dias</h3>{list_items(roadmap.get('90_days', []))}</article>"
        "</div>"
    )
    readiness = bundle["commercial_readiness"]
    footer = (
        "<section class='page'>"
        "<div class='divider'><span>Proxima etapa: conversao</span></div>"
        "<div class='section'><div class='card-grid'>"
        f"{card('Caminhos de oferta', list_items(readiness.get('offer_paths', [])))}"
        f"{card('Cenarios de ROI', list_items(readiness.get('roi_scenarios', [])))}"
        f"{card('Proximos passos', list_items(readiness.get('next_steps', [])))}"
        "</div></div>"
        "<div class='footer-note'>Este Brand Bible e a fundacao visual e estrategica para a proxima etapa do Grupo Torq: oferta, VSL, funil e escala.</div>"
        "</section>"
    )
    return section("Roadmap", cards, kicker="Execucao") + footer


def render_body(bundle: dict[str, Any], output_root: Path) -> str:
    return "".join(
        [
            render_cover(bundle, output_root),
            render_manifesto(bundle),
            render_summary(bundle),
            render_market(bundle),
            render_audience(bundle),
            render_positioning(bundle),
            render_verbal(bundle),
            render_visual(bundle, output_root),
            render_content(bundle),
            render_roadmap(bundle),
        ]
    )


def apply_theme_variables(bundle: dict[str, Any], css_path: Path) -> None:
    theme = bundle.get("theme", {})
    replacements = {
        "#f6f1e8": theme.get("paper", "#f6f1e8"),
        "#101820": theme.get("ink", "#101820"),
        "#9a5c3f": theme.get("accent", "#9a5c3f"),
        "#d8b59a": theme.get("accent_soft", "#d8b59a"),
        "#d5b49c": theme.get("accent_soft", "#d5b49c"),
    }
    css = css_path.read_text(encoding="utf-8")
    for old, new in replacements.items():
        css = css.replace(old, new)
    css_path.write_text(css, encoding="utf-8")


def maybe_export_pdf(html_path: Path, pdf_path: Path) -> None:
    browsers = [
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    ]
    browser = next((candidate for candidate in browsers if candidate.exists()), None)
    if browser is None:
        raise SystemExit("Nenhum navegador headless suportado foi encontrado para exportar PDF.")
    with tempfile.TemporaryDirectory(prefix="torq-pdf-") as temp_dir:
        temp_root = Path(temp_dir)
        staged_html = temp_root / "brand-bible.html"
        staged_css = temp_root / "theme.css"
        staged_pdf = temp_root / "brand-bible.pdf"
        staged_images = temp_root / "images"

        shutil.copy2(html_path, staged_html)
        css_path = html_path.parent / "theme.css"
        if css_path.exists():
            shutil.copy2(css_path, staged_css)

        source_images = html_path.parent / "images"
        if source_images.exists():
            shutil.copytree(source_images, staged_images, dirs_exist_ok=True)

        file_uri = staged_html.resolve().as_uri()
        user_data_dir = temp_root / "chrome-profile"
        user_data_dir.mkdir(exist_ok=True)
        result = subprocess.run(
            [
                str(browser),
                "--headless=new",
                "--disable-gpu",
                f"--user-data-dir={user_data_dir}",
                "--allow-file-access-from-files",
                "--print-to-pdf-no-header",
                f"--print-to-pdf={staged_pdf}",
                file_uri,
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        if result.returncode != 0 and not staged_pdf.exists():
            raise SystemExit(
                "Falha ao exportar PDF via navegador headless.\n"
                f"stdout:\n{result.stdout}\n"
                f"stderr:\n{result.stderr}"
            )
        if not staged_pdf.exists():
            raise SystemExit("O navegador headless terminou sem gerar o arquivo PDF.")
        shutil.copy2(staged_pdf, pdf_path)


def main() -> int:
    parser = argparse.ArgumentParser(description="Compoe o Brand Bible HTML a partir do brand-bundle.json.")
    parser.add_argument("--bundle", required=True, help="Caminho para o brand-bundle.json.")
    parser.add_argument("--output", required=True, help="Diretorio de saida do documento.")
    parser.add_argument("--stitch-html", help="HTML exportado pelo Stitch para usar como fonte principal do PDF.")
    parser.add_argument("--pdf", action="store_true", help="Tenta exportar PDF via navegador headless.")
    args = parser.parse_args()

    bundle_path = Path(args.bundle)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    bundle = load_json(bundle_path)

    html_path = output_dir / "brand-bible.html"
    if args.stitch_html:
        stitch_html = Path(args.stitch_html)
        shutil.copy2(stitch_html, html_path)
        sibling_css = stitch_html.parent / "theme.css"
        if sibling_css.exists():
            shutil.copy2(sibling_css, output_dir / "theme.css")
        sibling_images = stitch_html.parent / "images"
        if sibling_images.exists():
            target_images = output_dir / "images"
            shutil.copytree(sibling_images, target_images, dirs_exist_ok=True)
    else:
        template_dir = Path(__file__).resolve().parent.parent / "assets" / "brand-bible-template"
        template_html = (template_dir / "template.html").read_text(encoding="utf-8")
        theme_output = output_dir / "theme.css"
        shutil.copy2(template_dir / "theme.css", theme_output)
        apply_theme_variables(bundle, theme_output)

        images_source = bundle_path.parent / "images"
        if images_source.exists():
            target_images = output_dir / "images"
            target_images.mkdir(exist_ok=True)
            for file in images_source.iterdir():
                if file.is_file():
                    shutil.copy2(file, target_images / file.name)

        html_content = (
            template_html.replace("__TITLE__", escape(f"{bundle['meta']['client_name']} | Brand Bible"))
            .replace("__CSS_PATH__", "theme.css")
            .replace("__BODY__", render_body(bundle, output_dir))
        )
        html_path.write_text(html_content, encoding="utf-8")
    if args.pdf:
        maybe_export_pdf(html_path, output_dir / "brand-bible.pdf")
    print(f"Documento gerado em: {html_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
