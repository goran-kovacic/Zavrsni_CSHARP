import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProjectService from '../../services/ProjectService';
import { Table } from 'react-bootstrap';

export default function Projects() {

    const [projects, setProjects] = useState();

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

    return (
        <>
            <Container>
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
                                
                            </tr>


                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}