/* =========================================
   SISTEMA DE NAVEGAÇÃO MÓVEL (MENU OVERLAY)
   ========================================= */

const btnMobile = document.getElementById('btn-mobile');

/**
 * Gerencia a visibilidade do menu de navegação em dispositivos móveis.
 * @param {Event} event - Objeto de evento do disparador (click ou touchstart).
 */
function toggleMenu(event) {
    /**
     * Prevenção de 'ghost clicks' em dispositivos sensíveis ao toque:
     * Impede a execução duplicada do evento em disparadores híbridos.
     */
    if (event && event.type === 'touchstart') {
        event.preventDefault();
    }
    
    const nav = document.getElementById('nav');
    
    // Alternância da classe de controle de visibilidade
    nav.classList.toggle('active');
    
    /**
     * Gerenciamento de Acessibilidade (ARIA):
     * Atualiza o estado do menu para tecnologias assistivas.
     */
    const active = nav.classList.contains('active');
    btnMobile.setAttribute('aria-expanded', active);
    
    if (active) {
        btnMobile.setAttribute('aria-label', 'Fechar Menu');
    } else {
        btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Registro de listeners para interação multiplataforma
if (btnMobile) {
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
}