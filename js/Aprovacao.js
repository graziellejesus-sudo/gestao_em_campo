function aprovarSolicitacao(id) {

    const confirmar = confirm(
        "Deseja realmente aprovar a solicitação #" + id + "?"
    );

    if (confirmar) {

        alert("Solicitação #" + id + " aprovada com sucesso!");

        atualizarStatus(id, "Aprovada");

    }

}


function recusarSolicitacao(id) {

    const confirmar = confirm(
        "Deseja realmente recusar a solicitação #" + id + "?"
    );

    if (confirmar) {

        alert("Solicitação #" + id + " recusada.");

        atualizarStatus(id, "Recusada");

    }

}


function atualizarStatus(id, novoStatus) {

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        const titulo = card.querySelector("h2");

        if (titulo.textContent === "Solicitação #" + String(id).padStart(3, "0")) {

            const status = card.querySelector(".status");

            status.textContent = novoStatus;

            status.classList.remove("pendente");

            if (novoStatus === "Aprovada") {

                status.style.backgroundColor = "#d1fae5";
                status.style.color = "#065f46";

            } else {

                status.style.backgroundColor = "#fee2e2";
                status.style.color = "#991b1b";

            }

            const botoes = card.querySelector(".botoes");

            botoes.style.display = "none";
        }

    });

}