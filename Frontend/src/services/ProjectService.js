import {get,obrisi,dodaj,getBySifra,promjeni,dohvatiPorukeAlert} from "./HttpService";

// const naziv = '/Project'

// async function get(){
//     return await HttpService.get(naziv)
//     .then((odgovor=>{
//         //console.table(odgovor.data);
//         return odgovor.data;
//     }))
//     .catch((e)=>{
//         //console.log(e);
//         return e;
//     })
// }

// async function post(project){
//     return await HttpService.post(naziv, project)
//     .then((odgovor=>{
//         //console.table(odgovor.data);
//         return {greska: false, poruka: odgovor.data};
//     }))
//     .catch((e)=>{
//         //console.log(e);
//         return {greska: true, poruka: e};
//     })
// }

// async function put(id, project){
//     return await HttpService.put(naziv + '/' + id, project)
//     .then((odgovor=>{
//         //console.table(odgovor.data);
//         return {greska: false, poruka: odgovor.data};
//     }))
//     .catch((e)=>{
//         //console.log(e);
//         return {greska: true, poruka: e};
//     })
// }

// async function del(id){
//     return await HttpService.delete(naziv + '/' + id)
//     .then((odgovor=>{
//         //console.table(odgovor.data);
//         return {greska: false, poruka: odgovor.data.poruka};
//     }))
//     .catch((e)=>{
//         //console.log(e);
//         return {greska: true, poruka: e};
//     })
// }

// async function getById(id){
//     return await HttpService.get(naziv + '/' + id)
//     .then((o)=>{
//         return {greska: false, poruka: o.data}
//     })
//     .catch((e)=>{
//         return{greska:true, poruka: e}
//     });
// }

export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra,    
    dohvatiPorukeAlert
};