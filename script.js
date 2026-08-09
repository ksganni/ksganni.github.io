// Typing animation for roles
document.addEventListener('DOMContentLoaded', function() {
    const roles = [
        'Data Analyst!',
        'Data Scientist!',
        'AI/ML Engineer!',
        'Data Engineer!'
    ];
    const typedElement = document.getElementById('typed-role');
    if (typedElement) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typedElement.textContent = currentRole.substring(0, charIndex);

            let delay = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                delay = 1800; // pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400; // pause before next word
            }

            setTimeout(typeRole, delay);
        }

        typeRole();
    }
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo');
    const sections = document.querySelectorAll('.section');
    const siteBackdrop = document.querySelector('.site-backdrop');

    // Home starts darker blue; eases to the current brighter blue while scrolling
    function updateScrollTheme() {
        if (!siteBackdrop) return;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        // Reach full brightness around mid-page so Skills/Projects already feel lit
        const progress = Math.min(Math.max(window.scrollY / (maxScroll * 0.55), 0), 1);
        siteBackdrop.style.setProperty('--scroll-light', progress.toFixed(3));
    }

    updateScrollTheme();
    window.addEventListener('scroll', updateScrollTheme, { passive: true });
    window.addEventListener('resize', updateScrollTheme);
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section's nav link
        if (current) {
            const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Listen for scroll events to update active nav link
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active nav link
    updateActiveNavLink();
    
    // Summary text is now static and displays immediately
    
    // Project click functionality
    const projectItems = document.querySelectorAll('.project-item');
    
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Staggered reveal animation when cards scroll into view
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cards = Array.from(projectItems);
                const delay = (cards.indexOf(card) % 4) * 100;
                setTimeout(() => {
                    card.classList.add('visible');
                    // Start bubble float after the reveal transition finishes
                    setTimeout(() => card.classList.add('floating'), 700);
                }, delay);
                revealObserver.unobserve(card);
            }
        });
    }, { threshold: 0.15 });
    
    projectItems.forEach(item => revealObserver.observe(item));

    // Section scroll reveal: header first, then content
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const section = entry.target;
            section.classList.add('is-visible');

            // Content appears only after the header has started showing
            setTimeout(() => {
                section.classList.add('content-visible');

                if (section.id === 'projects') {
                    projectItems.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                            setTimeout(() => card.classList.add('floating'), 650);
                        }, (index % 4) * 100);
                    });
                }
            }, 450);

            sectionObserver.unobserve(section);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('.reveal-section').forEach(section => {
        sectionObserver.observe(section);
    });
    // Add a back arrow button to every card (visible only when expanded)
    projectItems.forEach(item => {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-projects';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> All Projects';
        item.insertBefore(backBtn, item.firstChild);
        
        backBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            collapseProject(item);
        });
    });
    
    function collapseProject(item) {
        const description = item.querySelector('.project-description');
        item.classList.remove('expanded');
        projectsGrid.classList.remove('focused');
        document.body.classList.remove('project-focused');
        description.style.display = 'none';
        
        projectItems.forEach(otherItem => {
            otherItem.style.display = '';
        });

        projectsGrid.style.minHeight = '';

        projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only the All Projects button should close an expanded project
            if (this.classList.contains('expanded')) {
                return;
            }

            // Ignore clicks on links inside cards (if any)
            if (e.target.closest('a, button')) {
                return;
            }

            const description = this.querySelector('.project-description');

            // Hold the grid's height: without it the section collapses and the
            // page scrolls up, flashing Experience before the panel covers it
            projectsGrid.style.minHeight = projectsGrid.offsetHeight + 'px';

            // Hide all other project cards
            projectItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.display = 'none';
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('.project-description').style.display = 'none';
                }
            });

            // Expand this card to full width and show its description
            this.classList.add('expanded');
            projectsGrid.classList.add('focused');
            document.body.classList.add('project-focused');
            description.style.display = 'block';
            description.style.opacity = '1';
            description.style.transform = 'none';
            this.scrollTop = 0;
        });
    });

    // Close project detail when using main nav links
    document.querySelectorAll('.nav-link, .nav-logo').forEach(link => {
        link.addEventListener('click', () => {
            const openProject = document.querySelector('.project-item.expanded');
            if (openProject) {
                collapseProject(openProject);
            }
        });
    });

    // Stop clicks inside expanded content from bubbling (links, images, etc.)
    document.querySelectorAll('.project-description, .project-links').forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Resume download functionality - Updated selectors
    const resumeButtons = document.querySelectorAll('#resume-btn, #contact-resume-btn, .btn-primary[onclick*="downloadResume"]');
    
    resumeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            
            console.log('Resume button clicked - starting download');
            
            try {
                // Create a temporary link element for download
                const link = document.createElement('a');
                link.href = 'assets/documents/Krishna_Sathvika_Ganni_Resume.pdf'; // Path to your resume
                link.download = 'Krishna_Sathvika_Ganni_Resume.pdf';
                link.style.display = 'none';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log('Resume download initiated');
                
                // Show feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                this.style.background = '#27ae60';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
                
            } catch (error) {
                console.error('Resume download error:', error);
                
                // Show error feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-exclamation"></i> Error!';
                this.style.background = '#e74c3c';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            }
        });
    });
    
    // Mail functionality - Updated selectors
    const mailButtons = document.querySelectorAll('#mail-btn, #contact-mail-btn, .btn-secondary[onclick*="openMail"]');
    
    mailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            
            const email = 'krishnasathvika.ganni05@gmail.com';
            const subject = 'Hello Krishna!';
            const body = 'Hi Krishna,\n\nI came across your portfolio and would like to connect.\n\nBest regards,';
            
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        });
    });
    
    // Smooth scrolling is now handled by CSS scroll-behavior: smooth
});

// Global functions for onclick handlers
function downloadResume() {
    console.log('downloadResume function called');
    try {
        // Create a temporary link element for download
        const link = document.createElement('a');
        link.href = 'assets/documents/Krishna_Sathvika_Ganni_Resume.pdf'; // Path to your resume
        link.download = 'Krishna_Sathvika_Ganni_Resume.pdf';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show feedback
        const button = event.target.closest('button');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            button.style.background = '#27ae60';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        }
    } catch (error) {
        console.error('Error in downloadResume:', error);
        alert('Resume download failed. Please check if the file exists.');
    }
}

function openMail() {
    console.log('openMail function called');
    try {
        const email = 'krishnasathvika.ganni05@gmail.com';
        const subject = 'Hello Krishna!';
        const body = 'Hi Krishna,\n\nI came across your portfolio and would like to connect.\n\nBest regards,';
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    } catch (error) {
        console.error('Error in openMail:', error);
        alert('Email client could not be opened.');
    }
}

// Loading animation removed to fix loading issue
