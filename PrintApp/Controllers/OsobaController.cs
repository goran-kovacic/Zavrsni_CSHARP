using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Models;
using System.Text.Json;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OsobaController:ControllerBase
    {
        private readonly PrintAppContext _context;

        public OsobaController(PrintAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Osobe.ToList());
        }

        [HttpPost]
        [Route("rucni_unos")]
        public IActionResult Post(Osoba osoba)
        {
            _context.Osobe.Add(osoba);
            _context.SaveChanges();

            return new JsonResult(osoba);
        }

        [HttpPost]
        [Route("unososoba/{number:int}")]
        public IActionResult PostXRand( int number) 
        {
            try
            {
                for (int i = 1; i <= number; i++)
                {
                    var o = new Osoba();
                    o.Ime = Faker.Name.First();
                    o.Age = Faker.RandomNumber.Next(18, 68);
                    o.weight = Faker.Finance.Coupon();
                    o.isAlive = Faker.Boolean.Random();

                    _context.Osobe.Add(o);

                }
                _context.SaveChanges();

                return new JsonResult("dodano");
            }
            catch(Exception e)
            {
                throw new JsonException(e.Message);
            }
           
            
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Osoba osoba)
        {
            var osobaDB= _context.Osobe.Find(id);
            
            osobaDB.Ime = osoba.Ime;
            osobaDB.weight = osoba.weight;
            osoba.isAlive = osoba.isAlive;
            osoba.Age = osoba.Age;

            _context.Osobe.Update(osobaDB);
            _context.SaveChanges(true);

            return new JsonResult(osobaDB);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var osobaDB = _context.Osobe.Find(id);
            _context.Osobe.Remove(osobaDB);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Deleted" });
        }

        [HttpDelete]
        [Route("brisi_sve")]
        [Produces("application/json")]
        public IActionResult Delete()
        {
            _context.Database.ExecuteSqlRaw("delete from osobe");


            return new JsonResult(new { poruka = "sve obrisano" });
        }

    }
}
