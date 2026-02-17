/* =========================================
   SISTEMA DE NAVEGAÇÃO - DASHBOARD DE COMPETIÇÃO
   ========================================= */

/**
 * Controla a alternância de abas do dashboard.
 * @param {string} tabId - ID do elemento de conteúdo a ser exibido.
 * @param {HTMLElement} btnElement - O elemento do botão que disparou o evento.
 */
function activateTab(tabId, btnElement) {
    
    // Reset de estado dos controladores (botões)
    document.querySelectorAll('.prova-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ativação do controlador selecionado
    btnElement.classList.add('active');

    // Reset de visibilidade dos containers de conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; 
    });

    // Ativação e renderização do conteúdo alvo
    const target = document.getElementById(tabId);
    if (target) {
        target.style.display = 'flex';
        
        /**
         * Execução assíncrona para garantir a aplicação das propriedades 
         * de transição CSS após a alteração do display.
         */
        setTimeout(() => {
            target.classList.add('active');
        }, 10);
    }
}