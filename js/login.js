
// Pegando o formulário
const formulario = document.querySelector("form");

// Evento ao enviar o formulário
formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Pegando os valores dos campos
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;


    // Verifica se os campos estão preenchidos
    if (email === "" || senha === "") {

        alert("Preencha o e-mail e a senha.");

        return;
    }


    // Verifica se o e-mail possui um formato básico válido
    if (!email.includes("@") || !email.includes(".")) {

        alert("Digite um e-mail válido.");

        return;
    }


    // Verifica o tamanho da senha
    if (senha.length < 6) {

        alert("A senha deve ter pelo menos 6 caracteres.");

        return;
    }


    // Login realizado
    alert("Login realizado com sucesso!");

    // Aqui você poderá colocar o redirecionamento depois
    // Exemplo:
    // window.location.href = "painel.html";

});

