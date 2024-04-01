import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProjectService from '../../services/ProjectService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames} from '../../constants'

export default function Projects() {

    const [projects, setProjects] = useState();
    const navigate = useNavigate();

    async function GetProjects() {
        await ProjectService.get()
            .then((odg) => {
                setProjects(odg);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        GetProjects();
    }, []);

    async function obrisiAsync(id){
        const odgovor = await ProjectService.del(id);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('pogledaj konzolu');
            return;
        }
        GetProjects();
    }

    function obrisi(id) {
        obrisiAsync(id);
    }
    
    return (
        <>
            <Container>
                <Link to={RouteNames.PROJECT_NEW}>Add</Link>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Completed</th>
                            <th>Creation Date</th>
                            <th>Completion Date</th>
                            <th>Print Count</th>
                            <th>Print Time</th>
                            <th>Cost</th>
                            <th>Description</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.map((project,index)=>(
                            <tr key={index}>
                                <td>{project.projectName}</td>
                                <td>
                                    {project.isCompleted==null 
                                    ? 'not defined'
                                    : project.isCompleted ? 'Yes' : 'No'}
                                </td>
                                <td>{project.creationDate}</td>
                                <td>{project.completionDate}</td>
                                <td>{project.totalPrintCount}</td>
                                <td>{project.totalPrintTime}</td>
                                <td>{project.totalCost}</td>
                                <td>{project.projectDescription}</td>
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(project.id)}
                                    variant='danger'
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                    onClick={()=>{navigate(`/projects/${project.id}`)}}                                                                        
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}