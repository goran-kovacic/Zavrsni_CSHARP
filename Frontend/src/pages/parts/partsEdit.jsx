import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from '../../services/PartService';
import ProjectService from '../../services/ProjectService';
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import { RouteNames } from "../../constants";
import { Container, Form, FormGroup } from "react-bootstrap";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";



export default function partsEdit() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const [part, setParts] = useState({});

    const [project, setProject] = useState([]);
    const [sifraProject, setSifraProject] = useState(0);

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();


    async function dohvatiPart() {
        const odgovor = await Service.getBySifra('Part', routeParams.id);
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        let part = odgovor.podaci;
        setParts(part);
        if (part.idProject != null) {
            setSifraProject(part.idProject);
        }
    }

    async function dohvatiProjects() {
        const odgovor = await Service.get('Project');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setProject(odgovor.podaci);
        setSifraProject(odgovor.podaci[0].id);
    }

    async function dohvatiInicijalnePodatke() {
        showLoading();
        await dohvatiProjects();
        await dohvatiPart();
        hideLoading();
    }

    useEffect(() => {
        dohvatiInicijalnePodatke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function promjeni(e) {
        showLoading();
        const odgovor = await Service.promjeni('Part', routeParams.id, e);
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

        promjeni({
            partName: podaci.get('Part Name'),
            idProject: parseInt(sifraProject),
            printCount: part.printCount,
            printTime: part.printTime,
            cost: part.cost
        });
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit}>
                <InputText atribut="Part Name" vrijednost={part.partName} />

                <FormGroup className="mb-3" controlId="project">
                    <Form.Label>Project</Form.Label>
                    <Form.Select
                        value={sifraProject}
                        onChange={(e) => {
                            setSifraProject(e.target.value);
                        }}>
                        {project && project.map((project, index) => (
                            <option key={index} value={project.id}>
                                {project.projectName}
                            </option>
                        ))}
                    </Form.Select>
                </FormGroup>

                <Akcije odustani={RouteNames.PART_VIEW} akcija="Edit Part" />
            </Form>
        </Container>
    )


}