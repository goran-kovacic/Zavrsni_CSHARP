import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/PrinterService";
import { RouteNames } from "../../constants";
import { Container, Form } from "react-bootstrap";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";


export default function pritnersEdit() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [printer, setPrinter] = useState({});
    const { prikaziError } = useError();

    async function dohvatiPrinter() {
        const odgovor = await Service.getBySifra('Printer', routeParams.id)
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            navigate(RouteNames.PRINTER_VIEW);
            return;
        }
        setPrinter(odgovor.podaci);
    }

    useEffect(() => {
        dohvatiPrinter();
    }, []);

    async function promjeniPrinter(printer) {
        const odgovor = await Service.promjeni('Printer', routeParams.id, printer);
        if (odgovor.ok) {
            navigate(RouteNames.PRINTER_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeniPrinter({
            printerName: podaci.get('Printer Name'),
            manufacturer: podaci.get('Manufacturer'),
            printerTime: printer.printerTime,
            fepCount: printer.fepCount
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputText atribut="Printer Name" vrijednost={printer.printerName} />
                <InputText atribut="Manufacturer" vrijednost={printer.manufacturer} />
                
                <Akcije odustani={RouteNames.PRINTER_VIEW} akcija="Edit Printer" />
            </Form>
        </Container>
    )
}