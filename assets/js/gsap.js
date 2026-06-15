/**
 * GSAP Animations - Premium animations for Jianan Engineering
 */

// Initialize all GSAP animations
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  
  // Hero Text Reveal Animation
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const heroText = heroTitle.innerText;
    heroTitle.innerHTML = heroText.split(' ').map(word => 
      `<span class="hero-word" style="display:inline-block; opacity:0; transform:translateY(40px);">${word}</span>`
    ).join(' ');
    
    gsap.to('.hero-word', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        toggleActions: 'play none none reverse'
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.out'
    });
  }
  
  // Hero Subtitle Reveal
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out'
    });
  }
  
  // Hero Buttons Reveal
  const heroButtons = document.querySelector('.hero-buttons');
  if (heroButtons) {
    gsap.from(heroButtons, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.7,
      ease: 'power3.out'
    });
  }
  
  // Image Reveal Animations
  const images = document.querySelectorAll('.overview-image img, .project-image img');
  images.forEach(img => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  
  // Counter animations are handled in counter.js
  
  // Parallax Effects
  gsap.to('.hero-overlay', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    opacity: 0.5
  });
  
  // Section Reveal Animations
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
  
  // Footer Reveal Animation
  const footer = document.querySelector('.footer');
  if (footer) {
    gsap.from(footer, {
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  // Magnetic Buttons Effect
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Custom Cursor (Desktop only)
  if (window.innerWidth > 1024) {
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    
    if (cursorDot && cursorOutline) {
      window.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.1
        });
        gsap.to(cursorOutline, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.3
        });
      });
      
      // Hover effect on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursorOutline, {
            scale: 1.5,
            duration: 0.2,
            borderColor: '#28B463'
          });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursorOutline, {
            scale: 1,
            duration: 0.2,
            borderColor: '#28B463'
          });
        });
      });
    }
  }
}

// Initialize GSAP when DOM is ready
document.addEventListener('DOMContentLoaded', initGSAPAnimations);