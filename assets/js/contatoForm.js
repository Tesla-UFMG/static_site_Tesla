document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato-tesla");
    const statusMsg = document.getElementById("mensagem-status");
  
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
      
            const formData = new FormData(form);
      
            try {
                // (Opcional) Mostra uma mensagem de "Enviando..."
                statusMsg.style.display = "block";
                statusMsg.textContent = "Enviando mensagem...";
                statusMsg.className = "enviando";

                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    mode: "no-cors"
                });
      
                // Sucesso
                statusMsg.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
                statusMsg.className = "sucesso";
                form.reset();
      
                // Esconde a mensagem após 5 segundos
                setTimeout(() => {
                    statusMsg.style.display = "none";
                }, 5000);
      
            } catch (error) {
                // Erro
                statusMsg.style.display = "block";
                statusMsg.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
                statusMsg.className = "erro";
                console.error("Erro ao enviar:", error);
                
                setTimeout(() => {
                    statusMsg.style.display = "none";
                }, 5000);
            }
        });
    }
});