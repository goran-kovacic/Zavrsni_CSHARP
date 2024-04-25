import {get,obrisi,dodaj,getBySifra,promjeni,dohvatiPorukeAlert, HttpService, obradiUspjeh, obradiGresku} from "./HttpService";

async function getWithProject( id){
    return await HttpService.get('/Project/Part/' + id).then((res)=>{
        return obradiUspjeh(res);})
        .catch((e)=>{
            return obradiGresku(e);
        });
}

export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra,    
    dohvatiPorukeAlert,
    getWithProject
};