// script.js
// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
}
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌙';
}

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const downloadBtn = document.querySelector('.download-cv');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                portfolioItems.forEach(item => {
                    const category = item.dataset.category;
                    item.style.display = (filter === 'all' || category === filter) 
                        ? 'block' 
                        : 'none';
                });
            });
        });
    }
    // Download CV
    // This is a placeholder for the actual download functionality
     if(downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Add actual download functionality here
            alert('CV download will be available soon!');
        });
    }
});

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && message) {
            // Here you would typically send the form data to a server
            alert(`Thank you ${name}! Your message has been sent.`);
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}
// Smooth Scrolling
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});