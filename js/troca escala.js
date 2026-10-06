const API_URL = "https://localhost:7134/api/Troca_Escala";

const form = document.getElementById("formTroca");
const escalaAtual = document.getElementById("escalaAtual");
const novaEscala = document.getElementById("novaEscala");
const btnCancelar = document.getElementById("btnCancelar");  

const ID_USUARIO = 1;


// ========================================
// ENVIAR SOLICITAÇÃO
// ========================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (escalaAtual.value === "") {
        alert("Selecione sua escala atual.");
        return;
    }

    if (novaEscala.value === "") {
        alert("Selecione a nova escala.");
        return;
    }

    if (escalaAtual.value === novaEscala.value) {
        alert("A nova escala deve ser diferente da escala atual.");
        return;
    }

    const dados = {
        id_Usuario: ID_USUARIO,
        escalaAtual: converterEscala(escalaAtual.value),
        novaEscala: converterEscala(novaEscala.value)
    };

    console.log("Enviando para o Back-end:");
    console.log(dados);

    try {

        const resposta = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        console.log("Resposta do Back-end:");
        console.log(resultado);

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Erro ao enviar solicitação."
            );

            return;
        }

        alert("Solicitação de troca enviada com sucesso!");

        form.reset();

    } catch (erro) {

        console.error("Erro ao conectar com o Back-end:", erro);

        alert("Não foi possível conectar ao Back-end.");
    }
});


// ========================================
// CONVERTER ESCALA
// ========================================

function converterEscala(escala) {

    switch (escala) {

        case "Manhã":
            return "Manhã - 06:00 às 14:00";

        case "Tarde":
            return "Tarde - 14:00 às 22:00";

        case "Noite":
            return "Noite - 22:00 às 06:00";

        default:
            return escala;
    }
}


// ========================================
// CANCELAR
// ========================================

btnCancelar.addEventListener("click", function () {

    form.reset();

});
