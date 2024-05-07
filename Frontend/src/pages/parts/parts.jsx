import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import { Button, Modal, Container, Form, FormGroup, Table } from "react-bootstrap";
import { App, RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import Service from "../../services/PartService";
import { FaDownload, FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import ProjectService from "../../services/ProjectService";
import useLoading from "../../hooks/useLoading";
import { NumericFormat } from "react-number-format";


export default function parts() {

    const [parts, setParts] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();
    const [prikaziModal, setPrikaziModal] = useState(false);
    const [selectedPart, setSelectedPart] = useState({});

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
        // console.log(odgovor.podaci);
        setIdProject(id);
    }

    async function obrisiPart(id) {
        showLoading();
        const odgovor = await Service.obrisi('Part', id);
        hideLoading();
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

    function postaviDatotekuModal(part) {
        setSelectedPart(part);
        setPrikaziModal(true);
    }

    function zatvoriModal() {
        setPrikaziModal(false);
    }

    async function postaviDatoteku(e) {
        if (e.currentTarget.files) {
            const formData = new FormData();
            formData.append('datoteka', e.currentTarget.files[0]);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            showLoading();
            const odgovor = await Service.postaviDatoteku(selectedPart.id, formData, config);
            hideLoading();
            if (odgovor.ok) {
                dohvatiParts();
                setPrikaziModal(false);
            }
        }
    }

    const PartsTable = ({ parts }) => {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Part Name</th>
                        <th>Print Count</th>
                        <th>Print Time</th>
                        <th>Cost (€)</th>
                        <th>Edit/Delete/Download/Upload</th>
                    </tr>
                </thead>
                <tbody>
                    {parts && parts.map((part, index) => (
                        <tr key={index}>
                            <td>{part.partName}</td>
                            <td>{part.printCount}</td>
                            <td>{parseInt(part.printTime / 60)}h {part.printTime % 60}min</td>
                            {/* <td>{part.cost}€</td> */}

                            <td>{part.cost == null
                                ? 0
                                :
                                <NumericFormat
                                    value={part.cost}
                                    displayType='text'
                                    // thousandSeparator='.'
                                    // decimalSeparator=','
                                    decimalScale={2}
                                    prefix='€'
                                    fixedDecimalScale
                                />}</td>

                            <td>
                                <Button
                                    onClick={() => { navigate(`/parts/${part.id}`) }}
                                    // size='md'
                                    variant='primary'
                                >
                                    <FaEdit
                                        size={25}
                                    />
                                    Edit
                                </Button>
                                &nbsp;
                                <Button
                                    onClick={() => obrisiPart(part.id)}
                                    variant='danger'
                                // size='md'
                                >
                                    <FaTrash
                                        size={25}
                                    />
                                    Delete
                                </Button>

                                {part.datoteka != null ?
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        <a target="_blank" href={App.URL + part.datoteka}>
                                            <FaDownload
                                                size={25} />
                                        </a>
                                    </>

                                    : ''
                                }
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    onClick={() => postaviDatotekuModal(part)}
                                >
                                    <FaUpload
                                        size={25} />
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

                    {projects.map((project, index) => (
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
        <>
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
            <Modal show={prikaziModal} onHide={zatvoriModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload file for part: <br /> {selectedPart.partName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="file" size="lg"
                                name='datoteka'
                                id='datoteka'
                                onChange={postaviDatoteku}
                            />
                        </Form.Group>
                        <hr />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={zatvoriModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}