import  {get,obrisi,dodaj,getBySifra,promjeni,dohvatiPorukeAlert, HttpService, obradiUspjeh, obradiGresku, reset} from "./HttpService";

async function resetFep(naziv, id){
    return await HttpService.reset('/' + naziv + '/' + id).then((res)=>{
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
    resetFep,
    reset
};