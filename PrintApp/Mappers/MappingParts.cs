using AutoMapper;
using PrintApp.Models;

namespace PrintApp.Mappers
{
    public class MappingParts : Mapping<Part, PartDTORead, PartDTOInsertUpdate>
    {
        public MappingParts()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Part, PartDTORead>()
                .ConstructUsing(entity =>
                new PartDTORead(
                    entity.Id,
                    entity.PartName,
                    entity.Cost,
                    entity.PrintTime,
                    entity.PrintCount == null ? 0 : entity.PrintCount.Value,
                    entity.Project == null ? "" : entity.Project.ProjectName,
                    entity.FilesInPart == null ? 0 : entity.FilesInPart.Count,
                    entity.JobsInPart == null ? 0 : entity.JobsInPart.Count,
                    PutanjaDatoteke(entity)
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PartDTOInsertUpdate, Part>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Part, PartDTOInsertUpdate>()
                .ConstructUsing(entity =>
                new PartDTOInsertUpdate(
                    entity.PartName,
                    entity.Project == null ? null : entity.Project.Id,
                    entity.PrintCount == null ? null : entity.PrintCount.Value,
                    entity.PrintTime == null ? null : entity.PrintTime.Value,
                    entity.Cost == null ? null : entity.Cost.Value
                    ));
            }));
        }

        private string? PutanjaDatoteke(Part e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "datoteke" + ds + "parts" + ds);
                DirectoryInfo d = new DirectoryInfo(dir);
                FileInfo[] Files = d.GetFiles(e.Id + "_*").OrderBy(p => p.CreationTime).ToArray(); 
                return Files != null && Files.Length > 0 ? "/datoteke/parts/" + Files[Files.Length - 1].Name : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
