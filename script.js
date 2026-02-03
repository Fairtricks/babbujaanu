// ========================================
// STATE MANAGEMENT
// ========================================
let escapeCount = 0;
let shyClickCount = 0;
let disappearedCount = 0;
let runnerHasMoved = false;

// Funny messages for runner button
const runnerMessages = [
    "Nice try! 😄 (1)",
    "Nope! Too slow! 🏃 (2)",
    "Catch me if you can! 😜 (3)",
    "You'll never get me! 🎯 (4)",
    "Getting closer... NOT! 😂 (5)",
    "Keep trying! 💨 (6)",
    "Zoom zoom! 🚀 (7)",
    "Teleporting away! ⚡ (8)",
    "Almost! But nope! 🤪 (9)",
    "Final escape... BYE! 👋 (10)"
];

// Messages for shy button
const shyMessages = [
    "Still thinking... 🤔 (1)",
    "Need more time... ⏰ (2)",
    "Almost decided... not! 😅 (3)",
    "Let me think harder... 🧠 (4)",
    "Thinking intensifies... 💭 (5)",
    "Still processing... ⚙️ (6)",
    "Hmm, let me reconsider... 🤷 (7)",
    "One more moment... ⏳ (8)",
    "Deep thoughts in progress... 🌀 (9)",
    "Getting close to a decision... 🎲 (10)",
    "Mind calculating... 🧮 (11)",
    "Contemplating the universe... 🌌 (12)",
    "Overthinking detected! 🤯 (13)",
    "Analysis paralysis! 📊 (14)",
    "Thinking too much overruled! ⚖️ (15)"
];

// ========================================
// DOM ELEMENTS
// ========================================
const yesBtn = document.getElementById('yes-btn');
const runnerBtn = document.getElementById('runner-btn');
const shyBtn = document.getElementById('shy-btn');
const fakeBtn = document.getElementById('fake-btn');
const quizScreen = document.getElementById('quiz-screen');
const successScreen = document.getElementById('success-screen');
const successAudio = document.getElementById('success-audio');

// ========================================
// YES BUTTON - SUCCESS
// ========================================
yesBtn.addEventListener('click', () => {
    transitionToSuccess();
});

function transitionToSuccess() {
    // Hide quiz screen
    quizScreen.classList.remove('active');
    
    // Show success screen
    setTimeout(() => {
        successScreen.classList.add('active');
        
        // Trigger animations
        createConfetti();
        createFloatingHearts();
        
        // Play success audio (with user interaction, so autoplay should work)
        successAudio.play().catch(err => {
            console.log('Audio autoplay prevented:', err);
        });
    }, 300);
}

// ========================================
// RUNNER BUTTON - MOVES ON HOVER
// ========================================
runnerBtn.addEventListener('mouseenter', moveRunnerButton);
runnerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveRunnerButton();
});

function moveRunnerButton() {
    if (escapeCount >= 10) {
        // Vanish after 10 escapes
        runnerBtn.classList.add('vanished');
        showSpeechBubble(runnerBtn, "Runner button gave up! 🏳️", 2000);
        disappearedCount++;
        growYesButton();
        return;
    }
    
    escapeCount++;
    
    // Mark as moving and change to fixed positioning
    if (!runnerHasMoved) {
        runnerBtn.classList.add('moving');
        runnerHasMoved = true;
    }
    
    // Get viewport dimensions and button sizes
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = runnerBtn.offsetWidth;
    const btnHeight = runnerBtn.offsetHeight;
    
    // Define safe boundaries (keep button fully visible)
    const minX = 20;
    const minY = 20;
    const maxX = viewportWidth - btnWidth - 20;
    const maxY = viewportHeight - btnHeight - 20;
    
    // Get yes button boundaries with safety margin
    const yesRect = yesBtn.getBoundingClientRect();
    const safetyMargin = 120; // Large safety margin
    const yesSafeZone = {
        left: yesRect.left - safetyMargin,
        right: yesRect.right + safetyMargin,
        top: yesRect.top - safetyMargin,
        bottom: yesRect.bottom + safetyMargin
    };
    
    let randomX, randomY;
    let attempts = 0;
    let validPosition = false;
    
    // Try to find a position that doesn't overlap with yes button
    while (!validPosition && attempts < 100) {
        randomX = minX + Math.random() * (maxX - minX);
        randomY = minY + Math.random() * (maxY - minY);
        
        // Check if this position overlaps with yes button safe zone
        const buttonRight = randomX + btnWidth;
        const buttonBottom = randomY + btnHeight;
        
        const overlapX = buttonRight > yesSafeZone.left && randomX < yesSafeZone.right;
        const overlapY = buttonBottom > yesSafeZone.top && randomY < yesSafeZone.bottom;
        
        validPosition = !(overlapX && overlapY);
        attempts++;
    }
    
    // If we couldn't find a valid position, place it in corner opposite to yes button
    if (!validPosition) {
        const yesInLeftHalf = yesRect.left < viewportWidth / 2;
        const yesInTopHalf = yesRect.top < viewportHeight / 2;
        
        if (yesInLeftHalf && yesInTopHalf) {
            // Yes is top-left, place runner bottom-right
            randomX = maxX - 50;
            randomY = maxY - 50;
        } else if (yesInLeftHalf && !yesInTopHalf) {
            // Yes is bottom-left, place runner top-right
            randomX = maxX - 50;
            randomY = minY + 50;
        } else if (!yesInLeftHalf && yesInTopHalf) {
            // Yes is top-right, place runner bottom-left
            randomX = minX + 50;
            randomY = maxY - 50;
        } else {
            // Yes is bottom-right, place runner top-left
            randomX = minX + 50;
            randomY = minY + 50;
        }
    }
    
    // Ensure position is within bounds
    randomX = Math.max(minX, Math.min(randomX, maxX));
    randomY = Math.max(minY, Math.min(randomY, maxY));
    
    // Move the button
    runnerBtn.style.left = `${randomX}px`;
    runnerBtn.style.top = `${randomY}px`;
    
    // Show funny message with count
    const messageIndex = Math.min(escapeCount - 1, runnerMessages.length - 1);
    showSpeechBubble(runnerBtn, runnerMessages[messageIndex], 2000);
}

