
// Guarda a linha que está sendo editada
let linhaEditada = null;


// =========================================
// EDITAR ESCALA
// =========================================

function editarEscala(botao) {

    // Pega a linha da tabela
    linhaEditada = botao.closest("tr");

    // Pega os valores atuais
    let funcionario =
        linhaEditada.cells[0].innerText;

    let inicio =
        linhaEditada.cells[1].innerText;

    let fim =
        linhaEditada.cells[2].innerText;

    let status =
        linhaEditada.cells[3].innerText.trim();


    // Coloca os valores no formulário
    document.getElementById("editarFuncionario").value =
        funcionario;

    document.getElementById("editarInicio").value =
        converterData(inicio);

    document.getElementById("editarFim").value =
        converterData(fim);

    document.getElementById("editarStatus").value =
        status;


    // Abre a janela
    document.getElementById("modalEdicao").style.display =
        "flex";
}


// =========================================
// SALVAR ALTERAÇÃO
// =========================================

function salvarEdicao() {

    if (!linhaEditada) {
        return;
    }


    // Pega os novos valores
    let funcionario =
        document.getElementById("editarFuncionario").value;

    let inicio =
        document.getElementById("editarInicio").value;

    let fim =
        document.getElementById("editarFim").value;

    let status =
        document.getElementById("editarStatus").value;


    // Verifica se os campos estão preenchidos
    if (
        funcionario === "" ||
        inicio === "" ||
        fim === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }


    // Verifica se a data final é menor que a inicial
    if (fim < inicio) {

        alert(
            "A data de fim não pode ser anterior à data de início."
        );

        return;
    }


    // Atualiza os dados da tabela
    linhaEditada.cells[0].innerText =
        funcionario;

    linhaEditada.cells[1].innerText =
        formatarData(inicio);

    linhaEditada.cells[2].innerText =
        formatarData(fim);


    // Atualiza o status
    if (status === "Ativa") {

        linhaEditada.cells[3].innerHTML =
            '<span class="ativo">Ativa</span>';

    }

    else if (status === "Pendente") {

        linhaEditada.cells[3].innerHTML =
            '<span class="pendente">Pendente</span>';

    }

    else {

        linhaEditada.cells[3].innerHTML =
            '<span class="finalizada">Finalizada</span>';

    }


    // Fecha a janela
    fecharEdicao();

    alert("Escala alterada com sucesso!");
}


// =========================================
// FECHAR JANELA
// =========================================

function fecharEdicao() {

    document.getElementById("modalEdicao").style.display =
        "none";

    linhaEditada = null;
}


// =========================================
// CONVERTER DATA PARA INPUT
// =========================================

function converterData(data) {

    let partes = data.split("/");

    if (partes.length !== 3) {
        return "";
    }

    return (
        partes[2] +
        "-" +
        partes[1] +
        "-" +
        partes[0]
    );
}


// =========================================
// FORMATAR DATA PARA TABELA
// =========================================

function formatarData(data) {

    let partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}


// =========================================
// NOVA ESCALA
// =========================================

function novaEscala() {

    alert(
        "Função para cadastrar uma nova escala."
    );
}


// =========================================
// FECHAR MODAL AO CLICAR FORA
// =========================================

window.onclick = function(event) {

    let modal =
        document.getElementById("modalEdicao");

    if (event.target === modal) {

        fecharEdicao();

    }

};


