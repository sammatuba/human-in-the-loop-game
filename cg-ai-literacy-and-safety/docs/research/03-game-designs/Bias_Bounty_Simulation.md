# BIAS BOUNTY: Simplified Game Simulation

## Overview
**Players:** 3-6 | **Time:** 45-60 minutes | **Goal:** Find and document hidden biases in AI systems

Think of it as "CSI: Algorithmic Justice"—players compete to identify how AI systems discriminate, what evidence proves it, and which communities are affected.

---

## COMPONENTS (Simplified Version)

### 1. SYSTEM CARDS (The "Suspect")
These describe AI systems being investigated.

**Example System Card:**
```
┌─────────────────────────────────────────┐
│  SYSTEM: "HireSmart" AI Resume Screener │
│  Domain: Employment / Hiring            │
│  Risk Level: HIGH (EU AI Act)           │
├─────────────────────────────────────────┤
│  WHAT IT DOES:                          │
│  Automatically scores job candidates    │
│  0-100 based on resume. Used by 500+    │
│  companies for initial screening.       │
│                                         │
│  CLAIMED BENEFIT:                       │
│  "Removes human bias from hiring"       │
└─────────────────────────────────────────┘
```

### 2. EVIDENCE CARDS (The "Clues")
These are data points, outputs, or revelations about the system.

**Example Evidence Cards:**
```
┌─────────────────────────────────────────┐
│  EVIDENCE: Training Data Audit          │
│  Type: DATA SOURCE                      │
├─────────────────────────────────────────┤
│  HireSmart trained on 10 years of       │
│  hiring decisions from tech companies.  │
│                                         │
│  78% of historical hires were men.      │
│  Training data includes names (can      │
│  indicate gender/ethnicity).            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  EVIDENCE: Score Discrepancy Report     │
│  Type: OUTPUT PATTERN                   │
├─────────────────────────────────────────┤
│  Identical resumes with different       │
│  names scored differently:              │
│  "John" - 87/100                        │
│  "Jamal" - 72/100                       │
│  "Emily" - 79/100                       │
│  "Lakisha" - 65/100                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  EVIDENCE: Feature Analysis             │
│  Type: TECHNICAL DESIGN                 │
├─────────────────────────────────────────┤
│  Model weights "years of continuous     │
│  employment" heavily.                   │
│                                         │
│  This penalizes:                        │
│  - Career break for childcare           │
│  - Gig economy workers                  │
│  - People with chronic illness          │
└─────────────────────────────────────────┘
```

### 3. BIAS PATTERN CARDS (The "Diagnosis")
These categorize types of algorithmic bias.

**Example Bias Pattern Cards:**
```
┌─────────────────────────────────────────┐
│  HISTORICAL BIAS                        │
│  ★★★ Common                             │
├─────────────────────────────────────────┤
│  AI learns from past data that reflects │
│  historical discrimination. The bias    │
│  isn't in the code—it's in the history. │
│                                         │
│  Example: Criminal justice algorithms   │
│  trained on racist policing data.       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  PROXY DISCRIMINATION                   │
│  ★★★ Common                             │
├─────────────────────────────────────────┤
│  Even when protected attributes (race,  │
│  gender) are removed, the AI finds      │
│  correlated "proxies" (zip codes,       │
│  names, schools) to discriminate.       │
│                                         │
│  Also called: Redlining by algorithm    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  EVALUATION BIAS                        │
│  ★★ Less Common                         │
├─────────────────────────────────────────┤
│  The benchmark/testing data doesn't     │
│  represent real-world diversity.        │
│                                         │
│  "Works on paper" but fails for         │
│  underrepresented groups.               │
└─────────────────────────────────────────┘
```

### 4. STAKEHOLDER CARDS (The "Perspective Shift")
These introduce different viewpoints and constraints.

