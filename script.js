// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and event listeners
    initNavbar();
    initScrollAnimations();
    initBackToTop();
    initMenuToggle();
    initContactForm();
    initFloatingElements();
    initSkillLevels();
    initSocialTooltips();
    initTypingEffect();
    initSkillBarAnimations();
    initProjectCardEffects();
    initImageLoading();
    highlightCurrentSection();
    initKeyboardNavigation();
    initCVDownloadTracking();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-left, .animate-right, .animate-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skills-section') || 
                    entry.target.classList.contains('about-section')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Animate skill bars on scroll
function initSkillBarAnimations() {
    // Initial setup - skill bars are already visible
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        bar.style.transition = 'width 1.5s ease-in-out';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        // Reset animation
        const originalWidth = bar.style.width;
        bar.style.width = '0%';
        
        // Animate after a small delay
        setTimeout(() => {
            bar.style.width = originalWidth;
        }, 100);
    });
}

// Skill level hover effect
function initSkillLevels() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        // Get the skill level from data attribute
        const level = item.getAttribute('data-level');
        const levelElement = item.querySelector('.skill-level');
        
        // Set the level text
        if (levelElement) {
            levelElement.textContent = level;
            levelElement.setAttribute('data-level', level);
        }
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            const levelElement = this.querySelector('.skill-level');
            if (levelElement) {
                levelElement.style.opacity = '1';
                levelElement.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const levelElement = this.querySelector('.skill-level');
            if (levelElement) {
                levelElement.style.opacity = '0';
                levelElement.style.transform = 'translateY(5px)';
            }
        });
    });
}

// Social media tooltips
function initSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Add tooltip text to social links
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-github')) {
                link.setAttribute('data-tooltip', 'GitHub');
            } else if (icon.classList.contains('fa-linkedin-in')) {
                link.setAttribute('data-tooltip', 'LinkedIn');
            } else if (icon.classList.contains('fa-instagram')) {
                link.setAttribute('data-tooltip', 'Instagram');
            } else if (icon.classList.contains('fa-facebook-f')) {
                link.setAttribute('data-tooltip', 'Facebook');
            } else if (icon.classList.contains('fa-twitter')) {
                link.setAttribute('data-tooltip', 'Twitter');
            }
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu toggle
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Add visual feedback
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#4fd1c7';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        });
    }
}

// Floating elements animation enhancement
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.circle, .square');
    
    if (floatingElements.length === 0) return;
    
    // Add mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach(element => {
            const speed = element.classList.contains('circle-1') ? 0.02 :
                         element.classList.contains('circle-2') ? 0.015 :
                         element.classList.contains('square-1') ? 0.01 : 0.01;
            
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add click effect for floating elements
    floatingElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Typing effect for subtitle with 2-second pause
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    
    if (!subtitle) return;
    
    const texts = [
        "Hello, I'm",
        "Data Science (Undergraduate)",
        "Data Analyst (Undergraduate)", 
        "AI Enthusiast",
        "Problem Solver",
        "Undergraduate in Applied Data Science Communication"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 1500;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500); // Wait before typing next
            } else {
                setTimeout(type, erasingDelay);
            }
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                // When text is fully typed, wait 2 seconds then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000); // 2-second pause
            } else {
                setTimeout(type, typingDelay);
            }
        }
    }
    
    // Start typing after 1 second
    setTimeout(type, 1000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add hover effect to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Remove loading class when image is loaded
        if (img.complete) {
            img.classList.remove('loading');
        } else {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('error');
            });
        }
    });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        // Tab key navigation focus styling
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse click
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Add window resize handler
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Add page load animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class to body for CSS animations
    const loadCSS = `
    body.loaded .animate-left,
    body.loaded .animate-right,
    body.loaded .animate-up {
        transition-delay: 0.1s;
    }
    `;
    
    const loadStyle = document.createElement('style');
    loadStyle.textContent = loadCSS;
    document.head.appendChild(loadStyle);
});

// Add certificate link mouse tracking for tooltips (optional)
function initCertificateLinks() {
    const certificateLinks = document.querySelectorAll('.view-certificate');
    
    certificateLinks.forEach(link => {
        link.addEventListener('mousemove', function(e) {
            this.style.setProperty('--mouse-x', e.clientX + 'px');
            this.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    });
}

// Initialize certificate links
initCertificateLinks();

// Add CSS for keyboard navigation and loading states
const customCSS = `
.keyboard-navigation a:focus,
.keyboard-navigation button:focus,
.keyboard-navigation input:focus,
.keyboard-navigation textarea:focus {
    outline: 2px solid var(--blue) !important;
    outline-offset: 2px !important;
}

.loading {
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.error {
    opacity: 0.7;
    filter: grayscale(100%);
}

/* Cursor for typing effect */
.subtitle {
    position: relative;
    display: inline-block;
}

.subtitle::after {
    content: '|';
    position: absolute;
    right: -10px;
    color: var(--blue);
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
`;

// Inject custom CSS
const style = document.createElement('style');
style.textContent = customCSS;
document.head.appendChild(style);

// Add console greeting (optional)
console.log('%c👋 Welcome to Seshan Perera\'s Portfolio!', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%c🔍 Exploring the code? Feel free to check out my projects!', 'color: #8892b0; font-size: 14px;');
console.log('%c📊 Data Science | Analytics | AI | Full Stack Development', 'color: #4fd1c7; font-size: 12px;');

// CV Download Tracking
function initCVDownloadTracking() {
    const cvDownloadButtons = document.querySelectorAll('.btn.cv-download, .btn.cv-download-large');
    
    cvDownloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track download event
            console.log('CV Download clicked:', this.href);
            
            // You can add Google Analytics here
            // Example: gtag('event', 'download', { 'file_name': 'CV' });
            
            // Optional: Show download started message
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            
            // Reset button text after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
    
    // Check if file exists (optional)
    checkCVFileExists();
}

// Check if CV file exists
function checkCVFileExists() {
    const cvUrl = 'assets/files/Seshan_Perera_CV.pdf';
    
    fetch(cvUrl, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                console.warn('CV file not found at:', cvUrl);
                showCVNotFoundWarning();
            }
        })
        .catch(error => {
            console.warn('Error checking CV file:', error);
        });
}

// Show warning if CV not found
function showCVNotFoundWarning() {
    // You can optionally add a warning message
    const warning = document.createElement('div');
    warning.className = 'cv-warning';
    warning.innerHTML = '<small>Note: CV file is being updated. Please email for latest version.</small>';
    warning.style.color = '#ff6b6b';
    warning.style.marginTop = '10px';
    warning.style.fontSize = '12px';
    
    const cvSection = document.querySelector('.cv-download-section');
    if (cvSection) {
        cvSection.appendChild(warning);
    }
}

// Project Navigation Tracking
function initProjectNavigation() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add click tracking
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            console.log('Navigating to project:', projectName);
            
            // You can add analytics here
            // Example: trackProjectView(projectName);
        });
    });
    
    // Add project detail page specific functionality
    if (window.location.pathname.includes('projects/')) {
        initProjectDetailPage();
    }
}

// Project detail page functionality
function initProjectDetailPage() {
    // Add image lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.zIndex = '10000';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            
            const img = document.createElement('img');
            img.src = this.src;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '10px';
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    initProjectNavigation();
});