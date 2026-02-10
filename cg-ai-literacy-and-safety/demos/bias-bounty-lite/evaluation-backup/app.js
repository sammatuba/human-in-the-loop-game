/**
 * Bias Bounty Lite - Game Logic
 * A collaborative investigation game about AI bias patterns
 */

// ========================================
// Game Data
// ========================================

const HINTS = {
    'bad-start': [
        'Look for words like "trained on", "historical", "past", "years of data"',
        'Ask: What data did the AI learn from? Was that data biased?',
        'Think: Did the AI inherit existing inequalities?'
    ],
    'wrong-measuring': [
        'Look for words like "measures", "optimizes", "metric", "score"',
        'Ask: Is the AI measuring the right thing?',
        'Think: Does the metric match the real goal?'
    ],
    'sneaky-shortcuts': [
        'Look for words like "correlates with", "proxies", "indirect", "never asks directly"',
        'Ask: Is the AI using something as a stand-in for something else?',
        'Think: Can you see hidden connections that might relate to protected traits?'
    ]
};

const SYSTEMS = [
    {
        id: 'hiring-helper',
        name: 'Hiring Helper',
        description: 'Helps companies sort job applications to find the "best" candidates faster.',
        usage: 'Used by over 500 companies',
        goal: 'Find qualified workers quickly',
        icon: '💼'
    },
    {
        id: 'loan-approver',
        name: 'Loan Approver',
        description: 'Helps banks decide who gets approved for home loans and at what rates.',
        usage: 'Used by major banks nationwide',
        goal: 'Predict who will repay loans',
        icon: '🏦'
    },
    {
        id: 'health-predictor',
        name: 'Health Predictor',
        description: 'Helps hospitals identify patients who might need extra care after discharge.',
        usage: 'Used in 200+ hospitals',
        goal: 'Prevent return hospital visits',
        icon: '🏥'
    },
    {
        id: 'school-sorter',
        name: 'School Sorter',
        description: 'Helps schools identify students who might need extra support or tutoring.',
        usage: 'Used by districts in 15 states',
        goal: 'Allocate teaching resources',
        icon: '🎓'
    },
    {
        id: 'crime-forecaster',
        name: 'Crime Forecaster',
        description: 'Helps police decide where to patrol based on predicted "high-risk" areas.',
        usage: 'Used by police in major cities',
        goal: 'Prevent crime before it happens',
        icon: '👮'
    },
    {
        id: 'insurance-rater',
        name: 'Insurance Rater',
        description: 'Helps insurance companies set prices for car insurance for new customers.',
        usage: 'Used by major auto insurers',
        goal: 'Predict who will have accidents',
        icon: '🚗'
    },
    {
        id: 'content-recommender',
        name: 'Content Recommender',
        description: 'Decides what videos, posts, and news to show users on social media platforms.',
        usage: 'Used by all major social networks',
        goal: 'Keep users engaged longer',
        icon: '📱'
    },
    {
        id: 'voice-recognizer',
        name: 'Voice Recognizer',
        description: 'Converts spoken words to text for voice assistants and dictation tools.',
        usage: 'Used in phones, cars, and homes',
        goal: 'Understand spoken commands',
        icon: '🎤'
    }
];

