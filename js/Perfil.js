
const formulario = document.getElementById("formPerfil");


// SALVAR PERFIL

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cargo = document.getElementById("cargo").value;



    if (nome === "" || email === "" || cargo === "" || "") {

        alert("Preencha todos os campos.");

        return;
    }


    alert("Perfil salvo com sucesso!");

});


// CANCELAR

function cancelar() {

    const confirmar = confirm(
        "Deseja cancelar as alterações?"
    );


    if (confirmar) {

        formulario.reset();

    }

}

