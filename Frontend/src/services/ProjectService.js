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

export default{
    get
}