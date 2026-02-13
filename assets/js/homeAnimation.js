document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".home-overlay");
    const sectionHome = document.querySelector(".section-home");

    window.addEventListener("scroll", () => {
        // Pega a altura da janela (viewport)
        const windowHeight = window.innerHeight;
        // Pega quanto o usuário já rolou
        const scrollY = window.scrollY;

        // Calcula a opacidade baseada na rolagem da PRIMEIRA tela (0 a 100vh)
        // Se rolou 0px, opacity = 0
        // Se rolou a altura da tela inteira, opacity = 1
        let opacity = scrollY / windowHeight;

        // Limita a opacidade entre 0 e 1 para não quebrar
        if (opacity > 1) opacity = 1;
        if (opacity < 0) opacity = 0;

        // Aplica o efeito
        if (overlay) {
            overlay.style.opacity = opacity;
        }
    });
});