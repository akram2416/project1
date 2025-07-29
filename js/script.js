// Portfolio JavaScript functionality
(function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleDesktop = document.getElementById('themeToggleDesktop');
    const themeIcon = document.getElementById('themeIcon');
    const themeIconDesktop = document.getElementById('themeIconDesktop');
    const navbar = document.getElementById('mainNav');
    const contactForm = document.getElementById('contactForm');
    const typedTextElement = document.getElementById('typed-text');

    // Theme Management
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    }

    function updateThemeIcons(theme) {
        const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        if (themeIcon) themeIcon.className = iconClass;
        if (themeIconDesktop) themeIconDesktop.className = iconClass;
    }

    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    }

    // Event listeners for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme);
    }

    // Typing Animation
    function initializeTypingAnimation() {
        const texts = [
            'Cybersecurity Professional',
            'Security Analyst',
            'Threat Detection Expert',
            'Penetration Tester',
            'Security Consultant'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeText, typingSpeed);
        }

        if (typedTextElement) {
            typeText();
        }
    }

    // Animated Counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const countUp = (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        };

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    countUp(entry.target);
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Skill Progress Bars Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                    
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Smooth Scrolling for Navigation Links
    function initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"], .scroll-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active Navigation Link
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Navbar Scroll Effect
    function initializeNavbarScrollEffect() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            // Add backdrop blur when scrolled
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Contact Form Validation and Submission
    function initializeContactForm() {
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showFormMessage('Please fix the errors above.', 'error');
                return;
            }

            // Show loading state
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;

            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission();
                
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                
            } catch (error) {
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            // Remove previous validation classes
            field.classList.remove('is-valid', 'is-invalid');

            // Required field validation
            if (!value) {
                isValid = false;
                errorMessage = 'This field is required.';
            } else {
                // Specific validations
                switch (field.type) {
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            isValid = false;
                            errorMessage = 'Please enter a valid email address.';
                        }
                        break;
                    case 'text':
                        if (value.length < 2) {
                            isValid = false;
                            errorMessage = 'Please enter at least 2 characters.';
                        }
                        break;
                    case 'textarea':
                        if (value.length < 10) {
                            isValid = false;
                            errorMessage = 'Please enter at least 10 characters.';
                        }
                        break;
                }
            }

            // Apply validation result
            const feedbackElement = field.nextElementSibling;
            if (isValid) {
                field.classList.add('is-valid');
            } else {
                field.classList.add('is-invalid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.textContent = errorMessage;
                }
            }

            return isValid;
        }

        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Auto-hide success messages
            if (type === 'success') {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }

        async function simulateFormSubmission() {
            // Simulate API call delay
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }
    }

    // Mobile Menu Management
    function initializeMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // Lazy Loading for Better Performance
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }

    // Particle Animation for Hero Section (Optional Enhancement)
    function createParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const heroSection = document.querySelector('.hero-section');
        
        if (!heroSection) return;
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        heroSection.appendChild(canvas);
        
        let particles = [];
        const particleCount = 50;
        
        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }
        
        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        };
        
        Particle.prototype.draw = function() {
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#667eea';
            ctx.fill();
        };
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        initParticles();
        animate();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Performance Monitoring
    function initializePerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
                }
            }
        });

        // Monitor scroll performance
        let ticking = false;
        
        function optimizedScrollHandler() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-dependent functions go here
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    // Error Handling
    function initializeErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            // Could send error reports to analytics service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            // Could send error reports to analytics service
        });
    }

    // Service Worker Registration (for future PWA features)
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // navigator.serviceWorker.register('/sw.js')
                //     .then(registration => {
                //         console.log('SW registered: ', registration);
                //     })
                //     .catch(registrationError => {
                //         console.log('SW registration failed: ', registrationError);
                //     });
            });
        }
    }

    // Initialize all functionality when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Core functionality
        initializeTheme();
        initializeTypingAnimation();
        animateCounters();
        animateSkillBars();
        initializeSmoothScrolling();
        updateActiveNavigation();
        initializeNavbarScrollEffect();
        initializeContactForm();
        initializeMobileMenu();
        initializeLazyLoading();
        
        // Optional enhancements
        createParticles();
        initializePerformanceMonitoring();
        initializeErrorHandling();
        
        // Future features
        // registerServiceWorker();
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
    });

    // Expose some functions globally for debugging
    window.portfolioDebug = {
        toggleTheme,
        animateCounters,
        animateSkillBars
    };

})();

// Additional utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// Export Utils for use in other scripts
window.PortfolioUtils = Utils;
