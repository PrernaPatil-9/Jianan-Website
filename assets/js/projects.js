/**
 * Projects Module - Filterable project gallery
 */

// Project data
const projectsData = [
  {
    id: 1,
    title: 'Pharmaceutical Manufacturing Plant',
    category: 'pharmaceutical',
    location: 'Mumbai, India',
    image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Turnkey EPC for GMP-certified pharma facility'
  },
  {
    id: 2,
    title: 'Industrial Infrastructure Hub',
    category: 'industrial',
    location: 'Jakarta, Indonesia',
    image: 'https://images.pexels.com/photos/1476376/pexels-photo-1476376.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Complete MEP and civil works for industrial park'
  },
  {
    id: 3,
    title: 'Renewable Energy Project',
    category: 'industrial',
    location: 'Bangladesh',
    image: 'https://images.pexels.com/photos/7419537/pexels-photo-7419537.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Solar power plant electrical infrastructure'
  },
  {
    id: 4,
    title: 'Commercial Complex MEP',
    category: 'infrastructure',
    location: 'Delhi, India',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'HVAC and fire safety for corporate tower'
  },
  {
    id: 5,
    title: 'Pharma Cleanroom Facility',
    category: 'pharmaceutical',
    location: 'Hyderabad, India',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Class 100 cleanroom with HEPA filtration'
  },
  {
    id: 6,
    title: 'Automotive Manufacturing Plant',
    category: 'industrial',
    location: 'Chennai, India',
    image: 'https://images.pexels.com/photos/1416531/pexels-photo-1416531.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Complete electrical and automation systems'
  }
];

// Render projects grid
function renderProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  projectsGrid.innerHTML = filteredProjects.map(project => `
    <div class="project-card" data-category="${project.category}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <span class="project-category">${project.category}</span>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${project.location}</p>
        <p>${project.description}</p>
      </div>
    </div>
  `).join('');
}

// Initialize project filters
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

// Initialize projects module
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initProjectFilters();
});