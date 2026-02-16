# AI Literacy Game Demo: Evaluation & Improvement Prompt

Use this comprehensive prompt to systematically evaluate and improve any AI literacy game demo in your project.

---

## Pre-Evaluation Setup

### Step 1: Gather Materials
Before starting, ensure you have access to:
- [ ] The demo's implementation files (HTML/CSS/JS or other)
- [ ] Foundational research documents (UNESCO, OECD, NIST, EU, CoE frameworks)
- [ ] Gamification best practices documentation
- [ ] The game design document for this specific demo
- [ ] Any existing evaluation or feedback data

### Step 2: Create Evaluation Environment
```bash
# Create evaluation workspace
cd demos/[demo-name]
mkdir -p evaluation-backup
cp -r web-vanilla/* evaluation-backup/
```

---

## Phase 1: Foundation Alignment Analysis

### 1.1 UNESCO AI Competency Framework Coverage

Evaluate the demo against UNESCO's four dimensions:

| Dimension | Competency | Evidence in Demo | Status |
|-----------|------------|------------------|--------|
| **Human-Centred Mindset** | Understand and assert human agency | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| **Human-Centred Mindset** | Recognize AI impact on human rights | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| **Ethics of AI** | Identify ethical dilemmas | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| **Ethics of AI** | Safe and responsible use | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| **AI Techniques** | Understand limitations | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| **AI Techniques** | Recognize probabilistic nature | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| **AI System Design** | Problem-solving with AI | | ⬜ Complete / ⬜ Partial / ⬜ Missing |

**Score**: ___/7 competencies covered

### 1.2 OECD AI Principles Coverage

Check alignment with all 5 OECD principles:

| Principle | Evidence in Demo | Status |
|-----------|------------------|--------|
| 1.1 Inclusive Growth | | ⬜ Covered / ⬜ Missing |
| 1.2 Human-Centred Values | | ⬜ Covered / ⬜ Missing |
| 1.3 Transparency | | ⬜ Covered / ⬜ Missing |
| 1.4 Robustness/Safety | | ⬜ Covered / ⬜ Missing |
| 1.5 Accountability | | ⬜ Covered / ⬜ Missing |

**Score**: ___/5 principles covered

### 1.3 NIST AI Risk Management Framework Translation

Assess how NIST functions are adapted for general audiences:

| NIST Function | Game Translation | Quality |
|---------------|------------------|---------|
| **MAP** (Context) | | ⭐⭐⭐⭐⭐ |
| **MEASURE** (Analysis) | | ⭐⭐⭐⭐⭐ |
| **MANAGE** (Mitigation) | | ⭐⭐⭐⭐⭐ |
| **GOVERN** (Culture) | | ⭐⭐⭐⭐⭐ |

### 1.4 Council of Europe Three Dimensions

| Dimension | Evidence | Coverage |
|-----------|----------|----------|
| **Technological** | | ⭐⭐⭐⭐⭐ |
| **Practical** | | ⭐⭐⭐⭐⭐ |
| **Human** | | ⭐⭐⭐⭐⭐ |

### 1.5 EU Ethics Guidelines Coverage

Check against all 7 Trustworthy AI requirements:

| Requirement | Evidence | Status |
|-------------|----------|--------|
| Human Agency & Oversight | | ⬜ Covered / ⬜ Missing |
| Technical Robustness | | ⬜ Covered / ⬜ Missing |
| Privacy & Data Governance | | ⬜ Covered / ⬜ Missing |
| Transparency | | ⬜ Covered / ⬜ Missing |
| Diversity & Fairness | | ⬜ Covered / ⬜ Missing |
| Societal Well-being | | ⬜ Covered / ⬜ Missing |
| Accountability | | ⬜ Covered / ⬜ Missing |

**Foundation Alignment Score**: ___/10

---

## Phase 2: Game Design Evaluation

### 2.1 Core Game Loop Analysis

Map the game loop:
```
[Input] → [Process] → [Output] → [Feedback] → [Loop]
```

Evaluate:
- [ ] Is the loop clear and intuitive?
- [ ] Are there meaningful decisions at each step?
- [ ] Is feedback immediate and informative?
- [ ] Does the loop support learning objectives?

### 2.2 Decision Space Analysis

| Aspect | Current State | Ideal State | Gap |
|--------|--------------|-------------|-----|
| Decision options | | | |
| Information available | | | |
| Consequence visibility | | | |
| Retry/recovery | | | |

