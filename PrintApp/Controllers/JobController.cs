using Microsoft.AspNetCore.Mvc;
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
            var printer = _context.Printers.Find(dto.PrinterId);
            var material = _context.Materials.Find(dto.MaterialId);
            var part = _context.Parts.Find(dto.PartId);
            var entity = _mapper.MapInsertUpdatedFromDTO(dto);

            entity.Printer = printer;
            entity.Material = material;
            entity.Part = part;

            return entity;
        }
    }
}
