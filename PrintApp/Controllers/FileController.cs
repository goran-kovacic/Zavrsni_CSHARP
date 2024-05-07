//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using PrintApp.Data;
//using PrintApp.Mappers;
//using PrintApp.Models;

//namespace PrintApp.Controllers
//{
//    [ApiController]
//    [Route("api/v1/[controller]")]
//    public class FileController:AppController<PrintFile, FileDTORead, FileDTOInsertUpdate>
//    {
//        public FileController(PrintAppContext context) : base(context) 
//        {
//            DbSet = _context.PrintFiles;
//            _mapper = new MappingFiles();
//        }

//        protected override void ControlDelete(PrintFile entity)
//        {
            
//        }

//        protected override List<FileDTORead> UcitajSve()
//        {
//            var list = _context.PrintFiles
//                .Include(p => p.Part).ToList();
//            if (list == null || list.Count == 0)
//            {
//                throw new Exception("nema podataka u bazi");
//            }
//            return _mapper.MapReadList(list);
//        }

//        protected override PrintFile NadiEntitet(int id)
//        {
//            return _context.PrintFiles
//                .Include(p => p.Part)                
//                .FirstOrDefault(x => x.Id == id)
//                ?? throw new Exception("ne postoji file sa sifrom " + id + " u bazi");
//        }

//        protected override PrintFile PromjeniEntitet(FileDTOInsertUpdate dto, PrintFile entity)
//        {
//            var part = _context.Parts.Find(dto.PartId)
//                ?? throw new Exception("Ne postoji part sa šifrom " + dto.PartId + " u bazi");

//            entity.FilePath = dto.FilePath;
//            entity.FileComment = dto.FileComment;
//            entity.FileType = dto.FileType;
//            entity.FileVersion = (int)dto.FileVersion;
//            entity.Part = part;

//            return entity;
//        }

//        protected override PrintFile KreirajEntitet(FileDTOInsertUpdate dto)
//        {
//            var part = _context.Parts.Find(dto.PartId)
//                ?? throw new Exception("Ne postoji part sa šifrom " + dto.PartId + " u bazi");
//            var entity = _mapper.MapInsertUpdatedFromDTO(dto);
//            entity.Part = part;

//            return entity;
//        }
//    }
//}
