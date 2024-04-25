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
                    entity.Project == null ? "" : entity.Project.ProjectName,
                    entity.FilesInPart == null ? 0 : entity.FilesInPart.Count,
                    entity.JobsInPart == null ? 0 : entity.JobsInPart.Count
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
                    entity.Project == null ? null : entity.Project.Id
                    ));
            }));
        }
    }
}
