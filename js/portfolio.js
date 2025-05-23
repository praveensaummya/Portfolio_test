// portfolio.js
document.addEventListener('DOMContentLoaded', function() {
  const filters = document.querySelector('.filters');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filters.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const filter = e.target.dataset.filter;
    
    // Update active state
    document.querySelectorAll('.filters button').forEach(btn => 
      btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filter items
    portfolioItems.forEach(item => {
      const category = item.dataset.category;
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});