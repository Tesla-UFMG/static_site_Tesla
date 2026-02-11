document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.timeline-item');
    const navLinks = document.querySelectorAll('.timeline-nav a');
    const navList = document.querySelector('.timeline-nav ul');
    const navContainer = document.querySelector('.timeline-nav');

    // 1. Função para centralizar o botão do ano na barra de navegação (Horizontal)
    const centerActiveItem = (activeLink) => {
        if (navList.scrollWidth > navList.clientWidth) {
            const scrollLeft = activeLink.offsetLeft - (navList.clientWidth / 2) + (activeLink.offsetWidth / 2);
            navList.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    };

    // 2. Lógica de CLIQUE nos links (Onde arrumamos o scroll da página)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o pulo padrão seco
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // MATEMÁTICA DA CENTRALIZAÇÃO VERTICAL
                // Pega a altura da janela (viewport)
                const windowHeight = window.innerHeight;
                // Pega a altura do item (carro + texto)
                const elementHeight = targetSection.offsetHeight;
                // Pega a posição do topo do elemento em relação ao topo do documento
                const elementTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

                // Cálculo: Topo do Elemento - (Metade da Tela) + (Metade do Elemento)
                // Isso coloca o meio do elemento no meio da tela
                let offsetPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);

                // Ajuste fino opcional (se tiver header fixo muito grande, pode subtrair mais um pouco)
                // offsetPosition = offsetPosition - 20; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Spy (Observer) - Mantém a barra sincronizada com o scroll
    const observerOptions = {
        root: null,
        rootMargin: '-45% 0px -45% 0px', // Área ativa bem no meio da tela
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.timeline-nav a[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                    centerActiveItem(activeLink); // Centraliza o botão na barra
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 4. Mostrar/Esconder a barra inteira
    const timelineSection = document.querySelector('.timeline-section');
    if(timelineSection) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navContainer.classList.add('visible');
                } else {
                    navContainer.classList.remove('visible');
                }
            });
        }, { rootMargin: "-10% 0px -10% 0px" });
        
        navObserver.observe(timelineSection);
    }
});