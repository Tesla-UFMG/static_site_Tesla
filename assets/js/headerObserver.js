document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE DESTAQUE NO MENU (REFATORADA) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.items-navegacao');
    const headerElement = document.querySelector('.header');

    // Criamos uma função nomeada para poder chamar ela a qualquer momento
    function highlightMenu() {
        // Recalcula altura do header (importante no mobile se a barra de endereço sumir/aparecer)
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
        // Garante que o último item acenda se chegar no final da página
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            if(sections.length > 0) {
                 current = sections[sections.length - 1].getAttribute('id');
            }
        }

        // D. Aplica a classe active
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            // Comparação exata para evitar bugs
            if (current && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // --- A CORREÇÃO ESTÁ AQUI ---
    
    // 1. Executa IMEDIATAMENTE ao carregar (Resolve o problema do refresh)
    highlightMenu();

    // 2. Executa sempre que houver SCROLL
    window.addEventListener('scroll', highlightMenu);


    // --- 2. CLIQUE NO BOTÃO "INÍCIO" (MANTIDO) ---
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

    // --- 3. ANIMAÇÃO DE ENTRADA DO TEXTO (MANTIDO) ---
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
});