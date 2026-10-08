document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONFIGURAÇÃO DA API
    // ==========================================

    const API_URL =
        "https://localhost:7134/api/Troca_escala";


    // ==========================================
    // ELEMENTOS DO HTML
    // ==========================================

    const form =
        document.getElementById("formTroca");

    const escalaAtual =
        document.getElementById("escalaAtual");

    const novaEscala =
        document.getElementById("novaEscala");

    const dataTroca =
        document.getElementById("dataTroca");

    const motivo =
        document.getElementById("motivo");

    const btnCancelar =
        document.getElementById("btnCancelar");


    // ==========================================
    // USUÁRIO
    // ==========================================

    // TEMPORÁRIO
    // Depois substitua pelo ID do usuário logado.

    const ID_USUARIO = 1;


    // ==========================================
    // VERIFICAR ELEMENTOS
    // ==========================================

    if (!form) {

        console.error(
            "ERRO: formulário formTroca não encontrado."
        );

        return;
    }


    // ==========================================
    // ENVIAR FORMULÁRIO
    // ==========================================

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // ==========================================
            // VALIDAÇÃO
            // ==========================================

            if (escalaAtual.value === "") {

                alert(
                    "Selecione sua escala atual."
                );

                return;
            }


            if (novaEscala.value === "") {

                alert(
                    "Selecione a nova escala."
                );

                return;
            }


            if (
                escalaAtual.value ===
                novaEscala.value
            ) {

                alert(
                    "A nova escala deve ser diferente da escala atual."
                );

                return;
            }


            if (dataTroca.value === "") {

                alert(
                    "Informe a data desejada para a troca."
                );

                return;
            }


            if (
                motivo.value.trim() === ""
            ) {

                alert(
                    "Informe o motivo da troca."
                );

                return;
            }


            // ==========================================
            // MONTAR OBJETO
            // ==========================================

            const dados = {

                Id_Usuario:
                    ID_USUARIO,

                EscalaAtual:
                    converterEscala(
                        escalaAtual.value
                    ),

                NovaEscala:
                    converterEscala(
                        novaEscala.value
                    ),

                DataTroca:
                    dataTroca.value,

                Motivo:
                    motivo.value.trim()

            };


            console.log(
                "================================="
            );

            console.log(
                "ENVIANDO SOLICITAÇÃO"
            );

            console.log(
                "URL:",
                API_URL
            );

            console.log(
                "DADOS:",
                dados
            );


            // ==========================================
            // DESABILITAR BOTÃO
            // ==========================================

            const botaoEnviar =
                form.querySelector(
                    ".btn-enviar"
                );


            if (botaoEnviar) {

                botaoEnviar.disabled = true;

                botaoEnviar.textContent =
                    "Enviando...";

            }


            // ==========================================
            // POST
            // ==========================================

            try {

                const resposta =
                    await fetch(
                        API_URL,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    dados
                                )

                        }
                    );


                console.log(
                    "STATUS:",
                    resposta.status
                );


                // ==========================================
                // LER RESPOSTA
                // ==========================================

                const texto =
                    await resposta.text();


                console.log(
                    "RESPOSTA:",
                    texto
                );


                let resultado = null;


                if (
                    texto &&
                    texto.trim() !== ""
                ) {

                    try {

                        resultado =
                            JSON.parse(
                                texto
                            );

                    }
                    catch (erro) {

                        console.warn(
                            "Resposta não é JSON."
                        );

                    }

                }


                // ==========================================
                // ERRO DA API
                // ==========================================

                if (!resposta.ok) {

                    let mensagem =
                        "Erro ao enviar solicitação.";


                    if (resultado) {

                        mensagem =
                            resultado.mensagem ||
                            resultado.message ||
                            resultado.title ||
                            mensagem;

                    }


                    // Erros de validação ASP.NET

                    if (
                        resultado &&
                        resultado.errors
                    ) {

                        const erros =
                            Object.values(
                                resultado.errors
                            ).flat();


                        if (
                            erros.length > 0
                        ) {

                            mensagem =
                                erros.join("\n");

                        }

                    }


                    alert(
                        "Erro " +
                        resposta.status +
                        ":\n\n" +
                        mensagem
                    );


                    return;
                }


                // ==========================================
                // SUCESSO
                // ==========================================

                alert(
                    "Solicitação de troca enviada com sucesso!"
                );


                console.log(
                    "SOLICITAÇÃO CRIADA:",
                    resultado
                );


                // Limpar formulário

                form.reset();

            }
            catch (erro) {

                console.error(
                    "ERRO DE CONEXÃO:",
                    erro
                );


                alert(
                    "Não foi possível conectar ao Back-end.\n\n" +
                    "Verifique se a API está executando em:\n" +
                    API_URL
                );

            }
            finally {

                // ==========================================
                // HABILITAR BOTÃO NOVAMENTE
                // ==========================================

                if (botaoEnviar) {

                    botaoEnviar.disabled =
                        false;

                    botaoEnviar.textContent =
                        "Solicitar Troca";

                }

            }

        }
    );


    // ==========================================
    // CONVERTER ESCALA
    // ==========================================

    function converterEscala(
        escala
    ) {

        switch (escala) {

            case "Manhã":

                return (
                    "Manhã - 06:00 às 14:00"
                );


            case "Tarde":

                return (
                    "Tarde - 14:00 às 22:00"
                );


            case "Noite":

                return (
                    "Noite - 22:00 às 06:00"
                );


            default:

                return escala;

        }

    }


    // ==========================================
    // CANCELAR
    // ==========================================

    if (btnCancelar) {

        btnCancelar.addEventListener(
            "click",
            () => {

                form.reset();

            }
        );

    }

});