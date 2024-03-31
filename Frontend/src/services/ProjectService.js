import {HttpService} from "./HttpService"

const naziv = '/Project'

async function get(){
    return await HttpService.get(naziv)
    .then((odgovor=>{
        //console.table(odgovor.data);
        return odgovor.data;
    }))
    .catch((e)=>{
        //console.log(e);
        return e;
    })
}

async function post(project){
    return await HttpService.post(naziv, project)
    .then((odgovor=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data};
    }))
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function del(id){
    return await HttpService.delete(naziv + '/' + id)
    .then((odgovor=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data.poruka};
    }))
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

export default{
    get,
    post,
    del
}