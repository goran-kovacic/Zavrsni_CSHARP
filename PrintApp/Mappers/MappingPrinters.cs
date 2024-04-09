using AutoMapper;
using PrintApp.Models;

namespace PrintApp.Mappers
{
    public class MappingPrinters : Mapping<Printer, PrinterDTORead, PrinterDTOInsertUpdate>
    {
        public MappingPrinters()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Printer, PrinterDTORead>()
                .ConstructUsing(entity =>
                new PrinterDTORead(
                    entity.Id,
                    entity.Manufacturer,
                    entity.PrinterName,
                    entity.FepCount,
                    entity.PrinterTime,
                    entity.JobsInPrinter.Count() == null ? 0 : entity.JobsInPrinter.Count()
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<PrinterDTOInsertUpdate, Printer>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Printer, PrinterDTOInsertUpdate>()
                .ConstructUsing(entity =>
                new PrinterDTOInsertUpdate(
                    entity.PrinterName,
                    entity.Manufacturer
                    ));
            }));
        }
    }
}
