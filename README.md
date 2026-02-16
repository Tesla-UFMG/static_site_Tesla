# 🏎️ Fórmula Tesla UFMG - Website Oficial

![Status](https://img.shields.io/badge/Status-Ativo-success)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0-blue)
![Tecnologia](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-orange)

Repositório oficial do site do **Fórmula Tesla UFMG**, a equipe de Fórmula SAE Elétrico da Universidade Federal de Minas Gerais (UFMG). 

O site foi desenvolvido para apresentar a equipe, nossos projetos, resultados em competições e, principalmente, destacar os parceiros e patrocinadores que tornam a construção do nosso protótipo 100% elétrico possível.

---

## ✨ Funcionalidades e Destaques Técnicos

O site foi construído focado em performance e interatividade, sem o uso de frameworks pesados, garantindo um carregamento rápido, uma experiência fluida e facilidade de atualização futura.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica.
* **CSS3:** Variáveis nativas (`:root`), Flexbox, animações customizadas (`@keyframes`), e design responsivo (`media queries`).
* **JavaScript (ES6+):** Manipulação de DOM, event listeners avançados (controle de *passive events*) e lógica de interatividade.

---

## 📁 Estrutura do Projeto

A arquitetura do projeto segue um padrão estático simples e direto:

```text
📦 static_site_Tesla
 ┣ 📂 assets
 ┃ ┣ 📂 css            # Arquivos de estilo (home.css, etc.)
 ┃ ┣ 📂 images         # Imagens otimizadas separadas por escopo
 ┃ ┃ ┣ 📂 equipe       # Fotos das gestões e carros antigos
 ┃ ┃ ┣ 📂 patrocinadores # Logos (UFMG, Lab. Tesla, WEG, etc.)
 ┃ ┃ ┗ 📂 sobre        # Imagens da história da equipe
 ┃ ┗ 📂 js             # Lógica de funcionamento (main.js)
 ┣ 📜 index.html       # Página principal (Single Page Application)
 ┗ 📜 README.md        # Documentação do repositório