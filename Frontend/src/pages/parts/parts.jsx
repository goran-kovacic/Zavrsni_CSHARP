import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useError from "../../hooks/useError";
import { Button, ButtonGroup, Container, Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import Service from "../../services/PartService";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectService from "../../services/ProjectService";


export default function parts() {

    const [parts, setParts] = useState();
    const navigate = useNavigate();
    const routeParams = useParams();
    const { prikaziError } = useError();

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [idProject, setIdProject] = useState(0);

    async function dohvatiParts() {
        const odgovor = await Service.get('Part');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setParts(odgovor.podaci);
    }

    async function dohvatiPartsWithProject(id) {
        const odgovor = await Service.getWithProject( id);
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setParts(odgovor.podaci);
    }

    async function obrisiPart(id) {
        const odgovor = await Service.obrisi('Part', id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiParts();
        }
    }

    async function dohvatiProjects() {
        const odgovor = await ProjectService.get('Project');
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

    const ProjectDropdown = ({ projects, selectedProject }) => {

        return (
            <Form.Select onChange={e => {
                dohvatiPartsWithProject(e.target.value);
              }}>
                <option>Select project</option>
                
                {projects.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.projectName}
                    </option>
                ))}

            </Form.Select>
        );
    };

    const handleSelectProject = event => {
        const projectId = event.target.value;
        selectedProject(projectId);
    }

    return (
        <Container>
            <Link to={RouteNames.PART_NEW} className="btn btn-success siroko">
                <IoIosAdd
                    size={25}
                /> Add New Part
            </Link>

            <ProjectDropdown
                projects={projects}
                selectedProject={handleSelectProject}
            />
            <PartsTable parts={parts} />

        </Container>
    )
}