using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Mappers;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class JobController:AppController<PrintJob, JobDTORead, JobDTOInsertUpdate>
    {
        public JobController(PrintAppContext context) : base(context) 
        {
            DbSet = _context.PrintJobs;
            _mapper = new MappingJobs();
        }

        protected override void ControlDelete(PrintJob entity)
        {
           
        }

        protected override PrintJob KreirajEntitet(JobDTOInsertUpdate dto)
        {
            var printer = _context.Printers.Find(dto.PrinterId)
                ?? throw new Exception("Ne postoji printer sa šifrom " + dto.PrinterId + " u bazi");
            var material = _context.Materials.Find(dto.MaterialId)
                ?? throw new Exception("Ne postoji resin sa šifrom " + dto.MaterialId + " u bazi");
            var part = _context.Parts.Find(dto.PartId)
                ?? throw new Exception("Ne postoji part sa šifrom " + dto.PartId + " u bazi");
            var entity = _mapper.MapInsertUpdatedFromDTO(dto);

            entity.Printer = printer;
            entity.Material = material;
            entity.Part = part;

            entity.Printer.FepCount = entity.Printer.FepCount + 1;
            entity.Printer.PrinterTime = entity.Printer.PrinterTime + entity.PrintTime;

            return entity;
        }

        protected override List<JobDTORead> UcitajSve()
        {
            var list = _context.PrintJobs
                .Include(p => p.Part)
                .Include(p => p.Material)
                .Include(p => p.Printer)
                .ToList();
            if(list == null || list.Count == 0)
            {
                throw new Exception("nema podataka u bazi");
            }
            return _mapper.MapReadList(list);
        }

        protected override PrintJob NadiEntitet(int id)
        {
            return _context.PrintJobs
                .Include(p => p.Part)
                .Include(p => p.Material)
                .Include(p => p.Printer)
                .FirstOrDefault(x => x.Id == id)
                ?? throw new Exception("ne postoji job sa sifrom " + id + " u bazi");
        }

        protected override PrintJob PromjeniEntitet(JobDTOInsertUpdate dto, PrintJob entity)
        {
            var part = _context.Parts.Find(dto.PartId)
                ?? throw new Exception("Ne postoji part sa šifrom " + dto.PartId + " u bazi");
            var material = _context.Materials.Find(dto.MaterialId)
                ?? throw new Exception("Ne postoji material sa šifrom " + dto.MaterialId + " u bazi");
            var printer = _context.Printers.Find(dto.PrinterId)
                ?? throw new Exception("Ne postoji printer sa šifrom " + dto.PrinterId + " u bazi");

            entity.Result = dto.Result;
            entity.Volume = dto.Volume;
            entity.Material = material;
            entity.Part = part;
            entity.Printer = printer;

            return entity;
        }
    }
}
