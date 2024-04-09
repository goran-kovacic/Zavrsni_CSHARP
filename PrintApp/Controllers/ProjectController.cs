using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
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

        protected override Project KreirajEntitet(ProjectDTOInsertUpdate dto)
        {
            var entity = _mapper.MapInsertUpdatedFromDTO(dto);
            entity.PartsInProject = new List<Part>();
            return entity;
        }

        protected override List<ProjectDTORead> UcitajSve()
        {
            var list = _context.Projects.Include(p => p.PartsInProject).ToList();

            if(list == null ||list.Count == 0)
            {
                throw new Exception("nema podataka u bazi");
            }
            return _mapper.MapReadList(list);
        }


    }
}