### 2.3 Scenario Quality Assessment

For each scenario, evaluate:

| ID | Title | Stakes | Concept | Real-World Basis | Clue Quality | Difficulty |
|----|-------|--------|---------|-----------------|--------------|------------|
| 1 | | ⭐/⭐⭐/⭐⭐⭐ | | ⬜ Strong ⬜ Weak | ⭐⭐⭐⭐⭐ | Easy/Med/Hard |

**Scenario Diversity Check:**
- [ ] Healthcare/Medical
- [ ] Finance/Banking
- [ ] Criminal Justice/Legal
- [ ] Employment/Hiring
- [ ] Education
- [ ] Transportation
- [ ] Content Moderation
- [ ] Customer Service
- [ ] Research/Science
- [ ] Privacy/Data
- [ ] Environment/Sustainability
- [ ] Creative/Artistic

### 2.4 Gamification Mechanics Scorecard

| Mechanic | Implementation | Pedagogical Value | Engagement Value |
|----------|---------------|-------------------|------------------|
| Points/Scoring | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Progression | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Collection | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Feedback | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Mastery | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Narrative | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Social | | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### 2.5 Learning Outcomes Assessment

| Stage | Implementation | Effectiveness |
|-------|---------------|---------------|
| **Understand** | | ⭐⭐⭐⭐⭐ |
| **Evaluate** | | ⭐⭐⭐⭐⭐ |
| **Apply** | | ⭐⭐⭐⭐⭐ |
| **Reflect** | | ⭐⭐⭐⭐⭐ |
| **Create/Teach** | | ⭐⭐⭐⭐⭐ |

**Game Design Score**: ___/10

---

## Phase 3: Technical Implementation Review

### 3.1 Code Architecture

| Aspect | Rating | Notes |
|--------|--------|-------|
| Separation of concerns | ⭐⭐⭐⭐⭐ | |
| State management | ⭐⭐⭐⭐⭐ | |
| Data structure | ⭐⭐⭐⭐⭐ | |
| Rendering approach | ⭐⭐⭐⭐⭐ | |
| Event handling | ⭐⭐⭐⭐⭐ | |

### 3.2 Data Structure Quality

Validate scenario object schema:
- [ ] `id`: Unique identifier
- [ ] `category`: Domain classification
- [ ] `stakes`: Risk level (1-3)
- [ ] `title`: Clear descriptor
- [ ] `description`: Context setting
- [ ] `aiRecommendation`: AI output
- [ ] `aiReasoning`: Explainability
- [ ] `aiConfidence`: Calibration (0-100)
- [ ] `aiIsCorrect`: Ground truth
- [ ] `correctAction`: Expected decision
- [ ] `conceptTaught`: Learning objective
- [ ] `investigationClues`: Array of clues
- [ ] `explanation`: Pedagogical rationale
- [ ] `frameworks`: Standards alignment

### 3.3 Performance & Accessibility

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Initial load | < 100KB | | ⬜ Pass / ⬜ Fail |
| Runtime memory | < 10MB | | ⬜ Pass / ⬜ Fail |
| Rendering | 60fps | | ⬜ Pass / ⬜ Fail |
| Offline capable | Yes | | ⬜ Pass / ⬜ Fail |
| Keyboard navigation | Full | | ⬜ Pass / ⬜ Fail |
| Screen reader support | ARIA labels | | ⬜ Pass / ⬜ Fail |
| Mobile responsive | Yes | | ⬜ Pass / ⬜ Fail |

**Technical Quality Score**: ___/10

---

## Phase 4: Issue Identification

### 4.1 Critical Gaps (Blockers)

| # | Issue | Impact | Priority |
|---|-------|--------|----------|
| 1 | | | 🔴 High |
| 2 | | | 🔴 High |
| 3 | | | 🔴 High |

### 4.2 Important Gaps (Should Have)

| # | Issue | Impact | Priority |
|---|-------|--------|----------|
| 1 | | | 🟡 Medium |
| 2 | | | 🟡 Medium |
| 3 | | | 🟡 Medium |

### 4.3 Enhancement Gaps (Nice to Have)

| # | Issue | Impact | Priority |
|---|-------|--------|----------|
| 1 | | | 🟢 Low |
| 2 | | | 🟢 Low |
| 3 | | | 🟢 Low |

