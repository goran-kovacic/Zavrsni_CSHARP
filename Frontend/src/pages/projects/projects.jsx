import { useEffect, useState } from 'react';
import Service from "../../services/ProjectService";
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../constants'
import moment from 'moment';
import { IoIosAdd } from 'react-icons/io';
import useError from "../../hooks/useError";
import { GrValidate } from 'react-icons/gr';
import { NumericFormat } from 'react-number-format';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsSticky, BsStickyFill } from 'react-icons/bs';
import { CiStickyNote } from 'react-icons/ci';

export default function Projects() {

    const [projects, setProjects] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function dohvatiProjects() {
        const odgovor = await Service.get('Project');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setProjects(odgovor.podaci);
    }

    async function obrisiProject(id) {
        const odgovor = await Service.obrisi('Project', id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiProjects();
        }
    }

    useEffect(() => {
        dohvatiProjects();
    }, []);

    function isCompleted(project) {
        if (project.isCompleted == null) return 'gray';
        if (project.isCompleted) return 'green';
        return 'red';
    }

    function isCompletedTitle(project) {
        if (project.isCompleted == null) return 'Not defined';
        if (project.isCompleted) return 'Completed';
        return 'NOT completed';
    }

    return (
        <Container>
            <Link to={RouteNames.PROJECT_NEW} className='btn btn-success siroko'>
                <IoIosAdd
                    size={25}
                />Create New Project
            </Link>
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
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {projects && projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.projectName}</td>
                            {/* <td>
                                    {project.isCompleted == null
                                        ? 'not defined'
                                        : project.isCompleted ? 'Yes' : 'No'}
                                </td> */}
                            <td className="sredina">
                                <GrValidate
                                    size={30}
                                    color={isCompleted(project)}
                                    title={isCompletedTitle(project)}
                                />
                            </td>
                            <td>{project.creationDate == null ? 'Date not specified' :
                                moment(project.creationDate).format('DD. MM. YYYY.')}</td>
                            <td>{project.completionDate == null ? 'Date not specified' :
                                moment(project.completionDate).format('DD/MM/YYYY')}</td>
                            <td>{project.totalPrintCount == null ? 0 : project.totalPrintCount}</td>
                            <td>{project.totalPrintTime == null ? 0 : project.totalPrintTime}</td>
                            <td>{project.totalCost == null
                                ? 0
                                :
                                <NumericFormat
                                    value={project.totalCost}
                                    displayType='text'
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    decimalScale={2}
                                    prefix='€'
                                    fixedDecimalScale
                                />}</td>
                            <td>{project.projectDescription > 10
                                ? `${project.projectDescription.substring(0, 10)}...`
                                : project.projectDescription
                            }</td>
                            <td>
                                <Button
                                    onClick={() => obrisiProject(project.id)}
                                    variant='danger'
                                    size='sm'

                                >
                                    <FaTrash
                                        size={25}
                                    />
                                    Delete
                                </Button>

                                <Button
                                    onClick={() => { navigate(`/projects/${project.id}`) }}
                                    size='md'
                                    variant='primary'
                                >
                                    <FaEdit
                                        size={25}
                                    />
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}