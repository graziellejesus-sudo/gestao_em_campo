
let linhaSelecionada = null;

/* EDITAR */

function editarEscala(botao) {

    linhaSelecionada = botao.closest("tr");

    let colunas = linhaSelecionada.cells;

    document.getElementById("editarFuncionario").value =
        colunas[0].innerText;

    document.getElementById("editarInicio").value =
        converterData(colunas[1].innerText);

    document.getElementById("editarFim").value =
        converterData(colunas[2].innerText);

    document.getElementById("editarStatus").value =
        colunas[3].innerText.trim();

    document.getElementById("modalEdicao").style.display = "flex";
}

/* SALVAR */

function salvarEdicao() {

    let funcionario =
        document.getElementById("editarFuncionario").value;

    let inicio =
        document.getElementById("editarInicio").value;

    let fim =
        document.getElementById("editarFim").value;

    let status =
        document.getElementById("editarStatus").value;

    if (!funcionario || !inicio || !fim) {
        alert("Preencha todos os campos.");
        return;
    }

    if (inicio > fim) {
        alert("A data inicial não pode ser maior que a final.");
        return;
    }

    let colunas = linhaSelecionada.cells;

    colunas[0].innerText = funcionario;
    colunas[1].innerText = formatarData(inicio);
    colunas[2].innerText = formatarData(fim);

    colunas[3].innerHTML =
        `<span class="status ${status.toLowerCase()}">
            ${status}
        </span>`;

    fecharEdicao();

    alert("Escala atualizada com sucesso!");
}

/* FECHAR */

function fecharEdicao() {

    document.getElementById("modalEdicao").style.display = "none";

    linhaSelecionada = null;
}

/* NOVA ESCALA */

function novaEscala() {

    let nome = prompt("Nome do funcionário:");

    if (!nome) return;

    let inicio = prompt("Data de início (dd/mm/aaaa):");

    if (!inicio) return;

    let fim = prompt("Data de fim (dd/mm/aaaa):");

    if (!fim) return;

    let tabela = document.getElementById("tabelaEscalas");

    let linha = tabela.insertRow();

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${inicio}</td>
        <td>${fim}</td>
        <td>
            <span class="status ativa">Ativa</span>
        </td>
        <td>
            <button class="botao-editar"
                onclick="editarEscala(this)">
                Editar
            </button>
        </td>
    `;

    alert("Nova escala cadastrada!");
}

/* DATAS */

function converterData(data) {

    let partes = data.split("/");

    if (partes.length !== 3) return "";

    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}

function formatarData(data) {

    let partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}