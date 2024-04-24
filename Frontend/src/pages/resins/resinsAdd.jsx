import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/ResinService";
import { RouteNames } from "../../constants";
import { dodaj } from "../../services/HttpService";
import { Container, Form } from "react-bootstrap";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";


export default function ResinsAdd() {
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function dodajResin(resin) {
        const odgovor = await Service.dodaj('Material', resin);
        if (odgovor.ok) {
            navigate(RouteNames.RESIN_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        dodajResin({
            materialName: podaci.get('Name'),
            manufacturer: podaci.get('Manufacturer'),
            costPerUnit: podaci.get('Cost Per Unit'),
            layerHeight: podaci.get('Layer Height'),
            liftDistance: podaci.get('Lift Distance'),
            liftSpeed: podaci.get('Lift Speed'),
            lightOffDelay: podaci.get('Light Off Delay'),
            retractSpeed: podaci.get('Retract Speed'),
            calibratedExposure: podaci.get('Calibrated Exposure'),
            bottomExposure: podaci.get('Bottom Exposure'),
            bottomLiftSpeed: podaci.get('Bottom Lift Speed'),
            bottomLiftDistance: podaci.get('Bottom Lift Distance'),
            bottomRetractSpeed: podaci.get('Bottom Retract Speed')

        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputText atribut="Name" vrijednost='' />
                <InputText atribut="Manufacturer" vrijednost='' />
                <InputText atribut="Cost Per Unit" vrijednost='' />
                <InputText atribut="Layer Height" vrijednost='' />
                <InputText atribut="Lift Distance" vrijednost='' />
                <InputText atribut="Lift Speed" vrijednost='' />
                <InputText atribut="Light Off Delay" vrijednost='' />
                <InputText atribut="Retract Speed" vrijednost='' />
                <InputText atribut="Calibrated Exposure" vrijednost='' />
                <InputText atribut="Bottom Exposure" vrijednost='' />
                <InputText atribut="Bottom Lift Speed" vrijednost='' />
                <InputText atribut="Bottom Lift Distance" vrijednost='' />
                <InputText atribut="Bottom Retract Speed" vrijednost='' />

                <Akcije odustani={RouteNames.RESIN_VIEW} akcija="Add Resin" />
            </Form>
        </Container>
    )
}