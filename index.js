/* ═══════════════════════════════════════════════════
   PORTFOLIO — INTERACTIONS & ANIMATIONS
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll Reveal (IntersectionObserver) ────────
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.reveal-up').forEach((el) => revealObserver.observe(el));

    // ── Navbar — scroll state ───────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ── Navbar — active link tracking ───────────────
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { threshold: 0.25, rootMargin: `-72px 0px -30% 0px` }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    // ── Mobile nav toggle ───────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinksEl = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksEl.classList.toggle('open');
    });

    navLinksEl.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksEl.classList.remove('open');
        });
    });

    // ── Resume Dropdown Toggle (for mobile) ────────
    const resumeDropdown = document.querySelector('.resume-dropdown');
    const resumeBtn = document.querySelector('.nav-btn-resume');

    if (resumeBtn && resumeDropdown) {
        resumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resumeDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!resumeDropdown.contains(e.target)) {
                resumeDropdown.classList.remove('active');
            }
        });
    }

    // ── Typewriter Effect ───────────────────────────
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'terraform apply -auto-approve',
        'kubectl get pods --all-namespaces',
        'docker build -t linguistai .',
        'aws ec2 describe-instances',
        'gh workflow run deploy.yml',
        'helm upgrade --install monitoring',
        'ansible-playbook deploy.yml',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;

    function typeWriter() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 25;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 50;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ── Counting Animation for Stats ────────────────
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const countObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    animateCount(el, 0, target, 1200);
                    countObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((el) => countObserver.observe(el));

    function animateCount(el, start, end, duration) {
        const range = end - start;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(start + range * eased);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = end;
            }
        }
        requestAnimationFrame(step);
    }

    // ── Hero Particles ──────────────────────────────
    const particlesContainer = document.getElementById('hero-particles');
    const particleCount = 30;
    const colors = [
        'hsla(258, 90%, 66%, .5)',
        'hsla(185, 100%, 50%, .5)',
        'hsla(330, 85%, 60%, .4)',
        'hsla(220, 20%, 95%, .15)',
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.setProperty('--size', `${Math.random() * 5 + 2}px`);
        particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        particle.style.setProperty('--duration', `${Math.random() * 10 + 6}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
        particle.style.setProperty('--dy', `${(Math.random() - 0.5) * 80}px`);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);
    }

    // ── Smooth scroll for anchor links ──────────────
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Timeline detail stagger animation ───────────
    const timelineItems = document.querySelectorAll('.timeline-details li');
    const detailObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((li, idx) => {
                        li.style.opacity = '0';
                        li.style.transform = 'translateX(-16px)';
                        li.style.transition = `opacity .5s ease ${idx * 0.08}s, transform .5s ease ${idx * 0.08}s`;
                        requestAnimationFrame(() => {
                            li.style.opacity = '1';
                            li.style.transform = 'translateX(0)';
                        });
                    });
                    detailObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.timeline-details').forEach((ul) => detailObserver.observe(ul));

});
