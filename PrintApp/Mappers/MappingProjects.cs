using PrintApp.Models;
using AutoMapper;

namespace PrintApp.Mappers
{
    public class MappingProjects : Mapping<Project, ProjectDTORead, ProjectDTOInsertUpdate>
    {
        public MappingProjects()
        {
            MapperMapReadToDTO = new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Project, ProjectDTORead>()
                    .ConstructUsing(entitet =>
                    new ProjectDTORead(
                        entitet.Id,
                        entitet.ProjectName,
                        entitet.CreationDate,
                        entitet.CompletionDate,
                        entitet.IsCompleted,
                        entitet.TotalPrintTime,
                        entitet.TotalPrintCount,
                        entitet.TotalCost,
                        entitet.ProjectDescription,
                        //entitet.PartsInProject == null ? 0 : entitet.PartsInProject.Count(),
                        PutanjaDatoteke(entitet)
                        ));
                }));

            //MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            //{
            //    c.CreateMap<ProjectDTOInsertUpdate, Project>();
            //}));

            MapperMapInsertUpdateToDTO = new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Project, ProjectDTOInsertUpdate>()
                    .ConstructUsing(entitet =>
                    new ProjectDTOInsertUpdate(
                        entitet.ProjectName,
                        entitet.ProjectDescription,
                        entitet.CreationDate,
                        entitet.CompletionDate,
                        entitet.IsCompleted,
                        entitet.TotalPrintTime,
                        entitet.TotalPrintCount,
                        entitet.TotalCost,
                        PutanjaDatoteke(entitet)
                        ));
                }));
        }

        private static string PutanjaDatoteke(Project e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "projects" + ds + e.Id + ".png");
                return File.Exists(slika) ? "/slike/polaznici/" + e.Id + ".png" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
