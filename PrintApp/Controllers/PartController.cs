using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrintApp.Data;
using PrintApp.Mappers;
using PrintApp.Models;
using System.Text;

namespace PrintApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PartController: AppController<Part, PartDTORead, PartDTOInsertUpdate>
    {
        public PartController(PrintAppContext context) : base(context)
        {
            DbSet = _context.Parts;
            _mapper = new MappingParts();
        }

        protected override void ControlDelete(Part entity)
        {
            if (entity != null
                && (entity.FilesInPart != null && entity.FilesInPart.Count() > 0)
                || (entity.JobsInPart !=null && entity.JobsInPart.Count() > 0))
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Cannot delete part because of foreign keys");
                throw new Exception(sb.ToString()[..^2]);
            }
        }

        protected override List<PartDTORead> UcitajSve()
        {
            var list = _context.Parts
                .Include(p => p.Project)
                .Include(p => p.JobsInPart)
                .Include(p => p.FilesInPart)
                .ToList();
            if(list == null || list.Count == 0)
            {
                throw new Exception("nema podataka u bazi");
            }
            return _mapper.MapReadList(list);
        }

        protected override Part NadiEntitet(int id)
        {
            return _context.Parts
                .Include(p => p.Project)
                .Include(p => p.JobsInPart)
                .Include(p => p.FilesInPart)
                .FirstOrDefault(x => x.Id == id)
                ?? throw new Exception("ne postoji part sa sifrom " + id + " u bazi");
        }

        protected override Part PromjeniEntitet(PartDTOInsertUpdate dto, Part entity)
        {
            var project = _context.Projects.Find(dto.ProjectId)
                ?? throw new Exception("Ne postoji project sa šifrom " + dto.ProjectId + " u bazi");

            entity.PartName = dto.PartName;
            entity.Project = project;

            return entity;
        }

        protected override Part KreirajEntitet(PartDTOInsertUpdate dto)
        {
            var project = _context.Projects.Find(dto.ProjectId)
                ?? throw new Exception("Ne postoji project sa šifrom " + dto.ProjectId + " u bazi");
            var entity = _mapper.MapInsertUpdatedFromDTO(dto);
            entity.FilesInPart = new List<PrintFile>();
            entity.JobsInPart = new List<PrintJob>();

            entity.Project = project;

            return entity;
        }
    }
}
