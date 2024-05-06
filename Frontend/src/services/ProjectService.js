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

async function obrisiSVE(id) {
    return await HttpService.delete('/Project/RemoveProjectPartJob/' + id).then((res) => {
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
    obrisiSVE
};