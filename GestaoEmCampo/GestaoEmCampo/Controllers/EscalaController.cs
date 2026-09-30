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

        public EscalaController(
            GestaoEmCampoContext context)
        {
            _context = context;
        }

        // LISTAR ESCALA

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var escalas = await _context.Escalas
                .AsNoTracking()
                .ToListAsync();

            return Ok(escalas);
        }


        // BUSCAR ESCALA POR ID

        [HttpGet("{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var escala = await _context.Escalas
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    e => e.Id_Escala == id
                );


            if (escala == null)
            {
                return NotFound(new
                {
                    mensagem = "Escala não encontrada."
                });
            }


            return Ok(escala);
        }

        // CADASTRAR ESCALA

        [HttpPost]
        public async Task<IActionResult> Cadastrar(
            [FromBody] Escala escala)
        {
            if (escala == null)
            {
                return BadRequest(new
                {
                    mensagem =
                        "Os dados da escala são obrigatórios."
                });
            }


            _context.Escalas.Add(escala);

            await _context.SaveChangesAsync();


            return CreatedAtAction(
                nameof(Buscar),
                new
                {
                    id = escala.Id_Escala
                },
                escala
            );
        }

        // EDITAR ESCALA

        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(
            int id,
            [FromBody] Escala dados)
        {
            if (dados == null)
            {
                return BadRequest(new
                {
                    mensagem =
                        "Os dados da escala são obrigatórios."
                });
            }


            var escala = await _context.Escalas
                .FirstOrDefaultAsync(
                    e => e.Id_Escala == id
                );


            if (escala == null)
            {
                return NotFound(new
                {
                    mensagem =
                        "Escala não encontrada."
                });
            }

            // ATUALIZAR DADOS

            escala.Data_Inicio =
                dados.Data_Inicio;

            escala.Data_Fim =
                dados.Data_Fim;

            escala.Baixada =
                dados.Baixada;

            escala.Statuss =
                dados.Statuss;


            await _context.SaveChangesAsync();


            return Ok(escala);
        }
        // EXCLUIR ESCALA

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(
            int id)
        {
            var escala = await _context.Escalas
                .FirstOrDefaultAsync(
                    e => e.Id_Escala == id
                );


            if (escala == null)
            {
                return NotFound(new
                {
                    mensagem =
                        "Escala não encontrada."
                });
            }


            _context.Escalas.Remove(escala);

            await _context.SaveChangesAsync();


            return NoContent();
        }
    }
}

