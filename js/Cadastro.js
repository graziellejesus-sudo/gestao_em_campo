const myForm = document.getElementById('cadastroUsuario');

if (myForm != null) {

    myForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const senha = document.getElementById("senha").value;

        // Validação da senha
        if (senha.length < 8) {

            Swal.fire({
                icon: "warning",
                title: "Senha inválida",
                text: "A senha deve ter no mínimo 8 caracteres.",
                confirmButtonText: "OK",
                confirmButtonColor: "#ff8c00"
            });

            return;
        }

        // Dados do usuário
        const usuario = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: senha,
            cargo: document.getElementById("cargo").value
        };

        // Envia para o backend
        fetch('https://localhost:7134/Usuario', {

            method: 'POST',

            credentials: 'include',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(usuario)

        })

        .then(async response => {

            if (!response.ok) {

                const mensagem = await response.text();

                throw new Error(mensagem || "Erro ao cadastrar usuário.");
            }

            return response.json();
        })

        .then(data => {

            Swal.fire({
                icon: "success",
                title: "Cadastro realizado!",
                text: "Usuário cadastrado com sucesso.",
                confirmButtonText: "OK",
                confirmButtonColor: "#ff8c00"
            }).then(() => {

                window.location.href = "../html/log.html";

            });

        })

        .catch(error => {

            console.error("Erro:", error);

            Swal.fire({
                icon: "error",
                title: "Erro",
                text: error.message || "Erro ao cadastrar usuário.",
                confirmButtonText: "OK",
                confirmButtonColor: "#ff8c00"
            });

        });

    });
}