using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestaoEmCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AprovarSolicitacaoController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public AprovarSolicitacaoController(GestaoEmCampoContext context)
        {
            _context = context;
        }

        // GET: api/AprovarSolicitacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AprovarSolicitacao>>> GetAprovacoes()
        {
            var aprovacoes = await _context.AprovarSolicitacoes
                .Include(a => a.Solicitacao)
                .Include(a => a.Gestor)
                .ToListAsync();

            return Ok(aprovacoes);
        }

        // GET: api/AprovarSolicitacao/1
        [HttpGet("{id}")]
        public async Task<ActionResult<AprovarSolicitacao>> GetAprovacao(int id)
        {
            var aprovacao = await _context.AprovarSolicitacoes
                .Include(a => a.Solicitacao)
                .Include(a => a.Gestor)
                .FirstOrDefaultAsync(a => a.IdAprovacao == id);

            if (aprovacao == null)
            {
                return NotFound(new
                {
                    mensagem = "Aprovação não encontrada."
                });
            }

            return Ok(aprovacao);
        }

        // POST: api/AprovarSolicitacao
        [HttpPost]
        public async Task<ActionResult<AprovarSolicitacao>> CriarAprovacao(
            AprovarSolicitacao aprovacao)
        {
            // Verifica se a solicitação existe
            var solicitacao = await _context.Solicitacoes
                .FindAsync(aprovacao.FkIdSolicitacao);

            if (solicitacao == null)
            {
                return BadRequest(new
                {
                    mensagem = "A solicitação informada não existe."
                });
            }

            // Verifica se o gestor existe
            var gestor = await _context.Usuarios
                .FindAsync(aprovacao.FkIdGestor);

            if (gestor == null)
            {
                return BadRequest(new
                {
                    mensagem = "O gestor informado não existe."
                });
            }

            // Valida o status
            if (aprovacao.Statuss != "Aprovado" &&
                aprovacao.Statuss != "Reprovado" &&
                aprovacao.Statuss != "Pendente")
            {
                return BadRequest(new
                {
                    mensagem = "Status inválido. Use Aprovado, Reprovado ou Pendente."
                });
            }

            aprovacao.DataAprovacao = DateTime.Now;

            _context.AprovarSolicitacoes.Add(aprovacao);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetAprovacao),
                new { id = aprovacao.IdAprovacao },
                aprovacao
            );
        }

        // PUT: api/AprovarSolicitacao/1
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarAprovacao(
            int id,
            AprovarSolicitacao aprovacao)
        {
            var aprovacaoExistente = await _context.AprovarSolicitacoes
                .FindAsync(id);

            if (aprovacaoExistente == null)
            {
                return NotFound(new
                {
                    mensagem = "Aprovação não encontrada."
                });
            }

            // Verifica se a solicitação existe
            var solicitacao = await _context.Solicitacoes
                .FindAsync(aprovacao.FkIdSolicitacao);

            if (solicitacao == null)
            {
                return BadRequest(new
                {
                    mensagem = "A solicitação não existe."
                });
            }

            // Verifica se o gestor existe
            var gestor = await _context.Usuarios
                .FindAsync(aprovacao.FkIdGestor);

            if (gestor == null)
            {
                return BadRequest(new
                {
                    mensagem = "O gestor não existe."
                });
            }

            // Valida o status
            if (aprovacao.Statuss != "Aprovado" &&
                aprovacao.Statuss != "Reprovado" &&
                aprovacao.Statuss != "Pendente")
            {
                return BadRequest(new
                {
                    mensagem = "Status inválido."
                });
            }

            aprovacaoExistente.FkIdSolicitacao = aprovacao.FkIdSolicitacao;
            aprovacaoExistente.FkIdGestor = aprovacao.FkIdGestor;
            aprovacaoExistente.Statuss = aprovacao.Statuss;
            aprovacaoExistente.Observacao = aprovacao.Observacao;
            aprovacaoExistente.DataAprovacao = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(aprovacaoExistente);
        }

        // DELETE: api/AprovarSolicitacao/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarAprovacao(int id)
        {
            var aprovacao = await _context.AprovarSolicitacoes
                .FindAsync(id);

            if (aprovacao == null)
            {
                return NotFound(new
                {
                    mensagem = "Aprovação não encontrada."
                });
            }

            _context.AprovarSolicitacoes.Remove(aprovacao);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
