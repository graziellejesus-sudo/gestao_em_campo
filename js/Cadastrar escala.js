const formulario = document.getElementById("formCadastrarEscala");


// ============================================
// CADASTRAR ESCALA
// ============================================

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Pegando os valores do formulário

    const dataInicio =
        document.getElementById("dataInicio").value;

    const dataFim =
        document.getElementById("dataFim").value;

    const baixada =
        document.getElementById("baixada").value;

    const status =
        document.getElementById("status").value;


    // ============================================
    // VALIDAÇÕES
    // ============================================

    if (dataInicio === "") {

        alert("Informe a data de início.");

        return;
    }


    if (dataFim === "") {

        alert("Informe a data de fim.");

        return;
    }


    if (dataFim < dataInicio) {

        alert(
            "A data de fim não pode ser anterior à data de início."
        );

        return;
    }


    if (baixada === "") {

        alert("Informe se a escala foi baixada.");

        return;
    }


    if (status === "") {

        alert("Informe o status da escala.");

        return;
    }


    // ============================================
    // OBJETO PARA ENVIAR AO BACKEND
    // ============================================

    const escala = {

        data_Inicio: dataInicio,

        data_Fim: dataFim,

        baixada: baixada,

        statuss: status === "true"

    };


    console.log("Dados enviados:", escala);


    // ============================================
    // ENVIO PARA A API
    // ============================================

    try {

        const resposta = await fetch(
            "https://localhost:7134/api/Escala",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(escala)
            }
        );


        // ============================================
        // TRATAMENTO DE ERRO
        // ============================================

        if (!resposta.ok) {

            const erro = await resposta.text();

            console.error(
                "Erro retornado pela API:",
                erro
            );

            throw new Error(
                "Não foi possível cadastrar a escala."
            );
        }


        // ============================================
        // RESPOSTA DA API
        // ============================================

        const dados = await resposta.json();


        console.log(
            "Escala cadastrada:",
            dados
        );


        alert(
            "Escala cadastrada com sucesso!"
        );


        // Volta para o painel

        window.location.href =
            "../html/Painel escala.html";


    } catch (error) {

        console.error(
            "Erro ao cadastrar escala:",
            error
        );


        alert(
            "Erro ao cadastrar escala. Verifique se a API está funcionando."
        );

    }

});


// ============================================
// BOTÃO CANCELAR
// ============================================

function voltarPainel() {

    window.location.href =
        "../html/Painel escala.html";

}
