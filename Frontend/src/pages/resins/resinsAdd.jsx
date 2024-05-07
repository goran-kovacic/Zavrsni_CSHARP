import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/ResinService";
import { RouteNames } from "../../constants";
import { dodaj } from "../../services/HttpService";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useLoading from "../../hooks/useLoading";


export default function ResinsAdd() {
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();


    async function dodajResin(resin) {
        showLoading();
        const odgovor = await Service.dodaj('Material', resin);
        hideLoading();
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
            costPerUnit: podaci.get('Cost (€/L)'),
            layerHeight: podaci.get('Layer Height (µm)'),
            liftDistance: podaci.get('Lift Distance (mm)'),
            liftSpeed: podaci.get('Lift Speed (mm/s)'),
            lightOffDelay: podaci.get('Light off Delay (s)'),
            retractSpeed: podaci.get('Retract Speed (mm/s)'),
            calibratedExposure: podaci.get('Exposure (s)'),
            bottomExposure: podaci.get('Bottom Exposure (s)'),
            bottomLiftSpeed: podaci.get('Bottom lift Speed (mm/s)'),
            bottomLiftDistance: podaci.get('Bottom lift Distance (mm)'),
            bottomRetractSpeed: podaci.get('Bottom retract speed (mm/s)')

        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col key='1' sm={12} lg={6} md={6}>
                        <InputText atribut="Name" vrijednost='' />
                        <InputText atribut="Manufacturer" vrijednost='' />
                        <InputText atribut="Cost (€/L)" vrijednost='' />
                        <InputText atribut="Layer Height (µm)" vrijednost='' />
                        <InputText atribut="Lift Distance (mm)" vrijednost='' />
                        <InputText atribut="Lift Speed (mm/s)" vrijednost='' />
                        <InputText atribut="Light off Delay (s)" vrijednost='' />
                    </Col>
                    <Col key='2' sm={12} lg={6} md={6}>
                        <InputText atribut="Retract Speed (mm/s)" vrijednost='' />
                        <InputText atribut="Exposure (s)" vrijednost='' />
                        <InputText atribut="Bottom Exposure (s)" vrijednost='' />
                        <InputText atribut="Bottom lift Speed (mm/s)" vrijednost='' />
                        <InputText atribut="Bottom lift Distance (mm)" vrijednost='' />
                        <InputText atribut="Bottom retract speed (mm/s)" vrijednost='' />
                        <p></p>
                        <Akcije odustani={RouteNames.RESIN_VIEW} akcija="Add Resin" />
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}