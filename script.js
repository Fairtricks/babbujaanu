// Get DOM elements
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const optionYes = document.getElementById('option-yes');
const optionRunner = document.getElementById('option-runner');
const optionShy = document.getElementById('option-shy');
const optionFake = document.getElementById('option-fake');
const tooltip = document.getElementById('tooltip');
const successAudio = document.getElementById('success-audio');
const confettiContainer = document.getElementById('confetti-container');
const floatingHeartsContainer = document.getElementById('floating-hearts');

// Runner Button Behavior - Moves on hover
let isRunnerMoving = false;
optionRunner.addEventListener('mouseenter', function(e) {
    if (isRunnerMoving) return;
    
    isRunnerMoving = true;
    
    // Show tooltip
    showTooltip('Nice try 😄', e.clientX, e.clientY);
    
    // Get viewport dimensions
    const maxX = window.innerWidth - this.offsetWidth - 40;
    const maxY = window.innerHeight - this.offsetHeight - 40;
    
    // Calculate random position
    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;
    
    // Apply smooth movement
    this.style.position = 'fixed';
    this.style.left = randomX + 'px';
    this.style.top = randomY + 'px';
    this.style.transition = 'all 0.4s ease';
    
    setTimeout(() => {
        isRunnerMoving = false;
    }, 400);
});

optionRunner.addEventListener('mouseleave', function() {
    hideTooltip();
});

// Shy Button Behavior - Shrinks and becomes disabled on hover, shakes on click
optionShy.addEventListener('mouseenter', function() {
    showTooltip('Getting shy? 🙈', event.clientX, event.clientY);
});

optionShy.addEventListener('mouseleave', function() {
    hideTooltip();
});

optionShy.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add shake animation
    this.classList.add('shake');
    
    // Show message
    showTooltip('Thinking too much detected. Overruled.', e.clientX, e.clientY);
    
    setTimeout(() => {
        this.classList.remove('shake');
        hideTooltip();
    }, 500);
});

// Fake Button Behavior - Flips and changes text, then fades out
let fakeButtonClicked = false;
optionFake.addEventListener('click', function() {
    if (fakeButtonClicked) return;
    fakeButtonClicked = true;
    
    // Add flip animation
    this.classList.add('flip');
    
    // Change text after flip
    setTimeout(() => {
        this.querySelector('.option-text').textContent = 'Haha, that was a fake button';
        this.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    }, 300);
    
    // Fade out and disappear
    setTimeout(() => {
        this.classList.add('fade-out');
    }, 1500);
    
    setTimeout(() => {
        this.style.display = 'none';
    }, 2300);
});

// Yes Button - Triggers success screen
optionYes.addEventListener('click', function() {
    // Fade out question screen
    questionScreen.style.transition = 'opacity 0.8s';
    questionScreen.style.opacity = '0';
    
    setTimeout(() => {
        questionScreen.classList.remove('active');
        successScreen.classList.add('active');
        
        // Trigger animations and audio
        startSuccessAnimations();
        playSuccessAudio();
    }, 800);
});

// Tooltip functions
function showTooltip(text, x, y) {
    tooltip.textContent = text;
    tooltip.style.left = (x + 10) + 'px';
    tooltip.style.top = (y + 10) + 'px';
    tooltip.classList.add('show');
}

function hideTooltip() {
    tooltip.classList.remove('show');
}

// Success screen animations
function startSuccessAnimations() {
    // Create confetti
    createConfetti();
    
    // Create floating hearts
    createFloatingHearts();
}

// Create mixed confetti (hearts and sparkles)
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#ff1744', '#f50057', '#ff4081', '#e91e63', '#ffd700', '#ff6b9d'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Randomly choose between heart and sparkle
            if (Math.random() > 0.5) {
                confetti.classList.add('heart');
                confetti.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
            } else {
                confetti.classList.add('sparkle');
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            }
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 3500);
        }, i * 30);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        floatingHeartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

// Play success audio
function playSuccessAudio() {
    // Try to play audio (browsers require user interaction)
    successAudio.play().catch(error => {
        console.log('Audio autoplay prevented:', error);
        // Audio will play after user interaction
    });
}

// Ensure audio can be played with user interaction
document.addEventListener('click', function() {
    if (successScreen.classList.contains('active')) {
        successAudio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}, { once: true });
