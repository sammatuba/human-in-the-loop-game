/**
 * Risk Assessment Protocol - Game Logic
 * NIST AI RMF and EU AI Act risk assessment simulation
 */

const SYSTEMS = [
    {
        id: 1,
        name: 'Hiring Algorithm',
        icon: '💼',
        description: 'AI system that screens job applicants and ranks them for interview selection.',
        euRiskTier: 'high',
        correctAnswers: {
            map: ['discrimination', 'privacy'],
            measure: ['bias_testing', 'audit'],
            manage: ['human_oversight', 'transparency'],
            govern: ['ethics_board', 'affected_workers']
        }
    },
    {
        id: 2,
        name: 'Medical Diagnosis Assistant',
        icon: '🏥',
        description: 'AI that analyzes patient symptoms and medical imaging to suggest diagnoses.',
        euRiskTier: 'high',
        correctAnswers: {
            map: ['safety', 'accuracy'],
            measure: ['clinical_trials', 'error_rates'],
            manage: ['doctor_override', 'training'],
            govern: ['medical_board', 'patients']
        }
    },
    {
        id: 3,
        name: 'Customer Service Chatbot',
        icon: '💬',
        description: 'AI chatbot that handles customer inquiries for an e-commerce platform.',
        euRiskTier: 'limited',
        correctAnswers: {
            map: ['misinformation', 'frustration'],
            measure: ['satisfaction', 'escalation_rate'],
            manage: ['human_handoff', 'disclosure'],
            govern: ['compliance_team', 'customers']
        }
    },
    {
        id: 4,
        name: 'Social Media Content Recommender',
        icon: '📱',
        description: 'AI that personalizes content feeds to maximize user engagement.',
        euRiskTier: 'high',
        correctAnswers: {
            map: ['addiction', 'radicalization', 'mental_health'],
            measure: ['time_spent', 'harmful_content'],
            manage: ['algorithmic_transparency', 'user_controls'],
            govern: ['regulatory_compliance', 'mental_health_experts']
        }
    },
    {
        id: 5,
        name: 'Credit Scoring System',
        icon: '💳',
        description: 'AI that evaluates loan applications and sets interest rates.',
        euRiskTier: 'high',
        correctAnswers: {
            map: ['discrimination', 'financial_exclusion'],
            measure: ['demographic_parity', 'false_rejection'],
            manage: ['explanations', 'appeal_process'],
            govern: ['financial_regulators', 'consumer_advocates']
        }
    },
    {
        id: 6,
        name: 'Spam Filter',
        icon: '📧',
        description: 'Simple AI that classifies emails as spam or legitimate.',
        euRiskTier: 'minimal',
        correctAnswers: {
            map: ['false_positives'],
            measure: ['accuracy', 'false_positive_rate'],
            manage: ['user_whitelist', 'feedback'],
            govern: ['it_team', 'users']
        }
    }
];

const PHASES = ['map', 'measure', 'manage', 'govern'];

