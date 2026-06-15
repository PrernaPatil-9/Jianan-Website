/**
 * Navbar Component - Sticky Header, Mobile Menu, Mega Dropdown
 */

// Load navbar component
async function loadNavbar() {
  try {
    const response = await fetch('components/navbar.html');
    const html = await response.text();
    document.getElementById('navbar-container').innerHTML = html;
    initNavbar();
  } catch (error) {
    console.error('Error loading navbar:', error);
    // Fallback navbar
    createFallbackNavbar();
  }
}

function createFallbackNavbar() {
  const navbarHtml = `
    <header class="header" id="header">
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-logo">
            <div class="logo-icon">J</div>
            <span class="logo-text">Jianan Engineering</span>
          </div>
          <div class="nav-menu" id="navMenu">
            <ul class="nav-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="projects.html">Projects</a></li>
              <li><a href="industries.html">Industries</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="nav-toggle" id="navToggle">
            <i class="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    </header>
  `;
  document.getElementById('navbar-container').innerHTML = navbarHtml;
  initNavbar();
}

function initNavbar() {
  // Sticky header on scroll
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll('.nav-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-active');
      if (navToggle) navToggle.classList.remove('active');
    });
  });
  
  // Active page indication
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
}

// Initialize navbar on page load
if (document.getElementById('navbar-container')) {
  loadNavbar();
}