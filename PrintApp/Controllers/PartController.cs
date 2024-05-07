using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Mappers;
using PrintApp.Models;
using System.Text;

namespace PrintApp.Controllers
{
    /// <summary>
    /// Kontroler za rute na entitetu Part
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PartController: AppController<Part, PartDTORead, PartDTOInsertUpdate>
    {
        public PartController(PrintAppContext context) : base(context)
        {
            DbSet = _context.Parts;
            _mapper = new MappingParts();
        }

        protected override void ControlDelete(Part entity)
        {
            if (entity != null
                && (entity.JobsInPart !=null && entity.JobsInPart.Count() > 0))
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Cannot delete part because of foreign keys");
                throw new Exception(sb.ToString());
            }
        }

        protected override List<PartDTORead> UcitajSve()
        {
            var list = _context.Parts
                .Include(p => p.Project)
                .Include(p => p.JobsInPart)
                //.Include(p => p.FilesInPart)
                .ToList();
            if(list == null || list.Count == 0)
            {
                throw new Exception("No database records found.");
            }
            return _mapper.MapReadList(list);
        }

        protected override Part NadiEntitet(int id)
        {
            return _context.Parts
                .Include(p => p.Project)
                .Include(p => p.JobsInPart)
                //.Include(p => p.FilesInPart)
                .FirstOrDefault(x => x.Id == id)
                ?? throw new Exception("Part ID " + id + " not found.");
        }

        protected override Part PromjeniEntitet(PartDTOInsertUpdate dto, Part entity)
        {
            var project = _context.Projects.Find(dto.IdProject)
                ?? throw new Exception("Project ID " + dto.IdProject + " not found.");

            entity.PartName = dto.PartName;
            entity.Project = project;

            return entity;
        }

        protected override Part KreirajEntitet(PartDTOInsertUpdate dto)
        {            
            //var project = _context.Projects.Find(dto.IdProject)
            //  ?? throw new Exception("Ne postoji project sa šifrom " + dto.IdProject + " u bazi");

            var project = _context.Projects.Find(dto.IdProject) ?? null;

            var entity = _mapper.MapInsertUpdatedFromDTO(dto);

            entity.Project = project;
            //entity.FilesInPart = new List<PrintFile>();
            entity.JobsInPart = new List<PrintJob>();

            if (entity.Cost == null) { entity.Cost = 0; }
            if (entity.PrintTime == null) { entity.PrintTime = 0; }
            if (entity.PrintCount == null) { entity.PrintCount = 0; }

            return entity;
        }
        /// <summary>
        /// Dohvaća sve entitete Job vezane za Part
        /// </summary>
        /// <param name="partId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Job/{partId:int}")]
        public IActionResult GetJobs(int partId)
        {
            if (!ModelState.IsValid || partId <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var jobs = _context.PrintJobs
                    .Include(i => i.Part)
                    .Include(i => i.Material)
                    .Include(i => i.Printer)
                    .Where(x => x.Part.Id == partId).ToList();


                    
                    //.Include(i => i.Material).Where(x => x.Material.Id == partId).ToList();
                if (jobs == null)
                {
                    return BadRequest("Parts list is null.");
                }
                var mp = new MappingJobs();
                return new JsonResult(mp.MapReadList(jobs));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Upload datoteka koje predstavljaju Part
        /// </summary>
        /// <param name="partId"></param>
        /// <param name="datoteka"></param>
        /// <returns></returns>
        [HttpPatch]
        [Route("{partId:int}")]
        public async Task<ActionResult> Patch(int partId, IFormFile datoteka)
        {
            if (datoteka == null)
            {
                return BadRequest("File not specified.");
            }

            var entitetIzbaze = _context.Parts.Find(partId);

            if (entitetIzbaze == null)
            {
                return BadRequest("Part ID " + partId + " not found.");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "datoteke" + ds + "parts");
                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + partId + "_" + System.IO.Path.GetExtension(datoteka.FileName));
                Stream fileStream = new FileStream(putanja, FileMode.Create);
                await datoteka.CopyToAsync(fileStream);
                return Ok("File uploaded.");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
