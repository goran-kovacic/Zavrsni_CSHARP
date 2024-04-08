using Microsoft.AspNetCore.Mvc;
using PrintApp.Data;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PartController:ControllerBase
    {
        private readonly PrintAppContext _context;

        public PartController(PrintAppContext context)
        {
            _context = context; 
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Parts.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return new JsonResult(_context.Parts.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Part part)
        {
            _context.Parts.Add(part);
            _context.SaveChanges();

            return new JsonResult(part);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Part part)
        {
            var partDB = _context.Parts.Find(id);
            partDB.PartName = part.PartName;
            partDB.Cost = part.Cost;
            partDB.PrintTime = part.PrintTime;
            partDB.Project = part.Project;

            _context.Parts.Update(partDB);
            _context.SaveChanges(true);

            return new JsonResult(partDB);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var partFromDB = _context.Parts.Find(id);
            _context.Parts.Remove(partFromDB);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Deleted" });
        }
    }
}
