import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { App, RouteNames } from "../../constants";
import ReactDatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import ProjectService from "../../services/ProjectService";
import moment from 'moment';
import useError from "../../hooks/useError";
import Akcije from "../../components/Akcije";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Service from "../../services/ProjectService";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useLoading from "../../hooks/useLoading";


export default function ProjectsEdit() {

    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);

    const navigate = useNavigate();
    const routeParams = useParams();
    const [project, setProject] = useState({});
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();


    async function dohvatiProject() {
        showLoading();
        const odgovor = await Service.getBySifra('Project', routeParams.id)
        hideLoading();
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            navigate(RouteNames.PROJECT_VIEW);
            return;
        }
        let project = odgovor.podaci;
        project.creationDate = moment.utc(project.creationDate).format('yyyy-MM-DD');
        project.completionDate = moment.utc(project.completionDate).format('yyyy-MM-DD');
        setProject(project);

        if (odgovor.podaci.slika != null) {
            setTrenutnaSlika(App.URL + odgovor.podaci.slika + `?${Date.now()}`);
        }
    }

    useEffect(() => {
        dohvatiProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function promjeniProject(project) {
        const odgovor = await Service.promjeni('Project', routeParams.id, project);
        if (odgovor.ok) {
            navigate(RouteNames.PROJECT_VIEW);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjeniProject({
            projectName: podaci.get('Project Name'),
            creationDate: podaci.get('creationDate') == "" ? null : podaci.get('creationDate'),
            completionDate: podaci.get('completionDate') == "" ? null : podaci.get('completionDate'),
            isCompleted: podaci.get('isCompleted') == 'on' ? true : false,
            projectDescription: podaci.get('projectDescription'),
            totalPrintTime: project.totalPrintTime,
            totalPrintCount: project.totalPrintCount,
            totalCost: project.totalCost,
            slika: ''
        });
    }

    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }

    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSlikaZaCrop(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;

        const odgovor = await Service.postaviSliku(routeParams.id, { Base64: base64.replace('data:image/png;base64,', '') });
        if (!odgovor.ok) {
            hideLoading();
            prikaziError(odgovor.podaci);
        }
        //Date.now je zbog toga što se src na image komponenti cache-ira
        //pa kad promjenimo sliku url ostane isti i trenutna slika se ne updatea
        setTrenutnaSlika(slikaZaServer);
        hideLoading();
    }

    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState('');

    return (
        <Container>
            <Row>
                <Col key='1' sm={12} lg={6} md={6}>
                    <Form onSubmit={handleSubmit}>

                        <InputText atribut="Project Name" vrijednost={project.projectName} />

                        {/* <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="projectName"
                    defaultValue={project.projectName}
                    required 
                     />
                </Form.Group> */}
                        <Form.Group controlId="creationDate">
                            <Form.Label>Creation Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="creationDate"
                                defaultValue={project.creationDate}
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
                                defaultChecked={project.isCompleted} />
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
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mb-4'>
                        <Col key='1' sm={12} lg={6} md={12}>
                            <p className='form-label'>Trenutna slika</p>
                            <Image
                                //za lokalni development
                                //src={'https://edunovawp1.eu/' + trenutnaSlika}
                                src={trenutnaSlika}
                                className='slika'
                                style={{ maxWidth: '600px', maxHeight: '600px' }}
                                
                            />
                        </Col>
                        <Col key='2' sm={12} lg={6} md={12}>
                            {slikaZaServer && (
                                <>
                                    <p className='form-label'>Nova slika</p>
                                    <Image
                                        src={slikaZaServer || slikaZaCrop}
                                        className='slika'
                                    />
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>

                <Col key='2' sm={12} lg={6} md={6}>
          <input className='mb-3' type='file' onChange={onChangeImage} />
          <Button disabled={!slikaZaServer} onClick={spremiSliku}>
            Spremi sliku
          </Button>

          <Cropper
            src={slikaZaCrop}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            guides={true}
            viewMode={1}
            minCropBoxWidth={50}
            minCropBoxHeight={50}
            cropBoxResizable={false}
            background={false}
            responsive={true}
            checkOrientation={false}
            cropstart={onCrop}
            cropend={onCrop}
            ref={cropperRef}
          />
        </Col>
            </Row>
        </Container>
    );
}