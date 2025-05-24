class ImageViewer {
    constructor() {
        this.createViewer();
        this.currentIndex = 0;
        this.items = Array.from(document.querySelectorAll('.portfolio-item'));
        this.isTransitioning = false;
        this.initializeEventListeners();
    }

    createViewer() {
        const viewer = document.createElement('div');
        viewer.className = 'image-viewer';
        viewer.innerHTML = `
            <div class="viewer-content">
                <button class="viewer-close" aria-label="Close image viewer">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <button class="viewer-nav viewer-prev" aria-label="Previous image">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                </button>
                <button class="viewer-nav viewer-next" aria-label="Next image">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                </button>
                <div class="viewer-image-container">
                    <img class="viewer-image" src="" alt="">
                </div>
                <div class="viewer-info">
                    <div class="viewer-caption"></div>
                    <div class="viewer-counter"></div>
                </div>
            </div>
        `;
        document.body.appendChild(viewer);
        this.viewer = viewer;
        this.viewerImage = viewer.querySelector('.viewer-image');
        this.viewerCaption = viewer.querySelector('.viewer-caption');
        this.viewerCounter = viewer.querySelector('.viewer-counter');
    }

    async preloadImage(index) {
        if (!this.items[index]) return null;
        
        const img = this.items[index].querySelector('img');
        if (!img) return null;

        return new Promise((resolve) => {
            const highResImage = new Image();
            highResImage.onload = () => resolve(highResImage.src);
            highResImage.onerror = () => resolve(img.src);
            highResImage.src = img.src.replace(/w=\d+/, 'w=1920').replace(/h=\d+/, 'h=1080');
        });
    }

    async showImage(index, direction = 0) {
        if (this.isTransitioning || index === this.currentIndex) return;
        this.isTransitioning = true;

        const item = this.items[index];
        if (!item) return;

        const img = item.querySelector('img');
        if (!img) return;

        // Add loading and transition classes
        this.viewerImage.classList.add('loading');
        if (direction !== 0) {
            this.viewerImage.classList.add(direction > 0 ? 'slide-left' : 'slide-right');
        }

        // Update counter and caption
        this.viewerCounter.textContent = `${index + 1} / ${this.items.length}`;
        this.viewerCaption.textContent = img.alt;

        // Preload and set image
        const highResSrc = await this.preloadImage(index);
        this.viewerImage.src = highResSrc || img.src;
        this.viewerImage.alt = img.alt;
        
        // Show viewer if not already visible
        if (!this.viewer.classList.contains('active')) {
            this.viewer.classList.add('active');
        }

        // Update current index
        this.currentIndex = index;

        // Preload next and previous images
        this.preloadImage((index + 1) % this.items.length);
        this.preloadImage((index - 1 + this.items.length) % this.items.length);

        // Remove loading state when image loads
        this.viewerImage.onload = () => {
            this.viewerImage.classList.remove('loading');
            this.viewerImage.classList.remove('slide-left', 'slide-right');
            this.isTransitioning = false;
        };
    }

    navigate(direction) {
        if (this.isTransitioning) return;
        const newIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
        this.showImage(newIndex, direction);
    }

    initializeEventListeners() {
        // Close button
        this.viewer.querySelector('.viewer-close').addEventListener('click', () => {
            this.viewer.classList.remove('active');
        });

        // Navigation buttons
        this.viewer.querySelector('.viewer-prev').addEventListener('click', () => {
            this.navigate(-1);
        });

        this.viewer.querySelector('.viewer-next').addEventListener('click', () => {
            this.navigate(1);
        });

        // Portfolio item click handlers
        this.items.forEach((item, index) => {
            const viewBtn = item.querySelector('.view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showImage(index);
                });
            }
        });

        // Close on background click
        this.viewer.addEventListener('click', (e) => {
            if (e.target === this.viewer) {
                this.viewer.classList.remove('active');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.viewer.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.viewer.classList.remove('active');
                    break;
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        this.viewer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.viewer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                this.navigate(diff > 0 ? -1 : 1);
            }
        }, { passive: true });
    }
}

// Initialize viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.portfolio-grid')) {
        new ImageViewer();
    }
});
