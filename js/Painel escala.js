
// ===============================
// PAINEL DE ESCALAS
// ===============================

// Pegando todos os cards
const cards = document.querySelectorAll(".card");

// Pegando todas as linhas da tabela
const linhas = document.querySelectorAll("tbody tr");

// Botão de nova solicitação
const botaoNovaSolicitacao = document.querySelector(".botao");


// ===============================
// ATUALIZAR OS CARDS
// ===============================

function atualizarPainel() {

    let funcionarios = 0;
    let escalasAtivas = 0;
    let solicitacoes = 0;

    // Conta os funcionários
    funcionarios = linhas.length;

    // Percorre as linhas da tabela
    linhas.forEach(function(linha) {

        const status = linha.querySelector("td:last-child");

        if (status) {

            const texto = status.textContent.trim();

            if (texto === "Ativa") {
                escalasAtivas++;
            }

            if (texto === "Pendente") {
                solicitacoes++;
            }
        }

    });


    // Atualiza os valores dos cards

    if (cards.length >= 3) {

        cards[0].querySelector("strong").textContent = funcionarios;

        cards[1].querySelector("strong").textContent = escalasAtivas;

        cards[2].querySelector("strong").textContent = solicitacoes;

    }

}


// Executa ao abrir a página
atualizarPainel();


// ===============================
// NOVA SOLICITAÇÃO
// ===============================

botaoNovaSolicitacao.addEventListener("click", function() {

    window.location.href = "Solicitacao.html";

});


// ===============================
// CLIQUE NAS LINHAS DA TABELA
// ===============================

linhas.forEach(function(linha) {

    linha.addEventListener("click", function() {

        const funcionario =
            linha.querySelector("td:nth-child(1)").textContent;

        const data =
            linha.querySelector("td:nth-child(2)").textContent;

        const horario =
            linha.querySelector("td:nth-child(3)").textContent;

        const setor =
            linha.querySelector("td:nth-child(4)").textContent;

        const status =
            linha.querySelector("td:nth-child(5)").textContent.trim();


        alert(
            "Funcionário: " + funcionario +
            "\nData: " + data +
            "\nHorário: " + horario +
            "\nSetor: " + setor +
            "\nStatus: " + status
        );

    });

});


// ===============================
// EFEITO AO PASSAR O MOUSE
// ===============================

linhas.forEach(function(linha) {

    linha.style.cursor = "pointer";

});

