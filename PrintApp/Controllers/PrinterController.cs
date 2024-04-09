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
    public class PrinterController: AppController<Printer, PrinterDTORead, PrinterDTOInsertUpdate>
    {
        public PrinterController(PrintAppContext context) : base(context) 
        {
            DbSet = _context.Printers;
            _mapper = new MappingPrinters();
        }

        protected override void ControlDelete(Printer entity)
        {
            if(entity != null && entity.JobsInPrinter!=null && entity.JobsInPrinter.Count() > 0)
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

        

    }
}