**Example Stakeholder Cards:**
```
┌─────────────────────────────────────────┐
│  STAKEHOLDER: Affected Job Candidate    │
│  Priority: FAIR OPPORTUNITY             │
├─────────────────────────────────────────┤
│  "I've been rejected by 47 jobs I was   │
│  qualified for. I never even got an     │
│  interview. The system won't tell me    │
│  why."                                  │
│                                         │
│  CONSTRAINT: Must identify at least     │
│  one bias affecting hiring outcomes     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  STAKEHOLDER: HR Director (Deployer)    │
│  Priority: EFFICIENCY + COMPLIANCE      │
├─────────────────────────────────────────┤
│  "We process 10,000 applications/week.  │
│  We can't review them all manually.     │
│  The vendor promised this was 'fair'."  │
│                                         │
│  CONSTRAINT: Must consider cost of      │
│  switching or modifying the system      │
└─────────────────────────────────────────┘
```

---

## GAME FLOW (Sample Round)

### SETUP (2 minutes)
1. Deal each player 3 Evidence cards (hidden)
2. Place one System card face-up in center: **"HireSmart AI"**
3. Reveal one Stakeholder card: **"Affected Job Candidate"**
4. Place Bias Pattern cards as reference in center

### ROUND PHASES (10-15 minutes per system)

#### PHASE 1: INVESTIGATION (3 minutes)
Players examine their Evidence cards and the System card.

**Player Alpha's hand:**
- Evidence A: Training Data Audit (78% historical hires were men)
- Evidence B: Score Discrepancy (name-based scoring differences)
- Evidence C: Feature Analysis (penalizes career gaps)

**Player Alpha thinks:** 
- Evidence A suggests HISTORICAL BIAS (trained on biased history)
- Evidence B suggests PROXY DISCRIMINATION (names indicate race/gender)
- Evidence C is MEASUREMENT BIAS (what counts as "good" is flawed)

#### PHASE 2: CLAIM (simultaneous, 1 minute)
Each player selects:
- 1 Evidence card to play
- 1 Bias Pattern they believe it demonstrates

**Player Alpha plays:** Evidence B (Score Discrepancy) → claims PROXY DISCRIMINATION
**Player Beta plays:** Evidence A (Training Data) → claims HISTORICAL BIAS  
**Player Gamma plays:** Evidence C (Feature Analysis) → claims MEASUREMENT BIAS

#### PHASE 3: VALIDATION (discussion, 3-5 minutes)
Players argue why their evidence matches their claimed bias pattern.

**Player Alpha argues:** 
> "The scoring differences by name prove PROXY DISCRIMINATION. Even if the developers removed 'race' and 'gender' fields, the AI learned to infer them from names and penalize non-white sounding names. This is classic proxy discrimination—correlated attributes substituting for prohibited ones."

**Group discussion:** Does Evidence B actually demonstrate Proxy Discrimination? Or is it something else?

**Facilitator/Rulebook confirms:** Evidence B could support:
- PROXY DISCRIMINATION (names as proxy for race/gender) ✓
- HISTORICAL BIAS (if historical data had racist patterns) ✓

Both interpretations are valid if argued well.

#### PHASE 4: STAKEHOLDER CHECK (2 minutes)
Apply the Stakeholder card constraint.

**Current Stakeholder:** "Affected Job Candidate" requires identifying bias affecting hiring outcomes.

**Check:** All three claims affect hiring outcomes ✓

#### PHASE 5: SCORING
- **Valid claim (correct bias match):** 3 points
- **Valid claim with strong argument bonus:** +2 points
- **Stakeholder requirement met:** +1 point
- **False claim (incorrect bias match):** 0 points

**Results:**
- Player Alpha: 3 (valid) + 2 (strong argument) + 1 (stakeholder) = **6 points**
- Player Beta: 3 (valid) + 1 (stakeholder) = **4 points**  
- Player Gamma: 3 (valid) + 1 (stakeholder) = **4 points**

#### PHASE 6: DEBRIEF (2-3 minutes)
**Discussion questions:**
- Which bias was most harmful? Why?
- Who is responsible: Developer, Deployer (HR), or Both?
- What fix would address each bias?
  - Historical Bias → Retrain on balanced data
  - Proxy Discrimination → Audit for proxy variables
  - Measurement Bias → Redefine "good candidate" features

