import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useState } from "react";
import ProjectService from "../../services/ProjectService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from 'moment';

import { hr } from 'date-fns/locale/hr';
registerLocale('hr', hr);
setDefaultLocale('hr');

export default function ProjectsAdd() {

    const navigate = useNavigate();

    async function add(project) {
        const odgovor = await ProjectService.post(project);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('pogledaj konzolu');
            return;
        }
        navigate(RouteNames.PROJECT_VIEW);
    }

    function obradiSubmit(e) {
        e.preventDefault();
        // alert('Dodajem project');

        const podaci = new FormData(e.target);

        const project = {
            projectName: podaci.get('projectName'),
            creationDate: podaci.get('creationDate'),
            completionDate: podaci.get('completionDate'),
            projectDescription: podaci.get('projectDescription'),
            isCompleted: podaci.get('isCompleted') == 'on' ? true : false
        };

        // console.log(project);

        add(project);
    }

    

    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState('');

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
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

                {/* <label>Creation Date:</label>

                <ReactDatePicker                    
                    controlId="creationDate"
                    name="creationDate"
                    showIcon
                    todayButton="Today"
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                /> */}

                {/* <label>Completion Date:</label>

                <ReactDatePicker
                    showIcon
                    todayButton="Today"
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />  */}

                <Form.Group controlId="projectDescription">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control type="text" name="projectDescription" />
                </Form.Group>

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