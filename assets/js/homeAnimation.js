/* =========================================
   SISTEMA DE EFEITOS VISUAIS - SEÇÃO HOME
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".home-overlay");

    /**
     * Listener de rolagem para gerenciamento de efeitos de transição:
     * Calcula a opacidade da camada de overlay baseada no deslocamento
     * vertical (scrollY) dentro da primeira seção (100vh).
     */
    window.addEventListener("scroll", () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        /**
         * Cálculo de proporção:
         * 0px de scroll = 0% de opacidade
         * windowHeight de scroll = 100% de opacidade
         */
        let opacity = scrollY / windowHeight;

        // Normalização do valor entre os limites de 0 e 1
        if (opacity > 1) opacity = 1;
        if (opacity < 0) opacity = 0;

        // Aplicação dinâmica da propriedade de estilo
        if (overlay) {
            overlay.style.opacity = opacity;
        }
    }, { passive: true }); // Otimização de performance para scroll
});