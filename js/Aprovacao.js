// =========================================================
// URL DA API
// =========================================================

const API_URL =
    "https://localhost:7134/api/AprovarSolicitacao";


// =========================================================
// INICIAR QUANDO A PÁGINA ABRIR
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarSolicitacoes();

    }
);


// =========================================================
// CARREGAR SOLICITAÇÕES
// =========================================================

async function carregarSolicitacoes() {

    const lista =
        document.querySelector(".solicitacoes");

    try {

        const resposta =
            await fetch(API_URL);

        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar solicitações."
            );
        }

        const solicitacoes =
            await resposta.json();

        console.log(
            "Solicitações:",
            solicitacoes
        );

        lista.innerHTML = "";


        if (
            !solicitacoes ||
            solicitacoes.length === 0
        ) {

            lista.innerHTML = `
                <div class="card">

                    <h2>
                        Nenhuma solicitação encontrada.
                    </h2>

                </div>
            `;

            return;
        }


        solicitacoes.forEach(
            solicitacao => {

                criarCard(
                    solicitacao,
                    lista
                );

            }
        );

    }
    catch (erro) {

        console.error(
            "Erro:",
            erro
        );

        lista.innerHTML = `
            <div class="card">

                <h2>
                    Erro ao carregar solicitações.
                </h2>

                <p>
                    Verifique se o servidor está funcionando.
                </p>

            </div>
        `;
    }
}


// =========================================================
// CRIAR CARD
// =========================================================

function criarCard(
    solicitacao,
    lista
) {

    const id =
        solicitacao.id_Solicitacao ??
        solicitacao.id_solicitacao ??
        solicitacao.Id_Solicitacao;


    const tipo =
        solicitacao.tipo ??
        solicitacao.Tipo ??
        "";


    const dataInicio =
        solicitacao.data_Solicitada_Inicio ??
        solicitacao.data_solicitada_inicio ??
        solicitacao.Data_Solicitada_Inicio;


    const dataFim =
        solicitacao.data_Solicitada_Fim ??
        solicitacao.data_solicitada_fim ??
        solicitacao.Data_Solicitada_Fim;


    const motivo =
        solicitacao.motivo ??
        solicitacao.Motivo ??
        "";


    // Nome do funcionário
    let funcionario = "Funcionário";


    if (
        solicitacao.usuario &&
        solicitacao.usuario.nome
    ) {

        funcionario =
            solicitacao.usuario.nome;

    }
    else if (
        solicitacao.Usuario &&
        solicitacao.Usuario.Nome
    ) {

        funcionario =
            solicitacao.Usuario.Nome;

    }
    else if (
        solicitacao.nomeUsuario
    ) {

        funcionario =
            solicitacao.nomeUsuario;

    }


    const card =
        document.createElement("div");


    card.className = "card";


    card.id =
        `solicitacao-${id}`;


    card.innerHTML = `

        <div class="card-topo">

            <h2>
                Solicitação #${id}
            </h2>

            <span class="status pendente">
                Pendente
            </span>

        </div>


        <div class="informacoes">

            <div class="campo">

                <strong>
                    Funcionário
                </strong>

                <span>
                    ${funcionario}
                </span>

            </div>


            <div class="campo">

                <strong>
                    Tipo de solicitação
                </strong>

                <span>
                    ${tipo}
                </span>

            </div>


            <div class="campo">

                <strong>
                    Data inicial
                </strong>

                <span>
                    ${formatarData(dataInicio)}
                </span>

            </div>


            <div class="campo">

                <strong>
                    Data final
                </strong>

                <span>
                    ${formatarData(dataFim)}
                </span>

            </div>


            <div class="campo motivo">

                <strong>
                    Motivo
                </strong>

                <span>
                    ${motivo}
                </span>

            </div>

        </div>


        <div class="botoes">

            <button
                class="btn-aprovar"
                onclick="aprovarSolicitacao(${id})">

                Aprovar

            </button>


            <button
                class="btn-recusar"
                onclick="recusarSolicitacao(${id})">

                Recusar

            </button>

        </div>

    `;


    lista.appendChild(card);
}


// =========================================================
// FORMATAR DATA
// =========================================================

function formatarData(data) {

    if (!data) {
        return "-";
    }


    const somenteData =
        data.toString().split("T")[0];


    const partes =
        somenteData.split("-");


    if (partes.length !== 3) {
        return data;
    }


    return `
        ${partes[2]}/${partes[1]}/${partes[0]}
    `;
}


// =========================================================
// APROVAR
// =========================================================

async function aprovarSolicitacao(id) {

    const confirmar =
        confirm(
            "Deseja realmente aprovar esta solicitação?"
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/Aprovar/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                "Não foi possível aprovar."
            );

            return;
        }


        alert(
            dados.mensagem ||
            "Solicitação aprovada!"
        );


        carregarSolicitacoes();

    }
    catch (erro) {

        console.error(
            erro
        );

        alert(
            "Erro ao conectar com o servidor."
        );
    }
}


// =========================================================
// RECUSAR
// =========================================================

async function recusarSolicitacao(id) {

    const confirmar =
        confirm(
            "Deseja realmente recusar esta solicitação?"
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/Recusar/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                "Não foi possível recusar."
            );

            return;
        }


        alert(
            dados.mensagem ||
            "Solicitação recusada!"
        );


        carregarSolicitacoes();

    }
    catch (erro) {

        console.error(
            erro
        );

        alert(
            "Erro ao conectar com o servidor."
        );
    }
}
