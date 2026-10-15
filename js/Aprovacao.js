document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".solicitacoes");

    // URL DA API
    const API_SOLICITACOES =
        "https://localhost:7134/api/Solicitacao";

    // VERIFICAR CONTAINER
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

            const resposta = await fetch(
                API_SOLICITACOES,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            console.log("Status GET:", resposta.status);

            if (!resposta.ok) {
                const erro = await resposta.text();

                throw new Error(
                    `Erro HTTP: ${resposta.status}` +
                    (erro ? ` - ${erro}` : "")
                );
            }

            const solicitacoes = await resposta.json();

            console.log(
                "Solicitações recebidas:",
                solicitacoes
            );

            if (!Array.isArray(solicitacoes)) {
                throw new Error(
                    "A API não retornou uma lista."
                );
            }

            // FILTRAR SOLICITAÇÕES NÃO APROVADAS
            const solicitacoesPendentes =
                solicitacoes.filter(
                    (solicitacao) =>
                        solicitacao.statuss !== true
                );

            if (solicitacoesPendentes.length === 0) {
                container.innerHTML = `
                    <p class="sem-solicitacoes">
                        Não existem solicitações pendentes.
                    </p>
                `;
                return;
            }

            container.innerHTML = "";

            // CRIAR CARDS
            solicitacoesPendentes.forEach((solicitacao) => {

                const card = document.createElement("div");
                card.className = "card";

                const aprovada =
                    solicitacao.statuss === true;

                const status = aprovada
                    ? "Aprovada"
                    : "Pendente";

                const classeStatus = aprovada
                    ? "aprovada"
                    : "pendente";

                const dataInicio = formatarData(
                    solicitacao.data_Solicitada_Inicio
                );

                const dataFim = formatarData(
                    solicitacao.data_Solicitada_Fim
                );

                card.innerHTML = `
                    <div class="card-topo">
                        <h2>
                            Solicitação
                            #${solicitacao.id_Solicitacao}
                        </h2>

                        <span class="status ${classeStatus}">
                            ${status}
                        </span>
                    </div>

                    <div class="informacoes">

                        <div class="campo">
                            <strong>Tipo</strong>
                            <span>${solicitacao.tipo ?? "-"}</span>
                        </div>

                        <div class="campo">
                            <strong>Data inicial</strong>
                            <span>${dataInicio}</span>
                        </div>

                        <div class="campo">
                            <strong>Data final</strong>
                            <span>${dataFim}</span>
                        </div>

                        <div class="campo">
                            <strong>Motivo</strong>
                            <span>${solicitacao.motivo ?? "-"}</span>
                        </div>

                        <div class="campo">
                            <strong>Usuário</strong>
                            <span>
                                ${solicitacao.fk_Id_Usuario ?? "-"}
                            </span>
                        </div>

                        <div class="campo">
                            <strong>Escala</strong>
                            <span>
                                ${solicitacao.fk_Id_Escala ?? "-"}
                            </span>
                        </div>

                    </div>

                    <div class="acoes">
                        <button
                            type="button"
                            class="btn-aprovar"
                            data-id="${solicitacao.id_Solicitacao}"
                        >
                            Aprovar
                        </button>

                        <button
                            type="button"
                            class="btn-recusar"
                            data-id="${solicitacao.id_Solicitacao}"
                        >
                            Recusar
                        </button>
                    </div>
                `;

                container.appendChild(card);

                // ==========================================
                // BOTÃO APROVAR
                // ==========================================
                const btnAprovar = card.querySelector(
                    ".btn-aprovar"
                );

                btnAprovar.addEventListener(
                    "click",
                    async () => {

                        const id = btnAprovar.dataset.id;

                        console.log(
                            "Clicou em APROVAR. ID:",
                            id
                        );

                        btnAprovar.disabled = true;

                        try {
                            await aprovarSolicitacao(id);
                        } finally {
                            if (btnAprovar.isConnected) {
                                btnAprovar.disabled = false;
                            }
                        }
                    }
                );

                // ==========================================
                // BOTÃO RECUSAR
                // ==========================================
                const btnRecusar = card.querySelector(
                    ".btn-recusar"
                );

                btnRecusar.addEventListener(
                    "click",
                    async () => {

                        const id = btnRecusar.dataset.id;

                        console.log(
                            "Clicou em RECUSAR. ID:",
                            id
                        );

                        btnRecusar.disabled = true;

                        try {
                            await recusarSolicitacao(id);
                        } finally {
                            if (btnRecusar.isConnected) {
                                btnRecusar.disabled = false;
                            }
                        }
                    }
                );

            });

        } catch (erro) {

            console.error(
                "ERRO AO CARREGAR SOLICITAÇÕES:",
                erro
            );

            container.innerHTML = `
                <div class="erro">
                    <strong>
                        Não foi possível carregar as solicitações.
                    </strong>
                    <p>${erro.message}</p>
                </div>
            `;
        }
    }

    // ==========================================
    // APROVAR SOLICITAÇÃO
    // PUT /api/Solicitacao/{id}/aprovar
    // ==========================================
    async function aprovarSolicitacao(id) {

    const confirmar = confirm(
        "Tem certeza de que deseja aprovar esta solicitação?"
    );

    if (!confirmar) {
        return;
    }

    try {
        console.log("Enviando aprovação para ID:", id);

        const resposta = await fetch(
            `${API_SOLICITACOES}/${id}/aprovar`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const textoResposta = await resposta.text();

        console.log("STATUS HTTP APROVAR:", resposta.status);
        console.log("RESPOSTA DA API:", textoResposta);

        if (!resposta.ok) {
            throw new Error(
                `HTTP ${resposta.status}: ${textoResposta}`
            );
        }

        alert("Solicitação aprovada com sucesso!");

        await carregarSolicitacoes();

    } catch (erro) {
        console.error("ERRO COMPLETO AO APROVAR:", erro);

        alert("Erro ao aprovar: " + erro.message);
    }
}

    // ==========================================
    // RECUSAR SOLICITAÇÃO
    // PUT /api/Solicitacao/{id}/recusar
    // ==========================================
    async function recusarSolicitacao(id) {

        const confirmar = confirm(
            "Tem certeza de que deseja recusar esta solicitação?"
        );

        if (!confirmar) {
            return;
        }

        try {

            console.log(
                "Enviando recusa para ID:",
                id
            );

            const resposta = await fetch(
                `${API_SOLICITACOES}/${id}/recusar`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const textoResposta = await resposta.text();

            console.log(
                "STATUS HTTP RECUSAR:",
                resposta.status
            );

            console.log(
                "RESPOSTA DA API:",
                textoResposta
            );

            if (!resposta.ok) {
                throw new Error(
                    `HTTP ${resposta.status}: ${textoResposta}`
                );
            }

            alert("Solicitação recusada com sucesso!");

            await carregarSolicitacoes();

        } catch (erro) {

            console.error("ERRO AO RECUSAR:", erro);

            alert(
                "Não foi possível recusar a solicitação: " +
                erro.message
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

        const dataFormatada = new Date(data);

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