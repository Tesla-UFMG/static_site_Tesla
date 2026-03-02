/* =========================================
   GERENCIAMENTO DE INTERAÇÃO E NAVEGAÇÃO - HEADER E HOME
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURAÇÕES DE PERFORMANCE ---
    const ATIVAR_SCROLL_SNAP = false; 

    // --- ESTADO DE CONTROLE DE NAVEGAÇÃO ---
    let isNavigating = false;
    let navTimeout;

    /**
     * Listener para links internos:
     * Gerencia a trava de navegação para evitar conflitos.
     */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            isNavigating = true; 
            clearTimeout(navTimeout);
            
            navTimeout = setTimeout(() => { 
                isNavigating = false; 
            }, 1500);
        });
    });

    // --- 1. LÓGICA DE DESTAQUE NO MENU (SCROLL SPY) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.items-navegacao');
    const headerElement = document.querySelector('.header');

    function highlightMenu() {
        const headerOffset = headerElement ? headerElement.offsetHeight : 100;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - headerOffset - 150)) {
                current = section.getAttribute('id');
            }
        });

        if (window.scrollY < 100) { 
            current = 'home';
        }
        
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            if(sections.length > 0) {
                 current = sections[sections.length - 1].getAttribute('id');
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (current && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    highlightMenu();
    window.addEventListener('scroll', highlightMenu);


    // --- 2. CONTROLE DE NAVEGAÇÃO DA LOGO E BOTÃO INÍCIO ---
    const homeLinks = document.querySelectorAll('a[href="#home"]');

    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetPosition = window.innerHeight;

            window.scrollTo({
                top: targetPosition, 
                behavior: 'smooth'
            });

            if (typeof toggleMenu === 'function') {
                const nav = document.getElementById('nav');
                if (nav && nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });


    // --- 3. OBSERVAÇÃO DE INTERSECÇÃO (ANIMAÇÃO DE TEXTO) ---
    const textContainer = document.querySelector('.div-texto-home');
    if(textContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    textContainer.classList.add('visible');
                }
            });
        }, { threshold: 0.1 }); 

        observer.observe(textContainer);
    }


    // --- 4. LÓGICA DE SCROLL SNAP (SEÇÃO HERO) ---
    let lastScrollTop = 0;
    let isAnimating = false; 
    let animationTimeout; 

    window.addEventListener('scroll', () => {
        if (!ATIVAR_SCROLL_SNAP) return;

        const currentScroll = window.scrollY;
        const heroHeight = window.innerHeight;
        
        const safeCurrentScroll = Math.max(0, currentScroll);
        const direction = safeCurrentScroll > lastScrollTop ? 'down' : 'up';
        
        if (safeCurrentScroll >= 0) {
            lastScrollTop = safeCurrentScroll;
        }

        if (isAnimating || isNavigating) return;

        if (currentScroll < heroHeight) {
            if (direction === 'down' && currentScroll > 5 && currentScroll < (heroHeight - 5)) {
                isAnimating = true;
                window.scrollTo({
                    top: heroHeight, 
                    behavior: 'smooth'
                });
                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => { isAnimating = false; }, 800);
            } 
            else if (direction === 'up' && currentScroll < (heroHeight - 5) && currentScroll > 5) {
                isAnimating = true;
                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth'
                });
                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => { isAnimating = false; }, 800);
            }
        }
    }, { passive: true });
});