# Demo Evaluation Quick Start Guide

## 5-Minute Assessment

Use this for a rapid initial evaluation before diving deep.

### 1. Foundation Check (1 min)
```
□ UNESCO: Does it teach human agency, ethics, techniques, design?
□ OECD: Does it cover all 5 principles (growth, human values, transparency, safety, accountability)?
□ NIST: Can players map context, measure risk, manage decisions, govern trust?
□ EU: Are all 7 Trustworthy AI requirements addressed?
```

### 2. Game Loop Check (1 min)
```
□ Is the core loop: Input → Decision → Feedback → Progress?
□ Are decisions meaningful (not obvious)?
□ Is feedback immediate and educational?
□ Can players recover from mistakes?
```

### 3. Scenario Check (1 min)
```
□ Are there at least 10 scenarios?
□ Do scenarios cover different domains (health, finance, justice, etc.)?
□ Is there a mix of AI-correct and AI-wrong cases?
□ Are consequences shown to players?
```

### 4. Engagement Check (1 min)
```
□ Is there a progression system?
□ Are concepts being tracked/unlocked?
□ Is there a story or narrative framing?
□ Would players want to replay?
```

### 5. Technical Check (1 min)
```
□ Does it work offline?
□ Is it mobile-friendly?
□ Are there keyboard shortcuts?
□ Does it load quickly (< 3 seconds)?
```

---

## Priority Classification Guide

### 🔴 Critical (Fix First)
- Missing framework alignment (UNESCO/OECD/NIST/EU gaps)
- No feedback mechanism
- Broken core game loop
- No learning objectives met
- Technical blockers

**Examples:**
- No explanation of why AI was wrong
- Missing privacy scenario (EU gap)
- Scenarios don't teach any concepts
- Game crashes or won't load

### 🟡 Important (Fix Soon)
- Limited replayability
- No difficulty options
- Missing assessment/quizzes
- No multiplayer/collaboration
- Poor mobile experience

**Examples:**
- Same 10 scenarios every time (no randomization)
- One difficulty level only
- No way to verify learning
- Can't play with friends

### 🟢 Enhancement (Nice to Have)
- Narrative framing
- Sandbox/custom modes
- Accessibility features
- Leaderboards
- Achievement system

**Examples:**
- Add mentor character
- Let players create scenarios
- Add screen reader support
- Global high scores

---

## Common Improvements by Demo Type

### Decision-Making Games (like Human-in-the-Loop)
```
Critical:
□ Consequence visualization (show what happened)
□ Multiple difficulty levels
□ Concept mastery verification (quizzes)

Important:
□ Collaborative/multiplayer mode
□ Time pressure (Expert mode)
□ Scenario randomization

Enhancement:
□ Narrative framing (certification story)
□ Sandbox mode (create scenarios)
□ Real-world connection module
```

### Detection Games (like Deepfake Detective)
```
Critical:
□ Progressive difficulty
□ Clear feedback on misses
□ Multiple example types

Important:
□ Hint system
□ Practice mode
□ Performance tracking

Enhancement:
□ Competitive mode
□ Community examples
□ Certification path
```

### Investigation Games (like Bias Bounty)
```
Critical:
□ Clear investigation mechanics
□ Multiple bias patterns
□ Evidence linking

Important:
□ Team collaboration
□ Case variety
□ Hint system

Enhancement:
□ Custom cases
□ Leaderboards
□ Narrative wrapper
```

---

## File Structure Template

```
demos/[demo-name]/
├── EVALUATION_REPORT.md          # Comprehensive evaluation
├── IMPROVEMENT_TRACKING.md       # Progress tracking
├── IMPLEMENTATION_SUMMARY_v1.0.md # Baseline
├── IMPLEMENTATION_SUMMARY_v1.1.md # Critical items
├── IMPLEMENTATION_SUMMARY_v1.2.md # Important items
├── IMPLEMENTATION_SUMMARY_v1.3.md # Enhancements
└── web-vanilla/                  # Implementation
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── scenarios.json
    ├── quiz_data.js              # If applicable
    ├── narrative_data.js         # If applicable
    └── collaborative_mode.js     # If applicable
```

---

## Quick Metrics Dashboard

Track these numbers:

| Metric | Target | Current |
|--------|--------|---------|
| Scenarios | 15+ | |
| Concepts | 8+ | |
| Replay Value | High | |
| Framework Coverage | 90%+ | |
| Overall Score | 8.5+/10 | |

---

## Decision Tree

```
START: Evaluate Demo
│
├─ Is framework alignment < 80%?
│  └─ YES → Priority: Critical
│
├─ Are there < 10 scenarios?
│  └─ YES → Priority: Critical
│
├─ Is there no feedback mechanism?
│  └─ YES → Priority: Critical
│
├─ Is replayability low?
│  └─ YES → Priority: Important
│
├─ Is there no assessment?
│  └─ YES → Priority: Important
│
└─ Is narrative missing?
   └─ YES → Priority: Enhancement
```

---

## One-Page Cheat Sheet

### Top 5 Improvements (Most Impact)
1. **Add consequence visualization** - Show players the real-world impact
2. **Implement adaptive difficulty** - Easy/Normal/Expert modes
3. **Add concept quizzes** - Verify learning, not just exposure
4. **Enable scenario randomization** - Increase replayability
5. **Add narrative framing** - Certification/story arc

### Top 5 Common Gaps
1. Missing privacy scenarios (EU framework)
2. No environmental/sustainability content
3. Static scenarios (same order every time)
4. No multiplayer/collaboration
5. Limited accessibility features

### Top 5 Quick Wins
1. Add keyboard shortcuts
2. Show progress counter
3. Add concept icons
4. Improve color contrast
5. Add loading animation

---

## Example: Human-in-the-Loop Results

| Phase | Items | Time | Impact |
|-------|-------|------|--------|
| v1.1 Critical | 3 items | 6 hours | +0.6 score |
| v1.2 Important | 3 items | 6 hours | +0.3 score |
| v1.3 Enhancement | 1 item | 2 hours | +0.1 score |
| **Total** | **7 items** | **14 hours** | **+1.0 score (8.0 → 9.0)** |

---

## Next Steps Checklist

- [ ] Read full `DEMO_EVALUATION_AND_IMPROVEMENT_PROMPT.md`
- [ ] Evaluate demo using Phase 1-4
- [ ] Create EVALUATION_REPORT.md
- [ ] Create IMPROVEMENT_TRACKING.md
- [ ] Identify Critical items (top 3)
- [ ] Set version targets (v1.1, v1.2, etc.)
- [ ] Begin implementation
- [ ] Track progress in IMPROVEMENT_TRACKING.md
- [ ] Create IMPLEMENTATION_SUMMARY after each release

---

*Start with the 5-minute assessment, then dive deep with the full prompt.*
