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

// ============================================
// Animaciones para Páginas de Detalle
// ============================================
function initDetailPageAnimations() {
    // Solo ejecutar si estamos en una página de detalle
    if (!document.querySelector('.proyecto-detalle')) return;
    
    // Separar emojis del texto en los títulos para mantener su color original
    const sectionHeadings = document.querySelectorAll('.section-heading');
    sectionHeadings.forEach(heading => {
        const text = heading.textContent;
        // Detectar emoji al inicio (rango Unicode de emojis comunes)
        const emojiMatch = text.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/u);
        if (emojiMatch) {
            const emoji = emojiMatch[1];
            const restOfText = text.slice(emoji.length).trim();
            heading.innerHTML = `<span class="emoji-icon">${emoji}</span><span class="heading-text">${restOfText}</span>`;
        }
    });
    
    // Detectar tamaño de pantalla una sola vez
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Valores para header
    const headerDelay = isMobile ? 0.1 : 0.3;
    const headerY = isMobile ? 20 : 30;
    const headerTitleY = isMobile ? 30 : 50;
    const headerDuration = isMobile ? 0.6 : 0.8;
    
    // Animación del header del proyecto
    const proyectoHeader = document.querySelector('.proyecto-header-detalle');
    if (proyectoHeader) {
        const badge = proyectoHeader.querySelector('.proyecto-badge-detalle');
        const title = proyectoHeader.querySelector('.proyecto-titulo-detalle');
        const subtitle = proyectoHeader.querySelector('.proyecto-subtitulo-detalle');
        
        const headerTL = gsap.timeline({ delay: headerDelay });
        
        if (badge) {
            headerTL.from(badge, {
                y: headerY,
                opacity: 0,
                duration: headerDuration,
                ease: 'power3.out'
            });
        }
        
        if (title) {
            headerTL.from(title, {
                y: headerTitleY,
                opacity: 0,
                duration: headerDuration * 1.2,
                ease: 'power3.out'
            }, '-=0.4');
        }
        
        if (subtitle) {
            headerTL.from(subtitle, {
                y: headerY,
                opacity: 0,
                duration: headerDuration,
                ease: 'power3.out'
            }, '-=0.6');
        }
    }
    
    // Valores para video
    const videoStartTrigger = isMobile ? 'top 90%' : 'top 80%';
    const videoY = isMobile ? 40 : 80;
    const videoDuration = isMobile ? 0.6 : 1.2;
    
    // Animación de la sección de video
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        gsap.from(videoSection, {
            y: videoY,
            opacity: 0,
            duration: videoDuration,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: videoSection,
                start: videoStartTrigger,
                toggleActions: 'play none none none',
                once: true
            }
        });
        
        const videoWrapper = videoSection.querySelector('.video-wrapper');
        if (videoWrapper) {
            gsap.from(videoWrapper, {
                scale: isMobile ? 0.98 : 0.95,
                opacity: 0,
                duration: videoDuration * 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: videoWrapper,
                    start: videoStartTrigger,
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        }
    }
    
    // Valores de animación adaptativos según pantalla
    const getAnimationValues = () => {
        if (isMobile) {
            return {
                sectionY: 50,
                headingY: 30,
                textY: 20,
                imageX: 30,
                parallaxY: -20,
                duration: 0.6,
                startTrigger: 'top 90%'
            };
        } else if (isTablet) {
            return {
                sectionY: 70,
                headingY: 40,
                textY: 30,
                imageX: 60,
                parallaxY: -35,
                duration: 0.8,
                startTrigger: 'top 85%'
            };
        } else {
            return {
                sectionY: 100,
                headingY: 50,
                textY: 40,
                imageX: 100,
                parallaxY: -50,
                duration: 1,
                startTrigger: 'top 80%'
            };
        }
    };
    
    const animValues = getAnimationValues();
    
    // Animaciones para todas las secciones de contenido
    const contentSections = document.querySelectorAll('.descripcion-section, .feature-section');
    
    contentSections.forEach((section, index) => {
        const contentBlock = section.querySelector('.content-block');
        const contentText = section.querySelector('.content-text');
        const contentImage = section.querySelector('.content-image');
        const sectionHeading = section.querySelector('.section-heading');
        
        // Asegurar que la sección sea visible inicialmente
        gsap.set(section, { opacity: 1, y: 0 });
        
        // Animación de entrada de la sección
        gsap.from(section, {
            y: animValues.sectionY,
            opacity: 0,
            duration: animValues.duration,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: animValues.startTrigger,
                toggleActions: 'play none none reverse',
                // Mejorar en móviles
                markers: false,
                once: false // Permitir re-animación si es necesario
            },
            delay: index * 0.05
        });
        
        // Animación del heading
        if (sectionHeading) {
            gsap.from(sectionHeading, {
                y: animValues.headingY,
                opacity: 0,
                duration: animValues.duration * 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionHeading,
                    start: animValues.startTrigger,
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        }
        
        // Animación del texto (staggered para párrafos)
        if (contentText) {
            const paragraphs = contentText.querySelectorAll('p');
            paragraphs.forEach((p, pIndex) => {
                gsap.from(p, {
                    y: animValues.textY,
                    opacity: 0,
                    duration: animValues.duration * 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: p,
                        start: animValues.startTrigger,
                        toggleActions: 'play none none none',
                        once: true
                    },
                    delay: pIndex * (isMobile ? 0.1 : 0.15)
                });
            });
        }
        
        // Animación de la imagen con parallax (solo en desktop)
        if (contentImage) {
            const img = contentImage.querySelector('img');
            
            // Animación de entrada
            gsap.from(contentImage, {
                x: section.classList.contains('feature-right') ? animValues.imageX : -animValues.imageX,
                opacity: 0,
                duration: animValues.duration * 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contentImage,
                    start: animValues.startTrigger,
                    toggleActions: 'play none none none',
                    once: true
                }
            });
            
            // Parallax effect en scroll (solo desktop y tablet)
            if (img && !isMobile) {
                gsap.to(img, {
                    y: animValues.parallaxY,
                    scrollTrigger: {
                        trigger: contentImage,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        // Desactivar parallax en móviles para mejor performance
                        invalidateOnRefresh: true
                    }
                });
            }
        }
    });
    
    // Valores para botones y conclusion
    const backY = isMobile ? 30 : 50;
    const conclusionY = isMobile ? 50 : 80;
    const conclusionTextY = isMobile ? 20 : 40;
    const backDuration = isMobile ? 0.6 : 0.8;
    
    // Animación del botón de volver
    const backSection = document.querySelector('.back-section');
    if (backSection) {
        const btnBack = backSection.querySelector('.btn-back');
        
        gsap.from(backSection, {
            y: backY,
            opacity: 0,
            duration: backDuration,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: backSection,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true
            }
        });
        
        if (btnBack) {
            btnBack.addEventListener('mouseenter', () => {
                gsap.to(btnBack, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btnBack.addEventListener('mouseleave', () => {
                gsap.to(btnBack, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    }
    
    // Animación de funcionalidades destacadas
    const funcionalidadesSection = document.querySelector('.funcionalidades-detalle');
    if (funcionalidadesSection) {
        const heading = funcionalidadesSection.querySelector('.section-heading-center');
        const cards = funcionalidadesSection.querySelectorAll('.funcionalidad-card-detalle');
        
        // Animación del heading
        if (heading) {
            gsap.from(heading, {
                y: conclusionY,
                opacity: 0,
                duration: backDuration * 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: isMobile ? 'top 90%' : 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        }
        
        // Animación de las cards con stagger
        cards.forEach((card, index) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                scale: 0.9,
                duration: backDuration,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: isMobile ? 'top 90%' : 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                delay: index * 0.1
            });
            
            // Hover effect con GSAP
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                const icon = card.querySelector('.funcionalidad-icon-detalle');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.15,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                const icon = card.querySelector('.funcionalidad-icon-detalle');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
    
    // Animación de conclusion section si existe
    const conclusionSection = document.querySelector('.conclusion-detalle');
    if (conclusionSection) {
        gsap.from(conclusionSection, {
            y: conclusionY,
            opacity: 0,
            duration: backDuration * 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: conclusionSection,
                start: isMobile ? 'top 90%' : 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });
        
        const conclusionContent = conclusionSection.querySelector('.conclusion-content');
        if (conclusionContent) {
            const paragraphs = conclusionContent.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                gsap.from(p, {
                    y: conclusionTextY,
                    opacity: 0,
                    duration: backDuration,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: p,
                        start: isMobile ? 'top 90%' : 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    delay: index * (isMobile ? 0.15 : 0.2)
                });
            });
        }
    }
}

// Agregar animaciones de detalle a la función de inicialización
function initAnimations() {
    initCustomCursor();
    initHeaderScroll();
    initHeroAnimations();
    initProyectosAnimations();
    initSectionAnimations();
    initSmoothScroll();
    initMenuToggle();
    initDetailPageAnimations(); // Nueva función para páginas de detalle
}
