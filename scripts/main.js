// ============================================
// GSAP Animations - Portafolio Futurista
// ============================================

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// Preloader
// ============================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const preloaderLogo = document.querySelector('.preloader-logo');
    const preloaderText = document.querySelector('.preloader-text');
    
    // Animación del logo
    gsap.to(preloaderLogo, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
    });
    
    // Animación de la barra de progreso
    gsap.to(preloaderBar, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
        delay: 0.5
    });
    
    // Animación del texto
    gsap.to(preloaderText, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 1
    });
    
    // Ocultar preloader
    gsap.to(preloader, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: 'power2.in',
        delay: 2.5,
        onComplete: () => {
            preloader.style.display = 'none';
            initAnimations();
        }
    });
}

// ============================================
// Cursor Personalizado
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    // Animación suave del follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        gsap.set(cursorFollower, {
            x: followerX,
            y: followerY
        });
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Efectos en hover
    const hoverElements = document.querySelectorAll('a, button, .proyecto-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(cursorFollower, { scale: 1.5, opacity: 0.8, duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(cursorFollower, { scale: 1, opacity: 0.5, duration: 0.3 });
        });
    });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: header }
    });
}

// ============================================
// Hero Animations
// ============================================
function initHeroAnimations() {
    const heroBadge = document.querySelector('.hero-badge');
    const titleLines = document.querySelectorAll('.title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    const shapes = document.querySelectorAll('.shape');
    
    // Timeline principal del hero
    const heroTL = gsap.timeline({ delay: 0.5 });
    
    // Badge
    if (heroBadge) {
        heroTL.from(heroBadge, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
    
    // Título con split animation
    if (titleLines.length > 0) {
        titleLines.forEach((line, index) => {
            const words = line.textContent.split(' ');
            line.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
            
            const wordElements = line.querySelectorAll('.word');
            heroTL.from(wordElements, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            }, index * 0.2);
        });
    }
    
    // Subtítulo
    if (heroSubtitle) {
        heroTL.from(heroSubtitle, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');
    }
    
    // CTA buttons
    if (heroCTA) {
        heroTL.from(heroCTA.children, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.4');
    }
    
    // Scroll indicator
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            opacity: 0,
            y: -20,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: 2
        });
    }
    
    // Shapes parallax
    if (shapes.length > 0) {
        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                y: '+=50',
                x: index % 2 === 0 ? '+=30' : '-=30',
                duration: 3 + index,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }
}

// ============================================
// Split Text Animation Helper
// ============================================
function splitTextAnimation(element) {
    if (!element) return;
    
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    const wordElements = element.querySelectorAll('.word');
    gsap.from(wordElements, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

// ============================================
// Proyectos Cards Animations
// ============================================
function initProyectosAnimations() {
    const cards = document.querySelectorAll('.proyecto-card');
    
    cards.forEach((card, index) => {
        const cardInner = card.querySelector('.proyecto-card-inner');
        const cardImage = card.querySelector('.card-img');
        const cardContent = card.querySelector('.proyecto-card-content');
        const cardHoverEffect = card.querySelector('.card-hover-effect');
        
        // Animación de entrada
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.2
        });
        
        // Parallax en la imagen
        if (cardImage) {
            gsap.to(cardImage, {
                y: -30,
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(cardImage, {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            if (cardHoverEffect) {
                gsap.to(cardHoverEffect, {
                    opacity: 0.1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(cardImage, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            if (cardHoverEffect) {
                gsap.to(cardHoverEffect, {
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ============================================
// Section Header Animations
// ============================================
function initSectionAnimations() {
    const sectionNumber = document.querySelector('.section-number');
    const titleWords = document.querySelectorAll('.title-word');
    const sectionDescription = document.querySelector('.section-description');
    
    // Número
    if (sectionNumber) {
        gsap.from(sectionNumber, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionNumber,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Título
    if (titleWords.length > 0) {
        titleWords.forEach((word, index) => {
            splitTextAnimation(word);
        });
    }
    
    // Descripción
    if (sectionDescription) {
        splitTextAnimation(sectionDescription);
    }
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });
}

// ============================================
// Menu Toggle
// ============================================
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animación de las líneas del menú
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
            } else {
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
            }
        });
    }
}

// ============================================
// Inicializar todas las animaciones
// ============================================
function initAnimations() {
    initCustomCursor();
    initHeaderScroll();
    initHeroAnimations();
    initProyectosAnimations();
    initSectionAnimations();
    initSmoothScroll();
    initMenuToggle();
}

// ============================================
// Inicializar cuando el DOM esté listo
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
} else {
    initPreloader();
}

// ============================================
// YouTube Video Autoplay (para páginas de detalle)
// ============================================
function initYouTubeVideos() {
    const videoIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
    
    if (videoIframes.length === 0) return;
    
    // Cargar YouTube Iframe API
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    
    window.onYouTubeIframeAPIReady = function() {
        videoIframes.forEach(iframe => {
            const videoId = iframe.id;
            if (videoId) {
                const player = new YT.Player(videoId, {
                    events: {
                        'onReady': function(event) {
                            event.target.playVideo();
                            event.target.mute();
                            event.target.setLoop(true);
                        }
                    }
                });
            }
        });
    };
}

// Inicializar videos de YouTube si existen
if (document.querySelector('iframe[src*="youtube.com"]')) {
    initYouTubeVideos();
}
