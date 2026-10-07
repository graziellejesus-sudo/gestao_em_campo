using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitacaoController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public SolicitacaoController(
            GestaoEmCampoContext context)
        {
            _context = context;
        }


        // ==========================================
        // GET
        // LISTAR SOLICITAÇÕES
        // ==========================================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> Listar()
        {
            var solicitacoes =
                await _context.Solicitacoes
                    .ToListAsync();

            return Ok(solicitacoes);
        }


        // ==========================================
        // POST
        // CADASTRAR SOLICITAÇÃO
        // ==========================================

        [HttpPost]
        public async Task<IActionResult> Cadastrar(
            [FromBody] Solicitacao solicitacao)
        {
            if (solicitacao == null)
            {
                return BadRequest(
                    "Dados da solicitação inválidos."
                );
            }

            // Toda nova solicitação começa pendente
            solicitacao.Statuss = false;

            _context.Solicitacoes.Add(solicitacao);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem =
                    "Solicitação realizada com sucesso!",

                solicitacao =
                    solicitacao
            });
        }


        // ==========================================
        // PUT
        // APROVAR SOLICITAÇÃO
        // ==========================================

        [HttpPut("{id}/aprovar")]
        public async Task<IActionResult> Aprovar(int id)
        {
            var solicitacao =
                await _context.Solicitacoes
                    .FindAsync(id);

            if (solicitacao == null)
            {
                return NotFound(
                    "Solicitação não encontrada."
                );
            }

            solicitacao.Statuss = true;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem =
                    "Solicitação aprovada com sucesso!",

                solicitacao =
                    solicitacao
            });
        }


        // ==========================================
        // PUT
        // RECUSAR SOLICITAÇÃO
        // ==========================================

        [HttpPut("{id}/recusar")]
        public async Task<IActionResult> Recusar(int id)
        {
            var solicitacao =
                await _context.Solicitacoes
                    .FindAsync(id);

            if (solicitacao == null)
            {
                return NotFound(
                    "Solicitação não encontrada."
                );
            }

            solicitacao.Statuss = false;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem =
                    "Solicitação recusada com sucesso!",

                solicitacao =
                    solicitacao
            });
        }
    }
}
