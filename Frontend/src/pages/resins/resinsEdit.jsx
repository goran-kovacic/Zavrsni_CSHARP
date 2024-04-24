import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/ResinService";
import { RouteNames } from "../../constants";
import { Container, Form } from "react-bootstrap";
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
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputText atribut="Name" vrijednost={materials.materialName} />
                <InputText atribut="Manufacturer" vrijednost={materials.manufacturer} />
                <InputText atribut="Cost Per Unit" vrijednost={materials.costPerUnit} />
                <InputText atribut="Layer Height" vrijednost={materials.layerHeight} />
                <InputText atribut="Lift Distance" vrijednost={materials.liftDistance} />
                <InputText atribut="Lift Speed" vrijednost={materials.liftSpeed} />
                <InputText atribut="Light Off Delay" vrijednost={materials.lightOffDelay} />
                <InputText atribut="Retract Speed" vrijednost={materials.retractSpeed} />
                <InputText atribut="Calibrated Exposure" vrijednost={materials.calibratedExposure} />
                <InputText atribut="Bottom Exposure" vrijednost={materials.bottomExposure} />
                <InputText atribut="Bottom Lift Speed" vrijednost={materials.bottomLiftSpeed} />
                <InputText atribut="Bottom Lift Distance" vrijednost={materials.bottomLiftDistance} />
                <InputText atribut="Bottom Retract Speed" vrijednost={materials.bottomRetractSpeed} />
                <Akcije odustani={RouteNames.RESIN_VIEW} akcija="Edit Resin"/>
            </Form>
        </Container>
    )
}