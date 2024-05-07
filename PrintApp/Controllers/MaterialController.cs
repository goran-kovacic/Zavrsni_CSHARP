using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Models;
using System.Text;

namespace PrintApp.Controllers
{
    /// <summary>
    /// Kontroler za rute na entitetu Material
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MaterialController:AppController<Material, MaterialDTORead, MaterialDTOInsertUpdate>
    {
        public MaterialController(PrintAppContext context) : base(context) 
        {
            DbSet = _context.Materials;
        }

        protected override void ControlDelete(Material entity)
        {
            var jobs = _context.PrintJobs
                .Include(p => p.Material)
                .Where(p => p.Material.Id == entity.Id).ToList();

            if(jobs !=null && jobs.Count > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Cannot delete part because of foreign keys");
                throw new Exception(sb.ToString());
            }
        }
    }
}
