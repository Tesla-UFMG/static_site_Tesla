document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // 1. LÓGICA DE DESTAQUE NO MENU (SCROLL SPY)
    // =================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.items-navegacao');
    const headerElement = document.querySelector('.header');

    function highlightMenu() {
        // Recalcula altura do header (importante no mobile)
        const headerOffset = headerElement ? headerElement.offsetHeight : 100;
        let current = '';
        
        // A. Descobre qual seção está na tela
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Verifica se o scroll passou do topo da seção (com folga de 150px)
            if (window.scrollY >= (sectionTop - headerOffset - 150)) {
                current = section.getAttribute('id');
            }
        });

        // B. Correção para o TOPO absoluto (Home)
        if (window.scrollY < 100) { 
            current = 'home';
        }
        
        // C. Correção para o FIM da página (Contato/Footer)
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            if(sections.length > 0) {
                 current = sections[sections.length - 1].getAttribute('id');
            }
        }

        // D. Aplica a classe active
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
    let isAnimating = false; // Trava para não encavalar animações

    // Variável para armazenar o timeout e poder limpar se necessário
    let animationTimeout; 

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const heroHeight = window.innerHeight;
        
        // A. Detecta direção
        // Proteção contra valores negativos (iOS bounce effect)
        const safeCurrentScroll = Math.max(0, currentScroll);
        const direction = safeCurrentScroll > lastScrollTop ? 'down' : 'up';
        
        // Atualiza lastScrollTop apenas se não estivermos na zona de bounce negativo
        if (safeCurrentScroll >= 0) {
            lastScrollTop = safeCurrentScroll;
        }

        // B. Se a animação estiver rodando, IGNORA input
        if (isAnimating) return;

        // C. Lógica do SNAP (Apenas na área da Home: 0 até 100vh)
        if (currentScroll < heroHeight) {

            // --- CENÁRIO 1: Descendo (Snap Down) ---
            // Alterado: Reduzido o limiar de 10px para 5px (mais sensível)
            if (direction === 'down' && currentScroll > 5 && currentScroll < (heroHeight - 5)) {
                
                isAnimating = true;
                
                window.scrollTo({
                    top: heroHeight, 
                    behavior: 'smooth'
                });

                // Limpa timeout anterior se existir
                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => { isAnimating = false; }, 800);
            } 
            
            // --- CENÁRIO 2: Subindo (Snap Up) ---
            // Alterado: Reduzido a margem de retorno. 
            // Antes precisava subir 20px, agora basta subir 5px (heroHeight - 5)
            else if (direction === 'up' && currentScroll < (heroHeight - 5) && currentScroll > 5) {
                
                isAnimating = true;
                
                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth'
                });

                // Limpa timeout anterior se existir
                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => { isAnimating = false; }, 800);
            }
        }
    }, { passive: true });
});