
const CHAVE = "escalas";

let escalas = JSON.parse(localStorage.getItem(CHAVE)) || [];

const lista = document.getElementById("listaEscalas");
const modal = document.getElementById("modalEscala");
const form = document.getElementById("formCadastrarEscala");


// SALVAR
function salvarLocal() {
    localStorage.setItem(CHAVE, JSON.stringify(escalas));
}


// FORMATAR DATA
function formatarData(data) {
    if (!data) return "--";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
}


// ATUALIZAR INDICADORES
function atualizarResumo() {

    document.getElementById("totalEscalas").textContent =
        escalas.length;

    document.getElementById("totalSim").textContent =
        escalas.filter(e => e.baixada === "Sim").length;

    document.getElementById("totalNao").textContent =
        escalas.filter(e => e.baixada === "Não").length;
}


// LISTAR ESCALAS
function renderizar() {

    lista.innerHTML = "";

    atualizarResumo();

    escalas.forEach(escala => {

        const tr = document.createElement("tr");

        const dados = [
            escala.funcionario || "--",
            formatarData(escala.inicio),
            escala.horaInicio || "--:--",
            formatarData(escala.fim),
            escala.horaFim || "--:--"
        ];

        dados.forEach(valor => {

            const td = document.createElement("td");

            td.textContent = valor;

            tr.appendChild(td);

        });


        // ESCALA BAIXADA
        const tdBaixada = document.createElement("td");

        const badge = document.createElement("span");

        badge.className =
            "status " + (escala.baixada === "Sim" ? "sim" : "nao");

        badge.textContent = escala.baixada || "--";

        tdBaixada.appendChild(badge);

        tr.appendChild(tdBaixada);


        // BOTÕES
        const tdAcoes = document.createElement("td");

        tdAcoes.className = "acoes";


        const btnVer = document.createElement("button");

        btnVer.className = "btn-acao btn-ver";

        btnVer.textContent = "👁";

        btnVer.title = "Visualizar";

        btnVer.onclick = () => visualizarEscala(escala.id);


        const btnEditar = document.createElement("button");

        btnEditar.className = "btn-acao btn-editar";

        btnEditar.textContent = "✏";

        btnEditar.title = "Editar";

        btnEditar.onclick = () => editarEscala(escala.id);


        const btnExcluir = document.createElement("button");

        btnExcluir.className = "btn-acao btn-excluir";

        btnExcluir.textContent = "🗑";

        btnExcluir.title = "Excluir";

        btnExcluir.onclick = () => excluirEscala(escala.id);


        tdAcoes.append(btnVer, btnEditar, btnExcluir);

        tr.appendChild(tdAcoes);

        lista.appendChild(tr);

    });

    aplicarFiltros();

}


// NOVA ESCALA
function novaEscala() {

    form.reset();

    document.getElementById("idEscala").value = "";

    document.getElementById("tituloModal").textContent =
        "Cadastrar Escala";

    habilitarCampos(true);

    modal.style.display = "flex";

}


// FECHAR MODAL
function fecharModal() {

    modal.style.display = "none";

}


// HABILITAR CAMPOS
function habilitarCampos(habilitado) {

    const campos = [
        "nomeFuncionario",
        "dataInicio",
        "horaInicio",
        "dataFim",
        "horaFim",
        "baixada"
    ];

    campos.forEach(id => {

        document.getElementById(id).disabled = !habilitado;

    });

    document.getElementById("btnSalvar").style.display =
        habilitado ? "block" : "none";

}


// CADASTRAR E EDITAR
form.addEventListener("submit", function(e) {

    e.preventDefault();

    const id = document.getElementById("idEscala").value;

    const funcionario =
        document.getElementById("nomeFuncionario").value.trim();

    const inicio = document.getElementById("dataInicio").value;

    const horaInicio = document.getElementById("horaInicio").value;

    const fim = document.getElementById("dataFim").value;

    const horaFim = document.getElementById("horaFim").value;

    const baixada = document.getElementById("baixada").value;


    if (!funcionario || !inicio || !horaInicio ||
        !fim || !horaFim || !baixada) {

        alert("Preencha todos os campos.");

        return;

    }


    // VALIDAR DATAS E HORÁRIOS
    if (`${fim}T${horaFim}` <= `${inicio}T${horaInicio}`) {

        alert("A data e o horário de fim devem ser posteriores ao início.");

        return;

    }


    const dados = {

        id: id ? Number(id) : Date.now(),

        funcionario,

        inicio,

        horaInicio,

        fim,

        horaFim,

        baixada

    };


    if (id) {

        const index = escalas.findIndex(e => e.id === Number(id));

        if (index !== -1) {

            escalas[index] = dados;

        }

        alert("Escala atualizada com sucesso!");

    } else {

        escalas.push(dados);

        alert("Escala cadastrada com sucesso!");

    }


    salvarLocal();

    renderizar();

    fecharModal();

});


// PREENCHER FORMULÁRIO
function preencherFormulario(escala) {

    document.getElementById("idEscala").value = escala.id;

    document.getElementById("nomeFuncionario").value =
        escala.funcionario || "";

    document.getElementById("dataInicio").value =
        escala.inicio || "";

    document.getElementById("horaInicio").value =
        escala.horaInicio || "";

    document.getElementById("dataFim").value =
        escala.fim || "";

    document.getElementById("horaFim").value =
        escala.horaFim || "";

    document.getElementById("baixada").value =
        escala.baixada || "";

}


// VISUALIZAR
function visualizarEscala(id) {

    const escala = escalas.find(e => e.id === id);

    if (!escala) return;

    preencherFormulario(escala);

    document.getElementById("tituloModal").textContent =
        "Visualizar Escala";

    habilitarCampos(false);

    modal.style.display = "flex";

}


// EDITAR
function editarEscala(id) {

    const escala = escalas.find(e => e.id === id);

    if (!escala) return;

    form.reset();

    preencherFormulario(escala);

    document.getElementById("tituloModal").textContent =
        "Editar Escala";

    habilitarCampos(true);

    modal.style.display = "flex";

}


// EXCLUIR
function excluirEscala(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta escala?"
    );

    if (!confirmar) return;

    escalas = escalas.filter(e => e.id !== id);

    salvarLocal();

    renderizar();

    alert("Escala excluída com sucesso!");

}


// PESQUISAR E FILTRAR
function aplicarFiltros() {

    const pesquisa =
        document.getElementById("pesquisa").value.toLowerCase();

    const filtro =
        document.getElementById("filtroBaixada").value;

    let encontrados = 0;

    lista.querySelectorAll("tr").forEach(tr => {

        const funcionario =
            tr.cells[0].textContent.toLowerCase();

        const baixada =
            tr.cells[5].textContent;

        const correspondeNome =
            funcionario.includes(pesquisa);

        const correspondeFiltro =
            !filtro || baixada === filtro;

        const mostrar =
            correspondeNome && correspondeFiltro;

        tr.style.display = mostrar ? "" : "none";

        if (mostrar) encontrados++;

    });

    document.getElementById("mensagemVazia").style.display =
        encontrados === 0 ? "block" : "none";

}


// LIMPAR FILTROS
function limparFiltros() {

    document.getElementById("pesquisa").value = "";

    document.getElementById("filtroBaixada").value = "";

    aplicarFiltros();

}


// EVENTOS
document.getElementById("pesquisa")
    .addEventListener("input", aplicarFiltros);

document.getElementById("filtroBaixada")
    .addEventListener("change", aplicarFiltros);

modal.addEventListener("click", function(e) {

    if (e.target === modal) {

        fecharModal();

    }

});


// INICIAR
renderizar();