const OPTIONS = {
    map: [
        { id: 'discrimination', label: 'Discrimination', icon: '⚖️', desc: 'Bias against protected groups' },
        { id: 'privacy', label: 'Privacy Violation', icon: '🔒', desc: 'Unauthorized data use or exposure' },
        { id: 'safety', label: 'Safety Risk', icon: '⚠️', desc: 'Physical or mental harm potential' },
        { id: 'misinformation', label: 'Misinformation', icon: '📰', desc: 'Spreading false or misleading info' },
        { id: 'addiction', label: 'Addiction/Overuse', icon: '🎮', desc: 'Compulsive usage patterns' },
        { id: 'false_positives', label: 'False Positives', icon: '❌', desc: 'Incorrect blocking or flagging' }
    ],
    measure: [
        { id: 'bias_testing', label: 'Bias Testing', icon: '🧪', desc: 'Demographic parity assessments' },
        { id: 'clinical_trials', label: 'Clinical Validation', icon: '🔬', desc: 'Medical accuracy studies' },
        { id: 'satisfaction', label: 'User Satisfaction', icon: '😊', desc: 'Customer experience metrics' },
        { id: 'time_spent', label: 'Engagement Metrics', icon: '⏱️', desc: 'Usage duration analysis' },
        { id: 'demographic_parity', label: 'Fairness Metrics', icon: '📊', desc: 'Equal outcome rates across groups' },
        { id: 'accuracy', label: 'Accuracy Testing', icon: '🎯', desc: 'Precision and recall measurements' }
    ],
    manage: [
        { id: 'human_oversight', label: 'Human Oversight', icon: '👁️', desc: 'Human review of AI decisions' },
        { id: 'doctor_override', label: 'Expert Override', icon: '👨‍⚕️', desc: 'Professional can override AI' },
        { id: 'human_handoff', label: 'Human Handoff', icon: '🤝', desc: 'Escalation to human agents' },
        { id: 'algorithmic_transparency', label: 'Transparency', icon: '🔍', desc: 'Explain how system works' },
        { id: 'explanations', label: 'Right to Explanation', icon: '📝', desc: 'Clear decision rationale' },
        { id: 'user_whitelist', label: 'User Controls', icon: '⚙️', desc: 'Allow user customization' }
    ],
    govern: [
        { id: 'ethics_board', label: 'Ethics Board', icon: '🏛️', desc: 'Internal oversight committee' },
        { id: 'medical_board', label: 'Professional Body', icon: '⚕️', desc: 'Industry regulator oversight' },
        { id: 'compliance_team', label: 'Compliance Team', icon: '✅', desc: 'Legal/regulatory review' },
        { id: 'regulatory_compliance', label: 'Regulatory Compliance', icon: '📋', desc: 'Meet legal requirements' },
        { id: 'financial_regulators', label: 'Financial Regulators', icon: '🏦', desc: 'Banking authority oversight' },
        { id: 'it_team', label: 'IT Governance', icon: '💻', desc: 'Technical oversight' }
    ]
};

const STAKEHOLDERS = [
    { id: 'affected_workers', name: 'Job Applicants', icon: '👥', concern: 'Fair hiring' },
    { id: 'patients', name: 'Patients', icon: '🤒', concern: 'Accurate diagnosis' },
    { id: 'customers', name: 'Customers', icon: '🛒', concern: 'Good service' },
    { id: 'users', name: 'Users', icon: '👤', concern: 'Digital wellbeing' },
    { id: 'consumer_advocates', name: 'Consumer Advocates', icon: '🛡️', concern: 'Fair treatment' },
    { id: 'mental_health_experts', name: 'Mental Health Experts', icon: '🧠', concern: 'Psychological safety' }
];

const state = {
    currentSystemIndex: 0,
    currentPhaseIndex: 0,
    score: 0,
    selections: { map: [], measure: [], manage: [], govern: [] },
    completedSystems: [],
    gameComplete: false
};

