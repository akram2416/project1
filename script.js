
        // Theme Toggle Functionality
        const toggleButton = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateToggleIcon(savedTheme);

        toggleButton.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });

        function updateToggleIcon(theme) {
            toggleButton.textContent = theme === 'light' ? '🌙' : '☀️';
        }

        // Smooth Scroll for Navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                targetElement.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Section Animation on Scroll
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Tilt Effect for Project Cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const maxTilt = 8;

                const tiltX = (centerY - y) / centerY * maxTilt;
                const tiltY = (x - centerX) / centerX * maxTilt;

                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Skill Card Animation
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseover', () => {
                card.style.backgroundColor = 'var(--card-hover-bg)';
                card.style.color = 'var(--card-hover-text)';
            });
            card.addEventListener('mouseout', () => {
                card.style.backgroundColor = 'var(--card-bg)';
                card.style.color = 'var(--text-color)';
            });
        });

        // Certification Card Animation
        document.querySelectorAll('.certification-card').forEach(card => {
            card.addEventListener('mouseover', () => {
                card.style.backgroundColor = 'var(--card-hover-bg)';
                card.style.color = 'var(--card-hover-text)';
            });
            card.addEventListener('mouseout', () => {
                card.style.backgroundColor = 'var(--card-bg)';
                card.style.color = 'var(--text-color)';
            });
        });