---

## Phase 5: Improvement Recommendations

### 5.1 Critical Priority (Immediate)

**CR-001: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 
  - [ ] 

**CR-002: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 
  - [ ] 

**CR-003: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 
  - [ ] 

### 5.2 Important Priority (v1.x Release)

**IMP-001: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 
  - [ ] 

**IMP-002: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 
  - [ ] 

**IMP-003: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 
  - [ ] 

### 5.3 Enhancement Priority (Future)

**ENH-001: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 

**ENH-002: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 

**ENH-003: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 

**ENH-004: [Title]**
- **Rationale**: 
- **Implementation Notes**:
- **Acceptance Criteria**:
  - [ ] 
  - [ ] 

---

## Phase 6: Documentation Requirements

### 6.1 Evaluation Report
Create `EVALUATION_REPORT.md` with:
- Executive Summary
- Foundation Alignment Matrix (detailed)
- Concept Coverage Analysis
- Game Design Evaluation
- Scenario Deep Dive
- User Experience Assessment
- Technical Implementation Review
- Comparative Analysis (with similar games)
- Issues & Gaps Summary
- Recommendations Summary

### 6.2 Improvement Tracking
Create `IMPROVEMENT_TRACKING.md` with:
- Quick Status Dashboard
- Detailed item specifications
- Progress Log
- Success Metrics
- Change Request Process

### 6.3 Implementation Summaries
After each release, create `IMPLEMENTATION_SUMMARY_vX.Y.md` with:
- Overview of changes
- Detailed changes per feature
- Updated metrics
- Files modified
- Testing checklist
- Next steps

---

## Phase 7: Implementation Workflow

### Step-by-Step Process

1. **Document Current State**
   - Run evaluation using this prompt
   - Create EVALUATION_REPORT.md
   - Create IMPROVEMENT_TRACKING.md

2. **Prioritize Improvements**
   - Review Critical items
   - Confirm priority with stakeholders
   - Set version targets (v1.1, v1.2, etc.)

3. **Implement Critical Items**
   - Work through CR-001, CR-002, CR-003
   - Update tracking document after each
   - Test thoroughly

4. **Implement Important Items**
   - Work through IMP-001 to IMP-003
   - Update tracking document
   - User testing

5. **Implement Enhancements (Optional)**
   - Work through ENH-001 to ENH-004
   - As time/resources allow

6. **Document & Release**
   - Create IMPLEMENTATION_SUMMARY
   - Update all documentation
   - Tag release version

---

## Metrics Summary Template

### Before/After Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Foundation Alignment | /10 | /10 | |
| Pedagogical Design | /10 | /10 | |
| Game Mechanics | /10 | /10 | |
| Technical Quality | /10 | /10 | |
| **Overall** | **/10** | **/10** | **+** |

### Feature Completeness

| Category | Before | After |
|----------|--------|-------|
| Single Player | | |
| Multiplayer | | |
| Assessment | | |
| Replayability | | |
| Adaptivity | | |
| Narrative | | |
| Accessibility | | |

---

## Quick Reference: Framework Alignment Sources

| Framework | Document Location |
|-----------|------------------|
| UNESCO AI CFS | `research-docs/01-foundations/AI Literacy and Safety Standards.md` |
| OECD AI Principles | `research-docs/01-foundations/AI Literacy and Safety Standards.md` |
| NIST AI RMF | `research-docs/01-foundations/AI Literacy and Safety Standards.md` |
| Council of Europe | `research-docs/01-foundations/AI Literacy and Safety Standards.md` |
| EU Ethics Guidelines | `research-docs/01-foundations/AI Literacy and Safety Standards.md` |
| Gamification Best Practices | `research-docs/01-foundations/Gamified AI Literacy and Safety Education.md` |

---

## Output Checklist

After completing evaluation, ensure you have:

- [ ] `EVALUATION_REPORT.md` (comprehensive analysis)
- [ ] `IMPROVEMENT_TRACKING.md` (progress tracking)
- [ ] `IMPLEMENTATION_SUMMARY_v1.0.md` (baseline)
- [ ] Updated game files with improvements
- [ ] Backup of original files
- [ ] Testing results documented

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial comprehensive evaluation prompt based on Human-in-the-Loop demo experience |

---

*This prompt should be used as a living document—update it based on learnings from each demo evaluation.*
