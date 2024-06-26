import { useEffect, useState } from 'react';
import Service from "../../services/ProjectService";
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { App, RouteNames } from '../../constants'
import moment from 'moment';
import { IoIosAdd } from 'react-icons/io';
import useError from "../../hooks/useError";
import { GrValidate } from 'react-icons/gr';
import { NumericFormat } from 'react-number-format';
import { FaDumpsterFire, FaEdit, FaToiletPaperSlash, FaTrash, FaTrashRestore } from 'react-icons/fa';
import { BsSticky, BsStickyFill } from 'react-icons/bs';
import useLoading from "../../hooks/useLoading";
import { FaDumpster, FaRegTrashCan } from 'react-icons/fa6';
import Modal from '../../components/Modal'


export default function Projects() {

    const [projects, setProjects] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    const [modalImage, setModalImage] = useState(null);

    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
    };

    const closeModal = () => {
        setModalImage(null);
    };


    async function dohvatiProjects() {
        showLoading();
        const odgovor = await Service.get('Project');
        hideLoading();
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setProjects(odgovor.podaci);
    }

    async function obrisiProject(id) {
        showLoading();
        const odgovor = await Service.obrisi('Project', id);
        hideLoading();
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiProjects();
        }
    }

    async function obrisiSVE(id) {
        showLoading();
        const odgovor = await Service.obrisiSVE(id);
        hideLoading();
        prikaziError([odgovor.podaci]);
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

    function slika(project) {
        if (project.slika != null) {
            return App.URL + project.slika 
            // + `?${Date.now()}`
            ;
        }
        return null;
    }

    const handleDownload = (imageUrl) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const openImageInNewTab = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

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
                        <th>Status</th>
                        <th>Creation Date</th>
                        <th>Completion Date</th>
                        <th>Print Count</th>
                        <th>Print Time</th>
                        <th>Cost (€)</th>
                        <th>Photo</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {projects && projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.projectName}</td>
                            <td className="sredina">
                                <GrValidate
                                    size={30}
                                    color={isCompleted(project)}
                                    title={isCompletedTitle(project)}
                                />
                            </td>
                            <td>{project.creationDate == null ? 'Date not specified' :
                                moment(project.creationDate).format('DD/MM/YYYY')}</td>
                            <td>{project.completionDate == null ? 'Date not specified' :
                                moment(project.completionDate).format('DD/MM/YYYY')}</td>
                            <td>{project.totalPrintCount == null ? 0 : project.totalPrintCount}</td>
                            <td>{parseInt(project.totalPrintTime / 60)}h {project.totalPrintTime % 60}min</td>
                            <td>{project.totalCost == null
                                ? 0
                                :
                                <NumericFormat
                                    value={project.totalCost}
                                    displayType='text'
                                    // thousandSeparator='.'
                                    // decimalSeparator=','
                                    decimalScale={2}
                                    prefix='€'
                                    fixedDecimalScale
                                />}</td>
                            {/* <td>{project.projectDescription > 10
                                ? `${project.projectDescription.substring(0, 10)}...`
                                : project.projectDescription
                            }</td> */}
                            <td>
                                <img
                                    src={slika(project)}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    onClick={() => openImageInNewTab(slika(project))}


                                />
                            </td>
                            <td>
                                <Button
                                    onClick={() => { navigate(`/projects/${project.id}`) }}
                                    // size='sd'
                                    variant='primary'
                                >
                                    <FaEdit
                                        size={25}
                                    />
                                    Edit
                                </Button>
                                &nbsp;
                                <Button
                                    onClick={() => obrisiProject(project.id)}
                                    variant='danger'
                                // size='sm'

                                >
                                    <FaTrash
                                        size={25}
                                    />
                                    Delete
                                </Button>
                                &nbsp;
                                <p></p>
                                <Button
                                    onClick={() => obrisiSVE(project.id)}
                                    variant='danger'
                                // size='sm'

                                >
                                    <FaDumpsterFire
                                        size={25}
                                    />
                                    Delete Project with Parts
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    );
}