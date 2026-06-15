/**
 * Counter Animation - Statistics counter with GSAP ScrollTrigger
 */

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    // Create ScrollTrigger for each counter
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => animateCounter(counter, target)
      });
    } else {
      // Fallback: animate on view with Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(counter, target);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(counter);
    }
  });
}

function animateCounter(element, target) {
  let current = 0;
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  
  const updateCounter = () => {
    current += increment;
    if (current >= target) {
      element.innerText = target;
      return;
    }
    element.innerText = Math.floor(current);
    requestAnimationFrame(updateCounter);
  };
  
  updateCounter();
}

// Initialize counters when DOM is ready
document.addEventListener('DOMContentLoaded', initCounters);