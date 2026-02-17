/* =========================================
   SISTEMA DE CRONÔMETRO REVERSO (TIMER)
   ========================================= */

// Definição da data alvo para a competição (Timestamp em milissegundos)
const targetDate = new Date("July 29, 2026 00:00:01").getTime();

let countdownInterval; 

/**
 * Calcula a diferença entre a data atual e a data alvo.
 * @returns {Object|null} Objeto com as unidades de tempo ou null se expirado.
 */
function getTimeRemaining() {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference < 0) return null;

    return {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
    };
}

/**
 * Executa animação numérica de contagem progressiva (Easing).
 * @param {string} id - ID do elemento DOM.
 * @param {number} endValue - Valor final da animação.
 * @param {number} duration - Duração da transição em milissegundos.
 */
function animateValue(id, endValue, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        obj.textContent = Math.floor(progress * endValue);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Inicia o ciclo de atualização em tempo real (1 segundo).
 */
function startRealTimeCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const t = getTimeRemaining();

        if (!t) {
            clearInterval(countdownInterval);
            const timerContainer = document.getElementById("timer");
            if (timerContainer) timerContainer.innerHTML = "A competição começou!";
            return;
        }

        document.getElementById("days").textContent = t.days;
        document.getElementById("hours").textContent = t.hours;
        document.getElementById("minutes").textContent = t.minutes;
        document.getElementById("seconds").textContent = t.seconds;

    }, 1000);
}

// --- GESTÃO DE DISPARO POR INTERSECÇÃO (PERFORMANCE) ---
const observerTarget = document.querySelector('.timer-competicao');

const observerOptions = {
    root: null,
    threshold: 0.3 // Dispara quando 30% da seção estiver visível
};

/**
 * IntersectionObserver:
 * Garante que a animação numérica ocorra apenas quando o usuário atingir a seção.
 */
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const t = getTimeRemaining();
            
            if (t) {
                // Execução de animação visual inicial
                animateValue("days", t.days, 1000);
                animateValue("hours", t.hours, 1000);
                animateValue("minutes", t.minutes, 1000);
                animateValue("seconds", t.seconds, 1000);

                // Início do intervalo de tempo real após a animação inicial
                setTimeout(() => {
                    startRealTimeCountdown();
                }, 1000);
            }

            // Desativação do observer após o disparo único
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (observerTarget) {
    observer.observe(observerTarget);
} else {
    // Fallback caso a seção não seja encontrada via observer
    startRealTimeCountdown();
}