const elements = {
    gameBoard: document.getElementById('game-board'),
    score: document.getElementById('score'),
    currentSystem: document.getElementById('current-system'),
    totalSystems: document.getElementById('total-systems'),
    nextBtn: document.getElementById('next-btn'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal')
};

function renderStartScreen() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">📋</div>
            <h1>Risk Assessment Protocol</h1>
            <p class="tagline">Map, Measure, Manage, Govern</p>
            <div class="framework-preview">
                <div class="framework-item">
                    <span class="icon">🗺️</span>
                    <span class="name">MAP</span>
                </div>
                <div class="framework-item">
                    <span class="icon">📏</span>
                    <span class="name">MEASURE</span>
                </div>
                <div class="framework-item">
                    <span class="icon">🛡️</span>
                    <span class="name">MANAGE</span>
                </div>
                <div class="framework-item">
                    <span class="icon">⚖️</span>
                    <span class="name">GOVERN</span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="startGame()" style="font-size: 18px; padding: 18px 36px;">
                Start Assessment
            </button>
        </div>
    `;
    elements.nextBtn.disabled = true;
    elements.totalSystems.textContent = SYSTEMS.length;
}

function updatePhaseIndicator() {
    document.querySelectorAll('.phase').forEach((el, i) => {
        el.classList.toggle('active', i === state.currentPhaseIndex);
    });
}

function renderPhase() {
    const system = SYSTEMS[state.currentSystemIndex];
    const phase = PHASES[state.currentPhaseIndex];
    
    elements.currentSystem.textContent = state.currentSystemIndex + 1;
    elements.score.textContent = state.score;
    updatePhaseIndicator();
    
    const tierColors = {
        unacceptable: '#DC2626',
        high: '#F59E0B',
        limited: '#3B82F6',
        minimal: '#10B981'
    };
    
    if (phase === 'govern') {
        renderGovernPhase(system);
        return;
    }
    
    const options = OPTIONS[phase];
    
    elements.gameBoard.innerHTML = `
        <div class="card system-card">
            <div class="system-icon">${system.icon}</div>
            <h2 class="system-name">${system.name}</h2>
            <p class="system-description">${system.description}</p>
            <div class="risk-tier-badge ${system.euRiskTier}">
                EU AI Act: ${system.euRiskTier.toUpperCase()} RISK
            </div>
            
            <h3 style="margin-bottom: var(--space-md);">
                ${phase === 'map' ? '🗺️ MAP: Identify Risks' : ''}
                ${phase === 'measure' ? '📏 MEASURE: How to Assess' : ''}
                ${phase === 'manage' ? '🛡️ MANAGE: Mitigation Strategies' : ''}
            </h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                Select all that apply for this system:
            </p>
            
            <div class="selection-grid">
                ${options.map(opt => `
                    <div class="selection-card" data-id="${opt.id}" onclick="toggleSelection('${phase}', '${opt.id}')">
                        <h4>${opt.icon} ${opt.label}</h4>
                        <p>${opt.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    elements.nextBtn.disabled = state.selections[phase].length === 0;
    elements.nextBtn.innerHTML = '<span>Continue</span><span class="btn-icon">→</span>';
}

function renderGovernPhase(system) {
    elements.gameBoard.innerHTML = `
        <div class="card system-card">
            <div class="system-icon">${system.icon}</div>
            <h2 class="system-name">${system.name}</h2>
            <p class="system-description">${system.description}</p>
            
            <h3 style="margin-bottom: var(--space-md);">⚖️ GOVERN: Stakeholder Engagement</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                Select the stakeholders most affected by this system:
            </p>
            
            <div class="stakeholder-grid">
                ${STAKEHOLDERS.map(s => `
                    <div class="stakeholder-card" data-id="${s.id}" onclick="toggleSelection('govern', '${s.id}')">
                        <div class="stakeholder-icon">${s.icon}</div>
                        <div class="stakeholder-name">${s.name}</div>
                        <div class="stakeholder-concern">${s.concern}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    elements.nextBtn.disabled = state.selections.govern.length === 0;
    elements.nextBtn.innerHTML = '<span>Submit Assessment</span><span class="btn-icon">✓</span>';
}

function toggleSelection(phase, id) {
    const idx = state.selections[phase].indexOf(id);
    if (idx > -1) {
        state.selections[phase].splice(idx, 1);
    } else {
        state.selections[phase].push(id);
    }
    
    // Update UI
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.toggle('selected', idx === -1);
    }
    
    elements.nextBtn.disabled = state.selections[phase].length === 0;
}

function calculateScore() {
    const system = SYSTEMS[state.currentSystemIndex];
    let phaseScore = 0;
    const phase = PHASES[state.currentPhaseIndex];
    
    if (phase === 'govern') {
        // Check stakeholder selections
        const correctStakeholders = system.correctAnswers.govern;
        let correct = 0;
        state.selections.govern.forEach(id => {
            if (correctStakeholders.includes(id)) correct++;
        });
        phaseScore = correct * 25;
    } else {
        // Check phase selections
        const correctAnswers = system.correctAnswers[phase];
        let correct = 0;
        state.selections[phase].forEach(id => {
            if (correctAnswers.includes(id)) correct++;
        });
        phaseScore = correct * 25;
    }
    
    state.score += phaseScore;
}

function showResults() {
    const system = SYSTEMS[state.currentSystemIndex];
    
    elements.gameBoard.innerHTML = `
        <div class="card">
            <h2 style="text-align: center; margin-bottom: var(--space-lg);">Assessment Complete</h2>
            
            <div class="result-summary">
                <h3>${system.icon} ${system.name}</h3>
                <div class="score-breakdown">
                    <div class="score-item">
                        <div class="score-item-value" style="color: var(--color-map);">${countCorrect('map')}</div>
                        <div class="score-item-label">Map</div>
                    </div>
                    <div class="score-item">
                        <div class="score-item-value" style="color: var(--color-measure);">${countCorrect('measure')}</div>
                        <div class="score-item-label">Measure</div>
                    </div>
                    <div class="score-item">
                        <div class="score-item-value" style="color: var(--color-manage);">${countCorrect('manage')}</div>
                        <div class="score-item-label">Manage</div>
                    </div>
                    <div class="score-item">
                        <div class="score-item-value" style="color: var(--color-govern);">${countCorrect('govern')}</div>
                        <div class="score-item-label">Govern</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: var(--space-lg); padding: var(--space-lg); background: var(--color-bg); border-radius: 8px;">
                <h4 style="color: var(--color-primary-light); margin-bottom: var(--space-sm);">Key Learning</h4>
                <p style="font-size: 14px; color: var(--color-text-secondary);">
                    ${system.euRiskTier === 'high' 
                        ? 'High-risk systems under the EU AI Act require strict compliance, including human oversight, transparency, and regular auditing.' 
                        : system.euRiskTier === 'limited'
                        ? 'Limited-risk systems must meet transparency requirements so users know they are interacting with AI.'
                        : 'Minimal-risk systems have voluntary compliance standards but should still follow best practices.'}
                </p>
            </div>
        </div>
    `;
    
    elements.score.textContent = state.score;
    elements.nextBtn.disabled = false;
    elements.nextBtn.innerHTML = state.currentSystemIndex < SYSTEMS.length - 1 
        ? '<span>Next System</span><span class="btn-icon">→</span>'
        : '<span>Final Report</span><span class="btn-icon">📊</span>';
}

function countCorrect(phase) {
    const system = SYSTEMS[state.currentSystemIndex];
    const correct = system.correctAnswers[phase];
    let count = 0;
    state.selections[phase].forEach(id => {
        if (correct.includes(id)) count++;
    });
    return count;
}

function renderFinalReport() {
    state.gameComplete = true;
    
    const maxScore = SYSTEMS.length * 400;
    const percentage = Math.round((state.score / maxScore) * 100);
    
    let rating = '';
    if (percentage >= 90) rating = '🏆 Risk Management Expert';
    else if (percentage >= 70) rating = '⭐ Compliance Professional';
    else if (percentage >= 50) rating: '🔍 Risk Analyst';
    else rating = '📚 Trainee Assessor';
    
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo" style="font-size: 80px;">📊</div>
            <div class="final-score">${state.score}</div>
            <div class="rating">${rating}</div>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">
                You assessed ${SYSTEMS.length} AI systems across the NIST AI RMF framework.
            </p>
            <button class="btn btn-primary" onclick="resetGame()" style="font-size: 16px; padding: 16px 32px;">
                New Assessment
            </button>
        </div>
    `;
    
    elements.nextBtn.disabled = true;
}

function startGame() {
    state.currentSystemIndex = 0;
    state.currentPhaseIndex = 0;
    state.score = 0;
    state.selections = { map: [], measure: [], manage: [], govern: [] };
    state.completedSystems = [];
    state.gameComplete = false;
    renderPhase();
}

function resetGame() {
    renderStartScreen();
}

function nextStep() {
    if (state.currentPhaseIndex < PHASES.length - 1) {
        calculateScore();
        state.currentPhaseIndex++;
        renderPhase();
    } else if (state.currentSystemIndex < SYSTEMS.length - 1) {
        calculateScore();
        showResults();
        state.currentSystemIndex++;
        state.currentPhaseIndex = 0;
        state.selections = { map: [], measure: [], manage: [], govern: [] };
    } else if (!state.gameComplete) {
        calculateScore();
        showResults();
    } else {
        renderFinalReport();
    }
}

// Event Listeners
elements.nextBtn.addEventListener('click', () => {
    if (elements.nextBtn.textContent.includes('Submit')) {
        calculateScore();
        showResults();
    } else if (elements.nextBtn.textContent.includes('Next')) {
        nextStep();
    } else if (elements.nextBtn.textContent.includes('Final')) {
        renderFinalReport();
    }
});

elements.helpBtn.addEventListener('click', () => {
    elements.helpModal.classList.remove('hidden');
});

document.querySelector('.modal-close').addEventListener('click', () => {
    elements.helpModal.classList.add('hidden');
});

elements.helpModal.addEventListener('click', (e) => {
    if (e.target === elements.helpModal) {
        elements.helpModal.classList.add('hidden');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        elements.helpModal.classList.toggle('hidden');
    }
    if (e.key === 'Escape') {
        elements.helpModal.classList.add('hidden');
    }
});

// Initialize
renderStartScreen();
