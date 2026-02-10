/**
 * Deepfake Detective - Game Logic
 * Epistemic safety game about detecting AI-generated content
 */

// ========================================
// Game Data
// ========================================

const MEDIA_CASES = [
    {
        id: 1,
        type: 'image',
        difficulty: 1,
        isFake: true,
        title: 'The Politician Photo',
        content: '📸',
        description: 'A photo of a politician giving a speech at a recent rally.',
        markers: {
            hands: 'The left hand appears to have 6 fingers - a common AI artifact.',
            lighting: 'The lighting on the face doesn\'t match the background shadows.',
            background: 'The crowd behind has blurry, indistinct faces that merge together.',
            texture: 'The skin has an unnatural, waxy smoothness typical of AI generation.',
            metadata: 'File created with "Stable Diffusion" in EXIF data.'
        },
        realWorldParallel: '2024: AI-generated political deepfakes during election campaigns'
    },
    {
        id: 2,
        type: 'image',
        difficulty: 2,
        isFake: false,
        title: 'The Award Ceremony',
        content: '📸',
        description: 'A celebrity accepting an award on stage.',
        markers: {
            hands: 'Natural hand proportions with realistic finger positioning.',
            lighting: 'Consistent stage lighting with appropriate shadows.',
            background: 'Sharp background details of audience members.',
            texture: 'Natural skin texture with visible pores and imperfections.',
            metadata: 'Professional camera EXIF data, timestamp consistent with event.'
        },
        realWorldParallel: 'Authentic event photography'
    },
    {
        id: 3,
        type: 'text',
        difficulty: 1,
        isFake: true,
        title: 'The News Headline',
        content: '"BREAKING: Scientists Discover Water on Mars Has Healing Properties, Pharmaceutical Stocks Plummet"',
        description: 'A viral news headline circulating on social media.',
        markers: {
            hands: 'N/A - Text content',
            lighting: 'N/A - Text content',
            background: 'Source website domain was registered 3 days ago.',
            texture: 'Grammar and style inconsistent with major news outlets.',
            metadata: 'Article has no byline, no publication date, no sources cited.'
        },
        realWorldParallel: 'AI-generated news articles used for stock manipulation'
    },
    {
        id: 4,
        type: 'audio',
        difficulty: 2,
        isFake: true,
        title: 'The CEO Call',
        content: '🎙️',
        description: 'An audio recording of a CEO discussing quarterly earnings.',
        markers: {
            hands: 'N/A - Audio content',
            lighting: 'N/A - Audio content',
            background: 'Background noise doesn\'t match the claimed location.',
            texture: 'Voice has slight robotic quality in certain phonemes.',
            metadata: 'Audio spectrogram shows AI generation artifacts in high frequencies.'
        },
        realWorldParallel: '2023: AI voice cloning used in corporate fraud attempts'
    },
    {
        id: 5,
        type: 'image',
        difficulty: 3,
        isFake: false,
        title: 'The Wildlife Photo',
        content: '📸',
        description: 'A stunning wildlife photograph of an eagle catching a fish.',
        markers: {
            hands: 'N/A - Animal subject',
            lighting: 'Natural golden hour lighting with consistent shadows.',
            background: 'Sharp water droplets frozen in motion.',
            texture: 'Detailed feather textures with natural variations.',
            metadata: 'Wildlife photographer portfolio, RAW file available.'
        },
        realWorldParallel: 'Award-winning nature photography'
    },
    {
        id: 6,
        type: 'text',
        difficulty: 2,
        isFake: false,
        title: 'The Research Abstract',
        content: '"Our study of 10,000 patients over 5 years found no significant correlation between coffee consumption and heart disease (p=0.34, 95% CI -0.12 to 0.18)."',
        description: 'An excerpt from a peer-reviewed medical journal.',
        markers: {
            hands: 'N/A - Academic text',
            lighting: 'N/A - Academic text',
            background: 'Published in Journal of the American Medical Association.',
            texture: 'Proper statistical reporting with confidence intervals.',
            metadata: 'DOI link valid, authors have verified publication records.'
        },
        realWorldParallel: 'Legitimate scientific research publication'
    },
    {
        id: 7,
        type: 'image',
        difficulty: 3,
        isFake: true,
        title: 'The Historical Photo',
        content: '📸',
        description: 'A "recently discovered" photo of a famous historical event.',
        markers: {
            hands: 'Period-appropriate clothing but modern watch visible on wrist.',
            lighting: 'Color grading too modern for claimed era.',
            background: 'Anachronistic elements in background (modern signage).',
            texture: 'Artificial aging patterns inconsistent with real vintage photos.',
            metadata: 'Digital file created in 2024, not film negative.'
        },
        realWorldParallel: 'AI-generated "historical" images spreading misinformation'
    },
    {
        id: 8,
        type: 'audio',
        difficulty: 3,
        isFake: false,
        title: 'The Podcast Interview',
        content: '🎙️',
        description: 'A segment from a well-known technology podcast.',
        markers: {
            hands: 'N/A - Audio content',
            lighting: 'N/A - Audio content',
            background: 'Consistent studio acoustics throughout recording.',
            texture: 'Natural speech patterns, breathing, and vocal variations.',
            metadata: 'Matches podcast RSS feed, cross-referenced with video version.'
        },
        realWorldParallel: 'Legitimate podcast content'
    }
];

