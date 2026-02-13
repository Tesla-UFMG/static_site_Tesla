document.addEventListener('DOMContentLoaded', () => {
    // ... seus outros códigos ...

    // =================================================================
    // 5. CARROSSEL INFINITO AUTOMÁTICO (QUALQUER QUANTIDADE DE IMAGENS)
    // =================================================================
    const track = document.querySelector('.carrossel-imagens');
    
    if (track) {
        // 1. Pega todas as imagens originais
        let items = track.querySelectorAll('.carrossel-item');
        const originalCount = items.length;

        // Se tiver apenas 1 ou 0 imagens, não faz nada
        if (originalCount > 1) {
            
            // 2. Clona a primeira imagem e adiciona no final
            // Isso cria a ilusão de loop infinito suave
            const firstClone = items[0].cloneNode(true);
            track.appendChild(firstClone);

            // 3. Definições de Tempo
            const timePerSlide = 3000; // 3 segundos por imagem
            const transitionTime = 1000; // 1 segundo de movimento
            const totalTime = (timePerSlide + transitionTime) * originalCount;

            let currentIndex = 0;
            
            function nextSlide() {
                currentIndex++;
                
                // Aplica a transição suave
                track.style.transition = `transform ${transitionTime}ms cubic-bezier(0.45, 0, 0.55, 1)`;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;

                // RESET MÁGICO (Loop Infinito)
                // Quando a animação terminar e chegar no Clone (último item)...
                if (currentIndex === originalCount) {
                    setTimeout(() => {
                        // Remove a transição para pular instantaneamente
                        track.style.transition = 'none';
                        // Volta para o índice 0 (a imagem original igual ao clone)
                        currentIndex = 0;
                        track.style.transform = `translateX(0)`;
                    }, transitionTime); // Espera o slide terminar antes de resetar
                }
            }

            // 4. Inicia o Loop
            // setInterval roda a função nextSlide a cada X milissegundos
            setInterval(nextSlide, timePerSlide + transitionTime);
        }
    }
});