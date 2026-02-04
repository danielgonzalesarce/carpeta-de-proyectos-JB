// ============================================
// Animaciones al hacer scroll
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Configuración del Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos de contenido en páginas de detalle
    const contentTexts = document.querySelectorAll('.content-text');
    const contentImages = document.querySelectorAll('.content-image');

    contentTexts.forEach(element => {
        observer.observe(element);
    });

    contentImages.forEach(element => {
        observer.observe(element);
    });

    // Observar cards del blog
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Efecto parallax sutil en imágenes (solo cuando están visibles)
    const parallaxImages = document.querySelectorAll('.content-image img');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && img.classList.contains('animate')) {
                const speed = 0.05;
                const yPos = -(scrolled * speed);
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Animación de entrada para el header del proyecto
    const proyectoHeader = document.querySelector('.proyecto-header-detalle');
    if (proyectoHeader) {
        proyectoHeader.style.opacity = '0';
        proyectoHeader.style.transform = 'translateY(-20px)';
        proyectoHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            proyectoHeader.style.opacity = '1';
            proyectoHeader.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animación de entrada para el video
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        const videoWrapper = videoSection.querySelector('.video-wrapper');
        if (videoWrapper) {
            videoWrapper.style.opacity = '0';
            videoWrapper.style.transform = 'scale(0.95)';
            videoWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                videoWrapper.style.opacity = '1';
                videoWrapper.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Efecto hover mejorado en cards del blog
    const blogCardImages = document.querySelectorAll('.blog-card-image');
    blogCardImages.forEach(cardImage => {
        cardImage.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.15)';
            }
        });
        
        cardImage.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Lazy loading para imágenes (si no está implementado nativamente)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Animación de números o estadísticas (si las hay)
    const animateNumbers = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };

        updateNumber();
    };

    const numberElements = document.querySelectorAll('[data-target]');
    numberElements.forEach(element => {
        observer.observe(element);
        element.addEventListener('animationstart', () => {
            animateNumbers(element);
        });
    });
});

// ============================================
// Navegación entre páginas
// ============================================

// Prevenir comportamiento por defecto en links de cards del blog
document.addEventListener('DOMContentLoaded', function() {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const link = card.querySelector('.blog-card-link');
        if (link) {
            card.addEventListener('click', function(e) {
                // Si el click no es en el link, navegar al link
                if (e.target !== link && !link.contains(e.target)) {
                    e.preventDefault();
                    window.location.href = link.href;
                }
            });
        }
    });
});

