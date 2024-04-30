import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import Service from '../../services/PartService';
import { RouteNames } from "../../constants";
import { Container, FormGroup, FormLabel, Form } from "react-bootstrap";
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';



export default function partsAdd() {

    const navigate = useNavigate();
    const [project, setProject] = useState([]);
    const [sifraProject, setSifraProject] = useState(0);
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiProjects() {
        const odgovor = await Service.get('Project');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setProject(odgovor.podaci);
        setSifraProject(odgovor.podaci[0].id);
    }

    async function ucitaj() {
        showLoading();
        await dohvatiProjects();
        hideLoading();
    }

    useEffect(() => {
        ucitaj();
    }, []);

    async function dodaj(e) {
        showLoading();
        const odgovor = await Service.dodaj('Part', e);
        hideLoading();
        if (odgovor.ok) {
            navigate(RouteNames.PART_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        dodaj({
            partName: podaci.get('Part Name'),
            idProject: parseInt(sifraProject)
        });
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit}>

                <InputText atribut="Part Name" vrijednost='' />

                <FormGroup className="mb-3" controlId="project">
                    <FormLabel>Project</FormLabel>
                    <Form.Select onChange={(e) => { setSifraProject(e.target.value) }}>
                        <option>Select Project</option>
                        
                        {project && project.map((s, index) => (
                            <option key={index} value={s.id}>
                                {s.projectName}
                            </option>
                        ))}

                    </Form.Select>
                </FormGroup>

                <Akcije odustani={RouteNames.PART_VIEW} akcija='Add Part' /> 
            </Form>
        </Container>
    )
};