/* =========================================
   SISTEMA DE ENVIO - FORMULÁRIO DE CONTATO
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato-tesla");
    const statusMsg = document.getElementById("mensagem-status");
  
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
      
            const formData = new FormData(form);
      
            try {
                /**
                 * Estado: Processamento inicial
                 * Atualização da interface para indicar o início da requisição.
                 */
                statusMsg.style.display = "block";
                statusMsg.textContent = "Enviando mensagem...";
                statusMsg.className = "enviando";

                // Execução da requisição assíncrona ao endpoint do Google Forms
                await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    mode: "no-cors" // Utilizado para contornar restrições de CORS em requisições opacas
                });
      
                /**
                 * Estado: Confirmação de êxito
                 * Notificação visual de sucesso e reset dos campos do formulário.
                 */
                statusMsg.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
                statusMsg.className = "sucesso";
                form.reset();
      
                // Temporizador para remoção automática da mensagem de feedback
                setTimeout(() => {
                    statusMsg.style.display = "none";
                }, 5000);
      
            } catch (error) {
                /**
                 * Estado: Tratamento de exceção
                 * Notificação de erro em caso de falha na conexão ou na requisição.
                 */
                statusMsg.style.display = "block";
                statusMsg.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
                statusMsg.className = "erro";
                console.error("Erro na execução da requisição:", error);
                
                setTimeout(() => {
                    statusMsg.style.display = "none";
                }, 5000);
            }
        });
    }
});