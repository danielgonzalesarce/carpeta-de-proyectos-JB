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
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    // Agregar clase scrolled cuando se hace scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Verificar estado inicial
    handleScroll();
    
    // Escuchar eventos de scroll
    window.addEventListener('scroll', handleScroll);
    
    // También usar ScrollTrigger como respaldo
    ScrollTrigger.create({
        start: 'top -50',
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
    initHeaderScroll();
    initHeroAnimations();
    initProyectosAnimations();
    initSectionAnimations();
    initSmoothScroll();
    initMenuToggle();
}

// ============================================
// Sistema de Proyectos — Arquitectura limpia (Repository → Service → View → Controller)
// - Desacoplado, escalable y fácil de testear
// ============================================
const PortEventBus = (function() {
    const events = {};
    return {
        on(name, fn) { (events[name] = events[name] || []).push(fn); },
        off(name, fn) { if (!events[name]) return; events[name] = events[name].filter(f => f !== fn); },
        emit(name, data) { (events[name] || []).forEach(fn => fn(data)); }
    };
})();

class ProjectRepository {
    constructor(initial = []) {
        this.projects = Array.isArray(initial) ? [...initial] : [];
        // cargar favoritos desde localStorage
        let stored = [];
        try { stored = JSON.parse(localStorage.getItem('portfolio:favorites') || '[]'); if (!Array.isArray(stored)) stored = []; } catch (err) { stored = []; }
        this.favorites = new Set(stored);
    }
    getAll() { return [...this.projects]; }
    getByCategory(category) {
        if (!category || category === 'all') return this.getAll();
        return this.projects.filter(p => p.category === category);
    }
    getCategories() { return Array.from(new Set(this.projects.map(p => p.category))); }
    add(project) { this.projects.push(project); }

    // Favoritos (persistidos)
    isFavorite(id) { return this.favorites.has(id); }
    toggleFavorite(id) {
        if (!id) return false;
        if (this.favorites.has(id)) this.favorites.delete(id); else this.favorites.add(id);
        this._saveFavorites();
        return this.isFavorite(id);
    }
    getFavorites() { return this.getAll().filter(p => this.isFavorite(p.id)); }
    getFavoritesByCategory(category) { return category && category !== 'all' ? this.getFavorites().filter(p => p.category === category) : this.getFavorites(); }
    _saveFavorites() { try { localStorage.setItem('portfolio:favorites', JSON.stringify(Array.from(this.favorites))); } catch (err) { /* ignore */ } }
}

class ProjectService {
    constructor(repo) { this.repo = repo; }
    list(category = 'all') { return this.repo.getByCategory(category); }
    categories() { return this.repo.getCategories(); }
    favorites(category = 'all') { return this.repo.getFavoritesByCategory(category); }
}

class ProjectView {
    constructor(containerSelector, templateId, noResultsSelector) {
        this.container = document.querySelector(containerSelector);
        this.template = document.getElementById(templateId);
        this.noResults = document.querySelector(noResultsSelector);
    }
    renderList(projects) {
        if (!this.container) return;
        this.container.innerHTML = '';
        if (!projects || projects.length === 0) {
            if (this.noResults) this.noResults.hidden = false;
            PortEventBus.emit('projectsRendered');
            return;
        }
        if (this.noResults) this.noResults.hidden = true;
        const frag = document.createDocumentFragment();
        projects.forEach(p => {
            const node = this.template.content.firstElementChild.cloneNode(true);
            node.setAttribute('data-project', p.id);
            node.setAttribute('data-category', p.category);

            const img = node.querySelector('.card-img');
            if (img) { img.src = p.image || ''; img.alt = p.title || ''; }

            const badge = node.querySelector('.card-badge'); if (badge) badge.textContent = p.badge || '';
            const number = node.querySelector('.card-number'); if (number) number.textContent = p.number || '';
            const title = node.querySelector('.card-title'); if (title) title.textContent = p.title || '';
            const desc = node.querySelector('.card-description'); if (desc) desc.textContent = p.description || '';
            const link = node.querySelector('.card-link'); if (link) link.href = p.url || '#';

            const techStack = node.querySelector('.card-tech-stack');
            if (techStack) techStack.innerHTML = (p.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('');

            // estado de favorito
            const favBtn = node.querySelector('.favorite-btn');
            if (favBtn) {
                favBtn.dataset.projectId = p.id;
                const fav = projectRepo.isFavorite(p.id);
                favBtn.setAttribute('aria-pressed', fav ? 'true' : 'false');
                favBtn.classList.toggle('favorited', fav);
            }

            frag.appendChild(node);
        });
        this.container.appendChild(frag);
        PortEventBus.emit('projectsRendered');
    }
    setActiveFilterBtn(category) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }
}

// Datos iniciales del portafolio (source of truth)
const initialProjects = [
    {
        id: 'plataforma-tesis',
        number: '01',
        title: 'PlataformaTesis',
        category: 'saas',
        badge: 'SaaS / Marketplace',
        tech: ['React 19','NestJS','MongoDB'],
        description: 'Plataforma SaaS/Marketplace para conectar estudiantes con mentores expertos — dashboards, mensajería y marketplace.',
        image: 'assets/img/plataformatesis-pagina-inicio.png',
        url: 'proyecto-plataforma-tesis.html'
    },
    {
        id: 'bookhaven',
        number: '02',
        title: 'BookHaven',
        category: 'ecommerce',
        badge: 'E-Commerce Full-Stack',
        tech: ['Django','React','JWT'],
        description: 'Plataforma de comercio electrónico especializada en libros con carrito, checkout y panel administrativo.',
        image: 'assets/img/bookhaven-pagina-inicio.png',
        url: 'proyecto-sistema-empresarial.html'
    }
];

// Inicializar capa (repository → service → view → controller)
const projectRepo = new ProjectRepository(initialProjects);
const projectService = new ProjectService(projectRepo);
const projectView = new ProjectView('.proyectos-container', 'projectCardTemplate', '.no-results');

const ProjectController = {
    currentCategory: 'all',
    init() {
        // Register event to re-run animations after render (kills previous ScrollTriggers for safety)
        PortEventBus.on('projectsRendered', () => {
            if (window.ScrollTrigger && typeof ScrollTrigger.getAll === 'function') {
                ScrollTrigger.getAll().forEach(t => t.kill());
            }
            initProyectosAnimations();
            initSmoothScroll();
        });

        // Attach filter buttons (progressive enhancement)
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                try {
                    if (e && typeof e.preventDefault === 'function') e.preventDefault();
                    const cat = btn.dataset.category;
                    ProjectController.currentCategory = cat;
                    console.debug('[ProjectController] filter clicked →', cat);

                    const matched = projectService.list(cat);
                    console.debug('[ProjectController] matched projects:', matched.map(p => p.id));

                    projectView.setActiveFilterBtn(cat);
                    projectView.renderList(matched);

                    try { localStorage.setItem('portfolio:selectedCategory', cat); } catch (err) { /* ignore */ }
                } catch (err) {
                    console.error('[ProjectController] error handling filter click', err);
                    const noResults = document.querySelector('.no-results');
                    if (noResults) noResults.hidden = false;
                }
            });
        });

        // Categorias section buttons
        document.querySelectorAll('.categoria-card').forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.dataset.category;
                ProjectController.currentCategory = cat;
                if (cat === 'favorites') {
                    projectView.setActiveFilterBtn('all');
                    projectView.renderList(projectRepo.getFavorites());
                } else {
                    projectView.setActiveFilterBtn(cat);
                    projectView.renderList(projectService.list(cat));
                }
            });
        });

        // Favorite toggle (delegation)
        if (projectView.container) {
            projectView.container.addEventListener('click', (e) => {
                const favBtn = e.target.closest('.favorite-btn');
                if (!favBtn) return;
                const projectEl = favBtn.closest('.proyecto-card');
                const projectId = favBtn.dataset.projectId || projectEl?.dataset.project;
                if (!projectId) return;
                const newState = projectRepo.toggleFavorite(projectId);
                favBtn.classList.toggle('favorited', newState);
                favBtn.setAttribute('aria-pressed', String(newState));
                PortEventBus.emit('favoritesChanged');
                if (ProjectController.currentCategory === 'favorites') {
                    projectView.renderList(projectRepo.getFavorites());
                }
            });
        }

        // UI: actualizar contadores y estado de tarjetas
        function updateCategoriesUI() {
            document.querySelectorAll('.categoria-card').forEach(card => {
                const cat = card.dataset.category;
                const countEl = card.querySelector('.categoria-count');
                if (!countEl) return;
                if (cat === 'favorites') countEl.textContent = projectRepo.getFavorites().length;
                else countEl.textContent = projectService.list(cat).length;
                card.classList.toggle('active', ProjectController.currentCategory === cat);
            });
            const favCountEl = document.getElementById('favoritesCount');
            if (favCountEl) favCountEl.textContent = projectRepo.getFavorites().length;
        }

        PortEventBus.on('projectsRendered', updateCategoriesUI);
        PortEventBus.on('favoritesChanged', updateCategoriesUI);

        // Initial render (persist last selected category) — sanitize
        let saved = (function() { try { return localStorage.getItem('portfolio:selectedCategory'); } catch (err) { return null; } })() || 'all';
        if (!projectService.list(saved).length && saved !== 'favorites') saved = 'all';
        ProjectController.currentCategory = saved;
        projectView.setActiveFilterBtn(saved !== 'favorites' ? saved : 'all');
        projectView.renderList(saved === 'favorites' ? projectRepo.getFavorites() : projectService.list(saved));
        updateCategoriesUI();
    },

    addProject(project) {
        projectRepo.add(project);
        const active = ProjectController.currentCategory || 'all';
        if (active === 'favorites') projectView.renderList(projectRepo.getFavorites());
        else projectView.renderList(projectService.list(active));
    },

    toggleFavorite(id) { return projectRepo.toggleFavorite(id); }
};

// ============================================
// Inicializar cuando el DOM esté listo
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { ProjectController.init(); initPreloader(); });
} else {
    ProjectController.init();
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

// ============================================
// Dashboard Carousel - PlataformaTesis
// ============================================
function initDashboardCarousel() {
    const carousel = document.querySelector('.dashboard-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 4000; // 4 segundos
    
    function showSlide(index) {
        // Remover clase active de todos los slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i < index) {
                slide.classList.add('prev');
            }
        });
        
        // Agregar clase active al slide actual
        slides[index].classList.add('active');
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Event listeners para botones
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Pausar autoplay al hacer hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Iniciar autoplay
    startAutoPlay();
    
    // Inicializar primera slide
    showSlide(0);
}

// Agregar animaciones de detalle a la función de inicialización
function initAnimations() {
    initHeaderScroll();
    initHeroAnimations();
    initProyectosAnimations();
    initSectionAnimations();
    initSmoothScroll();
    initMenuToggle();
    initDetailPageAnimations(); // Nueva función para páginas de detalle
    initDashboardCarousel(); // Carrusel de dashboards
}
