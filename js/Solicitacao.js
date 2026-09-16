
// Pegando o formulário
const formulario = document.querySelector("form");

// Pegando os campos
const tipo = document.getElementById("tipo");
const dataInicio = document.getElementById("dataInicio");
const dataFim = document.getElementById("dataFim");
const motivo = document.getElementById("motivo");

// Enviar solicitação
formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Verifica se todos os campos foram preenchidos
    if (
        tipo.value === "" ||
        dataInicio.value === "" ||
        dataFim.value === "" ||
        motivo.value.trim() === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }

    // Transformando as datas em objetos Date
    const inicio = new Date(dataInicio.value);
    const fim = new Date(dataFim.value);


    // Verifica se a data final é anterior à inicial
    if (fim < inicio) {

        alert("A data final não pode ser anterior à data inicial.");

        return;
    }

    // Verifica se o motivo possui pelo menos 5 caracteres
    if (motivo.value.trim().length < 5) {

        alert("Digite um motivo mais detalhado.");

        return;
    }

    // Solicitação realizada
    alert("Solicitação enviada com sucesso!");


    // Limpa o formulário
    formulario.reset();
 
function abrirMenu() {

    const menu = document.getElementById("menuMobile");

    menu.classList.toggle("ativo");

}

});

