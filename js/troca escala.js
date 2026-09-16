
// =========================================
// FORMULÁRIO DE TROCA DE ESCALA
// =========================================

const formTroca = document.getElementById("formTroca");


// =========================================
// ENVIO DA SOLICITAÇÃO
// =========================================

formTroca.addEventListener("submit", function (event) {

    event.preventDefault();


    // PEGAR OS VALORES

    const escalaAtual =
        document.getElementById("escalaAtual").value;

    const novaEscala =
        document.getElementById("novaEscala").value;

    const dataTroca =
        document.getElementById("dataTroca").value;

    const motivo =
        document.getElementById("motivo").value.trim();


    // =========================================
    // VERIFICAR ESCALAS
    // =========================================

    if (escalaAtual === novaEscala) {

        alert(
            "A nova escala deve ser diferente da escala atual."
        );

        return;
    }


    // =========================================
    // VERIFICAR DATA
    // =========================================

    if (!dataTroca) {

        alert(
            "Selecione a data desejada para a troca."
        );

        return;
    }


    // =========================================
    // VERIFICAR MOTIVO
    // =========================================

    if (motivo.length < 5) {

        alert(
            "Informe um motivo válido para solicitar a troca."
        );

        return;
    }

    // =========================================
    // CONFIRMAÇÃO
    // =========================================

    const confirmar = confirm(
        "Deseja enviar a solicitação de troca de escala?"
    );


    if (confirmar) {

        alert(
            "Solicitação de troca enviada com sucesso!"
        );


        // Limpar formulário

        formTroca.reset();

    }

});

// =========================================
// BOTÃO CANCELAR
// =========================================

const btnCancelar =
    document.getElementById("btnCancelar");

btnCancelar.addEventListener("click", function () {

    const confirmar = confirm(
        "Deseja cancelar esta solicitação?"
    );


    if (confirmar) {

        formTroca.reset();

    }

});

