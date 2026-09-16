
// ========================================
// APROVAR SOLICITAÇÃO
// ========================================

function aprovarSolicitacao(id) {

    const confirmar = confirm(
        "Deseja realmente aprovar esta solicitação?"
    );

    if (!confirmar) {
        return;
    }

    const card = document.getElementById(
        "solicitacao-" + id
    );

    const status = card.querySelector(".status");

    status.textContent = "Aprovada";

    status.classList.remove("pendente");

    status.classList.add("aprovado");

    alert("Solicitação aprovada com sucesso!");

    desativarBotoes(card);
}

// ========================================
// RECUSAR SOLICITAÇÃO
// ========================================

function recusarSolicitacao(id) {

    const confirmar = confirm(
        "Deseja realmente recusar esta solicitação?"
    );

    if (!confirmar) {
        return;
    }

    const card = document.getElementById(
        "solicitacao-" + id
    );

    const status = card.querySelector(".status");

    status.textContent = "Recusada";

    status.classList.remove("pendente");

    status.classList.add("recusado");

    alert("Solicitação recusada!");

    desativarBotoes(card);
}

// ========================================
// DESATIVAR BOTÕES APÓS DECISÃO
// ========================================

function desativarBotoes(card) {

    const botoes = card.querySelectorAll("button");

    botoes.forEach(function(botao) {

        botao.disabled = true;

        botao.style.opacity = "0.5";

        botao.style.cursor = "not-allowed";

    });

}

