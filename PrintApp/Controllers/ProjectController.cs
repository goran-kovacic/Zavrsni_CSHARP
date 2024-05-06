using Microsoft.AspNetCore.Http.HttpResults;
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
    public class ProjectController : AppController<Project, ProjectDTORead, ProjectDTOInsertUpdate>
    {

        public ProjectController(PrintAppContext context) : base(context) 
        {
            DbSet = _context.Projects;
            _mapper = new MappingProjects();
        }

        protected override void ControlDelete(Project entity)
        {
            var parts = _context.Parts
                .Include(x => x.Project)
                .Where(x => x.Project.Id == entity.Id)
                .ToList();
            if(parts != null && parts.Count > 0) 
            {
                StringBuilder sb = new();
                sb.Append("Cannot delete project because it has the following parts: ");
                foreach (var e in parts)
                {
                    sb.Append(e.PartName).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }
        }


        [HttpGet]
        [Route("Part/{projectId:int}")]
        public IActionResult GetParts(int projectId)
        {
            if (!ModelState.IsValid || projectId <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var parts = _context.Parts
                    .Include(i => i.Project).Where(x => x.Project.Id == projectId).ToList();
                if(parts == null)
                {
                    return BadRequest("Parts list is null");
                }
                var mp = new MappingParts();
                return new JsonResult(mp.MapReadList(parts));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected override Project KreirajEntitet(ProjectDTOInsertUpdate dto)
        {
            var entity = _mapper.MapInsertUpdatedFromDTO(dto);

            if (entity.TotalCost == null)
            {
                entity.TotalCost = 0;
            }
            if(entity.TotalPrintCount == null)
            {
                entity.TotalPrintCount = 0;
            }
            if(entity.TotalPrintTime == null)
            {
                entity.TotalPrintTime = 0;
            }

            return entity;
        }

        [HttpDelete("RemoveProjectPartJob/{id:int}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects
                .Include(p => p.PartsInProject)
                .ThenInclude(part => part.JobsInPart)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }
            
            foreach (var part in project.PartsInProject)
            {
                _context.PrintJobs.RemoveRange(part.JobsInPart);
            }

            _context.Parts.RemoveRange(project.PartsInProject);
            
            _context.Projects.Remove(project);
            
            await _context.SaveChangesAsync();

            return Ok("Obrisano");
        }

        [HttpPut]
        [Route("postaviSliku/{id:int}")]
        public IActionResult PostaviSliku(int id, SlikaDTO slika)
        {
            if (id <= 0)
            {
                return BadRequest("Šifra mora biti veća od nula (0)");
            }
            if (slika.Base64 == null || slika.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = _context.Projects.Find(id);
            if (p == null)
            {
                return BadRequest("Ne postoji project s šifrom " + id + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "projects");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(slika.Base64));
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
