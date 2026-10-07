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

            solicitacoes.forEach(
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

    async function aprovarSolicitacao(id) {

        console.log(
            "Enviando aprovação para ID:",
            id
        );


        try {

            const resposta =
                await fetch(
                    `${API_SOLICITACOES}/${id}/aprovar`,
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
                "Status PUT APROVAR:",
                resposta.status
            );


            if (!resposta.ok) {

                const erro =
                    await resposta.text();


                console.error(
                    "Erro retornado pelo servidor:",
                    erro
                );


                throw new Error(
                    `Erro HTTP: ${resposta.status}`
                );
            }


            alert(
                "Solicitação aprovada com sucesso!"
            );


            await carregarSolicitacoes();

        }

        catch (erro) {

            console.error(
                "ERRO AO APROVAR:",
                erro
            );


            alert(
                "Não foi possível aprovar a solicitação."
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

                const erro =
                    await resposta.text();


                console.error(
                    "Erro retornado pelo servidor:",
                    erro
                );


                throw new Error(
                    `Erro HTTP: ${resposta.status}`
                );
            }


            alert(
                "Solicitação recusada com sucesso!"
            );


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
