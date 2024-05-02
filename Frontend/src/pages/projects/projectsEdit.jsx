import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import ProjectService from "../../services/ProjectService";
import moment from 'moment';
import useError from "../../hooks/useError";
import Akcije from "../../components/Akcije";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Service from "../../services/ProjectService";


export default function ProjectsEdit() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const [project, setProject] = useState({});
    const { prikaziError } = useError();

    async function dohvatiProject() {
        const odgovor = await Service.getBySifra('Project', routeParams.id)
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            navigate(RouteNames.PROJECT_VIEW);
            return;
        }
        let project = odgovor.podaci;
        project.creationDate = moment.utc(project.creationDate).format('yyyy-MM-DD');
        project.completionDate = moment.utc(project.completionDate).format('yyyy-MM-DD');
        setProject(project);
    }

    useEffect(() => {
        dohvatiProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function promjeniProject(project) {
        const odgovor = await Service.promjeni('Project', routeParams.id, project);
        if (odgovor.ok) {
            navigate(RouteNames.PROJECT_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjeniProject({
            projectName: podaci.get('Project Name'),
            creationDate: podaci.get('creationDate') == "" ? null : podaci.get('creationDate'),
            completionDate: podaci.get('completionDate') == "" ? null : podaci.get('completionDate'),
            isCompleted: podaci.get('isCompleted') == 'on' ? true : false,
            projectDescription: podaci.get('projectDescription'),
            totalPrintTime: project.totalPrintTime,
            totalPrintCount: project.totalPrintCount,
            totalCost: project.totalCost
        });
    }

    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState('');

    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                <InputText atribut="Project Name" vrijednost={project.projectName} />

                {/* <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="projectName"
                    defaultValue={project.projectName}
                    required 
                     />
                </Form.Group> */}
                <Form.Group controlId="creationDate">
                    <Form.Label>Creation Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="creationDate"
                        defaultValue={project.creationDate}
                    />
                </Form.Group>

                <Form.Group controlId="completionDate">
                    <Form.Label>Completion Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="completionDate"
                        defaultValue={project.completionDate}
                    />
                </Form.Group>
                <Form.Group controlId="projectDescription">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="projectDescription"
                        defaultValue={project.projectDescription} />
                </Form.Group>
                <Form.Group controlId="isCompleted">
                    <Form.Check
                        label="Completed"
                        name="isCompleted"
                        defaultChecked={project.isCompleted} />
                </Form.Group>
                <hr />

                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RouteNames.PROJECT_VIEW}>
                            Cancel
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Edit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}