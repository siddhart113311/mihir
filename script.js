// ==================== 
// Valentine Website Script
// Interactive magic for Nikita's Valentine surprise
// ====================

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionScreen = document.getElementById('questionScreen');
    const celebrationScreen = document.getElementById('celebrationScreen');
    const hintText = document.getElementById('hintText');
    const heartsContainer = document.getElementById('heartsContainer');

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
    yesBtn.addEventListener('click', function () {
        // Hide question screen
        questionScreen.classList.add('hidden');

        // Show celebration screen with DDLJ movie scene
        celebrationScreen.classList.remove('hidden');

        // Keep floating hearts in background
        createFloatingHearts(20);
    });

    // No button - jump around the screen with bouncy animation when hovered!
    noBtn.addEventListener('mouseenter', function () {
        noButtonAttempts++;

        // Make button position fixed so it can move anywhere
        this.style.position = 'fixed';
        this.style.zIndex = '1000';

        // Add visible border for clarity
        this.style.border = '3px solid #E91E8C';
        this.style.boxShadow = '0 4px 15px rgba(233, 30, 140, 0.3)';

        // Get accurate viewport and button dimensions dynamically
        // Use visualViewport for better mobile support
        const viewportWidth = window.visualViewport ? window.visualViewport.width : (window.innerWidth || document.documentElement.clientWidth);
        const viewportHeight = window.visualViewport ? window.visualViewport.height : (window.innerHeight || document.documentElement.clientHeight);
        
        // Get button dimensions before it moves
        const buttonWidth = this.offsetWidth || 100; // fallback to 100px
        const buttonHeight = this.offsetHeight || 50; // fallback to 50px
        
        // Use minimal padding on mobile, moderate on desktop
        const padding = viewportWidth < 768 ? 10 : 40;
        
        // Calculate safe boundaries
        const minX = padding;
        const maxX = viewportWidth - buttonWidth - padding;
        const minY = padding;
        const maxY = viewportHeight - buttonHeight - padding;
        
        // Generate random position and clamp to safe boundaries
        let randomX = minX + Math.random() * Math.max(0, maxX - minX);
        let randomY = minY + Math.random() * Math.max(0, maxY - minY);
        
        // Final safety clamp to absolutely ensure within bounds
        randomX = Math.max(0, Math.min(randomX, viewportWidth - buttonWidth));
        randomY = Math.max(0, Math.min(randomY, viewportHeight - buttonHeight));

        // Apply bouncy jumping animation to new position
        this.style.transition = 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';

        // Add a little jump effect
        this.classList.add('jumping');
        setTimeout(() => {
            this.classList.remove('jumping');
        }, 400);

        // Change hint text with cute messages
        hintText.textContent = hintMessages[hintIndex % hintMessages.length];
        hintText.style.opacity = '1';
        hintIndex++;

        // Make Yes button bigger and more attractive each time
        const currentYesScale = 1 + (noButtonAttempts * 0.03);
        yesBtn.style.transform = `scale(${Math.min(currentYesScale, 1.3)})`;

        // After many attempts, button runs away completely
        if (noButtonAttempts >= 20) {
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';
            hintText.textContent = "The No button ran away! 🏃‍♂️💨 Just click Yes! 💖";
        }
    });

    noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        noButtonAttempts++;

        // Make button position fixed
        this.style.position = 'fixed';
        this.style.zIndex = '1000';

        // Get accurate viewport dimensions
        const viewportWidth = window.visualViewport ? window.visualViewport.width : (window.innerWidth || document.documentElement.clientWidth);
        const viewportHeight = window.visualViewport ? window.visualViewport.height : (window.innerHeight || document.documentElement.clientHeight);
        
        // Get button dimensions
        const buttonWidth = this.offsetWidth || 100;
        const buttonHeight = this.offsetHeight || 50;
        
        console.log('Click - Viewport:', viewportWidth, 'x', viewportHeight);
        console.log('Click - Button size:', buttonWidth, 'x', buttonHeight);
        
        // Use minimal padding on mobile
        const padding = viewportWidth < 768 ? 15 : 40;
        
        // Calculate safe boundaries - ensure we have positive space
        const maxX = Math.max(padding, viewportWidth - buttonWidth - padding);
        const maxY = Math.max(padding, viewportHeight - buttonHeight - padding);
        
        // If there's not enough space, use minimal positioning
        if (maxX <= padding || maxY <= padding) {
            randomX = Math.min(padding, viewportWidth - buttonWidth - 5);
            randomY = Math.min(padding, viewportHeight - buttonHeight - 5);
        } else {
            // Generate random position within safe bounds
            randomX = padding + Math.random() * (maxX - padding);
            randomY = padding + Math.random() * (maxY - padding);
        }
        
        // Absolute final clamp - ensure it's within viewport
        randomX = Math.max(5, Math.min(randomX, viewportWidth - buttonWidth - 5));
        randomY = Math.max(5, Math.min(randomY, viewportHeight - buttonHeight - 5));
        
        console.log('Click - New position:', randomX, randomY);
        
        // Apply position with animation
        this.style.transition = 'all 0.3s ease';
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';
        
        // Shrink button slightly
        noButtonScale = Math.max(0.5, noButtonScale - 0.1);
        this.style.transform = `scale(${noButtonScale})`;

        // Show hint
        hintText.textContent = hintMessages[hintIndex % hintMessages.length];
        hintText.style.opacity = '1';
        hintIndex++;

        // Make Yes button bigger and more attractive each time
        const currentYesScale = 1 + (noButtonAttempts * 0.05);
        yesBtn.style.transform = `scale(${Math.min(currentYesScale, 2.0)})`;
        yesBtn.style.transition = 'transform 0.3s ease';

        // If they tried too many times, hide the no button completely
        if (noButtonAttempts >= 15) {
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
});
