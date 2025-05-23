document.addEventListener('DOMContentLoaded', () => {
    // Hero Section Animations
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.cta-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });

    // Featured Work Hover Effects
    document.querySelectorAll('.featured-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('img'), {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
});