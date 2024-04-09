using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Mappers;
using PrintApp.Models;

namespace PrintApp.Controllers
{
    public abstract class AppController<T, TDR, TDI>(PrintAppContext context) : ControllerBase where T : Entity
    {
        protected DbSet<T> DbSet = null;
        protected Mapping<T, TDR, TDI> _mapper = new();
        protected abstract void ControlDelete(T entity);
        protected readonly PrintAppContext _context = context;

        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                return new JsonResult(UcitajSve());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBySifra(int id)
        {
            if (!ModelState.IsValid || id <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var entitet = NadiEntitet(id);
                return new JsonResult(_mapper.MapInsertUpdateToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(TDI entitetDTO)
        {
            if (!ModelState.IsValid || entitetDTO == null)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var entitet = KreirajEntitet(entitetDTO);
                _context.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created,
                                       _mapper.MapReadToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, TDI dto)
        {
            if (id <= 0 || !ModelState.IsValid || dto == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var entitetIzBaze = NadiEntitet(id);
                _context.Entry(entitetIzBaze).State = EntityState.Detached;
                var entitet = PromjeniEntitet(dto, entitetIzBaze);
                entitet.Id = id;
                _context.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, _mapper.MapReadToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid || id <= 0)
            {
                return BadRequest();
            }
            try
            {
                var entitetIzbaze = NadiEntitet(id);
                ControlDelete(entitetIzbaze);
                _context.Remove(entitetIzbaze);
                _context.SaveChanges();
                return Ok("Obrisano");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected virtual T NadiEntitet(int id)
        {
            var entitetIzbaze = DbSet?.Find(id);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji entitet s šifrom " + id + " u bazi");
            }

            return entitetIzbaze;
        }


        protected virtual List<TDR> UcitajSve()
        {
            var lista = DbSet?.ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected virtual T KreirajEntitet(TDI dto)
        {
            return _mapper.MapInsertUpdatedFromDTO(dto);
        }

        protected virtual T PromjeniEntitet(TDI dto, T s)
        {
            return _mapper.MapInsertUpdatedFromDTO(dto);
        }
    }
}
