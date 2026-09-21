const myForm = document.getElementById('cadastroUsuario');

if (myForm != null) {

    myForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const senha = document.getElementById("senha").value;

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

        fetch('https://localhost:7134/usuario/', {

            method: 'POST',

            credentials: 'include',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                nome: document.getElementById("nome").value,

                email: document.getElementById("email").value,

                senha: senha,

                cargo: document.getElementById("cargo").value

            })

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            return response.json();

        })

        .then(data => {

            alert("Conta cadastrada com sucesso!");

            window.location.href = "../html/log.html";

        })

        .catch(error => {

            console.log(error);

            alert("Erro ao cadastrar usuário.");

        });

    });

}