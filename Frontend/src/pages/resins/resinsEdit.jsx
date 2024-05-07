import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/ResinService";
import { RouteNames } from "../../constants";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";


export default function resinsEdit() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [materials, setResin] = useState({});
    const { prikaziError } = useError();

    async function dohvatiResin() {
        const odgovor = await Service.getBySifra('Material', routeParams.id)
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            navigate(RouteNames.RESIN_VIEW);
            return;
        }
        setResin(odgovor.podaci);
    }

    useEffect(() => {
        dohvatiResin();
    }, []);

    async function promjeniResin(resin) {
        const odgovor = await Service.promjeni('Material', routeParams.id, resin);
        if (odgovor.ok) {
            navigate(RouteNames.RESIN_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeniResin({
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
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col key='1' sm={12} lg={6} md={6}>
                        <InputText atribut="Name" vrijednost={materials.materialName} />
                        <InputText atribut="Manufacturer" vrijednost={materials.manufacturer} />
                        <InputText atribut="Cost (€/L)" vrijednost={materials.costPerUnit} />
                        <InputText atribut="Layer Height (µm)" vrijednost={materials.layerHeight} />
                        <InputText atribut="Lift Distance (mm)" vrijednost={materials.liftDistance} />
                        <InputText atribut="Lift Speed (mm/s)" vrijednost={materials.liftSpeed} />
                        <InputText atribut="Light off Delay (s)" vrijednost={materials.lightOffDelay} />
                    </Col>
                    <Col key='2' sm={12} lg={6} md={6}>
                        <InputText atribut="Retract Speed (mm/s)" vrijednost={materials.retractSpeed} />
                        <InputText atribut="Exposure (s)" vrijednost={materials.calibratedExposure} />
                        <InputText atribut="Bottom Exposure (s)" vrijednost={materials.bottomExposure} />
                        <InputText atribut="Bottom lift Speed (mm/s)" vrijednost={materials.bottomLiftSpeed} />
                        <InputText atribut="Bottom lift Distance (mm)" vrijednost={materials.bottomLiftDistance} />
                        <InputText atribut="Bottom retract speed (mm/s)" vrijednost={materials.bottomRetractSpeed} />
                        <p></p>
                        <Akcije odustani={RouteNames.RESIN_VIEW} akcija="Edit Resin" />
                    </Col>
                </Row>
            </Form>
        </Container >
    )
}