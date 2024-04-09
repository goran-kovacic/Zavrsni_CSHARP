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

        
    }
}
