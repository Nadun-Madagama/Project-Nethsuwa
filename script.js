// Project Nethsuwa - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Initial check on load
    revealOnScroll();

    // 3. Mobile Menu Toggle (Basic)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // 5. Counter Animation (Simple)
    const stats = document.querySelectorAll('.stat-item h4');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.innerText);
            let count = 0;
            const updateCount = () => {
                const speed = 2000 / target;
                if (count < target) {
                    count++;
                    stat.innerText = count + (stat.innerText.includes('+') ? '+' : '');
                    setTimeout(updateCount, speed);
                }
            };
            // Note: In a real app, we'd trigger this when visible
            // updateCount(); 
        });
    };
    // 6. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#22c55e';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 7. Vision Check Modal
    const checkModal = document.getElementById('check-modal');
    const openModalBtn = document.getElementById('open-check-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (openModalBtn && checkModal) {
        openModalBtn.addEventListener('click', () => {
            checkModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeModal = () => {
            checkModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === checkModal) {
                closeModal();
            }
        });
    }
});
