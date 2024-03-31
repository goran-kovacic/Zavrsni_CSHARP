import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import ProjectService from "../../services/ProjectService";


export default function ProjectsAdd(){

    const navigate = useNavigate();

    async function add(project){
        const odgovor = await ProjectService.post(project);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('pogledaj konzolu');
            return;
        }
        navigate(RouteNames.PROJECT_VIEW);
    }

    function obradiSubmit(e){
        e.preventDefault();
        // alert('Dodajem project');

        const podaci = new FormData(e.target);

        const project = {
            projectName: podaci.get('projectName'),
            // creationDate: 
            // completionDate:
            isCompleted: podaci.get('isCompleted') == 'on' ? true : false
        };

        // console.log(project);

        add(project);
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control type="text" name="projectName" required/>
                </Form.Group>
                {/* <Form.Group controlId="creationDate">
                    <Form.Label>Creation Date</Form.Label>
                    <Form.Control type="text" name="creationDate" />
                </Form.Group> */}

                {/* <ReactDatePicker selected={startDate} onChange={(date)=>setStartDate(date)} /> */}

                <Form.Group controlId="completionDate">
                    <Form.Label>Completion Date</Form.Label>
                    <Form.Control type="text" name="completionDate" />
                </Form.Group>
                <Form.Group controlId="projectDescription">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control type="text" name="projectDescription" />
                </Form.Group>
                <Form.Group controlId="isCompleted">
                    <Form.Check label="Completed" name="isCompleted" />
                </Form.Group>
                <hr />

            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                    <Link className="btn btn-danger siroko" to={RouteNames.PROJECT_VIEW}>
                        Cancel
                    </Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                    <Button className="siroko" variant="primary" type="submit">
                        Add
                    </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    );
}