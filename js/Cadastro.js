const myForm = document.getElementById("cadastroUsuario");

console.log("Cadastro.js carregado");

if (myForm !== null) {

    myForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("Formulário enviado");

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const cargo = document.getElementById("cargo").value;


        // ==============================
        // VALIDAÇÕES
        // ==============================

        if (nome === "") {

            alert("Informe o nome.");

            return;
        }


        if (email === "") {

            alert("Informe o email.");

            return;
        }


        if (senha.length < 8) {

            alert("A senha deve ter no mínimo 8 caracteres.");

            return;
        }


        if (cargo === "") {

            alert("Selecione o cargo.");

            return;
        }


        // ==============================
        // OBJETO DO USUÁRIO
        // ==============================

        const usuario = {

            nome: nome,

            email: email,

            senha: senha,

            cargo: cargo

        };


        console.log("Usuário enviado:", usuario);


        try {

            // ==============================
            // ENVIA PARA O BACKEND
            // ==============================

            const response = await fetch(
                "https://localhost:7134/api/Usuario",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(usuario)
                }
            );


            console.log("Status da resposta:", response.status);


            // ==============================
            // LÊ RESPOSTA
            // ==============================

            const texto = await response.text();

            let data = {};

            try {

                data = JSON.parse(texto);

            } catch {

                data = {
                    mensagem: texto
                };

            }


            console.log("Resposta do servidor:", data);


            // ==============================
            // ERRO
            // ==============================

            if (!response.ok) {

                throw new Error(
                    data.mensagem ||
                    data.message ||
                    "Erro ao cadastrar usuário."
                );
            }


            // ==============================
            // SUCESSO
            // ==============================

            alert("Usuário cadastrado com sucesso!");

            window.location.href = "../html/login.html";


        } catch (error) {

            console.error(
                "Erro ao cadastrar usuário:",
                error
            );

            alert(
                error.message ||
                "Erro ao cadastrar usuário."
            );

        }

    });

} else {

    console.error(
        "ERRO: formulário #cadastroUsuario não encontrado."
    );

}
