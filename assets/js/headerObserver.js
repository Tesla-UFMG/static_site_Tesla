document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIÁVEL DE CORREÇÃO DE NAVEGAÇÃO ---
    // Trava para impedir o Snap de funcionar enquanto a tela rola até uma seção
    let isNavigating = false;
    let navTimeout;

    // Adiciona o evento de clique a todos os links internos (que começam com #)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            isNavigating = true; // Ativa a trava
            clearTimeout(navTimeout);
            
            // Libera o Snap após 1.5 segundos (tempo suficiente do scroll suave do CSS)
            navTimeout = setTimeout(() => { 
                isNavigating = false; 
            }, 1500);
        });
    });

    // =================================================================
    // 1. LÓGICA DE DESTAQUE NO MENU (SCROLL SPY)
    // =================================================================
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


    // =================================================================
    // 2. CLIQUE NO BOTÃO "INÍCIO" E LOGO
    // =================================================================
    const homeLinks = document.querySelectorAll('a[href="#home"]');

    if (homeLinks.length > 0) {
        homeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                window.scrollTo({
                    top: window.innerHeight, 
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
    }


    // =================================================================
    // 3. ANIMAÇÃO DE ENTRADA DO TEXTO (OBSERVER)
    // =================================================================
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


    // =================================================================
    // 4. SCROLL SNAP INTELIGENTE (HERO SECTION - ALTA SENSIBILIDADE)
    // =================================================================
    let lastScrollTop = 0;
    let isAnimating = false; 
    let animationTimeout; 

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const heroHeight = window.innerHeight;
        
        const safeCurrentScroll = Math.max(0, currentScroll);
        const direction = safeCurrentScroll > lastScrollTop ? 'down' : 'up';
        
        if (safeCurrentScroll >= 0) {
            lastScrollTop = safeCurrentScroll;
        }

        // ===========================================================
        // A SOLUÇÃO: Se estiver animando OU o usuário tiver clicado 
        // em um link do menu (isNavigating), o Snap é ignorado.
        // ===========================================================
        if (isAnimating || isNavigating) return;

        if (currentScroll < heroHeight) {

            // --- CENÁRIO 1: Descendo (Snap Down) ---
            if (direction === 'down' && currentScroll > 5 && currentScroll < (heroHeight - 5)) {
                
                isAnimating = true;
                
                window.scrollTo({
                    top: heroHeight, 
                    behavior: 'smooth'
                });

                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => { isAnimating = false; }, 800);
            } 
            
            // --- CENÁRIO 2: Subindo (Snap Up) ---
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