const TOOLS = {
    hands: { name: 'Check Hands', icon: '✋', count: 2 },
    lighting: { name: 'Lighting', icon: '💡', count: 2 },
    background: { name: 'Background', icon: '🖼️', count: 2 },
    texture: { name: 'Skin Texture', icon: '🔍', count: 2 },
    metadata: { name: 'Metadata', icon: '📊', count: 1 }
};

// ========================================
// Game State
// ========================================

const state = {
    currentCaseIndex: 0,
    score: 0,
    lives: 3,
    toolsRemaining: { ...TOOLS },
    activeTool: null,
    revealedMarkers: [],
    hasJudged: false,
    gameComplete: false
};

// ========================================
// DOM Elements
// ========================================

const elements = {
    gameBoard: document.getElementById('game-board'),
    roundCounter: document.getElementById('round-counter'),
    score: document.getElementById('score'),
    lives: document.getElementById('lives'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal'),
    toolsBar: document.getElementById('tools-bar')
};

// ========================================
// Rendering Functions
// ========================================

function renderStartScreen() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">🔍</div>
            <h1>Deepfake Detective</h1>
            <p class="tagline">Can you spot the synthetic?</p>
            <div class="tools-preview">
                <div class="tool-preview">
                    <span class="icon">✋</span>
                    <span class="name">Check Hands</span>
                </div>
                <div class="tool-preview">
                    <span class="icon">💡</span>
                    <span class="name">Lighting</span>
                </div>
                <div class="tool-preview">
                    <span class="icon">🖼️</span>
                    <span class="name">Background</span>
                </div>
                <div class="tool-preview">
                    <span class="icon">🔍</span>
                    <span class="name">Texture</span>
                </div>
                <div class="tool-preview">
                    <span class="icon">📊</span>
                    <span class="name">Metadata</span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="startGame()" style="font-size: 20px; padding: 20px 40px;">
                Start Investigation
            </button>
        </div>
    `;
    elements.prevBtn.disabled = true;
    elements.nextBtn.disabled = true;
    elements.toolsBar.style.display = 'none';
}

function renderCase() {
    const caseData = MEDIA_CASES[state.currentCaseIndex];
    
    // Update header
    elements.roundCounter.textContent = `${state.currentCaseIndex + 1}/${MEDIA_CASES.length}`;
    elements.score.textContent = state.score;
    elements.lives.textContent = '❤️'.repeat(state.lives);
    elements.toolsBar.style.display = 'flex';
    
    // Update tools display
    updateToolsDisplay();
    
    // Render case
    let contentHtml = '';
    if (caseData.type === 'image') {
        contentHtml = `
            <div class="media-image-placeholder">
                <span style="font-size: 64px;">${caseData.content}</span>
                <span style="font-size: 14px; color: var(--color-text-muted);">[Image Placeholder]</span>
            </div>
        `;
    } else if (caseData.type === 'text') {
        contentHtml = `
            <div class="media-text-content">
                "${caseData.content}"
            </div>
        `;
    } else if (caseData.type === 'audio') {
        contentHtml = `
            <div class="media-audio-placeholder">
                <span style="font-size: 32px;">🎙️</span>
                <div class="audio-wave"></div>
                <span style="font-size: 14px; color: var(--color-text-muted);">[Audio]</span>
            </div>
        `;
    }
    
    // Build detection results
    const detectionResultsHtml = state.revealedMarkers.map(marker => `
        <div class="detection-result">
            <h4>${TOOLS[marker].icon} ${TOOLS[marker].name}</h4>
            <p>${caseData.markers[marker]}</p>
        </div>
    `).join('');
    
    elements.gameBoard.innerHTML = `
        <div class="card media-card">
            <span class="media-type-badge">${caseData.type.toUpperCase()}</span>
            <span class="media-difficulty">${'★'.repeat(caseData.difficulty)}</span>
            <h2 style="margin-top: var(--space-md);">${caseData.title}</h2>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">${caseData.description}</p>
            
            <div class="media-content">
                ${contentHtml}
            </div>
            
            ${detectionResultsHtml}
            
            <div class="judgment-buttons">
                <button class="judgment-btn real" onclick="makeJudgment(false)" ${state.hasJudged ? 'disabled' : ''}>
                    ✅ REAL
                </button>
                <button class="judgment-btn fake" onclick="makeJudgment(true)" ${state.hasJudged ? 'disabled' : ''}>
                    🤖 FAKE
                </button>
            </div>
        </div>
    `;
    
    elements.prevBtn.disabled = state.currentCaseIndex === 0;
    elements.nextBtn.disabled = !state.hasJudged;
}

function updateToolsDisplay() {
    Object.keys(state.toolsRemaining).forEach(toolId => {
        const countEl = document.getElementById(`${toolId}-count`);
        if (countEl) {
            const count = state.toolsRemaining[toolId].count;
            countEl.textContent = count;
            
            const toolEl = countEl.closest('.tool');
            if (count === 0) {
                toolEl.classList.add('depleted');
                toolEl.classList.remove('active');
            } else {
                toolEl.classList.remove('depleted');
            }
        }
    });
}

function showResultOverlay(isCorrect, judgment) {
    const caseData = MEDIA_CASES[state.currentCaseIndex];
    const actuallyFake = caseData.isFake;
    
    const resultIcon = isCorrect ? '✅' : '❌';
    const resultTitle = isCorrect ? 'Correct!' : 'Incorrect!';
    const resultClass = isCorrect ? 'correct' : 'incorrect';
    
    let message = '';
    if (isCorrect) {
        if (actuallyFake) {
            message = 'You correctly identified this as AI-generated (synthetic) content.';
        } else {
            message = 'You correctly identified this as authentic (real) content.';
        }
    } else {
        if (actuallyFake) {
            message = 'This was actually AI-generated (synthetic). Look for the markers next time!';
        } else {
            message = 'This was actually authentic (real). Don\'t be too suspicious!';
        }
    }
    
    // Get unrevealed markers for learning
    const unrevealedMarkers = Object.keys(caseData.markers).filter(m => !state.revealedMarkers.includes(m));
    const allMarkersHtml = Object.entries(caseData.markers).map(([key, value]) => `
        <li><strong>${TOOLS[key].name}:</strong> ${value}</li>
    `).join('');
    
    const overlay = document.createElement('div');
    overlay.className = 'result-overlay';
    overlay.innerHTML = `
        <div class="result-content">
            <div class="result-icon">${resultIcon}</div>
            <h2 class="result-title ${resultClass}">${resultTitle}</h2>
            <p class="result-message">${message}</p>
            
            <div class="result-details">
                <h4>All Detection Markers:</h4>
                <ul>${allMarkersHtml}</ul>
            </div>
            
            <div style="margin-bottom: var(--space-lg); font-size: 14px; color: var(--color-text-muted);">
                <strong>Real-World Parallel:</strong> ${caseData.realWorldParallel}
            </div>
            
            <button class="btn btn-primary" onclick="closeResultOverlay()">
                Continue
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function renderGameOver() {
    state.gameComplete = true;
    
    let rating = '';
    let message = '';
    
    if (state.score >= 600) {
        rating = '🏆 Master Detective';
        message = 'Exceptional! You have a trained eye for spotting synthetic media.';
    } else if (state.score >= 400) {
        rating = '⭐ Expert Analyst';
        message = 'Great work! You\'re very good at detecting deepfakes.';
    } else if (state.score >= 200) {
        rating = '🔍 Skilled Investigator';
        message = 'Good effort! Keep practicing to sharpen your detection skills.';
    } else {
        rating = '📚 Trainee';
        message = 'Deepfake detection takes practice. Review the markers and try again!';
    }
    
    const accuracy = Math.round(((state.score / 100) / MEDIA_CASES.length) * 100);
    
    elements.gameBoard.innerHTML = `
        <div class="game-over">
            <div class="trophy">🏆</div>
            <div class="final-score">${state.score}</div>
            <div class="rating">${rating}</div>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">${message}</p>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-lg); margin-bottom: var(--space-xl); width: 100%;">
                <div class="card" style="text-align: center;">
                    <div style="font-size: 32px; font-weight: 800; color: var(--color-primary-light);">${accuracy}%</div>
                    <div style="font-size: 14px; color: var(--color-text-muted);">Accuracy</div>
                </div>
                <div class="card" style="text-align: center;">
                    <div style="font-size: 32px; font-weight: 800; color: var(--color-primary-light);">${state.lives}</div>
                    <div style="font-size: 14px; color: var(--color-text-muted);">Lives Remaining</div>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="resetGame()" style="font-size: 18px; padding: 16px 32px;">
                Play Again
            </button>
        </div>
    `;
    
    elements.toolsBar.style.display = 'none';
    elements.prevBtn.disabled = true;
    elements.nextBtn.disabled = true;
}

// ========================================
// Game Actions
// ========================================

function startGame() {
    state.currentCaseIndex = 0;
    state.score = 0;
    state.lives = 3;
    state.toolsRemaining = JSON.parse(JSON.stringify(TOOLS));
    state.activeTool = null;
    state.revealedMarkers = [];
    state.hasJudged = false;
    state.gameComplete = false;
    
    renderCase();
}

function resetGame() {
    // Remove any result overlays
    document.querySelectorAll('.result-overlay').forEach(el => el.remove());
    renderStartScreen();
}

function useTool(toolId) {
    if (state.hasJudged) return;
    if (state.toolsRemaining[toolId].count <= 0) return;
    if (state.revealedMarkers.includes(toolId)) return;
    
    // Deduct tool use
    state.toolsRemaining[toolId].count--;
    state.revealedMarkers.push(toolId);
    
    // Re-render to show detection result
    renderCase();
}

function makeJudgment(isFake) {
    if (state.hasJudged) return;
    
    state.hasJudged = true;
    const caseData = MEDIA_CASES[state.currentCaseIndex];
    const actuallyFake = caseData.isFake;
    const isCorrect = (isFake === actuallyFake);
    
    // Calculate score
    let points = 0;
    if (isCorrect) {
        // Base points
        points = 100;
        
        // Bonus for unused tools
        const toolsUsed = state.revealedMarkers.length;
        const toolsBonus = (5 - toolsUsed) * 10;
        points += toolsBonus;
        
        // Difficulty bonus
        points += caseData.difficulty * 10;
    } else {
        // Lose a life
        state.lives--;
    }
    
    state.score += points;
    
    // Show result overlay
    showResultOverlay(isCorrect, isFake);
    
    // Update display
    elements.score.textContent = state.score;
    elements.lives.textContent = '❤️'.repeat(state.lives);
    elements.nextBtn.disabled = false;
    
    // Check game over
    if (state.lives <= 0) {
        setTimeout(() => {
            document.querySelectorAll('.result-overlay').forEach(el => el.remove());
            renderGameOver();
        }, 3000);
    }
}

function closeResultOverlay() {
    document.querySelectorAll('.result-overlay').forEach(el => el.remove());
    
    if (state.currentCaseIndex < MEDIA_CASES.length - 1 && state.lives > 0) {
        nextCase();
    } else if (state.lives > 0) {
        renderGameOver();
    }
}

function nextCase() {
    if (state.currentCaseIndex < MEDIA_CASES.length - 1) {
        state.currentCaseIndex++;
        state.activeTool = null;
        state.revealedMarkers = [];
        state.hasJudged = false;
        renderCase();
    }
}

function prevCase() {
    if (state.currentCaseIndex > 0) {
        state.currentCaseIndex--;
        state.activeTool = null;
        state.revealedMarkers = [];
        state.hasJudged = false;
        renderCase();
    }
}

// ========================================
// Event Listeners
// ========================================

// Tool selection
document.querySelectorAll('.tool').forEach(toolEl => {
    toolEl.addEventListener('click', () => {
        const toolId = toolEl.dataset.tool;
        useTool(toolId);
    });
});

// Navigation
elements.nextBtn.addEventListener('click', () => {
    if (state.hasJudged) {
        closeResultOverlay();
    }
});

elements.prevBtn.addEventListener('click', prevCase);

// Help modal
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

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        elements.helpModal.classList.toggle('hidden');
    }
    
    if (state.gameComplete) return;
    
    if (e.key === 'Escape') {
        elements.helpModal.classList.add('hidden');
        document.querySelectorAll('.result-overlay').forEach(el => el.remove());
    }
    
    if (state.hasJudged && e.key === 'Enter') {
        closeResultOverlay();
    }
    
    if (!state.hasJudged) {
        if (e.key === 'r' || e.key === 'R') {
            makeJudgment(false);
        } else if (e.key === 'f' || e.key === 'F') {
            makeJudgment(true);
        }
    }
});

// ========================================
// Initialize
// ========================================

renderStartScreen();
