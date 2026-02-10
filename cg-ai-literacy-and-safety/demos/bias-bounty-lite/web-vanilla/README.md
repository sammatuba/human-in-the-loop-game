# Bias Bounty - Full Version

**Version:** 1.1.0  
**Status:** ✅ Production Ready (Lite → Full Transformation Complete)

A collaborative investigation game about AI bias patterns, featuring UNESCO/OECD/NIST/EU framework alignment, real-world impact visualization, concept mastery assessment, and adaptive difficulty.

---

## 🎮 Play Now

Open `index.html` in any modern web browser. No installation or internet connection required after loading.

**Recommended Browsers:** Chrome, Firefox, Safari, Edge (latest versions)

---

## What's New in v1.1 (Full Version)

### 📚 Foundation Framework Alignment
Every problem now shows alignment with major AI ethics frameworks:
- **UNESCO AI Competency Framework** - Human-centred mindset, ethics, techniques
- **OECD AI Principles** - Inclusive growth, transparency, accountability
- **NIST AI Risk Management Framework** - MAP, MEASURE, MANAGE, GOVERN
- **EU Ethics Guidelines** - Human agency, fairness, well-being

### 🌍 Real-World Impact Visualization
See the actual consequences of AI bias:
- Statistics on affected populations
- Real-world case study references
- Cumulative impact tracking
- Examples: Amazon recruiting, Optum healthcare, Apple Card lending

### 📝 Concept Mastery Assessment
Verify learning beyond pattern matching:
- Pre-game and post-game quizzes
- 8 questions covering all bias patterns
- Personalized feedback and explanations
- Visual mastery tracking per pattern type

### 🎚️ Adaptive Difficulty
Choose your challenge level:
- **Beginner** (🌱): 90s timer, hints always visible
- **Standard** (⚖️): 60s timer, standard hints, 1.5x scoring
- **Expert** (🔥): 45s timer, no hints, 2x scoring

### 💾 Progress Persistence
Your progress is automatically saved:
- Resume where you left off
- Track scores across sessions
- View completion statistics

---

## 🎯 How to Play

### The Goal
Investigate 8 real-world AI systems and identify how unfairness enters them. Match each problem to one of three bias patterns.

### The Three Patterns

| Pattern | Icon | Description | Look For |
|---------|------|-------------|----------|
| **Bad Start** | 📚 | The AI learned from biased history | "trained on", "historical data", "past decisions" |
| **Wrong Measuring** | 📏 | The AI measures success poorly | "optimizes for", "metric", "score" that doesn't match goal |
| **Sneaky Shortcuts** | 🎭 | The AI finds hidden ways to discriminate | "correlates with", "proxies", "indirect" discrimination |

### Game Phases

1. **🔍 Reveal System** - Learn about an AI system and its purpose
2. **⚠️ Reveal Problems** - See 3 specific issues with that system
3. **🤫 Observe** - Study silently (timer based on difficulty)
4. **💬 Discuss & Vote** - Match problems to bias patterns
5. **✓ Commit** - Confirm your answers
6. **🤔 Reflect** - Learn from results, frameworks, and real-world impacts

### Scoring

- Base points: 1 per correct answer
- Difficulty multipliers:
  - Beginner: 1x
  - Standard: 1.5x
  - Expert: 2x
- Perfect rounds trigger confetti celebration! 🎉

---

## 🏗️ Systems Investigated

| System | Domain | Real-World Example |
|--------|--------|-------------------|
| 💼 Hiring Helper | Employment | Amazon AI recruiting tool bias |
| 🏦 Loan Approver | Finance | Apple Card gender bias investigation |
| 🏥 Health Predictor | Healthcare | Optum racial bias in care prediction |
| 🎓 School Sorter | Education | UK A-level algorithm controversy |
| 👮 Crime Forecaster | Criminal Justice | PredPol predictive policing bias |
| 🚗 Insurance Rater | Finance | Auto insurance algorithm discrimination |
| 📱 Content Recommender | Social Media | Facebook/Instagram mental health research |
| 🎤 Voice Recognizer | Technology | Speech recognition accent bias (Stanford study) |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next Phase |
| `←` | Previous Phase |
| `?` or `/` | Toggle Help |
| `1`, `2`, `3` | Select Pattern (during voting) |
| `Esc` | Close Modal |

---

## 📊 Educational Value

### Learning Outcomes
After playing Bias Bounty, learners will be able to:

1. **Identify** three major patterns of AI bias in real-world systems
2. **Analyze** AI systems for potential fairness issues
3. **Connect** technical AI problems to human impacts
4. **Reference** major AI ethics frameworks (UNESCO, OECD, NIST, EU)
5. **Evaluate** AI systems using structured investigation methods

### Target Audiences
- High school and university students
- AI/ML practitioners and engineers
- Policy makers and regulators
- Civic organizations and advocates
- General public interested in AI ethics

### Classroom Use
Perfect for:
- Computer science ethics courses
- AI literacy workshops
- Professional development training
- Group learning activities

---

## 🔧 Technical Details

### Technology Stack
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks or dependencies
- **LocalStorage** - Progress persistence

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance
- Initial load: ~50KB
- Runtime memory: < 10MB
- Works offline after initial load
- Mobile responsive design

---

## 📁 File Structure

```
web-vanilla/
├── index.html      # Game structure and markup
├── styles.css      # Complete design system (~40KB)
├── app.js          # Game logic and data (~88KB)
└── README.md       # This file
```

---

## 📈 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-05 | Initial "Lite" release |
| 1.1.0 | 2026-02-06 | **Full version**: Framework alignment, impact visualization, assessment, adaptive difficulty |

---

## 📚 References & Sources

The problems and examples in this game are based on documented real-world cases:

- Amazon AI recruiting tool (Reuters, 2018)
- Optum healthcare algorithm (Science, 2019)
- Apple Card gender bias (NYT, 2019)
- UK A-level algorithm (BBC, 2020)
- PredPol predictive policing (LA Times, 2021)
- Facebook internal research (WSJ, 2021)
- Speech recognition bias (Stanford study, 2020)

---

## 🤝 Contributing

To modify or extend Bias Bounty:

1. Edit `app.js` to add/modify systems and problems
2. Update `styles.css` for visual changes
3. Test in multiple browsers
4. Update this README with changes

### Adding New Systems

Add to the `SYSTEMS` array:
```javascript
{
    id: 'unique-id',
    name: 'System Name',
    description: 'What it does',
    usage: 'Where it\'s used',
    goal: 'Its purpose',
    icon: '🔧',
    category: 'domain',
    realWorldExample: 'Documented case'
}
```

Add 3 corresponding problems to the `PROBLEMS` array with framework alignment and impact data.

---

## 📄 License

This educational game is provided for non-commercial educational use.

---

## 🙏 Acknowledgments

Framework alignment based on:
- UNESCO Recommendation on the Ethics of AI (2021)
- OECD AI Principles (2019)
- NIST AI Risk Management Framework (2023)
- EU Ethics Guidelines for Trustworthy AI (2019)

---

**Made with ❤️ for AI literacy education.**

**Play. Learn. Detect Bias.** 🔍
