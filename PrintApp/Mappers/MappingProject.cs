using AutoMapper;
using PrintApp.Models;

namespace PrintApp.Mappers
{
    public class MappingProject : Mapping<Project, ProjectDTORead, ProjectDTOInsertUpdate>
    {
        public MappingProject() 
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Project, ProjectDTORead>()
                .ConstructUsing(entity =>
                new ProjectDTORead(
                    entity.Id,
                    entity.ProjectName,
                    entity.CreationDate,
                    entity.CompletionDate,
                    entity.IsCompleted,
                    entity.TotalPrintTime,
                    entity.TotalPrintCount,
                    entity.TotalCost,
                    entity.ProjectDescription,
                    entity.PartsInProject.Count
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<ProjectDTOInsertUpdate, Project>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Project, ProjectDTOInsertUpdate>();
                //.ConstructUsing(entity =>
                //new ProjectDTOInsertUpdate(
                //    entity.ProjectName,
                //    entity.ProjectDescription,
                //    entity.CreationDate,
                //    entity.CompletionDate
                //    ));
            }));
        }
    }
}
