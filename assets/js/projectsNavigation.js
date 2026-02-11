document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.timeline-item');
    const navLinks = document.querySelectorAll('.timeline-nav a');
    const navList = document.querySelector('.timeline-nav ul');
    const navContainer = document.querySelector('.timeline-nav');

    // Função para centralizar o item ativo no scroll horizontal (Mobile)
    const centerActiveItem = (activeLink) => {
        // Verifica se estamos no mobile checando se o container tem scroll
        if (navList.scrollWidth > navList.clientWidth) {
            // Cálculo para centralizar o item:
            // Posição do item - Metade da tela + Metade do item
            const scrollLeft = activeLink.offsetLeft - (navList.clientWidth / 2) + (activeLink.offsetWidth / 2);
            
            navList.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };

    // Configuração do Observer (Observador de Rolagem)
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Ativa quando o elemento está no meio da tela
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe active de todos
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Encontra o link correspondente ao ID da seção visível
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.timeline-nav a[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    // CHAMA A FUNÇÃO DE SCROLL AUTOMÁTICO
                    centerActiveItem(activeLink);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Lógica para mostrar/esconder a nav inteira baseada na seção Legado
    const timelineSection = document.querySelector('.timeline-section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navContainer.classList.add('visible');
            } else {
                navContainer.classList.remove('visible');
            }
        });
    }, { rootMargin: "-100px 0px -100px 0px" });

    if(timelineSection) {
        navObserver.observe(timelineSection);
    }
});