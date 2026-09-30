/* ========================================= */
/* CONFIGURAÇÃO DA API */
/* ========================================= */

const API_URL =
    "https://localhost:7134/api/Escala";


/* ========================================= */
/* VARIÁVEL DA ESCALA SENDO EDITADA */
/* ========================================= */

let escalaEditando = null;


/* ========================================= */
/* INICIAR PÁGINA */
/* ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarEscalas();

    }
);


/* ========================================= */
/* NOVA ESCALA */
/* ========================================= */

function novaEscala() {

    window.location.href =
        "Cadastro escala.html";
}


/* ========================================= */
/* CARREGAR ESCALAS DA API */
/* ========================================= */

async function carregarEscalas() {

    try {

        const resposta =
            await fetch(API_URL);


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar escalas."
            );
        }


        const escalas =
            await resposta.json();


        preencherTabela(escalas);


    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );


        alert(
            "Não foi possível carregar as escalas."
        );
    }
}


/* ========================================= */
/* PREENCHER TABELA */
/* ========================================= */

function preencherTabela(escalas) {

    const tabela =
        document.getElementById(
            "tabelaEscalas"
        );


    tabela.innerHTML = "";


    escalas.forEach(
        function (escala) {

            const linha =
                document.createElement("tr");


            /* ID da escala */

            linha.dataset.id =
                escala.id_Escala;


            /* Nome */

            const funcionario =
                escala.baixada ||
                "Não informado";


            /* Data inicial */

            const dataInicio =
                formatarData(
                    escala.data_Inicio
                );


            /* Data final */

            const dataFim =
                formatarData(
                    escala.data_Fim
                );


            /* Status */

            const status =
                escala.statuss
                    ? "Ativa"
                    : "Pendente";


            const classeStatus =
                escala.statuss
                    ? "ativa"
                    : "pendente";


            /* ========================================= */
            /* MONTAR LINHA */
            /* ========================================= */

            linha.innerHTML = `

                <td>
                    ${funcionario}
                </td>

                <td>
                    ${dataInicio}
                </td>

                <td>
                    ${dataFim}
                </td>

                <td>

                    <span class="status ${classeStatus}">
                        ${status}
                    </span>

                </td>

                <td>

                    <button
                        class="botao-editar"
                        onclick="editarEscala(${escala.id_Escala})">

                        Editar

                    </button>

                </td>

            `;


            tabela.appendChild(linha);

        }
    );
}


/* ========================================= */
/* EDITAR ESCALA */
/* ========================================= */

async function editarEscala(id) {

    try {

        /* Buscar escala no banco */

        const resposta =
            await fetch(
                `${API_URL}/${id}`
            );


        if (!resposta.ok) {

            throw new Error(
                "Escala não encontrada."
            );
        }


        const escala =
            await resposta.json();


        /* Guardar ID */

        escalaEditando =
            escala.id_Escala;


        /* ========================================= */
        /* PREENCHER MODAL */
        /* ========================================= */

        document.getElementById(
            "editarFuncionario"
        ).value =
            escala.baixada || "";


        document.getElementById(
            "editarInicio"
        ).value =
            escala.data_Inicio;


        document.getElementById(
            "editarFim"
        ).value =
            escala.data_Fim;


        document.getElementById(
            "editarStatus"
        ).value =
            escala.statuss
                ? "Ativa"
                : "Pendente";


        /* ========================================= */
        /* ABRIR MODAL */
        /* ========================================= */

        document.getElementById(
            "modalEdicao"
        ).style.display = "flex";


    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );


        alert(
            "Não foi possível carregar a escala."
        );
    }
}


/* ========================================= */
/* FORMATAR DATA PARA A TABELA */
/* ========================================= */

function formatarData(data) {

    if (!data) {

        return "";
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {

        return data;
    }


    const ano =
        partes[0];


    const mes =
        partes[1];


    const dia =
        partes[2];


    return `${dia}/${mes}/${ano}`;
}


/* ========================================= */
/* SALVAR EDIÇÃO */
/* ========================================= */

async function salvarEdicao() {

    /* ========================================= */
    /* VERIFICAR ESCALA */
    /* ========================================= */

    if (escalaEditando === null) {

        alert(
            "Nenhuma escala selecionada."
        );

        return;
    }


    /* ========================================= */
    /* PEGAR VALORES DO FORMULÁRIO */
    /* ========================================= */

    const funcionario =
        document.getElementById(
            "editarFuncionario"
        ).value.trim();


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
    /* MONTAR OBJETO PARA API */
    /* ========================================= */

    const dados = {

        data_Inicio:
            inicio,

        data_Fim:
            fim,

        baixada:
            funcionario,

        statuss:
            status === "Ativa"

    };


    try {

        /* ========================================= */
        /* ENVIAR PARA API */
        /* ========================================= */

        const resposta =
            await fetch(
                `${API_URL}/${escalaEditando}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(dados)

                }
            );


        /* ========================================= */
        /* VERIFICAR RESPOSTA */
        /* ========================================= */

        if (!resposta.ok) {

            throw new Error(
                "Erro ao atualizar escala."
            );
        }


        /* ========================================= */
        /* FECHAR MODAL */
        /* ========================================= */

        fecharEdicao();


        /* ========================================= */
        /* RECARREGAR DADOS DO BANCO */
        /* ========================================= */

        await carregarEscalas();


        alert(
            "Escala atualizada com sucesso!"
        );


    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );


        alert(
            "Não foi possível atualizar a escala."
        );
    }
}


/* ========================================= */
/* FECHAR MODAL */
/* ========================================= */

function fecharEdicao() {

    document.getElementById(
        "modalEdicao"
    ).style.display = "none";


    escalaEditando = null;
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