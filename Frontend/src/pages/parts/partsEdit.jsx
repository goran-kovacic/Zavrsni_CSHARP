import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from '../../services/PartService';
import ProjectService from '../../services/ProjectService';
import useError from "../../hooks/useError";


export default function partsEdit(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const[part, setParts] = useState({});

    const [project, setProject] = useState([]);
    const [sifraProject, setSifraProject] = useState(0);

    const {prikaziError} = useError(); 

    async function dohvatiPart(){
        const odgovor = await Service.getBySifra('Part', routeParams.id);
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        
    }

    
}