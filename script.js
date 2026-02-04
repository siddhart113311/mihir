// ==================== 
// Valentine Website Script
// Interactive magic for Bhavna's Valentine surprise
// ====================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionScreen = document.getElementById('questionScreen');
    const celebrationScreen = document.getElementById('celebrationScreen');
    const hintText = document.getElementById('hintText');
    const heartsContainer = document.getElementById('heartsContainer');
    const heartsBurst = document.getElementById('heartsBurst');
    const confettiCanvas = document.getElementById('confettiCanvas');

    // Cute hint messages when hovering over No button
    const hintMessages = [
        "Just say Yes already! 💕",
        "Are you sure? 🥺",
        "Please? Pretty please? 🙏",
        "My heart can't take this! 💔",
        "Think again! 🥹",
        "Come on, you know you want to! 😘",
        "I'll be so happy! 🥰",
        "Pretty please with a cherry on top? 🍒",
        "Don't break my heart! 💓"
    ];
    let hintIndex = 0;
    let noButtonScale = 1;
    let noButtonAttempts = 0;

    // Create floating hearts in background
    createFloatingHearts();

    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        // Hide question screen
        questionScreen.classList.add('hidden');
        
        // Show celebration screen
        celebrationScreen.classList.remove('hidden');
        
        // Trigger celebration effects
        createHeartsBurst();
        startConfetti();
        
        // More floating hearts
        createFloatingHearts(30);
    });

    // No button - shrink and run away!
    noBtn.addEventListener('mouseenter', function() {
        noButtonAttempts++;
        
        // Shrink the button
        noButtonScale = Math.max(0.3, noButtonScale - 0.15);
        this.style.transform = `scale(${noButtonScale})`;
        
        // Move button to random position
        if (noButtonAttempts > 2) {
            const containerRect = document.querySelector('.buttons-container').getBoundingClientRect();
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 100;
            this.style.transform = `scale(${noButtonScale}) translate(${randomX}px, ${randomY}px)`;
        }
        
        // Change hint text
        hintText.textContent = hintMessages[hintIndex % hintMessages.length];
        hintText.style.opacity = '1';
        hintIndex++;
        
        // Make Yes button bigger each time
        const currentYesScale = 1 + (noButtonAttempts * 0.05);
        yesBtn.style.transform = `scale(${Math.min(currentYesScale, 1.3)})`;
    });

    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        noButtonAttempts++;
        
        // Button runs away more dramatically
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 200;
        noButtonScale = Math.max(0.2, noButtonScale - 0.2);
        this.style.transform = `scale(${noButtonScale}) translate(${randomX}px, ${randomY}px)`;
        this.style.transition = 'all 0.3s ease';
        
        // Show hint
        hintText.textContent = hintMessages[hintIndex % hintMessages.length];
        hintText.style.opacity = '1';
        hintIndex++;
        
        // If they tried too many times, hide the no button completely
        if (noButtonAttempts >= 5) {
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';
            hintText.textContent = "The No button ran away! 🏃‍♂️💨 Just click Yes! 💖";
        }
    });

    // Create floating hearts
    function createFloatingHearts(count = 15) {
        const hearts = ['💕', '💖', '💗', '💓', '💘', '❤️', '💝', '🩷'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 10000);
            }, i * 300);
        }
        
        // Continuous floating hearts
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, 800);
    }

    // Create hearts burst effect
    function createHeartsBurst() {
        const burstHearts = ['💕', '💖', '💗', '💓', '💘', '❤️', '💝', '🩷', '✨', '⭐'];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'burst-heart';
                heart.textContent = burstHearts[Math.floor(Math.random() * burstHearts.length)];
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                
                const angle = (Math.PI * 2 / 40) * i + Math.random() * 0.5;
                const distance = 200 + Math.random() * 300;
                const tx = Math.cos(angle) * distance + 'px';
                const ty = Math.sin(angle) * distance + 'px';
                heart.style.setProperty('--tx', tx);
                heart.style.setProperty('--ty', ty);
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                
                heartsBurst.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 30);
        }
    }

    // Confetti effect
    function startConfetti() {
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#E91E8C', '#FF6BB3', '#FFB6D9', '#FF4AA2', '#E91E63', '#FFD700', '#FF69B4'];
        
        // Create confetti pieces
        for (let i = 0; i < 200; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 3 + 2,
                speedX: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }
        
        function animateConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            let activeConfetti = false;
            
            confettiPieces.forEach(piece => {
                if (piece.y < confettiCanvas.height + 50) {
                    activeConfetti = true;
                    piece.y += piece.speedY;
                    piece.x += piece.speedX;
                    piece.rotation += piece.rotationSpeed;
                    
                    ctx.save();
                    ctx.translate(piece.x, piece.y);
                    ctx.rotate(piece.rotation * Math.PI / 180);
                    ctx.fillStyle = piece.color;
                    
                    if (piece.shape === 'rect') {
                        ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
                    } else {
                        ctx.beginPath();
                        ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    ctx.restore();
                }
            });
            
            if (activeConfetti) {
                requestAnimationFrame(animateConfetti);
            }
        }
        
        animateConfetti();
        
        // Multiple bursts of confetti
        setTimeout(() => {
            confettiPieces.forEach(piece => {
                piece.y = Math.random() * -500;
                piece.x = Math.random() * confettiCanvas.width;
            });
            animateConfetti();
        }, 2000);
        
        setTimeout(() => {
            confettiPieces.forEach(piece => {
                piece.y = Math.random() * -500;
                piece.x = Math.random() * confettiCanvas.width;
            });
            animateConfetti();
        }, 4000);
    }

    // Handle window resize for confetti
    window.addEventListener('resize', function() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
});
