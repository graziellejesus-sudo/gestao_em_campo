using GestaoEmCampo.Data;
using GestaoEmCampo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestaoEmCampo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EscalaController : ControllerBase
    {
        private readonly GestaoEmCampoContext _context;

        public EscalaController(GestaoEmCampoContext context)
        {
            _context = context;
        }

        // ============================================================
        // LISTAR TODAS AS ESCALAS
        // GET: api/Escala
        // ============================================================

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var escalas = await _context.Escalas
                .AsNoTracking()
                .Select(e => new
                {
                    id = e.Id_Escala,
                    dataInicio = e.Data_Inicio,
                    dataFim = e.Data_Fim,
                    baixada = e.Baixada,
                    status = e.Statuss
                })
                .ToListAsync();

            return Ok(escalas);
        }

        // ============================================================
        // BUSCAR ESCALA POR ID
        // GET: api/Escala/1
        // ============================================================

        [HttpGet("{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var escala = await _context.Escalas
                .AsNoTracking()
                .FirstOrDefaultAsync(e =>
                    e.Id_Escala == id
                );

            if (escala == null)
            {
                return NotFound(new
                {
                    mensagem = "Escala não encontrada."
                });
            }

            return Ok(new
            {
                id = escala.Id_Escala,
                dataInicio = escala.Data_Inicio,
                dataFim = escala.Data_Fim,
                baixada = escala.Baixada,
                status = escala.Statuss
            });
        }

        // ============================================================
        // CADASTRAR ESCALA
        // POST: api/Escala
        // ============================================================

        [HttpPost]
        public async Task<IActionResult> Cadastrar(
            [FromBody] Escala escala)
        {
            if (escala == null)
            {
                return BadRequest(new
                {
                    mensagem = "Os dados da escala são obrigatórios."
                });
            }

            if (escala.Data_Inicio == default)
            {
                return BadRequest(new
                {
                    mensagem = "A data de início é obrigatória."
                });
            }

            if (escala.Data_Fim == default)
            {
                return BadRequest(new
                {
                    mensagem = "A data de fim é obrigatória."
                });
            }

            if (escala.Data_Fim < escala.Data_Inicio)
            {
                return BadRequest(new
                {
                    mensagem = "A data final não pode ser anterior à data inicial."
                });
            }

            if (string.IsNullOrWhiteSpace(escala.Baixada))
            {
                escala.Baixada = "Não";
            }

            _context.Escalas.Add(escala);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(Buscar),
                new
                {
                    id = escala.Id_Escala
                },
                new
                {
                    mensagem = "Escala cadastrada com sucesso.",
                    id = escala.Id_Escala,
                    dataInicio = escala.Data_Inicio,
                    dataFim = escala.Data_Fim,
                    baixada = escala.Baixada,
                    status = escala.Statuss
                }
            );
        }

        // ============================================================
        // EDITAR ESCALA
        // PUT: api/Escala/1
        // ============================================================

        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(
            int id,
            [FromBody] Escala dados)
        {
            if (dados == null)
            {
                return BadRequest(new
                {
                    mensagem = "Os dados da escala são obrigatórios."
                });
            }

            var escala = await _context.Escalas
                .FirstOrDefaultAsync(e =>
                    e.Id_Escala == id
                );

            if (escala == null)
            {
                return NotFound(new
                {
                    mensagem = "Escala não encontrada."
                });
            }

            if (dados.Data_Inicio == default)
            {
                return BadRequest(new
                {
                    mensagem = "A data de início é obrigatória."
                });
            }

            if (dados.Data_Fim == default)
            {
                return BadRequest(new
                {
                    mensagem = "A data de fim é obrigatória."
                });
            }

            if (dados.Data_Fim < dados.Data_Inicio)
            {
                return BadRequest(new
                {
                    mensagem = "A data final não pode ser anterior à data inicial."
                });
            }

            escala.Data_Inicio = dados.Data_Inicio;
            escala.Data_Fim = dados.Data_Fim;
            escala.Baixada = dados.Baixada ?? "Não";
            escala.Statuss = dados.Statuss;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem = "Escala atualizada com sucesso.",
                id = escala.Id_Escala,
                dataInicio = escala.Data_Inicio,
                dataFim = escala.Data_Fim,
                baixada = escala.Baixada,
                status = escala.Statuss
            });
        }

        // ============================================================
        // EXCLUIR ESCALA
        // DELETE: api/Escala/1
        // ============================================================

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var escala = await _context.Escalas
                .FirstOrDefaultAsync(e =>
                    e.Id_Escala == id
                );

            if (escala == null)
            {
                return NotFound(new
                {
                    mensagem = "Escala não encontrada."
                });
            }

            _context.Escalas.Remove(escala);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensagem = "Escala excluída com sucesso."
            });
        }
    }
}
