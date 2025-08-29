// Fireworks functionality
class Fireworks {
    constructor() {
        this.container = document.getElementById('fireworks-container');
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f093fb', '#f5576c', '#667eea', '#764ba2'];
        this.init();
    }

    init() {
        // Create fireworks at random intervals
        setInterval(() => {
            this.createFirework();
        }, Math.random() * 1000 + 500); // Random interval between 1-3 seconds
    }

    createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random color
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.backgroundColor = color;
        
        this.container.appendChild(firework);
        
        // Remove firework after animation
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1000);
    }
}

// Gorilla animation
class GorillaAnimation {
    constructor() {
        this.gorilla = document.getElementById('gorilla');
        this.isSlidingRight = true;
        this.init();
    }

    init() {
        // Start gorilla animation after 20 seconds
        setTimeout(() => {
            this.startAnimation();
        }, 20000);
    }

    startAnimation() {
        if (this.isSlidingRight) {
            // Slide right
            this.gorilla.classList.add('slide-in');
            this.gorilla.classList.remove('slide-back');
            
            // After 8 seconds, start sliding back
            setTimeout(() => {
                this.gorilla.classList.remove('slide-in');
                this.isSlidingRight = false;
                
                // Wait 20 seconds before sliding back
                setTimeout(() => {
                    this.startAnimation();
                }, 20000);
            }, 8000);
        } else {
            // Slide back left
            this.gorilla.classList.add('slide-back');
            this.gorilla.classList.remove('slide-in');
            
            // After 8 seconds, start sliding right again
            setTimeout(() => {
                this.gorilla.classList.remove('slide-back');
                this.isSlidingRight = true;
                
                // Wait 20 seconds before sliding right again
                setTimeout(() => {
                    this.startAnimation();
                }, 20000);
            }, 8000);
        }
    }
}

// Fun phrases animation
class FunPhrases {
    constructor() {
        this.phrases = [
            'This House is About to Get Lit!',
            'Party Mode: ACTIVATED!',
            'Good Vibes Only Zone',
            'Let\'s Make Some Memories!',
            'Epic Housewarming Vibes!',
            'The Party Starts Here!',
            'Welcome to the Fun Zone!',
            'Let\'s Break This House In!'
        ];
        this.currentPhraseIndex = 0;
        this.init();
    }

    init() {
        // Start showing phrases every 10 seconds
        setInterval(() => {
            this.showRandomPhrase();
        }, 10000);
        
        // Show first phrase immediately
        setTimeout(() => {
            this.showRandomPhrase();
        }, 1000);
    }

    showRandomPhrase() {
        // Remove any existing visible phrase
        const existingPhrase = document.querySelector('.phrase.slide-in');
        if (existingPhrase) {
            existingPhrase.remove();
        }

        // Create new phrase element
        const phrase = document.createElement('div');
        phrase.className = 'phrase';
        phrase.textContent = this.phrases[this.currentPhraseIndex];
        
        // Random position on screen (viewport-relative)
        const maxX = window.innerWidth - 300; // Account for phrase width
        const maxY = window.innerHeight - 100; // Account for phrase height
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Use viewport-relative positioning
        phrase.style.left = -300 + 'px';
        phrase.style.top = randomY + 'px';
        
        document.body.appendChild(phrase);
        
        // Trigger animation
        setTimeout(() => {
            phrase.classList.add('slide-in');
        }, 100);
        
        // Remove phrase after animation
        setTimeout(() => {
            if (phrase.parentNode) {
                phrase.parentNode.removeChild(phrase);
            }
        }, 4000);
        
        // Move to next phrase
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Fireworks();
    new GorillaAnimation();
    new FunPhrases();
    
    // Add some interactive effects
    addInteractiveEffects();
    
    // Setup mobile-friendly address link
    setupAddressLink();
});

// Setup mobile-friendly address link
function setupAddressLink() {
    const addressLink = document.getElementById('party-address');
    if (!addressLink) return;
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Use device-specific maps URL schemes for better native app integration
        const address = '6093 W 8th Ave, Lakewood, CO 80214';
        const encodedAddress = encodeURIComponent(address);
        
        // Try to detect iOS vs Android
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // iOS - use Apple Maps
            addressLink.href = `maps://maps.apple.com/?q=${encodedAddress}`;
        } else if (/Android/i.test(navigator.userAgent)) {
            // Android - use Google Maps
            addressLink.href = `geo:0,0?q=${encodedAddress}`;
        } else {
            // Fallback for other mobile devices
            addressLink.href = `https://maps.google.com/maps?q=${encodedAddress}`;
        }
    } else {
        // Desktop - use Google Maps web
        addressLink.href = 'https://maps.google.com/maps?q=6093+W+8th+Ave+Lakewood+CO+80214';
    }
    
    // Add click tracking (optional)
    addressLink.addEventListener('click', () => {
        console.log('Address clicked - opening maps');
    });
}

// Add interactive effects
function addInteractiveEffects() {
    // Add hover effects to activities
    const activities = document.querySelectorAll('.activities li');
    activities.forEach(activity => {
        activity.addEventListener('mouseenter', () => {
            activity.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        activity.addEventListener('mouseleave', () => {
            activity.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click effect to images
    const images = document.querySelectorAll('.image-item');
    images.forEach(image => {
        image.addEventListener('click', () => {
            image.style.transform = 'scale(0.95)';
            setTimeout(() => {
                image.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add some fun to the title
    const title = document.querySelector('.party-title');
    title.addEventListener('click', () => {
        title.style.animation = 'none';
        title.offsetHeight; // Trigger reflow
        title.style.animation = 'gradientShift 0.5s ease';
    });
}

// Add some extra fireworks on user interaction
document.addEventListener('click', (e) => {
    // Don't create fireworks if clicking on interactive elements
    if (e.target.closest('.invitation-container')) {
        return;
    }
    
    // Create a firework at click position
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = e.clientX + 'px';
    firework.style.top = e.clientY + 'px';
    firework.style.backgroundColor = '#ff6b6b';
    
    document.getElementById('fireworks-container').appendChild(firework);
    
    setTimeout(() => {
        if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
        }
    }, 1000);
});

// Add some fun scrolling effects
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    // Add a subtle effect when scrolling
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    scrollTimeout = setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 100);
});
