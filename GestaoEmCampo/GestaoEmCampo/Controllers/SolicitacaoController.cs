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

        public SolicitacaoController(GestaoEmCampoContext context) { _context = context; }

        // ========================================== // GET // LISTAR SOLICITAÇÕES // ==========================================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solicitacao>>> Listar()
        {
            var solicitacoes = await _context.Solicitacoes.ToListAsync();

            return Ok(solicitacoes);
        }

        // ========================================== // POST // CADASTRAR SOLICITAÇÃO // ==========================================

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] Solicitacao solicitacao)
        {
            if (solicitacao == null) { return BadRequest(new { mensagem = "Dados da solicitação inválidos." }); }

            // Toda nova solicitação começa como pendente solicitacao.Statuss = false;

            _context.Solicitacoes.Add(solicitacao);

            await _context.SaveChangesAsync();

            return Ok(new { mensagem = "Solicitação realizada com sucesso!", solicitacao = solicitacao });
        }

        // ========================================== // PUT // APROVAR SOLICITAÇÃO // ==========================================


        [HttpPut("{id}/aprovar")]
        public async Task<IActionResult> Aprovar(int id)
        {
            try
            {
                // 1. Obter o ID do usuário logado na sessão
                var idLogadoTexto = HttpContext.Session.GetString("IdLogado");

                Console.WriteLine($"IdLogado na sessão: {idLogadoTexto ?? "NULL"}");

                if (!int.TryParse(idLogadoTexto, out int idGestor))
                {
                    return Unauthorized(new
                    {
                        mensagem = "Sessão expirada. Faça login novamente."
                    });
                }

                // 2. Buscar o usuário no banco
                var gestor = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.Id_Usuario == idGestor);

                Console.WriteLine($"Gestor encontrado: {gestor != null}");
                Console.WriteLine($"ID pesquisado: {idGestor}");
                Console.WriteLine($"Cargo encontrado: [{gestor?.Cargo ?? "NULL"}]");

                // 3. Verificar se é gestor
                if (gestor == null ||
                    !string.Equals(
                        gestor.Cargo?.Trim(),
                        "Gestão",
                        StringComparison.OrdinalIgnoreCase))
                {
                    return StatusCode(403, new
                    {
                        mensagem = "Apenas usuários com cargo de Gestor podem realizar esta operação."
                    });
                }

                // 4. Buscar a solicitação
                var solicitacao = await _context.Solicitacoes
                    .FirstOrDefaultAsync(s => s.Id_Solicitacao == id);

                if (solicitacao == null)
                {
                    return NotFound(new
                    {
                        mensagem = "Solicitação não encontrada."
                    });
                }

                // 5. Atualizar o status
                solicitacao.Statuss = true;

                // 6. Buscar ou criar o registro de aprovação
                var aprovacao = await _context.AprovarSolicitacoes
                    .FirstOrDefaultAsync(a => a.FkIdSolicitacao == id);

                if (aprovacao == null)
                {
                    aprovacao = new AprovarSolicitacao
                    {
                        FkIdSolicitacao = id,
                        FkIdGestor = idGestor,
                        Statuss = "Aprovado",
                        DataAprovacao = DateTime.Now
                    };

                    _context.AprovarSolicitacoes.Add(aprovacao);
                }
                else
                {
                    aprovacao.FkIdGestor = idGestor;
                    aprovacao.Statuss = "Aprovado";
                    aprovacao.DataAprovacao = DateTime.Now;
                }

                // 7. Salvar no banco
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    mensagem = "Solicitação aprovada com sucesso!",
                    idSolicitacao = id,
                    idGestor = idGestor,
                    status = aprovacao.Statuss,
                    dataAprovacao = aprovacao.DataAprovacao
                });
            }
            catch (Exception erro)
            {
                Console.WriteLine(erro.ToString());

                return StatusCode(500, new
                {
                    mensagem = "Erro ao aprovar solicitação.",
                    erro = erro.Message
                });
            }
        }


        // ========================================== // PUT // RECUSAR SOLICITAÇÃO // ==========================================


        [HttpPut("{id}/recusar")]
        public async Task<IActionResult> Recusar(int id)
        {
            try
            {
                // 1. Obter o ID do usuário logado
                var idLogadoTexto = HttpContext.Session.GetString("IdLogado");

                Console.WriteLine($"IdLogado na sessão: {idLogadoTexto ?? "NULL"}");

                if (!int.TryParse(idLogadoTexto, out int idGestor))
                {
                    return Unauthorized(new
                    {
                        mensagem = "Sessão expirada. Faça login novamente."
                    });
                }

                // 2. Buscar o usuário no banco
                var gestor = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.Id_Usuario == idGestor);

                Console.WriteLine($"Gestor encontrado: {gestor != null}");
                Console.WriteLine($"ID pesquisado: {idGestor}");
                Console.WriteLine($"Cargo encontrado: [{gestor?.Cargo ?? "NULL"}]");

                // 3. Verificar se é gestor
                if (gestor == null ||
                    !string.Equals(
                        gestor.Cargo?.Trim(),
                        "Gestão",
                        StringComparison.OrdinalIgnoreCase))
                {
                    return StatusCode(403, new
                    {
                        mensagem = "Apenas usuários com cargo de Gestor podem realizar esta operação."
                    });
                }

                // 4. Buscar a solicitação
                var solicitacao = await _context.Solicitacoes
                    .FirstOrDefaultAsync(s => s.Id_Solicitacao == id);

                if (solicitacao == null)
                {
                    return NotFound(new
                    {
                        mensagem = "Solicitação não encontrada."
                    });
                }

                // 5. Atualizar o status
                solicitacao.Statuss = false;

                // 6. Buscar ou criar o registro da decisão
                var aprovacao = await _context.AprovarSolicitacoes
                    .FirstOrDefaultAsync(a => a.FkIdSolicitacao == id);

                if (aprovacao == null)
                {
                    aprovacao = new AprovarSolicitacao
                    {
                        FkIdSolicitacao = id,
                        FkIdGestor = idGestor,
                        Statuss = "Reprovado",
                        DataAprovacao = DateTime.Now
                    };

                    _context.AprovarSolicitacoes.Add(aprovacao);
                }
                else
                {
                    aprovacao.FkIdGestor = idGestor;
                    aprovacao.Statuss = "Reprovado";
                    aprovacao.DataAprovacao = DateTime.Now;
                }

                // 7. Salvar no banco
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    mensagem = "Solicitação recusada com sucesso!",
                    idSolicitacao = id,
                    idGestor = idGestor,
                    status = aprovacao.Statuss,
                    dataAprovacao = aprovacao.DataAprovacao
                });
            }
            catch (Exception erro)
            {
                Console.WriteLine(erro.ToString());

                return StatusCode(500, new
                {
                    mensagem = "Erro ao recusar solicitação.",
                    erro = erro.Message
                });
            }
        }

    }
}    