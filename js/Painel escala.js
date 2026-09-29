/* ========================================= */
/* VARIÁVEL DA LINHA SENDO EDITADA */
/* ========================================= */

let linhaEditando = null;


/* ========================================= */
/* NOVA ESCALA */
/* ========================================= */

function novaEscala() {

    window.location.href = "Cadastro escala.html";
}


/* ========================================= */
/* EDITAR ESCALA */
/* ========================================= */

function editarEscala(botao) {

    linhaEditando = botao.closest("tr");

    const colunas =
        linhaEditando.querySelectorAll("td");


    /* Funcionário */

    const funcionario =
        colunas[0].textContent.trim();


    /* Data inicial */

    const dataInicio =
        colunas[1].textContent.trim();


    /* Data final */

    const dataFim =
        colunas[2].textContent.trim();


    /* Status */

    const status =
        colunas[3]
            .querySelector(".status")
            .textContent
            .trim();


    /* ========================================= */
    /* PREENCHER MODAL */
    /* ========================================= */

    document.getElementById(
        "editarFuncionario"
    ).value = funcionario;


    document.getElementById(
        "editarInicio"
    ).value = converterData(dataInicio);


    document.getElementById(
        "editarFim"
    ).value = converterData(dataFim);


    document.getElementById(
        "editarStatus"
    ).value = status;


    /* ========================================= */
    /* ABRIR MODAL */
    /* ========================================= */

    document.getElementById(
        "modalEdicao"
    ).style.display = "flex";
}


/* ========================================= */
/* CONVERTER DATA */
/* ========================================= */

function converterData(data) {

    const partes =
        data.split("/");


    if (partes.length !== 3) {

        return "";
    }


    const dia = partes[0];

    const mes = partes[1];

    const ano = partes[2];


    return `${ano}-${mes}-${dia}`;
}


/* ========================================= */
/* FORMATAR DATA */
/* ========================================= */

function formatarData(data) {

    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return "";
    }


    const ano = partes[0];

    const mes = partes[1];

    const dia = partes[2];


    return `${dia}/${mes}/${ano}`;
}


/* ========================================= */
/* SALVAR EDIÇÃO */
/* ========================================= */

function salvarEdicao() {

    if (!linhaEditando) {

        return;
    }


    const funcionario =
        document.getElementById(
            "editarFuncionario"
        ).value;


    const inicio =
        document.getElementById(
            "editarInicio"
        ).value;


    const fim =
        document.getElementById(
            "editarFim"
        ).value;


    const status =
        document.getElementById(
            "editarStatus"
        ).value;


    /* ========================================= */
    /* VALIDAÇÃO */
    /* ========================================= */

    if (
        funcionario === "" ||
        inicio === "" ||
        fim === ""
    ) {

        alert(
            "Preencha todos os campos."
        );

        return;
    }


    /* ========================================= */
    /* VALIDAR DATAS */
    /* ========================================= */

    if (fim < inicio) {

        alert(
            "A data de fim não pode ser anterior à data de início."
        );

        return;
    }


    /* ========================================= */
    /* ATUALIZAR TABELA */
    /* ========================================= */

    const colunas =
        linhaEditando.querySelectorAll("td");


    colunas[0].textContent =
        funcionario;


    colunas[1].textContent =
        formatarData(inicio);


    colunas[2].textContent =
        formatarData(fim);


    /* ========================================= */
    /* ATUALIZAR STATUS */
    /* ========================================= */

    const elementoStatus =
        colunas[3].querySelector(".status");


    elementoStatus.textContent =
        status;


    elementoStatus.className =
        "status";


    if (status === "Ativa") {

        elementoStatus.classList.add(
            "ativa"
        );

    } else if (status === "Pendente") {

        elementoStatus.classList.add(
            "pendente"
        );
    }


    /* ========================================= */
    /* FECHAR MODAL */
    /* ========================================= */

    fecharEdicao();


    alert(
        "Escala atualizada com sucesso!"
    );
}


/* ========================================= */
/* FECHAR MODAL */
/* ========================================= */

function fecharEdicao() {

    document.getElementById(
        "modalEdicao"
    ).style.display = "none";


    linhaEditando = null;
}


/* ========================================= */
/* FECHAR AO CLICAR FORA */
/* ========================================= */

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "modalEdicao"
            );


        if (event.target === modal) {

            fecharEdicao();
        }

    }
);
