/**
 * Hallucination Hunt - Game Logic
 * Detect AI hallucinations and false information
 */

const STATEMENTS = [
    {
        id: 1,
        text: "The Eiffel Tower was completed in 1889 and stands 330 meters tall. It was designed by Gustave Eiffel and was the world's tallest structure until 1930.",
        type: 'trust',
        explanation: "All facts are accurate and verifiable. The Eiffel Tower was indeed completed in 1889, is 330m tall, and designed by Gustave Eiffel.",
        markers: { facts: "Construction dates and height are correct", sources: "Gustave Eiffel is correctly identified as the engineer" }
    },
    {
        id: 2,
        text: "According to a 2023 study by Dr. Emily Chen at Stanford University, drinking 4 cups of coffee daily reduces heart disease risk by 47%. The study followed 50,000 participants over 10 years.",
        type: 'hallucination',
        explanation: "This appears to be a hallucination. No such specific study exists. AI often generates plausible-sounding but fabricated statistics with fake researcher names.",
        markers: { facts: "Specific statistics (47%) without verifiable source", sources: "Cannot verify Dr. Emily Chen or this specific Stanford study" }
    },
    {
        id: 3,
        text: "The capital of Australia is Sydney. It is the largest city in Australia and was founded in 1788 as a British penal colony.",
        type: 'hallucination',
        explanation: "The capital of Australia is Canberra, not Sydney. Sydney is the largest city but not the capital - a common misconception AI might reproduce.",
        markers: { facts: "Canberra is the capital, not Sydney", logic: "Confuses largest city with capital city" }
    },
    {
        id: 4,
        text: "Shakespeare wrote 37 plays during his lifetime, including tragedies like Hamlet and Macbeth, comedies like A Midsummer Night's Dream, and histories like Henry V.",
        type: 'trust',
        explanation: "This is accurate. Shakespeare is credited with 37 plays across these genres.",
        markers: { facts: "37 plays is the accepted canon", sources: "Play titles and categories are correct" }
    },
    {
        id: 5,
        text: "The ancient Library of Alexandria contained over 500,000 scrolls and was destroyed by Julius Caesar in 48 BCE. Many lost works of Greek literature were stored there.",
        type: 'unverifiable',
        explanation: "The exact number of scrolls is unknown (estimates vary widely). While Caesar's fire damaged the library, its complete destruction is debated among historians.",
        markers: { facts: "500,000 is an estimate, not a verified fact", sources: "Historical records are incomplete and disputed" }
    },
    {
        id: 6,
        text: "In 2019, researchers at MIT developed an AI that could predict earthquakes 3 days in advance with 94% accuracy. The system was never deployed due to funding issues.",
        type: 'hallucination',
        explanation: "This is a complete fabrication. No such AI exists - earthquake prediction remains scientifically impossible with current technology.",
        markers: { facts: "Earthquake prediction is currently impossible", logic: "94% accuracy claim is extraordinary and unverified", sources: "No record of this MIT research exists" }
    },
    {
        id: 7,
        text: "Water boils at 100 degrees Celsius at standard atmospheric pressure (1 atm or 101.325 kPa). At higher altitudes, water boils at lower temperatures due to reduced atmospheric pressure.",
        type: 'trust',
        explanation: "This is scientifically accurate. The boiling point of water varies with pressure.",
        markers: { facts: "100°C at 1 atm is correct", logic: "Explanation of altitude effect is scientifically sound" }
    },
    {
        id: 8,
        text: "The Treaty of Versailles was signed on June 28, 1919, exactly five years after Franz Ferdinand was assassinated. It required Germany to pay 132 billion gold marks in reparations.",
        type: 'hallucination',
        explanation: "The date is correct, but the reparations figure is wrong. The 132 billion gold marks was a nominal figure; the actual assessed amount was 50 billion gold marks.",
        markers: { facts: "132 billion was a nominal figure, not the actual amount" }
    },
    {
        id: 9,
        text: "There may be life on Europa, one of Jupiter's moons. Scientists believe its subsurface ocean could harbor conditions suitable for microbial life.",
        type: 'unverifiable',
        explanation: "This is speculative but scientifically grounded. We don't know if there's life on Europa - it's a hypothesis based on the presence of a subsurface ocean.",
        markers: { facts: "No evidence of life has been found", logic: "Uses appropriate speculative language ('may', 'could')" }
    },
    {
        id: 10,
        text: "The speed of light in a vacuum is approximately 299,792,458 meters per second. This constant is denoted by 'c' and is fundamental to Einstein's theory of relativity.",
        type: 'trust',
        explanation: "This is accurate. The speed of light is exactly 299,792,458 m/s by definition since 1983.",
        markers: { facts: "Speed of light value is exact by definition", sources: "Einstein's theory reference is correct" }
    }
];

const TOOLS = {
    citations: { name: 'Check Citations', icon: '📚', count: 3 },
    facts: { name: 'Fact Check', icon: '🔎', count: 3 },
    sources: { name: 'Verify Sources', icon: '🔗', count: 2 },
    logic: { name: 'Logic Check', icon: '🧠', count: 2 }
};

const state = {
    currentIndex: 0,
    score: 0,
    tools: JSON.parse(JSON.stringify(TOOLS)),
    revealed: [],
    hasJudged: false,
    correct: 0
};

