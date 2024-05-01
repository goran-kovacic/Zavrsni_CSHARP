import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import { Button, Container, Form, FormGroup, Table } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import Service from "../../services/PartService";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectService from "../../services/ProjectService";
import useLoading from "../../hooks/useLoading";


export default function parts() {

    const [parts, setParts] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    const [projects, setProjects] = useState([]);
    const [idProject, setIdProject] = useState(0);

    async function dohvatiParts() {
        showLoading();
        const odgovor = await Service.get('Part');
        hideLoading();
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setParts(odgovor.podaci);
    }

    async function dohvatiPartsWithProject(id) {
        const odgovor = await Service.getWithProject(id);
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setParts(odgovor.podaci);
        console.log(odgovor.podaci);
        setIdProject(id);
    }

    async function obrisiPart(id) {
        const odgovor = await Service.obrisi('Part', id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiParts();
        }
    }

    async function dohvatiProjects() {
        showLoading();
        const odgovor = await ProjectService.get('Project');
        hideLoading();
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setProjects(odgovor.podaci);
    }


    useEffect(() => {
        dohvatiParts();
        dohvatiProjects();
    }, []);



    const PartsTable = ({ parts }) => {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Part Name</th>
                        <th>Print Time</th>
                        <th>Cost</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {parts && parts.map((part, index) => (
                        <tr key={index}>
                            <td>{part.partName}</td>
                            <td>{part.printTime}</td>
                            <td>{part.cost}</td>
                            <td>
                                <Button
                                    onClick={() => obrisiPart(part.id)}
                                    variant='danger'
                                    size='sm'
                                >
                                    <FaTrash
                                        size={25}
                                    />
                                    Delete
                                </Button>

                                <Button
                                    onClick={() => { navigate(`/parts/${part.id}`) }}
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
        );
    };

    const ProjectDropdown = ({ projects, setProjects }) => {

        return (
            <FormGroup className="mb-3" controlId="project">
                <Form.Label>Select a Project:</Form.Label>
                <Form.Select 
                value={idProject}
                onChange={e => {
                    dohvatiPartsWithProject(e.target.value);
                }}>
                    {/* <option>Select project</option> */}

                    {projects.map((project, index ) => (
                        <option key={index} value={project.id}>
                            {project.projectName}
                        </option>
                    ))}

                </Form.Select>
            </FormGroup>
        );
    };

    // const handleSelectProject = event => {
    //     const projectId = event.target.value;
    //     selectedProject(projectId);
    // }

    return (
        <Container>
            <Link to={RouteNames.PART_NEW} className="btn btn-success siroko">
                <IoIosAdd
                    size={25}
                /> Add New Part
            </Link>

            <ProjectDropdown
                projects={projects}
                // selectedProject={handleSelectProject}
            />
            <PartsTable parts={parts} />

        </Container>
    )
}