using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Mappers;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    /// <summary>
    /// Kontroler za rute na entitetu Job
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class JobController:AppController<PrintJob, JobDTORead, JobDTOInsertUpdate>
    {
        /// <summary>
        /// Konstruktor, context i mapper
        /// </summary>
        /// <param name="context"></param>
        public JobController(PrintAppContext context) : base(context) 
        {
            DbSet = _context.PrintJobs;
            _mapper = new MappingJobs();
        }

        protected override void ControlDelete(PrintJob entity)
        {
           
        }
        /// <summary>
        /// Kreiranje novog entiteta te ažuriranje atributa u vezanim tablicama
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        protected override PrintJob KreirajEntitet(JobDTOInsertUpdate dto)
        {
            var printer = _context.Printers.Find(dto.PrinterId)
                ?? throw new Exception("Printer ID " + dto.PrinterId + " not found.");
            var material = _context.Materials.Find(dto.MaterialId)
                ?? throw new Exception("Resin ID " + dto.MaterialId + " not found.");
            var part = _context.Parts.Include(p => p.Project).FirstOrDefault(p => p.Id == dto.PartId)
                ?? throw new Exception("Part ID " + dto.PartId + " not found.");



            var entity = _mapper.MapInsertUpdatedFromDTO(dto);

            entity.Printer = printer;
            entity.Material = material;
            entity.Part = part;

            entity.Printer.FepCount = entity.Printer.FepCount + 1;
            entity.Printer.PrinterTime += entity.PrintTime;
            
            part.PrintTime += entity.PrintTime;
            part.PrintCount += 1;
            

            decimal costOfPrint = (decimal)(entity.Material.CostPerUnit * (entity.Volume / 1000));

            entity.Cost = costOfPrint;
            part.Cost = part.Cost + costOfPrint;
            if (entity.Part.Project != null)
            {
                entity.Part.Project.TotalCost += costOfPrint;
                part.Project.TotalPrintTime += entity.PrintTime;
                part.Project.TotalPrintCount += 1;
            }


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
                throw new Exception("No database records found.");
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
                ?? throw new Exception("Job ID " + id + " not found.");
        }

        protected override PrintJob PromjeniEntitet(JobDTOInsertUpdate dto, PrintJob entity)
        {
            var part = _context.Parts.Find(dto.PartId)
                ?? throw new Exception("Part ID " + dto.PartId + " not found.");
            var material = _context.Materials.Find(dto.MaterialId)
                ?? throw new Exception("Resin ID " + dto.MaterialId + " not found.");
            var printer = _context.Printers.Find(dto.PrinterId)
                ?? throw new Exception("Printer ID " + dto.PrinterId + " not found.");

            //entity.Result = dto.Result;
            entity.Volume = dto.Volume;
            entity.Material = material;
            entity.Part = part;
            entity.Printer = printer;

            return entity;
        }
    }
}
