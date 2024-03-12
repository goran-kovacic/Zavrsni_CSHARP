using Microsoft.AspNetCore.Mvc;
using PrintApp.Data;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MaterialController
    {
        private readonly PrintAppContext _context;

        public MaterialController(PrintAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Materials.ToList());
        }

        [HttpPost]
        public IActionResult Post(Material material)
        {
            _context.Materials.Add(material);
            _context.SaveChanges();

            return new JsonResult(material);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Material material)
        {
            var materialFromDB = _context.Materials.Find(id);
            materialFromDB.MaterialName = material.MaterialName;
            materialFromDB.Manufacturer = material.Manufacturer;
            materialFromDB.LiftDistance = material.LiftDistance;
            materialFromDB.BottomLiftDistance = material.BottomLiftDistance;
            materialFromDB.BottomExposure = material.BottomExposure;
            materialFromDB.BottomLiftSpeed = material.BottomLiftSpeed;
            materialFromDB.BottomRetractSpeed = material.BottomRetractSpeed;
            materialFromDB.CalibratedExposure = material.CalibratedExposure;
            materialFromDB.CostPerUnit = material.CostPerUnit;
            materialFromDB.LayerHeight = material.LayerHeight;
            materialFromDB.LiftSpeed = material.LiftSpeed;
            materialFromDB.LightOffDelay = material.LightOffDelay;
            materialFromDB.RetractSpeed = material.RetractSpeed;

            _context.Materials.Update(materialFromDB);
            _context.SaveChanges(true);

            return new JsonResult(materialFromDB);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var materialFromDB = _context.Materials.Find(id);
            _context.Materials.Remove(materialFromDB);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Deleted" });
        }
    }
}
