# 🏎️⚡🐍💚 Fórmula Tesla UFMG - Website Oficial

![Status](https://img.shields.io/badge/Status-Ativo-success)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0-blue)
![Tecnologia](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-orange)

Repositório oficial do site do **Fórmula Tesla UFMG**, a equipe de Fórmula SAE Elétrico da Universidade Federal de Minas Gerais (UFMG). 

O site foi desenvolvido para apresentar a equipe, nossos projetos, resultados em competições e, principalmente, destacar os parceiros e patrocinadores que tornam a construção do nosso protótipo 100% elétrico possível.

---

## ✨ Funcionalidades e Destaques Técnicos

O site foi construído focado em performance e interatividade, sem o uso de frameworks pesados, garantindo um carregamento rápido, uma experiência fluida e facilidade de atualização futura.

* **Scroll Snap Customizado:** Lógica de *scroll* altamente sensível feita em JavaScript puro que detecta a direção do rolamento e realiza um ajuste suave (*snap*) para o texto inicial ou para o topo da página, mantendo a experiência fluida sem travar o usuário.
* **Scroll Spy no Menu:** Sistema de navegação inteligente que detecta a posição da tela e destaca automaticamente a seção atual no menu superior.
* **Animações Baseadas em Observação:** Uso da API nativa `IntersectionObserver` para detectar quando o bloco de texto da Home entra na tela, disparando animações de *fade* e transição apenas no momento ideal.
* **Grid Uniforme de Patrocinadores:** Estrutura em CSS responsiva que exibe todos os patrocinadores de forma igualitária, otimizando o espaço tanto em monitores ultrawide quanto em dispositivos móveis.
* **Carrossel Nativo:** Seção "Sobre Nós" com carrossel contínuo de imagens construído sem bibliotecas externas, garantindo o mínimo de requisições de script.

---

## 🛠️ Tecnologias Utilizadas

Este projeto é **100% Vanilla** (livre de dependências), focado no domínio das bases do Front-end:

* **HTML5:** Estruturação semântica e acessível.
* **CSS3:** Variáveis nativas (`:root`), Flexbox/Grid, animações customizadas (`@keyframes`) e design responsivo (`media queries`).
* **JavaScript (Vanilla JS - ES6+):** Manipulação de DOM, lógica de eventos de scroll (com controle de timeouts/trava de animação) e uso de APIs modernas do navegador (`IntersectionObserver`, `scrollTo`).

---

## 📁 Estrutura do Projeto

A arquitetura do projeto segue um padrão estático simples e direto:

```text
📦 static_site_Tesla
 ┣ 📂 assets
 ┃ ┣ 📂 css                 # Arquivos de estilo (home.css, etc.)
 ┃ ┣ 📂 images              # Imagens otimizadas separadas por escopo
 ┃ ┃ ┣ 📂 carros            # Fotos dos nossos protótipos
 ┃ ┃ ┣ 📂 equipe            # Fotos das gestões e carros antigos
 ┃ ┃ ┣ 📂 inicio            # Fotos de fundo da Home
 ┃ ┃ ┣ 📂 logos             # Logos oficiais da equipe utilizadas na página
 ┃ ┃ ┣ 📂 patrocinadores    # Logos dos nossos parceiros (UFMG, Lab. Tesla, WEG, etc.)
 ┃ ┃ ┗ 📂 sobre             # Imagens da história da equipe
 ┃ ┗ 📂 js                  # Lógica de funcionamento (main.js)
 ┣ 📜 index.html            # Página principal (Single Page Application)
 ┗ 📜 README.md             # Documentação do repositório