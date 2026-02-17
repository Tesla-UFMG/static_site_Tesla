/* =========================================
   SISTEMA DE NAVEGAÇÃO E SCROLL - TIMELINE
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.timeline-item');
    const navLinks = document.querySelectorAll('.timeline-nav a');
    const navList = document.querySelector('.timeline-nav ul');
    const navContainer = document.querySelector('.timeline-nav');

    /**
     * Centraliza horizontalmente o item ativo dentro da barra de navegação.
     * @param {HTMLElement} activeLink - O elemento de link que recebeu a classe ativa.
     */
    const centerActiveItem = (activeLink) => {
        if (navList.scrollWidth > navList.clientWidth) {
            const scrollLeft = activeLink.offsetLeft - (navList.clientWidth / 2) + (activeLink.offsetWidth / 2);
            navList.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    };

    /**
     * Listener para eventos de clique nos links da timeline.
     * Calcula o posicionamento vertical para centralizar a seção alvo na viewport.
     */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const windowHeight = window.innerHeight;
                const elementHeight = targetSection.offsetHeight;
                const elementTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

                /**
                 * Cálculo de centralização vertical:
                 * Posiciona o centro geométrico do elemento no centro da tela.
                 */
                let offsetPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Configuração do IntersectionObserver para detecção da seção ativa (Scroll Spy).
     * Define uma margem de detecção centralizada para disparar a atualização do menu.
     */
    const observerOptions = {
        root: null,
        rootMargin: '-45% 0px -45% 0px', 
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
                    centerActiveItem(activeLink); 
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /**
     * Gerenciamento de visibilidade do container de navegação.
     * Ativa a exibição apenas quando o usuário está dentro dos limites da seção de timeline.
     */
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