/**
 * Main JavaScript for Jianan Engineering
 * Handles navbar, footer, and global functionality across all pages
 */

// Load components function
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Error loading ${componentPath}:`, error);
        return false;
    }
}

// Initialize navbar after it's loaded
function initNavbar() {
    // Get elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');
    
    // Sticky header on scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        // Remove existing listeners by cloning
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        const newMenu = navMenu.cloneNode(true);
        navMenu.parentNode.replaceChild(newMenu, navMenu);
        
        const finalToggle = document.getElementById('navToggle');
        const finalMenu = document.getElementById('navMenu');
        
        if (finalToggle && finalMenu) {
            finalToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                finalMenu.classList.toggle('active');
                finalToggle.classList.toggle('active');
                document.body.classList.toggle('mobile-nav-active');
            });
        }
    }
    
    // Close mobile menu when clicking on links
    const allLinks = document.querySelectorAll('.nav-links a, .nav-cta');
    allLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('navMenu');
            const mobileToggle = document.getElementById('navToggle');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.classList.remove('mobile-nav-active');
        });
    });
    
    // Dropdown toggle on mobile
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    dropdownLinks.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Set active page based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll progress and back to top
function initGlobalUI() {
    // Scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = progress + '%';
        });
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Initialize counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = target;
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.floor(current);
                        }
                    }, 30);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize all page-specific features
function initPageFeatures() {
    initGlobalUI();
    initCounters();
    
    // GSAP Animations (if GSAP is available)
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        gsap.from('.hero-title', { duration: 1, y: 80, opacity: 0, ease: 'power3.out' });
        gsap.from('.hero-subtitle', { duration: 1, y: 40, opacity: 0, delay: 0.3 });
        gsap.from('.hero-buttons', { duration: 1, y: 40, opacity: 0, delay: 0.6 });
        
        // Card animations
        gsap.from('.why-card, .service-card, .project-card, .value-card, .cert-card', {
            scrollTrigger: { trigger: '.why-grid, .services-grid, .projects-grid, .values-grid, .certs-grid', start: 'top 80%' },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6
        });
    }
}

// Load everything
async function loadAllComponents() {
    await loadComponent('navbar-container', 'components/navbar.html');
    await loadComponent('footer-container', 'components/footer.html');
    
    // Initialize after components are loaded
    initNavbar();
    initPageFeatures();
}

// Start loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}

// Hide loader on window load
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});