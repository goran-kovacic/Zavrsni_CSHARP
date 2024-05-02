import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/PrinterService";
import { RouteNames } from "../../constants";
import { Container, Form } from "react-bootstrap";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from "../../hooks/useLoading";


export default function printersAdd(){

    const navigate = useNavigate();
    const {prikaziError} = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajPrinter(printer){
        showLoading();
        const odgovor = await Service.dodaj('Printer', printer);
        hideLoading();
        if(odgovor.ok){
            navigate(RouteNames.PRINTER_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        dodajPrinter({
            printerName: podaci.get('Printer Name'),
            manufacturer: podaci.get('Manufacturer'),
            printerTime: 0,
            fepCount: 0
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputText atribut="Printer Name" vrijednost=''/>
                <InputText atribut="Manufacturer" vrijednost=''/>
                <Akcije odustani={RouteNames.PRINTER_VIEW} akcija="Add Printer"/>
            </Form>
        </Container>
    )

    
}