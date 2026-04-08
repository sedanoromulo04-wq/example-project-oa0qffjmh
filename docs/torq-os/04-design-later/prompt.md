# Prompt Google Stitch

Use este prompt no Google Stitch para gerar o frontend do Torq Jarvis:

```text
Design a premium web application frontend called "Torq Jarvis".

This is not a generic chatbot and not a public SaaS dashboard. It is an internal operating console for a founder/operator to command an AI orchestration system that manages an entire business operation through specialized agents.

Core concept:
Torq Jarvis is a voice-and-text command center. The operator can type or speak requests like:
- "What is the next highest-leverage move for this client?"
- "Show me what is blocked right now."
- "Can we move this client into content planning yet?"
- "Prepare the next safe handoff for Strategy OS."
- "Open an approval packet for this asset."

The system then:
1. classifies the request
2. identifies current module and current stage
3. assembles context from memory, research, strategy, jobs, approvals, and documents
4. routes work to the correct internal specialist agent
5. returns a structured operating answer, not a casual chat response

The product must feel like:
- part Jarvis
- part mission control
- part executive operating system
- serious, elegant, intelligent, and high-trust

It must NOT feel like:
- a playful consumer AI toy
- a purple-on-white startup template
- a support chatbot
- a generic admin dashboard

Visual direction:
- cinematic, premium, modern, dark interface
- strong contrast but not cyberpunk noise
- refined, quiet power
- atmosphere should suggest "executive AI operations room"
- use layered surfaces, subtle glows, glass, steel, graphite, deep navy, muted electric blue, restrained signals for success/warning/danger
- avoid visual clutter
- use a polished editorial feel, not gamer UI

Color palette:
- background: deep graphite / ink navy
- surfaces: charcoal, carbon, soft slate
- accent: cold electric blue or blue-cyan
- success: muted emerald
- warning: amber
- danger: controlled red
- text: near-white with clear hierarchy

Typography:
- use expressive premium typography, not basic default SaaS typography
- headings should feel decisive and sharp
- body text should be highly readable and operational
- monospace only where it adds system flavor

Create a desktop-first responsive web app, but ensure mobile is still usable.

Main user journey:
- user logs in
- lands in Jarvis command center
- sees session history, transcript, route analysis, blockers, approvals, and context summary
- types or speaks a request
- receives a structured answer with module, stage, route, risk, blockers, next safe action, and optionally proposed actions

Design the following screens and states:

1. Login screen
- high-trust executive login
- clean brand lockup for Torq Jarvis
- premium dark background with subtle atmosphere
- email and password
- no noisy marketing
- internal system tone

2. Main Jarvis console
This is the hero screen and must be exceptional.

Layout idea:
- left column: session history and navigation
- center column: transcript + command composer
- right column: live orchestration inspector

Left column:
- recent sessions
- new session button
- quick nav item for Jarvis home
- maybe future areas like Memory, Research, Strategy, Content, Distribution, but de-emphasized
- each session card should feel like a mission thread, not a chat bubble list

Center column:
- top header with current system state
- transcript area with operator messages and Jarvis responses
- responses should feel like operational briefings
- bottom composer for text prompt
- microphone button visible, but voice can be shown as "coming next" or secondary
- command composer should feel powerful, like entering a mission directive

Right column inspector:
- current module
- current stage
- recommended route
- missing upstream assets
- blockers
- allowed actions
- blocked actions
- approval risk
- next safe action
- context stats such as active jobs, approvals, memory records, knowledge sources
- proposed actions list

3. Empty state
- sophisticated onboarding state inside Jarvis
- explain how to ask the system things
- include examples
- should feel premium and confidence-building

4. Loading / thinking state
- meaningful AI orchestration loading state
- not generic spinner only
- show stages like:
  - classifying request
  - checking stage dependencies
  - assembling context
  - routing to specialist
  - preparing safe response
- make this feel alive and intelligent

5. Blocked / governance state
- show when the system cannot proceed
- examples:
  - missing approval
  - upstream strategy not complete
  - content planning blocked
  - distribution blocked pending review
- visually communicate controlled restriction, not error panic

6. Proposed action confirmation modal
- used when Jarvis wants to mutate system state
- show:
  - what will change
  - which records will be affected
  - why this is allowed
  - approval owner or risk
- should feel formal and high-trust

7. Voice interaction state
- design microphone capture state
- waveform or subtle live listening feedback
- transcript preview before execution
- confirm/edit/send flow
- must feel reliable and controlled

Product rules the UI must communicate:
- memory before volume
- research before opinion
- strategy before design
- conversion before content
- approval before distribution
- no silent mutations
- no publication without human approval

Operational modules that should influence the design language:
- Memory OS
- Research OS
- Strategy OS
- Conversion OS
- Content OS
- Distribution OS

These can appear as route badges, chips, status markers, or module cards.

Important interaction expectations:
- every major answer should visually show:
  - intent type
  - module
  - stage
  - route
  - blockers
  - next safe action
- the UI should reinforce that this system thinks in workflows and governance, not just in conversation

Component suggestions:
- premium sidebar
- session cards
- transcript cards
- route chips
- risk badges
- structured response panels
- blocker cards
- action proposal cards
- command composer
- microphone trigger
- approval modal
- context metric tiles

Microcopy tone:
- calm
- precise
- executive
- high agency
- no hype language
- no consumer onboarding fluff

Motion:
- subtle cinematic transitions
- staggered panel reveals
- quiet shimmer or glow on active orchestration zones
- elegant loading transitions
- never excessive animation

Design goal:
The final result should feel like the founder is commanding a deeply intelligent operational system for a company, with clear visibility, confidence, governance, and elegance.

Please generate:
- a full high-fidelity dashboard concept for the Jarvis console
- the login screen
- key states for loading, blocked, and confirmation
- a cohesive design system direction for this product

Make it look world-class, differentiated, premium, and believable as the operating cockpit of an AI-managed company.
```

Arquivo completo original:

- [google-stitch-jarvis-mega-prompt.md](c:/Users/Romulo%20Sedano%20Sant'A/Documents/Skill%20Creator/skill-creator/docs/torq-os/04-design-later/google-stitch-jarvis-mega-prompt.md)
