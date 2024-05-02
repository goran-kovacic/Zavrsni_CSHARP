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

    }
}
