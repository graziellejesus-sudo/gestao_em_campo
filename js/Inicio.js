
// ===============================
// MENU MOBILE
// ===============================

function abrirMenu() {

    const menu = document.getElementById("menuMobile");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


// ===============================
// BOTÃO ENTRAR
// ===============================

function irParaLogin() {

    window.location.href = "login.html";

}


// ===============================
// BOTÃO CRIAR CONTA
// ===============================

function irParaCadastro() {

    window.location.href = "cadastro.html";

}

