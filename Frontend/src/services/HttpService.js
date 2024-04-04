import axios from "axios";


export const HttpService = axios.create({

    // baseURL:'https://kovacicg-001-site1.ltempurl.com/api/v1',
    baseURL:'https://printtracker.runasp.net/api/v1',
    headers:{
        'Content-Type' : 'application/json'
    }

});