document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.querySelector(".solicitacoes");


    // ==========================================
    // URL DA API
    // ==========================================

    const API_SOLICITACOES =
        "https://localhost:7134/api/Solicitacao";


    // ==========================================
    // VERIFICAR CONTAINER
    // ==========================================

    if (!container) {

        console.error(
            "ERRO: .solicitacoes não existe no HTML."
        );

        return;
    }


    // ==========================================
    // CARREGAR SOLICITAÇÕES
    // GET /api/Solicitacao
    // ==========================================

    async function carregarSolicitacoes() {

        container.innerHTML = `
            <p>Carregando solicitações...</p>
        `;


        console.log(
            "Buscando solicitações em:",
            API_SOLICITACOES
        );


        try {

            const resposta =
                await fetch(
                    API_SOLICITACOES,
                    {
                        method: "GET",

                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


            console.log(
                "Status GET:",
                resposta.status
            );


            if (!resposta.ok) {

                throw new Error(
                    `Erro HTTP: ${resposta.status}`
                );
            }


            const solicitacoes =
                await resposta.json();


            console.log(
                "Solicitações recebidas:",
                solicitacoes
            );


            if (!Array.isArray(solicitacoes)) {

                throw new Error(
                    "A API não retornou uma lista."
                );
            }


            // ==========================================
            // NENHUMA SOLICITAÇÃO
            // ==========================================

            if (solicitacoes.length === 0) {

                container.innerHTML = `
                    <p class="sem-solicitacoes">
                        Não existem solicitações cadastradas.
                    </p>
                `;

                return;
            }


            // ==========================================
            // LIMPAR CONTAINER
            // ==========================================

            container.innerHTML = "";


            // ==========================================
            // CRIAR CARDS
            // ==========================================
              
            const solicitacoesPendentes = solicitacoes.filter(
    (solicitacao) => solicitacao.statuss !== true
);

solicitacoesPendentes.forEach(
    (solicitacao) => {

        const card =
            document.createElement("div");

        card.className = "card";


                    // ==================================
                    // STATUS
                    // ==================================

                    const aprovada =
                        solicitacao.statuss === true;


                    const status =
                        aprovada
                            ? "Aprovada"
                            : "Pendente";


                    const classeStatus =
                        aprovada
                            ? "aprovada"
                            : "pendente";


                    // ==================================
                    // DATAS
                    // ==================================

                    const dataInicio =
                        formatarData(
                            solicitacao.data_Solicitada_Inicio
                        );


                    const dataFim =
                        formatarData(
                            solicitacao.data_Solicitada_Fim
                        );


                    // ==================================
                    // HTML DO CARD
                    // ==================================

                    card.innerHTML = `

                        <div class="card-topo">

                            <h2>
                                Solicitação
                                #${solicitacao.id_Solicitacao}
                            </h2>

                            <span
                                class="status ${classeStatus}"
                            >
                                ${status}
                            </span>

                        </div>


                        <div class="informacoes">

                            <div class="campo">

                                <strong>
                                    Tipo
                                </strong>

                                <span>
                                    ${solicitacao.tipo ?? "-"}
                                </span>

                            </div>


                            <div class="campo">

                                <strong>
                                    Data inicial
                                </strong>

                                <span>
                                    ${dataInicio}
                                </span>

                            </div>


                            <div class="campo">

                                <strong>
                                    Data final
                                </strong>

                                <span>
                                    ${dataFim}
                                </span>

                            </div>


                            <div class="campo">

                                <strong>
                                    Motivo
                                </strong>

                                <span>
                                    ${solicitacao.motivo ?? "-"}
                                </span>

                            </div>


                            <div class="campo">

                                <strong>
                                    Usuário
                                </strong>

                                <span>
                                    ${solicitacao.fk_Id_Usuario ?? "-"}
                                </span>

                            </div>


                            <div class="campo">

                                <strong>
                                    Escala
                                </strong>

                                <span>
                                    ${solicitacao.fk_Id_Escala ?? "-"}
                                </span>

                            </div>

                        </div>


                        <!-- ==========================
                             BOTÕES
                        =========================== -->

                        <div class="acoes">

                            <button
                                type="button"
                                class="btn-aprovar"
                                data-id="${solicitacao.id_Solicitacao}"
                                ${aprovada ? "disabled" : ""}
                            >
                                Aprovar
                            </button>


                            <button
                                type="button"
                                class="btn-recusar"
                                data-id="${solicitacao.id_Solicitacao}"
                                ${aprovada ? "disabled" : ""}
                            >
                                Recusar
                            </button>

                        </div>

                    `;


                    container.appendChild(card);


                    // ==================================
                    // BOTÃO APROVAR
                    // ==================================

                    const btnAprovar =
                        card.querySelector(
                            ".btn-aprovar"
                        );


                    btnAprovar.addEventListener(
                        "click",
                        () => {

                            const id =
                                btnAprovar.dataset.id;


                            console.log(
                                "Clicou em APROVAR. ID:",
                                id
                            );


                            aprovarSolicitacao(id);

                        }
                    );


                    // ==================================
                    // BOTÃO RECUSAR
                    // ==================================

                    const btnRecusar =
                        card.querySelector(
                            ".btn-recusar"
                        );


                    btnRecusar.addEventListener(
                        "click",
                        () => {

                            const id =
                                btnRecusar.dataset.id;


                            console.log(
                                "Clicou em RECUSAR. ID:",
                                id
                            );


                            recusarSolicitacao(id);

                        }
                    );

                }
            );

        }

        catch (erro) {

            console.error(
                "ERRO AO CARREGAR SOLICITAÇÕES:",
                erro
            );


            container.innerHTML = `

                <div class="erro">

                    <strong>
                        Não foi possível conectar com o servidor.
                    </strong>

                    <p>
                        ${erro.message}
                    </p>

                </div>

            `;

        }

    }


    // ==========================================
    // APROVAR SOLICITAÇÃO
    // PUT /api/Solicitacao/{id}/aprovar
    // ==========================================

    async function recusarSolicitacao(id) {
    const confirmar = confirm(
        "Tem certeza de que deseja recusar esta solicitação?"
    );

    if (!confirmar) return;

    try {
        const resposta = await fetch(
            `${API_SOLICITACOES}/${id}/recusar`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Erro ao recusar solicitação."
            );
        }

        alert("Solicitação recusada com sucesso!");

        // Retira o card da tela após a confirmação do servidor
        const botao = document.querySelector(
            `.btn-recusar[data-id="${id}"]`
        );

        if (botao) {
            botao.closest(".card")?.remove();
        }

    } catch (erro) {
        console.error("Erro ao recusar:", erro);

        alert(
            "Não foi possível recusar a solicitação: " +
            erro.message
        );
    }
}


    // ==========================================
    // RECUSAR SOLICITAÇÃO
    // PUT /api/Solicitacao/{id}/recusar
    // ==========================================

    async function recusarSolicitacao(id) {

        console.log(
            "Enviando recusa para ID:",
            id
        );


        try {

            const resposta =
                await fetch(
                    `${API_SOLICITACOES}/${id}/recusar`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        }
                    }
                );


            console.log(
    "Status PUT RECUSAR:",
    resposta.status
);

if (!resposta.ok) {
    const erro = await resposta.text();

    console.error(
        "Erro retornado pelo servidor:",
        erro
    );

    throw new Error(
        `Erro HTTP: ${resposta.status}`
    );
}

// NOVO TESTE
const respostaTexto = await resposta.clone().text();

console.log(
    "Resposta do backend:",
    respostaTexto
);

alert("Solicitação recusada com sucesso!");

            await carregarSolicitacoes();

        }

        catch (erro) {

            console.error(
                "ERRO AO RECUSAR:",
                erro
            );


            alert(
                "Não foi possível recusar a solicitação."
            );

        }

    }


    // ==========================================
    // FORMATAR DATA
    // ==========================================

    function formatarData(data) {

        if (!data) {

            return "-";
        }


        const dataFormatada =
            new Date(data);


        if (isNaN(dataFormatada.getTime())) {

            return "-";
        }


        return dataFormatada.toLocaleDateString(
            "pt-BR"
        );

    }


    // ==========================================
    // INICIAR
    // ==========================================

    carregarSolicitacoes();

});