const elements = {
    gameBoard: document.getElementById('game-board'),
    score: document.getElementById('score'),
    roundNum: document.getElementById('round-num'),
    roundTotal: document.getElementById('round-total'),
    confidenceFill: document.getElementById('confidence-fill'),
    confidenceValue: document.getElementById('confidence-value'),
    nextBtn: document.getElementById('next-btn'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal')
};

function renderStart() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">👁️</div>
            <h1>Hallucination Hunt</h1>
            <p class="tagline">Spot the Fake Facts</p>
            <p style="color: var(--color-text-secondary); margin-bottom: 32px;">AI can generate convincing but false information. Can you tell what's real?</p>
            <button class="btn btn-primary" onclick="startGame()" style="font-size: 18px; padding: 18px 36px;">Start Hunting</button>
        </div>
    `;
    elements.nextBtn.disabled = true;
}

function updateTools() {
    Object.keys(state.tools).forEach(tool => {
        const el = document.getElementById(`${tool}-count`);
        if (el) el.textContent = state.tools[tool].count;
        const toolEl = document.querySelector(`[data-tool="${tool}"]`);
        if (toolEl) toolEl.classList.toggle('depleted', state.tools[tool].count <= 0);
    });
}

function renderStatement() {
    const stmt = STATEMENTS[state.currentIndex];
    elements.roundNum.textContent = state.currentIndex + 1;
    elements.roundTotal.textContent = STATEMENTS.length;
    elements.score.textContent = state.score;
    updateTools();
    
    let markersHtml = state.revealed.map(m => `
        <div class="verification-result">
            <strong>${TOOLS[m].icon} ${TOOLS[m].name}:</strong> ${stmt.markers[m] || 'No obvious issues detected'}
        </div>
    `).join('');
    
    elements.gameBoard.innerHTML = `
        <div class="card">
            <div style="text-align: center; margin-bottom: 16px;">
                <span style="background: var(--color-surface-light); padding: 4px 12px; border-radius: 12px; font-size: 12px;">Statement ${state.currentIndex + 1}/${STATEMENTS.length}</span>
            </div>
            <div class="ai-output">
                <div class="ai-header">🤖 AI Output</div>
                <div class="ai-content">${stmt.text}</div>
            </div>
            ${markersHtml}
        </div>
    `;
    
    document.querySelectorAll('.judgment-btn').forEach(btn => btn.disabled = state.hasJudged);
    elements.nextBtn.disabled = !state.hasJudged;
}

function useTool(toolId) {
    if (state.hasJudged || state.tools[toolId].count <= 0) return;
    if (state.revealed.includes(toolId)) return;
    
    state.tools[toolId].count--;
    state.revealed.push(toolId);
    renderStatement();
}

function makeJudgment(judgment) {
    if (state.hasJudged) return;
    state.hasJudged = true;
    
    const stmt = STATEMENTS[state.currentIndex];
    const correct = judgment === stmt.type;
    
    if (correct) {
        state.score += 100;
        state.correct++;
    }
    
    // Show result
    const resultDiv = document.createElement('div');
    resultDiv.style.cssText = 'margin-top: 24px; padding: 16px; border-radius: 8px; animation: slideIn 0.3s ease-out;';
    
    if (correct) {
        resultDiv.style.background = 'rgba(16, 185, 129, 0.1)';
        resultDiv.style.border = '1px solid var(--color-trust)';
        resultDiv.innerHTML = `<strong style="color: var(--color-trust);">✓ Correct!</strong> ${stmt.explanation}`;
    } else {
        resultDiv.style.background = 'rgba(239, 68, 68, 0.1)';
        resultDiv.style.border = '1px solid var(--color-hallucination)';
        resultDiv.innerHTML = `<strong style="color: var(--color-hallucination);">✗ Incorrect</strong> ${stmt.explanation}`;
    }
    
    document.querySelector('.card').appendChild(resultDiv);
    elements.score.textContent = state.score;
    elements.nextBtn.disabled = false;
    document.querySelectorAll('.judgment-btn').forEach(btn => btn.disabled = true);
}

function nextStatement() {
    if (state.currentIndex < STATEMENTS.length - 1) {
        state.currentIndex++;
        state.hasJudged = false;
        state.revealed = [];
        renderStatement();
    } else {
        showFinal();
    }
}

function showFinal() {
    const accuracy = Math.round((state.correct / STATEMENTS.length) * 100);
    let rating = accuracy >= 80 ? '🏆 Hallucination Hunter' : accuracy >= 60 ? '⭐ Fact Checker' : accuracy >= 40 ? '🔍 Skeptic' : '📚 Trainee';
    
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo" style="font-size: 80px;">🎯</div>
            <div style="font-size: 64px; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">${state.score}</div>
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">${rating}</div>
            <p style="color: var(--color-text-secondary); margin-bottom: 32px;">${accuracy}% accuracy - You identified ${state.correct}/${STATEMENTS.length} correctly</p>
            <button class="btn btn-primary" onclick="startGame()" style="font-size: 16px; padding: 16px 32px;">Play Again</button>
        </div>
    `;
    elements.nextBtn.disabled = true;
}

function startGame() {
    state.currentIndex = 0;
    state.score = 0;
    state.tools = JSON.parse(JSON.stringify(TOOLS));
    state.revealed = [];
    state.hasJudged = false;
    state.correct = 0;
    renderStatement();
}

// Event Listeners
document.querySelectorAll('.tool').forEach(tool => {
    tool.addEventListener('click', () => useTool(tool.dataset.tool));
});

elements.nextBtn.addEventListener('click', nextStatement);

elements.helpBtn.addEventListener('click', () => elements.helpModal.classList.remove('hidden'));
document.querySelector('.modal-close').addEventListener('click', () => elements.helpModal.classList.add('hidden'));
elements.helpModal.addEventListener('click', (e) => { if (e.target === elements.helpModal) elements.helpModal.classList.add('hidden'); });

document.addEventListener('keydown', (e) => {
    if (e.key === '?' || e.key === '/') elements.helpModal.classList.toggle('hidden');
    if (e.key === 'Escape') elements.helpModal.classList.add('hidden');
});

renderStart();
