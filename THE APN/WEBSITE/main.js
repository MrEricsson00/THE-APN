/**
 * The Advancement Pioneers Network - Main JavaScript File
 * Contains all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Global Variables
    // ======================
    const body = document.body;
    const header = document.querySelector('.l-header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const teamCards = document.querySelectorAll('.card');
    
    // ======================
    // Mobile Navigation
    // ======================
    function toggleMobileMenu() {
        navMenu.classList.toggle('show');
        body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('show');
        body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Event Listeners
    navToggle.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    
    // ======================
    // Sticky Header
    // ======================
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ======================
    // Smooth Scrolling
    // ======================
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // ======================
    // Active Section Highlight
    // ======================
    function setActiveLink() {
        const scrollPosition = window.scrollY + 200;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            
            if (
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initialize on load
    
    // ======================
    // Contact Form Handling
    // ======================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Reset error states
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('error');
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission (replace with actual AJAX call)
                const formData = new FormData(contactForm);
                
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        contactForm.reset();
                        formSuccess.classList.add('show');
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formSuccess.classList.remove('show');
                        }, 5000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem submitting your form. Please try again.');
                });
            }
        });
    }
    
    // ======================
    // Gallery Interaction
    // ======================
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
        });
    }
    
    // ======================
    // Team Card Interaction
    // ======================
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // For touch devices
        card.addEventListener('touchstart', function() {
            this.classList.toggle('hover');
        });
    });
    
    // ======================
    // ScrollReveal Animations
    // ======================
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 200,
            mobile: true,
            reset: false
        });
        
        sr.reveal('.home-data, .about-img, .about-content', { 
            interval: 200 
        });
        
        sr.reveal('.card-container', { 
            interval: 150,
            origin: 'bottom',
            distance: '30px'
        });
        
        sr.reveal('.gallery-img', { 
            interval: 100,
            origin: 'bottom',
            distance: '20px'
        });
        
        sr.reveal('.contact-info, .contact-form-container', {
            interval: 200,
            origin: 'bottom'
        });
    }
    
    // ======================
    // Touch Device Detection
    // ======================
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    
    if (isTouchDevice()) {
        body.classList.add('touch-device');
    }
    
    // ======================
    // Back to Top Button
    // ======================
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        body.appendChild(backToTopBtn);
        
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop(); // Initialize
    }
    
    createBackToTopButton();
    
    // ======================
    // Social Media Links (Analytics)
    // ======================
    document.querySelectorAll('.footer-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            // Here you could add analytics tracking
            console.log('Social icon clicked:', this.href);
        });
    });
});

// ======================
// Helper Functions
// ======================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}