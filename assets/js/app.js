/* =========================================
   LÓGICA DE INTERAÇÃO - COMPONENTES (CARDS)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            /**
             * Gerenciamento de estado dos cards (Flip Effect):
             * 1. Armazena o estado atual do elemento clicado.
             * 2. Reseta o estado de todos os cards para a posição inicial.
             * 3. Alterna o estado do card clicado apenas se ele não estiver ativo.
             */
            const isCardActive = this.classList.contains('flipped');

            // Reset global da classe de rotação
            cards.forEach(c => c.classList.remove('flipped'));

            // Aplicação da rotação baseada no estado prévio
            if (!isCardActive) {
                this.classList.add('flipped');
            }
        });
    });
});