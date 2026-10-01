const formulario = document.querySelector("form");

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (email === "") {
        alert("Digite seu e-mail.");
        return;
    }

    if (senha === "") {
        alert("Digite sua senha.");
        return;
    }

    if (!email.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    // ==========================================
    // DADOS DO LOGIN
    // ==========================================

    const usuario = {
        email: email,
        senha: senha
    };

    try {

        // ==========================================
        // ENVIA PARA O BACKEND
        // ==========================================

        const response = await fetch(
            "https://localhost:7134/api/Usuario/login",
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(usuario)
            }
        );

        // Tenta pegar a resposta do backend
        const data = await response.json();

        // ==========================================
        // SE DEU ERRO
        // ==========================================

        if (!response.ok) {

            throw new Error(
                data.mensagem || "Email ou senha incorretos."
            );
        }

        // ==========================================
        // LOGIN REALIZADO
        // ==========================================

        console.log("Login realizado:", data);

        alert("Login realizado com sucesso!");

        // Vai para a tela inicial
        window.location.href = "../html/inicio.html";

    } catch (error) {

        console.error("Erro no login:", error);

        alert(error.message || "Erro ao realizar login.");
    }

});