// ========================================
// SHY BUTTON - SHRINKS AND VANISHES
// ========================================
shyBtn.addEventListener('click', () => {
    if (shyClickCount >= 15) {
        return; // Already vanished
    }
    
    shyClickCount++;
    
    // Add shake animation
    shyBtn.classList.add('shaking');
    setTimeout(() => {
        shyBtn.classList.remove('shaking');
    }, 500);
    
    // Show message with speech bubble
    const messageIndex = Math.min(shyClickCount - 1, shyMessages.length - 1);
    showSpeechBubble(shyBtn, shyMessages[messageIndex], 2000);
    
    // Vanish after 15 clicks
    if (shyClickCount >= 15) {
        setTimeout(() => {
            shyBtn.classList.add('vanished');
            showSpeechBubble(shyBtn, "Thinking too much detected. Button removed! 🚫", 2000);
            disappearedCount++;
            growYesButton();
        }, 500);
    }
});

// ========================================
// FAKE BUTTON - FLIPS AND VANISHES
// ========================================
let fakeClicked = false;

fakeBtn.addEventListener('click', () => {
    if (fakeClicked) return;
    
    fakeClicked = true;
    
    // Add flip animation
    fakeBtn.classList.add('flipped');
    
    // Change text during flip
    setTimeout(() => {
        fakeBtn.querySelector('.option-text').textContent = 'Haha, that was a fake button! 😝';
    }, 300);
    
    // Vanish after animation
    setTimeout(() => {
        fakeBtn.classList.add('vanished');
        showSpeechBubble(fakeBtn, "Fake button revealed! 🎭", 2000);
        disappearedCount++;
        growYesButton();
    }, 1000);
});

// ========================================
// YES BUTTON GROWTH
// ========================================
function growYesButton() {
    // Remove all growth classes first
    yesBtn.classList.remove('grown-1', 'grown-2', 'grown-3');
    
    // Add appropriate growth class based on disappeared count
    if (disappearedCount === 1) {
        yesBtn.classList.add('grown-1');
    } else if (disappearedCount === 2) {
        yesBtn.classList.add('grown-2');
    } else if (disappearedCount >= 3) {
        yesBtn.classList.add('grown-3');
    }
}

// ========================================
// CONFETTI ANIMATION
// ========================================
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#ffa07a', '#ff8fab', '#ffb6c1', '#ff69b4', '#ffd700', '#ff1744'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// ========================================
// FLOATING HEARTS ANIMATION
// ========================================
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

// ========================================
// SPEECH BUBBLE HELPER
// ========================================
function showSpeechBubble(buttonElement, message, duration) {
    // Remove any existing speech bubble
    const existingBubble = document.querySelector('.speech-bubble');
    if (existingBubble) {
        existingBubble.remove();
    }
    
    // Create speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = message;
    
    // Add to body
    document.body.appendChild(bubble);
    
    // Position relative to button
    const rect = buttonElement.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();
    
    // Determine best position (prefer right, then left, then bottom)
    if (rect.right + bubbleRect.width + 20 < window.innerWidth) {
        // Position to the right
        bubble.classList.add('left');
        bubble.style.left = `${rect.right + 15}px`;
        bubble.style.top = `${rect.top + rect.height / 2}px`;
        bubble.style.transform = 'translateY(-50%)';
    } else if (rect.left - bubbleRect.width - 20 > 0) {
        // Position to the left
        bubble.classList.add('right');
        bubble.style.left = `${rect.left - bubbleRect.width - 15}px`;
        bubble.style.top = `${rect.top + rect.height / 2}px`;
        bubble.style.transform = 'translateY(-50%)';
    } else {
        // Position below
        bubble.classList.add('top');
        bubble.style.left = `${rect.left + rect.width / 2}px`;
        bubble.style.top = `${rect.bottom + 15}px`;
        bubble.style.transform = 'translateX(-50%)';
    }
    
    // Show bubble
    setTimeout(() => bubble.classList.add('show'), 10);
    
    // Remove after duration
    setTimeout(() => {
        bubble.classList.remove('show');
        setTimeout(() => bubble.remove(), 300);
    }, duration);
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Valentine Proposal Website Loaded! 💖');
});
