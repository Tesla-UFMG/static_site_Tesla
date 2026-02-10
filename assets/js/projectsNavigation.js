document.addEventListener('DOMContentLoaded', () => {
    // Seleção de Elementos
    const navContainer = document.querySelector('.timeline-nav');
    const navLinks = document.querySelectorAll('.timeline-nav a');
    const timelineSection = document.querySelector('#legado');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // ---------------------------------------------------------
    // 1. VISIBILIDADE (APENAS PARA MOBILE)
    // ---------------------------------------------------------
    // No desktop, o CSS 'position: sticky' cuida de tudo.
    // No mobile, usamos observer para mostrar a dock inferior.
    
    if (window.innerWidth <= 992) {
        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navContainer.classList.add('visible');
                } else {
                    navContainer.classList.remove('visible');
                }
            });
        }, { rootMargin: '-10% 0px -10% 0px' }); // Margem de segurança

        if (timelineSection) {
            mobileObserver.observe(timelineSection);
        }
    }

    // ---------------------------------------------------------
    // 2. LÓGICA DE ITEM ATIVO (Bolinhas)
    // ---------------------------------------------------------
    const itemObserverOptions = {
        root: null,
        // Linha central exata para troca de ano
        rootMargin: '-50% 0px -50% 0px', 
        threshold: 0
    };

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove ativo de todos
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adiciona ativo no correspondente
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.timeline-nav a[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, itemObserverOptions);

    timelineItems.forEach(item => {
        itemObserver.observe(item);
    });

    // ---------------------------------------------------------
    // 3. CLIQUE (Scroll Centralizado)
    // ---------------------------------------------------------
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetItem = document.querySelector(targetId);

            if (targetItem) {
                targetItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center', // Centraliza o carro
                    inline: 'nearest'
                });
            }
        });
    });
});