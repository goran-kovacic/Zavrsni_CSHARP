using Microsoft.AspNetCore.Mvc;
using PrintApp.Data;

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
    }
}
