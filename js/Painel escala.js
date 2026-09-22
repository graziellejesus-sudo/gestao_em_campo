const formulario = document.getElementById("formEscala");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const dataInicio =
        document.getElementById("dataInicio").value;

    const dataFim =
        document.getElementById("dataFim").value;

    const baixada =
        document.getElementById("baixada").value;

    const statuss =
        document.getElementById("statuss").checked;


    // Validação

    if (
        dataInicio === "" ||
        dataFim === "" ||
        baixada === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }


    // Verifica se a data final é maior
    // ou igual à data inicial

    if (dataFim < dataInicio) {

        alert(
            "A data de fim não pode ser anterior à data de início."
        );

        return;
    }


    // Envia para o Back-end

    fetch("https://localhost:7134/Escala", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            Data_Inicio: dataInicio,

            Data_Fim: dataFim,

            Baixada: baixada,

            Statuss: statuss

        })

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Erro ao cadastrar escala."
            );

        }

        return response.json();

    })

    .then(data => {

        console.log(data);

        alert(
            "Escala cadastrada com sucesso!"
        );

        formulario.reset();

    })

    .catch(error => {

        console.error(error);

        alert(
            "Erro ao cadastrar escala."
        );

    });

});
