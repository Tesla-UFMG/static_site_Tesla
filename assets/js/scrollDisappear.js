/* =========================================
   CONTROLE DE VISIBILIDADE - INDICADOR DE SCROLL
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // Seleção do componente indicador de rolagem (Mouse/Gesto)
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        /**
         * Monitora a posição de rolagem da janela para alternar a exibição 
         * do indicador visual na Hero Section.
         */
        window.addEventListener('scroll', () => {
            /**
             * Limiar de 50 pixels definido para detectar a intenção 
             * de navegação descendente do usuário.
             */
            if (window.scrollY > 50) {
                // Aplicação da classe de ocultação via opacidade/visibilidade
                scrollIndicator.classList.add('hidden');
            } else {
                // Restauração do estado visível ao retornar ao topo da página
                scrollIndicator.classList.remove('hidden');
            }
        }, { passive: true }); // Otimização para performance de renderização
    }
});