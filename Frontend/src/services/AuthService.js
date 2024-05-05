import { HttpService, obradiUspjeh } from './HttpService';

export async function logInService(podaci) {
  return await HttpService
    .post('/Autorizacija/token', podaci)
    .then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return { greska: true , podaci: [{svojstvo: 'Autorizacija', poruka: e.response.data}]}});
}