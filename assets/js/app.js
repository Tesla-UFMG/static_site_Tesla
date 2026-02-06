document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            // 1. Verifica se o card clicado JÁ ESTÁ virado
            const isCardActive = this.classList.contains('flipped');

            // 2. Remove a classe 'flipped' de TODOS os cards (reseta tudo)
            cards.forEach(c => c.classList.remove('flipped'));

            // 3. Se o card NÃO estava virado antes, adiciona a classe.
            // (Se ele já estava virado, o passo 2 já fechou ele, e aqui não fazemos nada, então ele continua fechado).
            if (!isCardActive) {
                this.classList.add('flipped');
            }
        });
    });
});