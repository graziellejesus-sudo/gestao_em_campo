
// =========================================
// VISUALIZAR ESCALA
// =========================================

function visualizarEscala(botao) {

    // Pega a linha onde o botão foi clicado
    let linha = botao.closest("tr");

    // Pega os dados da linha
    let funcionario =
        linha.cells[0].innerText;

    let inicio =
        linha.cells[1].innerText;

    let fim =
        linha.cells[2].innerText;

    let motivo =
        linha.cells[3].innerText;

    let dataBaixa =
        linha.cells[4].innerText;


    // Coloca os dados no modal
    document.getElementById("modalFuncionario").innerText =
        funcionario;

    document.getElementById("modalInicio").innerText =
        inicio;

    document.getElementById("modalFim").innerText =
        fim;

    document.getElementById("modalMotivo").innerText =
        motivo;

    document.getElementById("modalBaixa").innerText =
        dataBaixa;


    // Abre o modal
    document.getElementById("modalVisualizacao").style.display =
        "flex";
}


// =========================================
// FECHAR MODAL
// =========================================

function fecharModal() {

    document.getElementById("modalVisualizacao").style.display =
        "none";

}


// =========================================
// FECHAR AO CLICAR FORA
// =========================================

window.onclick = function(event) {

    let modal =
        document.getElementById("modalVisualizacao");

    if (event.target === modal) {

        fecharModal();

    }

};

