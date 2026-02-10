# Bias Bounty Lite - Web Demo

A collaborative investigation game about AI bias patterns. Play in your browser!

![Game Screenshot](screenshot.png)

## 🎮 Play Now

Open `index.html` in any modern web browser. No installation required!

**Or play online:** [Deploy to GitHub Pages/Netlify instructions below]

## 📖 How to Play

### The Goal
Investigate 8 real-world AI systems and identify how unfairness enters them through three distinct patterns.

### The Three Patterns

| Pattern | Icon | Description | Key Phrase |
|---------|------|-------------|------------|
| **Bad Start** | 📚 | The AI learned from biased history | "The past trained the future" |
| **Wrong Measuring** | 📏 | The AI measures success poorly | "What gets measured gets misled" |
| **Sneaky Shortcuts** | 🎭 | The AI finds hidden ways to discriminate | "Correlation masquerading as truth" |

### Game Flow

1. **Reveal System** - Learn about an AI system (Hiring Helper, Loan Approver, etc.)
2. **Reveal Problems** - See 3 specific problems with that system
3. **Observe** - Silent thinking time (60 seconds)
4. **Discuss & Vote** - Match problems to patterns
5. **Commit** - Lock in your answers
6. **Reflect** - Learn why each answer was correct

### Scoring
- **1 point** for each correct pattern match
- **Max per system:** 3 points
- **Max total:** 24 points

**Ratings:**
- 🏆 20+ points: Expert Detectives
- ⭐ 15-19 points: Skilled Investigators
- 📖 10-14 points: Learning the Ropes
- 🎓 Under 10: Review the patterns

## 🎯 Features

- ✅ **8 AI Systems** - Hiring, Loans, Healthcare, Education, Policing, Insurance, Social Media, Voice Recognition
- ✅ **24 Unique Problems** - Real-world bias cases
- ✅ **Collaborative Play** - Designed for 3-6 players, works solo too
- ✅ **Progress Saving** - Continue where you left off
- ✅ **Hint System** - Hover over patterns for clues
- ✅ **Keyboard Shortcuts** - Full keyboard navigation
- ✅ **Responsive Design** - Works on desktop, tablet, mobile
- ✅ **Offline Capable** - No internet required after loading

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next Phase |
| `←` | Previous Phase |
| `?` | Toggle Help |
| `1-3` | Select Pattern (during voting) |
| `Escape` | Close Modal |

## 🚀 Deployment

### GitHub Pages (Free)
1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from Branch" → main → / (root)
4. Your game is live at `https://yourusername.github.io/repo-name/`

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this folder onto the deploy area
3. Get an instant URL

### Vercel (Free)
```bash
npm i -g vercel
vercel --prod
```

## 🏗️ Technical Details

- **Tech Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **No Dependencies:** Zero external libraries
- **File Size:** ~85KB total
- **Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)

## 📁 File Structure

```
web-vanilla/
├── index.html      # Game structure
├── styles.css      # Design system & animations
├── app.js          # Game logic & data
├── README.md       # This file
└── PLAYTEST_SIMULATION.md  # Playtest report
```

## 🎓 Learning Objectives

After playing this game, you will:
1. Recognize that AI systems can produce unfair outcomes
2. Identify three patterns of how unfairness enters systems
3. Understand that bias is rarely intentional but still harmful
4. Discuss who is affected and why it matters

## 📝 Game Data

All card content is defined in `app.js`:
- `SYSTEMS` - 8 AI system cards
- `PROBLEMS` - 24 problem cards (3 per system)
- `PATTERNS` - 3 pattern reference cards

## 🔧 Customization

Want to add your own systems or problems? Edit the data structures in `app.js`:

```javascript
const SYSTEMS = [
    {
        id: 'your-system',
        name: 'Your System Name',
        description: 'What it does...',
        usage: 'Who uses it',
        goal: 'What it tries to do',
        icon: '🔧'
    }
];

const PROBLEMS = [
    {
        id: 'unique-id',
        systemId: 'your-system',
        title: 'Problem Title',
        description: 'What happens...',
        affected: ['Group 1', 'Group 2'],
        pattern: 'bad-start', // or 'wrong-measuring' or 'sneaky-shortcuts'
        explanation: 'Why this pattern fits...'
    }
];
```

## 📜 License

This demo is part of the AI Literacy & Safety project.

## 🙏 Credits

- Game Design: Based on Bias Bounty Lite card game
- Icons: Emoji (native browser support)
- Font: Inter by Google Fonts

---

**Happy investigating! 🔍**
