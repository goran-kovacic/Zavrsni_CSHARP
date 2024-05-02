import { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import Service from '../../services/JobService';
import { RouteNames } from "../../constants";
import { Container, Form, FormGroup, FormLabel } from "react-bootstrap";
import Akcije from "../../components/Akcije";
import InputText from "../../components/InputText";


export default function jobsAdd(){
    const navigate = useNavigate();

    const [part, setPart] = useState([]);    
    const [sifraPart,setSifraPart] = useState(0);

    const [printer, setPrinter] = useState([]);
    const [sifraPrinter, setSifraPrinter] = useState(0);

    const [resin, setResin] = useState([]);
    const [sifraResin, setSifraResin] = useState(0);

    const {prikaziError} = useError();
    const {showLoading, hideLoading} = useLoading();

    async function dohvatiParts(){
        showLoading();
        const odgovor = await Service.get('Part');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setPart(odgovor.podaci);
        setSifraPart(odgovor.podaci[0].id);
    }

    async function dohvatiResins(){
        const odgovor = await Service.get('Material');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setResin(odgovor.podaci);
        setSifraResin(odgovor.podaci[0].id);
    }

    async function dohvatiPrinters(){
        const odgovor = await Service.get('Printer');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setPrinter(odgovor.podaci);
        setSifraPrinter(odgovor.podaci[0].id);
    }

    async function ucitaj(){
        showLoading();
        await dohvatiParts();
        await dohvatiResins();
        await dohvatiPrinters();
        hideLoading();
    }

    useEffect(()=>{
        ucitaj();
    },[]);

    async function dodaj(e){
        showLoading();
        const odgovor = await Service.dodaj('Job',e);
        hideLoading();
        if(odgovor.ok){
            navigate(RouteNames.JOB_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        dodaj({
            partId: parseInt(sifraPart),
            materialId: parseInt(sifraResin),
            printerId: parseInt(sifraPrinter),
            volume: podaci.get('Volume (mL)'),
            printTime: podaci.get('Print Time (minutes)')
        });
    }

    return(
        <Container className="mt-4">
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3" controlId="part">
                    <FormLabel>Part</FormLabel>
                    <Form.Select onChange={(e)=>{setSifraPart(e.target.value)}}>
                        <option>Select Part</option>

                        {part && part.map((s, index) => (
                            <option key={index} value={s.id}>
                                {s.partName}
                            </option>
                        ))}
                    </Form.Select>
                </FormGroup>

                <FormGroup className="mb-3" controlId="resin">
                    <FormLabel>Resin</FormLabel>
                    <Form.Select onChange={(e)=>{setSifraResin(e.target.value)}}>
                        <option>Select Resin</option>

                        {resin && resin.map((s, index) => (
                            <option key={index} value={s.id}>
                                {s.materialName}  ({s.costPerUnit} €/L)
                            </option>
                        ))}
                    </Form.Select>
                </FormGroup>

                <FormGroup className="mb-3" controlId="printer">
                    <FormLabel>Printer</FormLabel>
                    <Form.Select onChange={(e)=>{setSifraPrinter(e.target.value)}}>
                        <option>Select Printer</option>

                        {printer && printer.map((s, index) => (
                            <option key={index} value={s.id}>
                                {s.printerName}
                            </option>
                        ))}
                    </Form.Select>
                </FormGroup>

                <InputText atribut="Volume (mL)" vrijednost='' />
                <InputText atribut="Print Time (minutes)" vrijednost='' />

                <Akcije odustani={RouteNames.JOB_VIEW} akcija="Add Print Job"/>
            </Form>
        </Container>
    )
}