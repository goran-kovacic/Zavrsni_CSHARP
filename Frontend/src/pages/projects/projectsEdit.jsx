import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import ProjectService from "../../services/ProjectService";


export default function ProjectsEdit(){

    const navigate = useNavigate();
    const [project, setProject] = useState({});
    const routeParams = useParams();

    async function getProject(){
        const o = await ProjectService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setProject(o.poruka);
    }

    async function edit(project){
        const odgovor = await ProjectService.put(routeParams.id,project);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('pogledaj konzolu');
            return;
        }
        navigate(RouteNames.PROJECT_VIEW);
    }

    useEffect(()=>{
        getProject()
    },[])
    
    function obradiSubmit(e){
        e.preventDefault();
        // alert('Dodajem project');

        const podaci = new FormData(e.target);

        const project = {
            projectName: podaci.get('projectName'),
            creationDate: podaci.get('creationDate'),
            completionDate: podaci.get('completionDate'),
            isCompleted: podaci.get('isCompleted') == 'on' ? true : false,
            projectDescription: podaci.get('projectDescription')
        };

        // console.log(project);

        edit(project);
    }

    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState('');

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="projectName"
                    defaultValue={project.projectName}
                    required 
                     />
                </Form.Group>
                <Form.Group controlId="creationDate">
                    <Form.Label>Creation Date</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="creationDate"
                    value={project.creationDate}
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
                    defaultChecked={project.isCompleted}/>
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
                        Edit
                    </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    );
}