import {
    get,
    obrisi,
    dodaj,
    getBySifra,
    promjeni,
    dohvatiPorukeAlert,
    HttpService,
    obradiUspjeh,
    obradiGresku
} from "./HttpService";

async function getWithPart(id){
    return await HttpService.get('/Part/Job' + id).then((res) => {
        return obradiUspjeh(res);
    })
        .catch((e) => {
            return obradiGresku(e);
        });
}

export default {
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra,
    dohvatiPorukeAlert,
    getWithPart
};