using System;
using System.Linq;
using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("api/AprovarSolicitacao")]
    public class AprovarSolicitacaoController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public AprovarSolicitacaoController(
            GestaoEmCampoContext context)
        {
            _context = context;
        }


        // =========================================================
        // LISTAR TODAS AS SOLICITAÇÕES
        // =========================================================

        [HttpGet]
        public IActionResult ListarSolicitacoes()
        {
            var solicitacoes = _context.Solicitacoes.ToList();

            return Ok(solicitacoes);
        }



        // =========================================================
        // BUSCAR SOLICITAÇÃO POR ID
        // =========================================================

        [HttpGet("{id}")]
        public IActionResult BuscarSolicitacao(int id)
        {
            var solicitacao = _context.Solicitacoes
                .FirstOrDefault(
                    s => s.Id_Solicitacao == id
                );

            if (solicitacao == null)
            {
                return NotFound(
                    "Solicitação não encontrada."
                );
            }

            return Ok(solicitacao);
        }


        // =========================================================
        // APROVAR SOLICITAÇÃO
        // =========================================================

        [HttpPut("Aprovar/{id}")]
        public IActionResult AprovarSolicitacao(int id)
        {
            // Procura a solicitação
            var solicitacao = _context.Solicitacoes
                .FirstOrDefault(
                    s => s.Id_Solicitacao == id
                );

            if (solicitacao == null)
            {
                return NotFound(
                    "Solicitação não encontrada."
                );
            }


            // Verifica se a solicitação
            // já foi analisada
            var aprovacaoExistente =
                _context.Aprovar_Solicitacoes
                .FirstOrDefault(
                    a => a.Fk_Id_Solicitacao == id
                );

            if (aprovacaoExistente != null)
            {
                return BadRequest(
                    "Esta solicitação já foi analisada."
                );
            }


            // Cria a aprovação
            var aprovacao =
                new Aprovar_Solicitacao
                {
                    Fk_Id_Solicitacao = id,

                    // ID 3 = Mariana Santos
                    // que é Gestor no seu banco
                    Fk_Id_Gestor = 3,

                    Statuss = "Aprovada",

                    Data_Aprovacao =
                        DateTime.Now,

                    Observacao =
                        "Solicitação aprovada pelo gestor."
                };


            // Adiciona na tabela
            // Aprovar_Solicitacao
            _context.Aprovar_Solicitacoes.Add(
                aprovacao
            );


            // Salva no banco
            _context.SaveChanges();


            // Retorna resposta
            return Ok(new
            {
                sucesso = true,

                mensagem =
                    "Solicitação aprovada com sucesso.",

                idSolicitacao =
                    aprovacao.Fk_Id_Solicitacao,

                idAprovacao =
                    aprovacao.Id_Aprovacao,

                gestor =
                    aprovacao.Fk_Id_Gestor,

                status =
                    aprovacao.Statuss,

                data =
                    aprovacao.Data_Aprovacao
            });
        }


        // =========================================================
        // RECUSAR SOLICITAÇÃO
        // =========================================================

        [HttpPut("Recusar/{id}")]
        public IActionResult RecusarSolicitacao(int id)
        {
            // Procura a solicitação
            var solicitacao = _context.Solicitacoes
                .FirstOrDefault(
                    s => s.Id_Solicitacao == id
                );

            if (solicitacao == null)
            {
                return NotFound(
                    "Solicitação não encontrada."
                );
            }


            // Verifica se a solicitação
            // já foi analisada
            var aprovacaoExistente =
                _context.Aprovar_Solicitacoes
                .FirstOrDefault(
                    a => a.Fk_Id_Solicitacao == id
                );

            if (aprovacaoExistente != null)
            {
                return BadRequest(
                    "Esta solicitação já foi analisada."
                );
            }


            // Cria a recusa
            var aprovacao =
                new Aprovar_Solicitacao
                {
                    Fk_Id_Solicitacao = id,

                    // ID 3 = Mariana Santos
                    // que é Gestor no seu banco
                    Fk_Id_Gestor = 3,

                    Statuss = "Recusada",

                    Data_Aprovacao =
                        DateTime.Now,

                    Observacao =
                        "Solicitação recusada pelo gestor."
                };


            // Adiciona na tabela
            // Aprovar_Solicitacao
            _context.Aprovar_Solicitacoes.Add(
                aprovacao
            );


            // Salva no banco
            _context.SaveChanges();


            // Retorna resposta
            return Ok(new
            {
                sucesso = true,

                mensagem =
                    "Solicitação recusada com sucesso.",

                idSolicitacao =
                    aprovacao.Fk_Id_Solicitacao,

                idAprovacao =
                    aprovacao.Id_Aprovacao,

                gestor =
                    aprovacao.Fk_Id_Gestor,

                status =
                    aprovacao.Statuss,

                data =
                    aprovacao.Data_Aprovacao
            });
        }
    }
}
