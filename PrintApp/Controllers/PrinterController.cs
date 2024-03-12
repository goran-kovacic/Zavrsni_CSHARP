using Microsoft.AspNetCore.Mvc;
using PrintApp.Data;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PrinterController
    {
        private readonly PrintAppContext _context;

        public PrinterController(PrintAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Printers.ToList());
        }

        [HttpPost]
        public IActionResult Post(Printer printer)
        {
            _context.Printers.Add(printer);
            _context.SaveChanges();
            return new JsonResult(printer);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Printer printer) 
        {
            var printerFromDB = _context.Printers.Find(id);
            printerFromDB.PrinterName = printer.PrinterName;
            printerFromDB.Manufacturer = printer.Manufacturer;
            printerFromDB.PrinterTime = printer.PrinterTime;
            printerFromDB.FepCount = printer.FepCount;

            _context.Printers.Update(printerFromDB);
            _context.SaveChanges(true);
            return new JsonResult(printerFromDB);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var printerFromDB = _context.Printers.Find(id);
            _context.Printers.Remove(printerFromDB);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Deleted" });
        }
    }
}
