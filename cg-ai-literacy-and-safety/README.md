# AI Literacy & Safety — Interactive Educational Games

A suite of browser-based card games that teach AI literacy and safety concepts through play. Each game targets a different dimension of responsible AI — from recognizing algorithmic bias to managing AI risk — aligned with international frameworks.

## Games

| Game | Concept | Time | Description |
|------|---------|------|-------------|
| [Bias Bounty](games/bias-bounty-lite/) | Algorithmic Bias | 20-30 min | Investigate AI systems and match hidden problems to three bias patterns (Bad Start, Wrong Measuring, Sneaky Shortcuts) |
| [Human-in-the-Loop](games/human-in-the-loop/) | Automation Bias & Human Oversight | 15-25 min | Review AI recommendations in high-stakes scenarios. Spend investigation tokens, uncover clues, decide whether to accept or override |
| [Risk Assessment Protocol](games/risk-assessment-protocol/) | AI Risk Management | 20-30 min | Assess AI systems through the four NIST RMF phases (MAP, MEASURE, MANAGE, GOVERN) and classify EU AI Act risk tiers |
| [Hallucination Hunt](games/hallucination-hunt/) | AI Hallucinations & Verification | 15-20 min | Fact-check AI-generated claims using limited verification tool cards. Stamp verdicts and build an evidence board |

## Framework Alignment

| Framework | Coverage |
|-----------|----------|
| **UNESCO AI Competency Framework** | Human-centred mindset, ethics of AI, AI techniques & applications |
| **OECD AI Principles** | Inclusive growth, human-centred values, transparency, accountability |
| **NIST AI Risk Management Framework** | MAP, MEASURE, MANAGE, GOVERN functions across all games |
| **EU AI Act** | Risk tiers, prohibited practices, transparency obligations |
| **Council of Europe** | Human rights, democracy, rule of law in AI governance |

## Tech Stack

- Vanilla HTML, CSS, JavaScript — zero dependencies
- Mobile-optimized with touch controls and responsive layouts
- Offline-capable (no server required)
- Card game aesthetic with flip animations, dealing effects, and token mechanics

## Directory Structure

```
├── games/
│   ├── shared/          # Shared CSS and JS utilities
│   ├── bias-bounty-lite/
│   ├── human-in-the-loop/
│   ├── risk-assessment-protocol/
│   └── hallucination-hunt/
├── docs/
│   ├── research/        # Foundation research and game design docs
│   └── evaluation/      # Evaluation frameworks and scripts
└── archive/             # Deprecated games and old documentation
```

## Running

Open any game's `index.html` in a browser. No build step or server needed.

## Future Games

- **The Black Box** — Neural network simulation with node cards and weight overlays
- **The Oversight Committee** — Multi-stakeholder AI governance simulation with asymmetric role cards
