import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useState } from "react";
import ProjectService from "../../services/ProjectService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from 'moment';
import useError from "../../hooks/useError";
import Akcije from "../../components/Akcije";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Service from "../../services/ProjectService";
import useLoading from "../../hooks/useLoading";


import { hr } from 'date-fns/locale/hr';
registerLocale('hr', hr);
setDefaultLocale('hr');

export default function ProjectsAdd() {
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajProject(project) {
        showLoading();
        const odgovor = await Service.dodaj('Project',project);
        hideLoading();
        if(odgovor.ok){
            navigate(RouteNames.PROJECT_VIEW);
            return
          }
          prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        let creationDate=null;
        let completionDate=null;

        if(podaci.get('creationDate')!=''){
            creationDate = moment.utc(podaci.get('creationDate'));
        }else{
            creationDate=null;
        }

        if(podaci.get('completionDate')!=''){
            completionDate = moment.utc(podaci.get('completionDate'));
        }else{
            completionDate=null;
        }
        dodajProject({
            projectName: podaci.get('projectName'),
            creationDate: creationDate,
            completionDate: completionDate,
            // projectDescription: podaci.get('projectDescription'),
            isCompleted: podaci.get('isCompleted') == 'on' ? true : false
        });
    }

    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState('');

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control type="text" name="projectName" required />
                </Form.Group>

                <FormGroup controlId="creationDate">
                    <FormLabel>Creation Date</FormLabel>
                    <Form.Control
                        type="date"
                        name="creationDate"
                        value={startDate}
                        onChange={(date) => setStartDate(date.target.value)}
                    />
                </FormGroup>

                <FormGroup controlId="completionDate">
                    <FormLabel>Completion Date</FormLabel>
                    <Form.Control
                        type="date"
                        name="completionDate"
                        value={endDate}
                        onChange={(date) => setEndDate(date.target.value)}
                    />
                </FormGroup>

                {/* <Form.Group controlId="projectDescription">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control type="text" name="projectDescription" />
                </Form.Group> */}

                <Form.Group controlId="isCompleted">
                    <Form.Check label="Completed" name="isCompleted" />
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
                            Add
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}