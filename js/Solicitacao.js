const formulario = document.getElementById("formSolicitacao");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;
    const motivo = document.getElementById("motivo").value;

    if (tipo === "" || dataInicio === "" || dataFim === "" || motivo === "") {

        alert("Preencha todos os campos.");

        return;
    }

    fetch("https://localhost:7134/Solicitacao", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            Tipo: tipo,

            Data_Solicitada_Inicio: dataInicio,

            Data_Solicitada_Fim: dataFim,

            Motivo: motivo,

            Statuss: false,

            Fk_Id_Usuario: 1,

            Fk_Id_Escala: 1

        })

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Erro ao realizar solicitação.");
        }

        return response.json();

    })

    .then(data => {

        alert("Solicitação realizada com sucesso!");

        formulario.reset();

    })

    .catch(error => {

        console.error(error);

        alert("Erro ao realizar solicitação.");

    });

});