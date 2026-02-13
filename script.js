// ===================================
// VALENTINE'S DAY PROPOSAL - SCRIPT
// ===================================

// ============ STATE VARIABLES ============
let noClickCount = 0;
const MAX_NO_CLICKS = 4;
let musicStarted = false;
let musicPlaying = false;

// ============ DOM ELEMENTS ============
const clickableHeart = document.getElementById('clickableHeart');
const memoryCard = document.getElementById('memoryCard');
const readLetterBtn = document.getElementById('readLetterBtn');
const loveLetter = document.getElementById('loveLetter');
const proposalCard = document.getElementById('proposalCard');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const heartsContainer = document.getElementById('heartsContainer');
const catGif = document.getElementById('catGif');

// ============ MUSIC CONTROL ============
/**
 * Initialize music on first user interaction
 * (Required for mobile autoplay policies)
 */
function initMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicPlaying = true;
            musicToggle.classList.remove('muted');
        }).catch(err => {
            console.log('Autoplay prevented:', err);
            // Music will start on next interaction
        });
    }
}

/**
 * Toggle music play/pause
 */
musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.add('muted');
        musicToggle.querySelector('.music-icon').textContent = '🔇';
    } else {
        bgMusic.play();
        musicToggle.classList.remove('muted');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
    }
    musicPlaying = !musicPlaying;
});


// ============ STEP 1: CLICKABLE HEART - SHOW MEMORIES ============
/**
 * Handle clickable heart clicks
 * - Adds a celebration effect
 * - Hides proposal card with smooth transition
 * - Reveals memory card with photos
 */
clickableHeart.addEventListener('click', () => {
    // Start music on first interaction
    initMusic();

    // Add celebration effect to heart
    clickableHeart.style.animation = 'heartCelebration 0.6s ease';

    setTimeout(() => {
        // Hide proposal card
        proposalCard.style.transition = 'all 0.8s ease';
        proposalCard.style.opacity = '0';
        proposalCard.style.transform = 'scale(0.9) translateY(-20px)';

        setTimeout(() => {
            proposalCard.style.display = 'none';

            // Show memory card
            memoryCard.style.display = 'block';

            // Force reflow
            void memoryCard.offsetWidth;

            // Add animation class
            memoryCard.classList.add('show');

            // Scroll to memory card smoothly
            setTimeout(() => {
                memoryCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }, 800);
    }, 400);
});

// ============ STEP 2: READ LETTER BUTTON - SHOW LETTER ============
/**
 * Handle read letter button clicks
 * - Hides memory card with smooth transition
 * - Reveals love letter
 * - Starts falling hearts animation
 * - Brightens background
 */
readLetterBtn.addEventListener('click', () => {
    // Add celebration effect to button
    readLetterBtn.style.animation = 'pulse 0.6s ease';

    setTimeout(() => {
        // Hide memory card
        memoryCard.style.transition = 'all 0.8s ease';
        memoryCard.style.opacity = '0';
        memoryCard.style.transform = 'scale(0.9) translateY(-20px)';

        setTimeout(() => {
            memoryCard.style.display = 'none';

            // Show love letter (first make it visible in layout)
            loveLetter.style.display = 'block';

            // Force reflow
            void loveLetter.offsetWidth;

            // Add animation class
            loveLetter.classList.add('show');

            // Brighten background
            document.body.classList.add('accepted');

            // Start falling hearts animation
            startFallingHearts();

            // Scroll to letter smoothly
            setTimeout(() => {
                loveLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }, 800);
    }, 400);
});

// ============ MESSAGE DISPLAY ON CARD ============
/**
 * Show message on the proposal card
 * @param {string} message - Message to display
 */
function showMessageOnCard(message) {
    messageDisplay.textContent = message;
    messageDisplay.classList.add('show');

    // Hide after 2.5 seconds
    setTimeout(() => {
        messageDisplay.classList.remove('show');
    }, 2500);
}


// ============ FALLING HEARTS ANIMATION ============
/**
 * Create and animate falling hearts inside the letter
 * Hearts only appear within the letter container
 */
function startFallingHearts() {
    const heartSymbols = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘'];

    // Initial heart count
    let heartCount = 15;

    // Create initial hearts
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createFallingHeart();
        }, i * 200);
    }

    // Continuous heart generation
    setInterval(() => {
        // Increase density if accepted
        const isAccepted = document.body.classList.contains('accepted');
        const probability = isAccepted ? 0.4 : 0.2;

        if (Math.random() < probability) {
            createFallingHeart();
        }
    }, 500);

    /**
     * Create a single falling heart
     */
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Random horizontal position
        const leftPosition = Math.random() * 100;
        heart.style.left = `${leftPosition}%`;

        // Random animation duration (3-7 seconds)
        const duration = 3 + Math.random() * 4;
        heart.style.animationDuration = `${duration}s`;

        // Random delay
        const delay = Math.random() * 2;
        heart.style.animationDelay = `${delay}s`;

        // Random size
        const size = 1 + Math.random() * 1;
        heart.style.fontSize = `${size}rem`;

        // Random horizontal drift
        const drift = -20 + Math.random() * 40;
        heart.style.setProperty('--drift', `${drift}px`);

        heartsContainer.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
}

// ============ ADDITIONAL ANIMATIONS ============
/**
 * Add shake animation to CSS dynamically
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(${noBtnScale}); }
        25% { transform: translateX(-10px) scale(${noBtnScale}); }
        75% { transform: translateX(10px) scale(${noBtnScale}); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(${yesBtnScale}); }
        50% { transform: scale(${yesBtnScale * 1.2}); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// ============ PREVENT ACCIDENTAL NAVIGATION ============
/**
 * Warn user before leaving the page
 */
window.addEventListener('beforeunload', (e) => {
    if (loveLetter.classList.contains('show')) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// ============ KEYBOARD ACCESSIBILITY ============
/**
 * Allow Enter key to trigger heart click and button clicks
 */
clickableHeart.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        clickableHeart.click();
    }
});

readLetterBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        readLetterBtn.click();
    }
});


// ============ CONSOLE MESSAGE ============
/**
 * Easter egg for developers 💕
 */
console.log('%c💕 Made with Love 💕', 'font-size: 20px; color: #FF69B4; font-weight: bold;');
console.log('%cHappy Valentine\'s Day! Click the heart to read your letter 💌', 'font-size: 14px; color: #FF1493;');

