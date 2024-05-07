//using AutoMapper;
//using PrintApp.Models;

//namespace PrintApp.Mappers
//{
//    public class MappingFiles : Mapping<PrintFile, FileDTORead, FileDTOInsertUpdate>
//    {
//        public MappingFiles() 
//        {
//            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
//            {
//                c.CreateMap<PrintFile, FileDTORead>()
//                .ConstructUsing(entity =>
//                new FileDTORead(
//                    entity.Id,
//                    entity.FileComment,
//                    entity.FilePath,
//                    entity.FileType,
//                    entity.FileVersion,
//                    entity.Part == null ? "" : entity.Part.PartName
//                    ));
//            }));

//            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
//            {
//                c.CreateMap<FileDTOInsertUpdate, PrintFile>();
//            }));

//            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
//            {
//                c.CreateMap<PrintFile, FileDTOInsertUpdate>()
//                .ConstructUsing(entity =>
//                new FileDTOInsertUpdate(
//                    entity.FilePath,
//                    entity.FileComment,
//                    entity.FileType,
//                    entity.FileVersion,
//                    entity.Part == null ? null : entity.Part.Id
//                    ));
//            }));
//        }
//    }
//}
