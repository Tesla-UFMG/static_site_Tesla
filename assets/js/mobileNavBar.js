const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event && event.type === 'touchstart') event.preventDefault();
    
    const nav = document.getElementById('nav');
    
    // Adiciona ou remove a classe 'active'
    nav.classList.toggle('active');
    
    // Acessibilidade: atualiza o atributo aria-expanded
    const active = nav.classList.contains('active');
    btnMobile.setAttribute('aria-expanded', active);
    
    if (active) {
        btnMobile.setAttribute('aria-label', 'Fechar Menu');
    } else {
        btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);