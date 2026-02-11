document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE DESTAQUE NO MENU (SCROLL SPY) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.items-navegacao');
    const headerHeight = document.querySelector('.header').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // O "- headerHeight - 100" serve para trocar a cor um pouco antes da seção bater no topo
            if (scrollY >= (sectionTop - headerHeight - 150)) {
                current = section.getAttribute('id');
            }
        });

        // Correção específica para a Home:
        // Se estivermos na primeira tela (antes de descer tudo), mantém Home ativo
        if (scrollY < window.innerHeight) {
            current = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. CLIQUE NO BOTÃO "INÍCIO" (SCROLL PARA O TEXTO) ---
    // Seleciona TODOS os links que apontam para #home (Logo + Texto do Menu)
const homeLinks = document.querySelectorAll('a[href="#home"]');

// Verifica se encontrou algum link para evitar erros
if (homeLinks.length > 0) {
    
    // O SEGREDO: Usar forEach para percorrer a lista item por item
    homeLinks.forEach(link => {
        
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o pulo seco padrão
            
            // Ir para onde o texto começa (100vh)
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });

            // Se estiver no mobile, garante que o menu feche
            if (typeof toggleMenu === 'function') {
                const nav = document.getElementById('nav');
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
}

    // --- 3. ANIMAÇÃO DE ENTRADA DO TEXTO (MANTIDA) ---
    const textContainer = document.querySelector('.div-texto-home');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textContainer.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Sensibilidade alta para detectar logo

    if(textContainer) observer.observe(textContainer);
});