```markdown
# Design System Document: High-End Editorial Guidelines

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Monolithic Archive."** 

This is not a standard interface; it is a digital manifestation of a rare, high-production coffee table book. It values silence over noise, authority over persuasion, and technical precision over trendy "SaaS" aesthetics. We reject the rounded, bubbly, and hyper-saturated visual language of the modern web. Instead, we embrace the tension of sharp edges, the luxury of "wasted" space, and the rhythmic weight of monumental typography. 

The goal is to create an experience that feels curated and permanent—an object of digital weight that commands respect through its restraint.

---

## 2. Colors: The Tonal Canvas
The palette is rooted in materiality. We move away from pure digital white (#FFFFFF) toward an organic, warm paper texture that mimics fine-milled stone or ivory.

### The Palette Logic
*   **Background (`#fcf9f4`):** Our primary canvas. It is a warm, breathable stone tone that reduces eye strain and suggests premium paper stock.
*   **Primary (`#000000`):** Used for "Ink." Every line of text or icon should feel as though it were letterpressed onto the page.
*   **Secondary (`#7e562e`):** Our burnt bronze accent. This is used sparingly—only for moments of high strategic importance or discrete calls to action.
*   **Tertiary (`#000000`):** Reaffirms the authoritative nature of the system.

### The "No-Line" Rule
**Borders are prohibited.** Do not use 1px solid lines to separate sections. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Use `surface-container-low` against a `background` to define a new content area.
2.  **Visual Breathing:** Use aggressive white space (padding/margins) to dictate where one thought ends and another begins.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked physical layers. 
*   **Base:** `surface`
*   **Layer 1:** `surface-container-low` (Subtle departure for grouped content)
*   **Layer 2:** `surface-container` (Inner modules or secondary information)
*   **Layer 3:** `surface-container-high` (Active elements or prioritized sidebars)

### Signature Textures
Use **Glassmorphism** for floating navigation or overlays. By using `surface` colors at 80% opacity with a high `backdrop-blur` (20px-40px), we allow the layout beneath to bleed through softly, creating a "frosted vellum" effect that feels intentional and expensive.

---

## 3. Typography: The Editorial Voice
Typography is our primary design element. The tension between the serif and the sans-serif creates the "strategic" personality of the brand.

### The Monumental Serif (`newsreader`)
Used for all `display` and `headline` tokens. This font provides the "Authoritative" and "Timeless" personality.
*   **Usage:** Use `display-lg` (3.5rem) for hero titles. Ensure tight tracking and generous leading to create a "monumental" feel.
*   **Rhythm:** Headlines should feel like art pieces. Don't be afraid to let a headline take up 60% of a viewport height.

### The Refined Sans-Serif (`manrope`)
Used for all `title`, `body`, and `label` tokens. This is the "Technical" and "Refined" counterpart.
*   **Usage:** Keep `body-md` (0.875rem) as your workhorse. The geometric nature of Manrope provides a modern, legible contrast to the classic serif.
*   **Case Styling:** Labels (`label-md`) should frequently use uppercase with increased letter-spacing (0.05em) to denote a "technical spec" or "catalog" feel.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, shadows are a fallback, not a default. We convey hierarchy through **Tonal Layering**.

*   **The Layering Principle:** To lift a card, do not add a shadow. Instead, place a `surface-container-lowest` card on a `surface-container-low` background. The shift in "paper tone" is enough to signal depth to a sophisticated user.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use an extra-diffused shadow: `box-shadow: 0 20px 50px rgba(28, 28, 25, 0.05);`. The color is a tint of our `on-surface` (`#1c1c19`), never a generic grey.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. This creates a "whisper" of a line that defines space without cluttering the editorial grid.

---

## 5. Components: The Minimalist Toolkit

### Buttons
*   **Structure:** Absolute 0px corner radius. No exceptions.
*   **Primary:** `primary` (#000000) background with `on-primary` (#ffffff) text.
*   **Secondary:** `outline` variant. A ghost border (20% opacity) with `on-surface` text.
*   **Interaction:** On hover, the background should shift subtly to `secondary` (bronze) or increase in opacity. Transitions must be slow (300ms+) to feel "deliberate."

### Input Fields
*   **Visual Style:** A single bottom border (`outline-variant` at 30% opacity) or a subtle tonal shift using `surface-container-low`.
*   **Labels:** Use `label-sm` in all-caps above the input.
*   **Focus State:** The bottom border darkens to `primary` (#000000). No "glow" or blue halos.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Separation:** Content in a list should be separated by vertical rhythm. If a list item needs to be distinct, use a hover state that changes the background to `surface-container`.
*   **Imagery:** Images should be treated as museum artifacts—large, high-quality, and often breaking the grid (asymmetrical placement).

### Editorial Spreads (Layout)
*   **Asymmetry:** Avoid centered, balanced layouts. Push text to the left and images to the far right, or vice versa. Use the "visual breathing" of white space to create tension.
*   **The Grid:** Use a 12-column modular grid, but allow "Hero" typography to span only 4-5 columns, leaving the rest of the row empty.

---

## 6. Do's and Don'ts

### Do
*   **Embrace the Void:** Let a section be 70% white space if it serves the "Silent" personality.
*   **Tighten Typography:** Use high-contrast hierarchy. A very large serif next to a very small sans-serif creates "Visual Tension."
*   **Use Sharp Edges:** Every corner must be `0px`. Roundness is the enemy of this system’s authority.
*   **Focus on Technicality:** Use `label-sm` for metadata (dates, categories, specs) to give the feel of a technical archive.

### Don't
*   **No "Canva" Aesthetics:** Avoid icons with rounded ends, emojis, or "playful" illustrations.
*   **No 1px Borders:** Never "box in" your content. Let it breathe.
*   **No High Saturation:** Never use neons. If you need an accent, the burnt bronze (`#7e562e`) is your limit.
*   **No Standard Grids:** Avoid the "three-card row" layout common in SaaS templates. It feels cheap. Use asymmetrical stacks instead.

---

*Director's Note: Every pixel in this system should feel like it was placed by a curator, not a generator. If a design feels "busy," remove an element. If it feels "weak," increase the typographic scale. Silence is your most powerful tool.*```