---

## MULTIPLE ROUNDS (Full Game)

**Round 1:** HireSmart (Hiring AI) - COMPLETED
**Round 2:** MediPredict (Healthcare Diagnosis AI) - NEW
**Round 3:** SafeStreet (Predictive Policing AI) - NEW

### Round 2 Example: MediPredict

**System Card:** AI that predicts hospital readmission risk to allocate follow-up care resources.

**Evidence Cards in play:**
- "Model performs equally well across races for readmission prediction"
- BUT: "Resources allocated based on 'risk score'—higher scores get more help"
- AND: "Black patients with same symptoms rated lower risk than white patients"
- THEREFORE: "Black patients receive less follow-up care despite equal need"

**Bias Pattern:** REPRESENTATION BIAS (training data didn't capture how symptoms present differently across populations) + ALLOCATION BIAS (decisions based on flawed predictions)

**The Twist:** The AI is "accurate" by standard metrics but produces discriminatory outcomes.

---

## SCORING & WINNING

### End Game Trigger
After investigating 4-5 systems (45-60 minutes), most points wins.

### Bonus Points
- **"Intersectionality Hunter":** Found bias affecting overlapping identities (e.g., Black women specifically, not just Black people or women separately)
- **"System Thinker":** Identified feedback loops (algorithm predicts crime → police sent there → more arrests → algorithm "confirmed")
- **"Remediation Proposed":** Suggested viable fix that group agrees would work

---

## KEY LEARNING MOMENTS

### Moment 1: The "Fairness" Paradox
**Scenario:** Two players claim different bias types for same evidence.
- Player A says "Historical Bias" 
- Player B says "Proxy Discrimination"

**Discovery:** BOTH CAN BE TRUE. Bias is often multi-layered.

### Moment 2: The Neutral Facade  
**Scenario:** Evidence shows "algorithm has 95% accuracy"

**Discovery:** Accuracy across WHO? The model might be 99% accurate for men and 60% for women. Overall accuracy hides disparities.

### Moment 3: The Attribution Problem
**Scenario:** Stakeholder card asks "Who is responsible?"

**Discovery:** 
- Developer: Built it, chose training data
- Deployer (Company): Chose to use it, didn't audit
- Regulator: Didn't require testing
- **Conclusion:** Accountability is distributed—no single "villain"

---

## WHY THIS WORKS (Pedagogically)

| Design Choice | Learning Outcome |
|---------------|------------------|
| Evidence → Pattern matching | Pattern recognition for bias types |
| Multiple valid interpretations | Nuance—bias is rarely simple |
| Stakeholder perspectives | Empathy + understanding different priorities |
| Real system examples | Transfer to real-world AI evaluation |
| Debate/discussion phase | Articulating ethical reasoning |
| Scoring for "Remediation Proposed" | Solutions-focused thinking |

---

## SIMPLIFIED STARTER SET (What you'd actually print)

**20 Cards Total:**
- 4 System cards (Hiring, Healthcare, Policing, Credit)
- 12 Evidence cards (3 per system)
- 4 Bias Pattern reference cards
- (Optional) 4 Stakeholder cards

**Playtime:** 20-30 minutes (2-3 systems)

**Expands to:** 120+ card commercial version with dozens of systems

---

## COMPARISON: Why This vs. Other Games?

| Feature | Bias Bounty | Werewolf/Mafia | Wingspan | Pandemic |
|---------|-------------|----------------|----------|----------|
| **Social deduction?** | Yes (arguing interpretations) | Yes (hidden roles) | No | Cooperative |
| **Real knowledge gained?** | Yes (learn bias types) | No | Some (bird facts) | No |
| **Debate/discussion?** | Core mechanic | Accusations only | No | Strategy talk |
| **Replayability source?** | Evidence combinations | Player dynamics | Card variety | Board state |
| **Player count sweet spot?** | 4-6 | 6-10 | 1-5 | 2-4 |

**Bias Bounty's unique niche:** Social deduction + genuine learning + structured ethical debate