const PROBLEMS = [
    // Hiring Helper Problems
    {
        id: 'hh-1',
        systemId: 'hiring-helper',
        title: 'Historical Male Dominance',
        description: 'The AI was trained on 10 years of hiring decisions from tech companies. During those years, 73% of people hired were men.',
        affected: ['Women applicants'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical data that reflected past discrimination.'
    },
    {
        id: 'hh-2',
        systemId: 'hiring-helper',
        title: 'Name-Based Scoring',
        description: 'Researchers sent identical resumes with different names. "John" scored 87/100, "Jamal" scored 72/100, "Emily" scored 79/100, "Lakisha" scored 65/100.',
        affected: ['People with non-white names'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI learned to associate certain names with lower qualifications, even though names don\'t indicate ability.'
    },
    {
        id: 'hh-3',
        systemId: 'hiring-helper',
        title: 'Employment Gap Penalty',
        description: 'The AI penalizes "employment gaps" longer than 6 months. This hurts people who took time off for childcare, had illness, or did gig work.',
        affected: ['Caregivers (mostly women)', 'People with health challenges', 'Gig economy workers'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because gaps don\'t measure qualification—many skilled people have valid reasons for career breaks.'
    },
    
    // Loan Approver Problems
    {
        id: 'la-1',
        systemId: 'loan-approver',
        title: 'Historical Redlining',
        description: 'The AI was trained on 20 years of loan decisions. During those years, banks often rejected qualified applicants in certain neighborhoods (redlining). The AI learned these patterns.',
        affected: ['Residents of historically excluded neighborhoods'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical lending discrimination against minority neighborhoods.'
    },
    {
        id: 'la-2',
        systemId: 'loan-approver',
        title: 'Zip Code Proxies',
        description: 'The AI charges higher interest rates in certain zip codes. Those zip codes have higher percentages of Black and Latino residents. The AI never asks about race directly.',
        affected: ['Black and Latino applicants'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses zip codes as a hidden proxy for race to discriminate indirectly.'
    },
    {
        id: 'la-3',
        systemId: 'loan-approver',
        title: 'Credit Score Limitations',
        description: 'The AI uses credit score as the main factor. But credit scores don\'t account for: medical debt (often unavoidable), predatory lending history, or discrimination in past credit access.',
        affected: ['People with medical emergencies', 'Victims of predatory lending', 'Those denied credit history building'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because credit scores are an incomplete measure of loan repayment ability.'
    },
    
    // Health Predictor Problems
    {
        id: 'hp-1',
        systemId: 'health-predictor',
        title: 'Spending vs. Need Confusion',
        description: 'The AI predicts who needs extra care based on past hospital spending. Historically, Black patients received less care for the same conditions. The AI learned that "less spending" means "less need"—but it actually meant "less access."',
        affected: ['Black patients needing care'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical healthcare disparities that under-treated Black patients.'
    },
    {
        id: 'hp-2',
        systemId: 'health-predictor',
        title: 'Skin Tone Detection Failure',
        description: 'The AI was tested mostly on patients at wealthy hospitals. It works well for white patients. It misses warning signs in darker skin tones because symptoms look different on different skin.',
        affected: ['Patients with darker skin'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI relies on visual patterns that correlate with race rather than actual medical indicators.'
    },
    {
        id: 'hp-3',
        systemId: 'health-predictor',
        title: 'Universal "Normal" Ranges',
        description: 'The AI defines "healthy" based on averages from population studies. But "normal" heart rates, blood pressure, and lab values differ by age, sex, and ethnicity. Healthy individuals get flagged incorrectly.',
        affected: ['Women (different heart symptoms)', 'Elderly (different "normal" ranges)', 'Non-white ethnicities'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because the AI uses a single standard that doesn\'t account for legitimate biological variation.'
    },
    
    // School Sorter Problems
    {
        id: 'ss-1',
        systemId: 'school-sorter',
        title: 'Historical Tracking',
        description: 'The AI was trained on decades of student data from schools that historically tracked Black and Latino students into vocational programs while steering white students to college prep.',
        affected: ['Black and Latino students', 'Students from low-income families'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical educational tracking that limited opportunities for minority students.'
    },
    {
        id: 'ss-2',
        systemId: 'school-sorter',
        title: 'Test Score Over-Reliance',
        description: 'The AI relies heavily on standardized test scores. But these tests favor students from wealthy districts with test prep resources. The AI never asks about a student\'s growth potential or obstacles overcome.',
        affected: ['Students from under-resourced schools', 'Students with test anxiety', 'English language learners'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because test scores measure access to resources more than actual learning potential.'
    },
    {
        id: 'ss-3',
        systemId: 'school-sorter',
        title: 'Behavior Bias',
        description: 'The AI flags students as "needing support" based on disciplinary records. But Black students are disciplined more harshly for the same behaviors as white students. The AI treats the records as objective truth.',
        affected: ['Black students', 'Students with disabilities', 'Boys (more harshly disciplined than girls)'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses disciplinary records as a proxy for needing help, when records reflect biased discipline practices.'
    },
    
    // Crime Forecaster Problems
    {
        id: 'cf-1',
        systemId: 'crime-forecaster',
        title: 'Arrest Data Feedback Loop',
        description: 'The AI predicts crime based on historical arrest data. But police have historically arrested more people in minority neighborhoods for the same behaviors. The AI sends police back to those neighborhoods, creating more arrests there.',
        affected: ['Residents of over-policed neighborhoods', 'Black and Latino communities'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from biased policing data that over-represented crime in minority areas.'
    },
    {
        id: 'cf-2',
        systemId: 'crime-forecaster',
        title: 'Geographic Proxies',
        description: 'The AI flags "high-risk" areas using factors like: 911 call volume, nuisance complaints, and building code violations. These correlate with poverty and race. The AI never sees the actual crime, just the neighborhood characteristics.',
        affected: ['Low-income neighborhoods', 'Communities of color', 'Renters in poorly maintained housing'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses neighborhood characteristics as hidden proxies for race and class.'
    },
    {
        id: 'cf-3',
        systemId: 'crime-forecaster',
        title: 'Predictive Policing Harms',
        description: 'The AI measures success by "crime prevented"—meaning fewer reported incidents in patrolled areas. But heavy policing can suppress reporting (people stop calling police they don\'t trust) while increasing surveillance harm.',
        affected: ['Over-surveilled communities', 'Victims who avoid police', 'People stopped without cause'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because "fewer reports" doesn\'t mean "less crime"—it can mean less community trust.'
    },
    
    // Insurance Rater Problems
    {
        id: 'ir-1',
        systemId: 'insurance-rater',
        title: 'Neighborhood Rating Bias',
        description: 'The AI was trained on decades of insurance data from an era when companies explicitly charged higher rates in minority neighborhoods. Though now illegal, the historical patterns persist in the data.',
        affected: ['Residents of historically redlined areas', 'Urban drivers in minority neighborhoods'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned pricing patterns from the era of explicitly racist insurance practices.'
    },
    {
        id: 'ir-2',
        systemId: 'insurance-rater',
        title: 'Occupation Proxies',
        description: 'The AI considers occupation as a risk factor. Certain jobs correlate with race and class: "professional" jobs get discounts, "service" jobs get penalties. The AI never asks about actual driving behavior.',
        affected: ['Working-class drivers', 'Service industry workers', 'Immigrants in certain job categories'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because occupation acts as a hidden proxy for race and class in pricing.'
    },
    {
        id: 'ir-3',
        systemId: 'insurance-rater',
        title: 'Driving Score Limitations',
        description: 'The AI uses telematics (driving behavior tracking) to set rates. But it measures hard braking, which happens more in: stop-and-go city traffic, areas with jaywalking, and neighborhoods without crosswalks.',
        affected: ['City drivers', 'Low-income areas with poor infrastructure', 'Delivery drivers'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because "hard braking" measures road conditions and infrastructure more than driving skill.'
    },
    
    // Content Recommender Problems
    {
        id: 'cr-1',
        systemId: 'content-recommender',
        title: 'Engagement Optimization',
        description: 'The AI was trained on billions of user interactions showing that outrage, fear, and controversy drive clicks. It learned to amplify divisive content because that\'s what got engagement historically.',
        affected: ['All users exposed to polarizing content', 'Democracies with misinformation', 'Vulnerable to radicalization'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from user behavior that rewarded sensational and divisive content.'
    },
    {
        id: 'cr-2',
        systemId: 'content-recommender',
        title: 'Filter Bubbles',
        description: 'The AI shows users content similar to what they engaged with before. Over time, users only see one perspective. The AI never asks if users want to see diverse viewpoints—it just optimizes for clicks.',
        affected: ['Users seeking diverse perspectives', 'Society\'s shared reality', 'Political discourse'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses past clicks as a proxy for "what users want" rather than measuring actual satisfaction or knowledge gain.'
    },
    {
        id: 'cr-3',
        systemId: 'content-recommender',
        title: 'Addiction Design',
        description: 'The AI measures success by "time spent on platform." But this metric rewards addictive, endless-scrolling designs over content that actually informs or satisfies. The AI optimizes for addiction, not well-being.',
        affected: ['Users with addictive tendencies', 'Children and teens', 'Mental health of heavy users'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because "time spent" doesn\'t measure value delivered—it often measures addiction and wasted time.'
    },
    
    // Voice Recognizer Problems
    {
        id: 'vr-1',
        systemId: 'voice-recognizer',
        title: 'Accent Bias',
        description: 'The AI was trained primarily on American English speakers from specific regions. It works well for those accents but fails for Southern US, Scottish, Indian, Nigerian, and many other English accents.',
        affected: ['Non-standard accent speakers', 'Immigrants', 'Regional dialect speakers'],
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from biased training data that under-represented diverse accents.'
    },
    {
        id: 'vr-2',
        systemId: 'voice-recognizer',
        title: 'Gender Recognition Failure',
        description: 'The AI was trained on voices labeled by binary gender (male/female). It struggles with: higher-pitched male voices, lower-pitched female voices, transgender voices, and non-binary voices. It forces everyone into two categories.',
        affected: ['Transgender individuals', 'Non-binary people', 'People with non-conforming voices'],
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses pitch and tone as proxies for gender, which don\'t capture the complexity of human identity.'
    },
    {
        id: 'vr-3',
        systemId: 'voice-recognizer',
        title: 'Dialect Discrimination',
        description: 'The AI measures "accuracy" against a single standard of "proper" English. But African American Vernacular English (AAVE) is linguistically valid—just different. The AI treats dialect differences as errors.',
        affected: ['AAVE speakers', 'Other non-standard dialect speakers', 'Bilingual English speakers'],
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because the AI measures against one dialect standard rather than recognizing linguistic diversity.'
    }
];

const PATTERNS = [
    {
        id: 'bad-start',
        name: 'Bad Start',
        icon: '📚',
        color: '#DC2626',
        description: 'The AI learned from biased history',
        phrase: '"The past trained the future"',
        signs: ['References to historical data', 'Patterns that existed "for years"', 'Past discrimination affecting now']
    },
    {
        id: 'wrong-measuring',
        name: 'Wrong Measuring',
        icon: '📏',
        color: '#F59E0B',
        description: 'The AI measures success poorly',
        phrase: '"What gets measured gets misled"',
        signs: ['"Good at X but bad at Y"', 'Optimizing for wrong thing', 'Metric doesn\'t match real goal']
    },
    {
        id: 'sneaky-shortcuts',
        name: 'Sneaky Shortcuts',
        icon: '🎭',
        color: '#16A34A',
        description: 'The AI finds hidden ways to discriminate',
        phrase: '"Correlation masquerading as truth"',
        signs: ['Patterns that "look like" something', 'Correlation used as causation', 'Hidden connections revealed']
    }
];

const PHASES = [
    { id: 'REVEAL_SYSTEM', name: 'Reveal System', duration: 0 },
    { id: 'REVEAL_PROBLEMS', name: 'Reveal Problems', duration: 0 },
    { id: 'OBSERVE', name: 'Observe', duration: 60 },
    { id: 'DISCUSS', name: 'Discuss & Vote', duration: 0 },
    { id: 'COMMIT', name: 'Commit', duration: 0 },
    { id: 'REFLECT', name: 'Reflect', duration: 0 }
];

// ========================================
// Game State
// ========================================

const state = {
    currentSystemIndex: 0,
    currentPhase: 0,
    score: 0,
    selections: {}, // problemId -> patternId
    timer: null,
    timeRemaining: 0,
    gameComplete: false,
    correctAnswers: 0,
    totalAttempts: 0,
    systemsPlayed: 0
};

// ========================================
// DOM Elements
// ========================================

const elements = {
    gameBoard: document.getElementById('game-board'),
    phaseIndicator: document.getElementById('phase-indicator'),
    phaseNumber: document.querySelector('.phase-number'),
    phaseName: document.querySelector('.phase-name'),
    score: document.getElementById('score'),
    systemCounter: document.getElementById('system-counter'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    timerDisplay: document.getElementById('timer-display'),
    timerValue: document.getElementById('timer-value'),
    patternBar: document.getElementById('pattern-bar'),
    helpModal: document.getElementById('help-modal'),
    confettiCanvas: document.getElementById('confetti')
};

// ========================================
// Rendering Functions
// ========================================

function renderStartScreen() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">🔍</div>
            <h1>Bias Bounty Lite</h1>
            <p class="tagline">Find the hidden unfairness—before it finds you.</p>
            <p class="game-description">
                Investigate AI systems together and learn to recognize three patterns 
                of how unfairness enters automated decision-making. Collaborative, 
                educational, and eye-opening.
            </p>
            <div class="patterns-preview">
                <div class="pattern-mini bad-start">
                    <span class="icon">📚</span>
                    <span class="name">Bad Start</span>
                </div>
                <div class="pattern-mini wrong-measuring">
                    <span class="icon">📏</span>
                    <span class="name">Wrong Measuring</span>
                </div>
                <div class="pattern-mini sneaky-shortcuts">
                    <span class="icon">🎭</span>
                    <span class="name">Sneaky Shortcuts</span>
                </div>
            </div>
            <button class="btn btn-primary start-btn" onclick="startGame()">
                Start Investigation
            </button>
        </div>
    `;
    elements.prevBtn.disabled = true;
    elements.nextBtn.style.display = 'none';
    elements.patternBar.classList.add('hidden');
}

function renderSystemCard(system) {
    return `
        <div class="card system-card">
            <span class="system-icon">${system.icon}</span>
            <h2>${system.name}</h2>
            <p class="description">${system.description}</p>
            <div class="system-meta">
                <div class="meta-item">
                    <span class="meta-label">Usage</span>
                    <span class="meta-value">${system.usage}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Goal</span>
                    <span class="meta-value">${system.goal}</span>
                </div>
            </div>
        </div>
    `;
}

function renderProblemCard(problem, showSelection = false) {
    const affectedList = problem.affected.map(a => `<li>${a}</li>`).join('');
    
    if (showSelection) {
        const currentSelection = state.selections[problem.id];
        return `
            <div class="problem-vote-card" data-problem="${problem.id}">
                <div class="card problem-card problem-preview">
                    <div class="problem-header">
                        <span class="problem-badge">Problem</span>
                    </div>
                    <h3>${problem.title}</h3>
                    <p class="problem-description">${problem.description}</p>
                    <div class="affected-section">
                        <span class="affected-label">Who Was Affected</span>
                        <ul class="affected-list">${affectedList}</ul>
                    </div>
                </div>
                <div class="pattern-options">
                    ${PATTERNS.map(p => `
                        <div class="pattern-option ${currentSelection === p.id ? 'selected' : ''}" 
                             data-pattern="${p.id}"
                             onclick="selectPattern('${problem.id}', '${p.id}')">
                            <span class="option-icon">${p.icon}</span>
                            <span class="option-name">${p.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return `
        <div class="card problem-card" data-problem="${problem.id}">
            <div class="problem-header">
                <span class="problem-badge">Problem</span>
            </div>
            <h3>${problem.title}</h3>
            <p class="problem-description">${problem.description}</p>
            <div class="affected-section">
                <span class="affected-label">Who Was Affected</span>
                <ul class="affected-list">${affectedList}</ul>
            </div>
        </div>
    `;
}

function renderPatternCard(pattern, selectable = false) {
    const selectionClass = selectable ? 'pattern-select-card' : 'pattern-card';
    return `
        <div class="card ${selectionClass}" data-pattern="${pattern.id}">
            ${selectable ? '<div class="selection-indicator">✓</div>' : ''}
            <span class="pattern-icon">${pattern.icon}</span>
            <h3>${pattern.name}</h3>
            <p class="pattern-desc">${pattern.description}</p>
            <p class="pattern-phrase">${pattern.phrase}</p>
        </div>
    `;
}

function renderPhase() {
    const phase = PHASES[state.currentPhase];
    const system = SYSTEMS[state.currentSystemIndex];
    const problems = PROBLEMS.filter(p => p.systemId === system.id);
    
    // Update header
    elements.phaseNumber.textContent = state.currentPhase + 1;
    elements.phaseName.textContent = phase.name;
    elements.systemCounter.textContent = `System ${state.currentSystemIndex + 1}/${SYSTEMS.length}`;
    
    // Show/hide pattern bar
    if (state.currentPhase >= 2) {
        elements.patternBar.classList.remove('hidden');
    } else {
        elements.patternBar.classList.add('hidden');
    }
    
    // Render phase content
    switch(phase.id) {
        case 'REVEAL_SYSTEM':
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title">🔍 System Revealed</h2>
                ${renderSystemCard(system)}
                <p class="phase-instruction">
                    This is the AI system you'll investigate. Read about what it does 
                    and who it affects. Click Next to see the problems found in this system.
                </p>
            `;
            elements.timerDisplay.classList.add('hidden');
            break;
            
        case 'REVEAL_PROBLEMS':
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title">⚠️ Problems Found</h2>
                <div class="problems-grid">
                    ${problems.map(p => renderProblemCard(p)).join('')}
                </div>
                <p class="phase-instruction">
                    Three specific problems have been identified with this system. 
                    Take note of who was affected and what patterns you see.
                </p>
            `;
            break;
            
        case 'OBSERVE':
            elements.gameBoard.innerHTML = `
                <div class="timer-phase">
                    <h2 class="phase-title">🤫 Silent Observation</h2>
                    <div class="timer-display-large" id="observation-timer">60</div>
                    <p class="timer-message">
                        Study the problems in silence. Look for patterns that match 
                        the three types shown above. No talking—just think!
                    </p>
                </div>
            `;
            startTimer(60, 'observation-timer');
            break;
            
        case 'DISCUSS':
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title">💬 Discuss & Vote</h2>
                <div class="hints-bar" style="margin-bottom: var(--space-lg); padding: var(--space-md); background: var(--color-bg); border-radius: var(--radius-md); max-width: 900px;">
                    <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-sm);">
                        <strong>💡 Hint:</strong> Click a pattern type above to see clues
                    </p>
                    <div id="hint-display" style="font-size: var(--font-size-sm); font-style: italic; color: var(--color-text-muted);">
                        Hover over 📚 Bad Start, 📏 Wrong Measuring, or 🎭 Sneaky Shortcuts in the pattern bar above for hints
                    </div>
                </div>
                <div class="problem-pattern-grid">
                    ${problems.map(p => renderProblemCard(p, true)).join('')}
                </div>
                <p class="phase-instruction">
                    For each problem, select which pattern fits best. 
                    Discuss with your group—there may be multiple valid answers!
                </p>
            `;
            setupHintInteractions();
            break;
            
        case 'COMMIT':
            const allSelected = problems.every(p => state.selections[p.id]);
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title">✓ Commit Your Answers</h2>
                <div class="card" style="max-width: 600px; text-align: center;">
                    <h3 style="margin-bottom: var(--space-lg);">Your Selections</h3>
                    ${problems.map(p => {
                        const selection = state.selections[p.id];
                        const pattern = PATTERNS.find(pat => pat.id === selection);
                        return `
                            <div style="margin-bottom: var(--space-md); padding: var(--space-md); background: var(--color-bg); border-radius: var(--radius-md);">
                                <strong>${p.title}</strong> → 
                                <span style="color: ${pattern?.color || 'inherit'}">${pattern?.icon || ''} ${pattern?.name || 'Not selected'}</span>
                            </div>
                        `;
                    }).join('')}
                    ${!allSelected ? '<p style="color: var(--color-bad-start); margin-top: var(--space-md);">⚠️ Please select a pattern for each problem</p>' : ''}
                </div>
                <p class="phase-instruction">
                    ${allSelected 
                        ? 'Ready to see how you did? Click Next to reveal the answers!' 
                        : 'Go back and make sure you\'ve selected a pattern for each problem.'}
                </p>
            `;
            elements.nextBtn.disabled = !allSelected;
            break;
            
        case 'REFLECT':
            renderResults(problems);
            break;
    }
    
    // Update button states
    elements.prevBtn.disabled = state.currentPhase === 0;
    elements.nextBtn.style.display = 'inline-flex';
    elements.nextBtn.disabled = false;
    
    if (phase.id === 'REFLECT') {
        elements.nextBtn.innerHTML = state.currentSystemIndex < SYSTEMS.length - 1 
            ? '<span>Next System</span><span class="btn-icon">→</span>'
            : '<span>See Final Score</span><span class="btn-icon">🏆</span>';
    } else {
        elements.nextBtn.innerHTML = '<span>Next Phase</span><span class="btn-icon">→</span>';
    }
}

function renderResults(problems) {
    // Save progress after each system
    saveProgress();
    
    let points = 0;
    let correct = 0;
    
    const resultsHtml = problems.map((problem, index) => {
        const selection = state.selections[problem.id];
        const isCorrect = selection === problem.pattern;
        
        if (isCorrect) {
            points += 1;
            correct++;
        }
        
        const selectedPattern = PATTERNS.find(p => p.id === selection);
        const correctPattern = PATTERNS.find(p => p.id === problem.pattern);
        
        const resultClass = isCorrect ? 'correct' : 'incorrect';
        const badgeText = isCorrect ? '✓ Correct' : '✗ Incorrect';
        
        // Stagger animation
        const delay = index * 0.15;
        
        return `
            <div class="result-item ${resultClass}" style="animation-delay: ${delay}s">
                <div class="result-header">
                    <span class="result-problem">${problem.title}</span>
                    <span class="result-badge">${badgeText}</span>
                </div>
                <div class="result-details">
                    <div class="result-answer">
                        <span class="answer-label">Your answer:</span>
                        <span class="answer-value" style="background: ${selectedPattern?.color || '#ccc'}20; color: ${selectedPattern?.color || '#666'}">
                            ${selectedPattern?.icon || ''} ${selectedPattern?.name || 'None'}
                        </span>
                    </div>
                    <div class="result-correct">
                        <span class="correct-label">Correct:</span>
                        <span class="correct-value" style="background: ${correctPattern?.color}20; color: ${correctPattern?.color}">
                            ${correctPattern?.icon} ${correctPattern?.name}
                        </span>
                    </div>
                </div>
                <p style="margin-top: var(--space-md); font-size: var(--font-size-sm); color: var(--color-text-secondary); padding: var(--space-md); background: var(--color-bg); border-radius: var(--radius-md);">
                    <strong>Why:</strong> ${problem.explanation}
                </p>
            </div>
        `;
    }).join('');
    
    // Update score
    state.score += points;
    state.correctAnswers += correct;
    state.totalAttempts += problems.length;
    elements.score.textContent = state.score;
    
    // Calculate rating
    const accuracy = correct / problems.length;
    let rating = '';
    let ratingClass = '';
    
    if (accuracy === 1) {
        rating = '🌟 Perfect!';
        ratingClass = 'perfect';
        triggerConfetti();
    } else if (accuracy >= 0.67) {
        rating = '👏 Great job!';
        ratingClass = 'good';
    } else if (accuracy >= 0.33) {
        rating = '💪 Keep learning!';
        ratingClass = 'okay';
    } else {
        rating = '📚 Review the patterns';
        ratingClass = 'needs-work';
    }
    
    elements.gameBoard.innerHTML = `
        <h2 class="phase-title">🤔 Reflection</h2>
        <div class="results-container">
            ${resultsHtml}
            <div class="card" style="text-align: center; margin-top: var(--space-xl); animation: slideIn 0.4s ease-out ${problems.length * 0.15}s both;">
                <h3 style="margin-bottom: var(--space-md);">Round Score: ${points}/${problems.length}</h3>
                <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--color-primary);">
                    ${rating}
                </div>
            </div>
        </div>
        <p class="phase-instruction">
            What did you learn about ${SYSTEMS[state.currentSystemIndex].name}? 
            Notice how bias can enter AI systems in different ways.
        </p>
    `;
}

function renderGameOver() {
    state.gameComplete = true;
    state.systemsPlayed = SYSTEMS.length;
    
    // Clear progress on completion
    clearProgress();
    
    const maxScore = SYSTEMS.length * 3;
    const accuracy = state.totalAttempts > 0 ? (state.correctAnswers / state.totalAttempts) : 0;
    
    let title = '';
    let message = '';
    
    if (state.score >= 20) {
        title = '🏆 Expert Detectives';
        message = 'Outstanding! You\'ve mastered the three patterns of AI bias.';
        triggerConfetti();
    } else if (state.score >= 15) {
        title = '⭐ Skilled Investigators';
        message = 'Great work! You\'re getting very good at spotting bias patterns.';
        triggerConfetti();
    } else if (state.score >= 10) {
        title = '📖 Learning the Ropes';
        message = 'Good effort! Keep practicing to recognize these important patterns.';
    } else {
        title = '🎓 Keep Studying';
        message = 'Bias detection takes practice. Review the warm-up examples and try again!';
    }
    
    elements.gameBoard.innerHTML = `
        <div class="game-over">
            <div class="trophy">🏆</div>
            <h2>${title}</h2>
            <div class="final-score">${state.score}</div>
            <div class="score-label">points earned</div>
            <div class="rating">${message}</div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${state.correctAnswers}/${state.totalAttempts}</div>
                    <div class="stat-label">Correct Answers</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${Math.round(accuracy * 100)}%</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${SYSTEMS.length}</div>
                    <div class="stat-label">Systems Investigated</div>
                </div>
            </div>
            <button class="btn btn-primary play-again-btn" onclick="resetGame()">
                Play Again
            </button>
        </div>
    `;
    
    elements.phaseIndicator.style.display = 'none';
    elements.patternBar.classList.add('hidden');
    elements.prevBtn.disabled = true;
    elements.nextBtn.style.display = 'none';
    elements.timerDisplay.classList.add('hidden');
}

// ========================================
// Game Actions
// ========================================

function startGame() {
    state.currentSystemIndex = 0;
    state.currentPhase = 0;
    state.score = 0;
    state.selections = {};
    state.gameComplete = false;
    state.correctAnswers = 0;
    state.totalAttempts = 0;
    state.systemsPlayed = 0;
    
    elements.score.textContent = '0';
    elements.phaseIndicator.style.display = 'flex';
    
    renderPhase();
}

function resetGame() {
    startGame();
}

function nextPhase() {
    const currentPhaseId = PHASES[state.currentPhase].id;
    
    // Clear timer if running
    if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
    }
    
    if (currentPhaseId === 'REFLECT') {
        // Move to next system or end game
        if (state.currentSystemIndex < SYSTEMS.length - 1) {
            state.currentSystemIndex++;
            state.currentPhase = 0;
            state.selections = {};
            renderPhase();
        } else {
            renderGameOver();
        }
    } else {
        state.currentPhase++;
        renderPhase();
    }
}

function prevPhase() {
    if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
    }
    
    if (state.currentPhase > 0) {
        state.currentPhase--;
        renderPhase();
    }
}

function selectPattern(problemId, patternId) {
    state.selections[problemId] = patternId;
    
    // Update UI
    const card = document.querySelector(`[data-problem="${problemId}"]`);
    if (card) {
        const options = card.querySelectorAll('.pattern-option');
        options.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.pattern === patternId) {
                opt.classList.add('selected');
            }
        });
    }
}

function startTimer(seconds, elementId) {
    state.timeRemaining = seconds;
    elements.timerDisplay.classList.remove('hidden');
    elements.timerValue.textContent = seconds;
    
    const timerEl = document.getElementById(elementId);
    
    state.timer = setInterval(() => {
        state.timeRemaining--;
        
        if (timerEl) {
            timerEl.textContent = state.timeRemaining;
            
            // Visual feedback
            if (state.timeRemaining <= 10) {
                timerEl.classList.add('danger');
                timerEl.classList.remove('warning');
            } else if (state.timeRemaining <= 30) {
                timerEl.classList.add('warning');
            }
        }
        
        elements.timerValue.textContent = state.timeRemaining;
        
        if (state.timeRemaining <= 0) {
            clearInterval(state.timer);
            state.timer = null;
            // Auto-advance
            setTimeout(() => nextPhase(), 500);
        }
    }, 1000);
}

// ========================================
// Confetti Effect
// ========================================

function triggerConfetti() {
    const canvas = elements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#DC2626', '#F59E0B', '#16A34A', '#2563EB', '#7C3AED'];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    let animationId;
    let frameCount = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });
        
        frameCount++;
        if (frameCount < 180) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// ========================================
// Hint System
// ========================================

function setupHintInteractions() {
    const patternRefs = document.querySelectorAll('.pattern-ref');
    const hintDisplay = document.getElementById('hint-display');
    
    patternRefs.forEach(ref => {
        ref.addEventListener('mouseenter', () => {
            const patternId = ref.dataset.pattern;
            const hints = HINTS[patternId];
            const randomHint = hints[Math.floor(Math.random() * hints.length)];
            const pattern = PATTERNS.find(p => p.id === patternId);
            
            if (hintDisplay) {
                hintDisplay.innerHTML = `<span style="color: ${pattern.color}">${pattern.icon} ${pattern.name}:</span> ${randomHint}`;
                hintDisplay.style.fontStyle = 'normal';
            }
        });
        
        ref.addEventListener('mouseleave', () => {
            if (hintDisplay) {
                hintDisplay.textContent = 'Hover over 📚 Bad Start, 📏 Wrong Measuring, or 🎭 Sneaky Shortcuts in the pattern bar above for hints';
                hintDisplay.style.fontStyle = 'italic';
            }
        });
    });
}

// ========================================
// Event Listeners
// ========================================

elements.nextBtn.addEventListener('click', nextPhase);
elements.prevBtn.addEventListener('click', prevPhase);

// Help button
document.getElementById('help-btn')?.addEventListener('click', () => {
    elements.helpModal.classList.remove('hidden');
});

// Modal
document.querySelector('.modal-close')?.addEventListener('click', () => {
    elements.helpModal.classList.add('hidden');
});

// Close modal on outside click
elements.helpModal?.addEventListener('click', (e) => {
    if (e.target === elements.helpModal) {
        elements.helpModal.classList.add('hidden');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Help toggle
    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        elements.helpModal.classList.toggle('hidden');
        return;
    }
    
    // Close modal with Escape
    if (e.key === 'Escape') {
        elements.helpModal.classList.add('hidden');
    }
    
    if (state.gameComplete) return;
    
    // Phase navigation
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (!elements.nextBtn.disabled) nextPhase();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!elements.prevBtn.disabled) prevPhase();
    }
    
    // Pattern selection during DISCUSS phase
    if (PHASES[state.currentPhase].id === 'DISCUSS') {
        const problemCards = document.querySelectorAll('.problem-vote-card');
        const activeProblem = document.querySelector('.problem-vote-card:focus') || problemCards[0];
        
        if (activeProblem) {
            const problemId = activeProblem.dataset.problem;
            if (e.key === '1') selectPattern(problemId, 'bad-start');
            if (e.key === '2') selectPattern(problemId, 'wrong-measuring');
            if (e.key === '3') selectPattern(problemId, 'sneaky-shortcuts');
        }
    }
});

// Resize handler for confetti
window.addEventListener('resize', () => {
    elements.confettiCanvas.width = window.innerWidth;
    elements.confettiCanvas.height = window.innerHeight;
});

// ========================================
// Progress Persistence
// ========================================

function saveProgress() {
    const progress = {
        score: state.score,
        currentSystemIndex: state.currentSystemIndex,
        correctAnswers: state.correctAnswers,
        totalAttempts: state.totalAttempts,
        systemsPlayed: state.systemsPlayed,
        timestamp: Date.now()
    };
    localStorage.setItem('biasBountyProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('biasBountyProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

function clearProgress() {
    localStorage.removeItem('biasBountyProgress');
}

// ========================================
// Enhanced Start Screen with Continue Option
// ========================================

function renderStartScreen() {
    const saved = loadProgress();
    const hasProgress = saved && saved.currentSystemIndex > 0;
    
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">🔍</div>
            <h1>Bias Bounty Lite</h1>
            <p class="tagline">Find the hidden unfairness—before it finds you.</p>
            <p class="game-description">
                Investigate AI systems together and learn to recognize three patterns 
                of how unfairness enters automated decision-making. Collaborative, 
                educational, and eye-opening.
            </p>
            <div class="patterns-preview">
                <div class="pattern-mini bad-start">
                    <span class="icon">📚</span>
                    <span class="name">Bad Start</span>
                </div>
                <div class="pattern-mini wrong-measuring">
                    <span class="icon">📏</span>
                    <span class="name">Wrong Measuring</span>
                </div>
                <div class="pattern-mini sneaky-shortcuts">
                    <span class="icon">🎭</span>
                    <span class="name">Sneaky Shortcuts</span>
                </div>
            </div>
            <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary start-btn" onclick="startGame()">
                    ${hasProgress ? 'New Game' : 'Start Investigation'}
                </button>
                ${hasProgress ? `
                    <button class="btn btn-secondary" onclick="continueGame()">
                        Continue (${saved.currentSystemIndex}/${SYSTEMS.length} systems)
                    </button>
                ` : ''}
            </div>
            ${hasProgress ? `
                <p style="margin-top: var(--space-md); font-size: var(--font-size-sm); color: var(--color-text-muted);">
                    Previous score: ${saved.score} points
                </p>
            ` : ''}
        </div>
    `;
    elements.prevBtn.disabled = true;
    elements.nextBtn.style.display = 'none';
    elements.patternBar.classList.add('hidden');
}

function continueGame() {
    const saved = loadProgress();
    if (saved) {
        state.score = saved.score;
        state.currentSystemIndex = saved.currentSystemIndex;
        state.correctAnswers = saved.correctAnswers;
        state.totalAttempts = saved.totalAttempts;
        state.systemsPlayed = saved.systemsPlayed;
        state.currentPhase = 0;
        state.selections = {};
        
        elements.score.textContent = state.score;
        elements.phaseIndicator.style.display = 'flex';
        
        renderPhase();
    }
}

// ========================================
// Initialize
// ========================================

renderStartScreen();
