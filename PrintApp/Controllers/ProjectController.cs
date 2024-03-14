using Microsoft.AspNetCore.Mvc;
using PrintApp.Data;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProjectController:ControllerBase
    {
        private readonly PrintAppContext _context;

        public ProjectController(PrintAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Projects.ToList());
        }

        [HttpPost]
        public IActionResult Post(Project project) 
        {
            _context.Projects.Add(project);
            _context.SaveChanges();

            return new JsonResult(project);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Project project) 
        {
            var projectDB = _context.Projects.Find(id);
            projectDB.ProjectName = project.ProjectName;
            projectDB.TotalPrintTime = project.TotalPrintTime;
            projectDB.TotalPrintCount = project.TotalPrintCount;
            projectDB.TotalCost = project.TotalCost;
            projectDB.ProjectDescription = project.ProjectDescription;
            projectDB.IsCompleted = project.IsCompleted;
            projectDB.CompletionDate = project.CompletionDate;
            projectDB.CreationDate = project.CreationDate;

            _context.Projects.Update(projectDB);
            _context.SaveChanges(true);

            return new JsonResult(projectDB);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id) 
        {
            var projectFromDB = _context.Projects.Find(id);
            _context.Projects.Remove(projectFromDB);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Deleted"});
        }
    }
}
