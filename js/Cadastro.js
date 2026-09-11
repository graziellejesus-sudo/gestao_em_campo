
// Pegando o formulário
const formulario = document.querySelector("form");

// Evento enviado quando clicar em Cadastrar
formulario.addEventListener("submit", function(event) {

    // Impede a página de recarregar
    event.preventDefault();

    // Pegando os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const cargo = document.getElementById("cargo").value;


    // Verifica se todos os campos foram preenchidos
    if (nome === "" || email === "" || senha === "" || cargo === "") {

        alert("Por favor, preencha todos os campos.");

        return;
    }


    // Verifica o tamanho da senha
    if (senha.length < 6) {

        alert("A senha deve ter pelo menos 6 caracteres.");

        return;
    }


    // Verifica se o e-mail possui um formato válido
    if (!email.includes("@") || !email.includes(".")) {

        alert("Digite um e-mail válido.");

        return;
    }


    // Se tudo estiver correto
    alert("Cadastro realizado com sucesso!");

    // Limpa os campos do formulário
    formulario.reset();

});

