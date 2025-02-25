document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('div[id]');
  const tocLinks = document.querySelectorAll('.toc-link');
  const tocLabels = document.querySelectorAll('.toc-label');
  
  // Add active class to show labels
  const addActiveClass = (link) => {
    // Remove active class from all links
    tocLinks.forEach(l => {
      l.classList.remove('active');
      l.classList.remove('text-neutral-800');
      l.classList.remove('dark:text-white');
      l.classList.add('text-neutral-400');
      l.classList.add('dark:text-neutral-400');
    });
    
    // Add active class to current link
    link.classList.add('active');
    link.classList.add('text-neutral-800');
    link.classList.add('dark:text-white');
    link.classList.remove('text-neutral-400');
    link.classList.remove('dark:text-neutral-400');
    
    // Show label for active link
    const label = link.querySelector('.toc-label');
    if (label) {
      label.classList.remove('opacity-0');
      label.classList.add('opacity-100');
    }
  };
  
  // Reset all labels except active one
  const resetLabels = (activeLink) => {
    tocLabels.forEach(label => {
      if (!activeLink || !activeLink.contains(label)) {
        label.classList.remove('opacity-100');
        label.classList.add('opacity-0');
      }
    });
  };
  
  // Highlight active section in TOC
  const highlightActiveSection = () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    if (currentSection) {
      const activeLink = document.querySelector(`.toc-link[href="#${currentSection}"]`);
      if (activeLink) {
        addActiveClass(activeLink);
        resetLabels(activeLink);
      }
    }
  };
  
  // Initial highlight
  highlightActiveSection();
  
  // Highlight on scroll
  window.addEventListener('scroll', highlightActiveSection);
  
  // Handle click on TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Let the default behavior happen (scroll to section)
      // But also update the active state
      setTimeout(() => {
        addActiveClass(link);
        resetLabels(link);
      }, 100);
    });
  });
}); 