/* =========================================
   SISTEMA DE CARROSSEL INFINITO - SEÇÃO SOBRE
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.carrossel-imagens');
    
    if (track) {
        // Seleção de itens originais e contagem para cálculo de loop
        let items = track.querySelectorAll('.carrossel-item');
        const originalCount = items.length;

        /**
         * Inicialização do loop infinito:
         * Executado apenas se houver mais de um item no container.
         */
        if (originalCount > 1) {
            
            /**
             * Clonagem do primeiro elemento:
             * Adicionado ao final do track para permitir uma transição 
             * visualmente contínua durante o reset do índice.
             */
            const firstClone = items[0].cloneNode(true);
            track.appendChild(firstClone);

            // Definições de cronometragem (milissegundos)
            const timePerSlide = 3000; 
            const transitionTime = 1000; 

            let currentIndex = 0;
            
            /**
             * Gerencia a progressão dos slides e o reset instantâneo.
             */
            function nextSlide() {
                currentIndex++;
                
                // Aplicação de transição com curva de aceleração customizada
                track.style.transition = `transform ${transitionTime}ms cubic-bezier(0.45, 0, 0.55, 1)`;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;

                /**
                 * Lógica de Reset (Loop):
                 * Quando o índice atinge o elemento clonado, o sistema aguarda a 
                 * conclusão da transição para retornar ao índice inicial sem animação.
                 */
                if (currentIndex === originalCount) {
                    setTimeout(() => {
                        // Desativação temporária da transição para reset de posição
                        track.style.transition = 'none';
                        currentIndex = 0;
                        track.style.transform = `translateX(0)`;
                    }, transitionTime); 
                }
            }

            // Ativação do ciclo automático de transição
            setInterval(nextSlide, timePerSlide + transitionTime);
        }
    }
});