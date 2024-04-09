using AutoMapper;
using PrintApp.Models;

namespace PrintApp.Mappers
{
    public class MappingJobs : Mapping<PrintJob, JobDTORead, JobDTOInsertUpdate>
    {
        public MappingJobs() 
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PrintJob, JobDTORead>()
                .ConstructUsing(entity =>
                new JobDTORead(
                    entity.Id,
                    entity.Cost,
                    entity.PrintTime,
                    entity.Result,
                    entity.Volume,
                    entity.Material == null ? "" : entity.Material.MaterialName,
                    entity.Part == null ? "" : entity.Part.PartName,
                    entity.Printer == null ? "" : entity.Printer.PrinterName
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<JobDTOInsertUpdate, PrintJob>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PrintJob, JobDTOInsertUpdate>()
                .ConstructUsing(entity =>
                new JobDTOInsertUpdate(
                    entity.Result,
                    entity.Volume,
                    entity.Material == null ? null : entity.Material.Id,
                    entity.Part == null ? null : entity.Part.Id,
                    entity.Printer == null ? null : entity.Printer.Id
                    ));
            }));
        }
    }
}
