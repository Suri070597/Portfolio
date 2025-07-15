// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const typingElement = document.querySelector('.typing');
    const progressBars = document.querySelectorAll('.progress');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const backToTop = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contactForm');
    const shootingStarsContainer = document.querySelector('.shooting-stars');
    const body = document.body;
    
    // Initialize the space background effects
    initializeSpaceBackground();
    
    // Set up typing animation
    const jobTitles = [
        'Frontend Developer', 
        'Backend Developer', 
        'UI/UX Designer'
    ];
    
    typeWriterEffect(typingElement, jobTitles);
    
    // Initialize animation on scroll
    window.addEventListener('scroll', function() {
        // Animate progress bars when in viewport
        progressBars.forEach(bar => {
            if (isInViewport(bar)) {
                const value = bar.getAttribute('data-value');
                bar.style.width = `${value}%`;
            }
        });
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Add shadow to header on scroll
        if (window.scrollY > 50) {
            document.querySelector('header').style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            document.querySelector('header').style.boxShadow = 'none';
        }
    });
    
    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        // Save theme preference to local storage
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Load saved theme from local storage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Animate elements when they enter the viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .project-card, .skill-category, .timeline-item');
        
        elements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
});

// Space background initialization
function initializeSpaceBackground() {
    // Create shooting stars periodically
    createShootingStars();
    
    // Add some big special stars with glow
    createSpecialStars();
}

// Create shooting stars
function createShootingStars() {
    const shootingStarsContainer = document.querySelector('.shooting-stars');
    
    // Function to create a single shooting star
    function createShootingStar() {
        // Only create if container exists
        if (!shootingStarsContainer) return;
        
        // Create a shooting star element
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random position at top of screen
        const startPositionX = Math.random() * 100;
        const startPositionY = Math.random() * 20;
        
        // Random duration between 2 and 6 seconds
        const duration = 2 + Math.random() * 4;
        
        // Set styles
        shootingStar.style.cssText = `
            position: absolute;
            top: ${startPositionY}%;
            left: ${startPositionX}%;
            width: ${50 + Math.random() * 100}px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
            border-radius: 50%;
            animation: shooting-star ${duration}s linear forwards;
            box-shadow: 0 0 5px #fff, 0 0 10px #fff;
            z-index: 1;
        `;
        
        // Add to container
        shootingStarsContainer.appendChild(shootingStar);
        
        // Remove after animation completes
        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }
    
    // Create shooting stars at random intervals
    function scheduleNextStar() {
        const delay = 2000 + Math.random() * 8000; // Between 2 and 10 seconds
        setTimeout(() => {
            createShootingStar();
            scheduleNextStar();
        }, delay);
    }
    
    // Start creating shooting stars
    scheduleNextStar();
}

// Create special glowing stars
function createSpecialStars() {
    const starsContainer = document.querySelector('.stars3');
    
    if (!starsContainer) return;
    
    // Create 15 special stars
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'special-star';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size between 3 and 6px
        const size = 3 + Math.random() * 3;
        
        // Random twinkle duration between 3 and 8 seconds
        const duration = 3 + Math.random() * 5;
        
        // Set styles
        star.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            box-shadow: 0 0 10px #fff, 0 0 20px #fff;
            animation: special-twinkle ${duration}s infinite ease-in-out;
        `;
        
        // Add custom animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add to container
        starsContainer.appendChild(star);
    }
    
    // Add special star animation to stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes special-twinkle {
            0% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.2; transform: scale(0.8); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Typewriter effect function
function typeWriterEffect(element, textArray) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Deleting text
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Slower when typing
        }
        
        // Handle deleting and switching to next text
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of typing
            isDeleting = true;
            typingSpeed = 1000; // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            // Move to next text after deletion
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Wait before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type(); // Start the typing animation
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 