using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Mappers;
using PrintApp.Models;
using System.Text;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PrinterController : AppController<Printer, PrinterDTORead, PrinterDTOInsertUpdate>
    {
        public PrinterController(PrintAppContext context) : base(context)
        {
            DbSet = _context.Printers;
            _mapper = new MappingPrinters();
        }

        protected override void ControlDelete(Printer entity)
        {
            if (entity != null && entity.JobsInPrinter != null && entity.JobsInPrinter.Count() > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Cannot delete because of foreign keys");
                throw new Exception(sb.ToString()[..^2]);
            }
        }

        protected override List<PrinterDTORead> UcitajSve()
        {
            var list = _context.Printers
                .Include(p => p.JobsInPrinter)
                .ToList();
            if (list == null || list.Count == 0)
            {
                throw new Exception("nema podataka u bazi");
            }
            return _mapper.MapReadList(list);
        }

        protected override Printer NadiEntitet(int id)
        {
            return _context.Printers
                .Include(p => p.JobsInPrinter)
                .FirstOrDefault(x => x.Id == id)
                ?? throw new Exception("ne postoji printer sa sifrom " + id + " u bazi");
        }

        protected override Printer KreirajEntitet(PrinterDTOInsertUpdate dto)
        {
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.JobsInPrinter = new List<PrintJob>();
            return entitet;
        }

        [HttpPatch]
        [Route("{id:int}")]
        public async Task<ActionResult> ResetFep(int id)
        {
            var entitet = _context.Printers.Find(id);

            if (entitet == null)
            {
                return BadRequest("Ne postoji printer sa sifrom " + id + " u bazi");
            }
            entitet.FepCount = 0;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Fep counter reset");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
