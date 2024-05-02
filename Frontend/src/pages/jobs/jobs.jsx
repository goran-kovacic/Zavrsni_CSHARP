import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/JobService";
import PartService from "../../services/PartService";
import useLoading from "../../hooks/useLoading";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { RouteNames } from "../../constants";
import { Button, Container, Form, FormGroup, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";


export default function jobs(){

    const [jobs, setJobs] = useState();
    const navigate = useNavigate();
    const {prikaziError} = useError();
    const {showLoading, hideLoading} = useLoading();

    const [parts, setParts] = useState([]);
    const [idPart, setIdPart] = useState(0);

    async function dohvatiJobs(){
        showLoading();
        const odgovor = await Service.get('Job');
        hideLoading();
        if(!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setJobs(odgovor.podaci);
    }

    async function dohvatiJobsWithPart(id){
        const odgovor = await Service.getWithPart(id);
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setJobs(odgovor.podaci);
        // console.log(odgovor.podaci);
        setIdPart(id);
    }

    async function obrisiJob(id){
        const odgovor = await Service.obrisi('Job', id);
        prikaziError(odgovor.podaci);
        if(odgovor.ok){
            dohvatiJobs();
        }
    }

    async function dohvatiParts(){
        showLoading();
        const odgovor = await PartService.get('Part');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setParts(odgovor.podaci);
    }

    useEffect(()=> {
        dohvatiJobs();
        dohvatiParts();
    }, []);

    const JobsTable = ({ jobs }) => {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Part Name</th>
                        <th>Volume (mL)</th>
                        <th>Print Time</th>
                        <th>Cost (€)</th>
                        <th>Resin</th>
                        <th>Printer</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs && jobs.map((job, index)=> (
                        <tr key={index}>
                            <td>{job.part_Name}</td>
                            <td>{job.volume}</td>
                            <td>{parseInt(job.printTime / 60)}h {job.printTime % 60}min</td>
                            {/* <td>{job.cost}€</td> */}

                            <td>{job.cost == null
                                ? 0
                                :
                                <NumericFormat
                                    value={job.cost}
                                    displayType='text'
                                    // thousandSeparator='.'
                                    // decimalSeparator=','
                                    decimalScale={2}
                                    prefix='€'
                                    fixedDecimalScale
                                />}</td>

                            <td>{job.material_Name}</td>
                            <td>{job.printer_Name}</td>
                            {/* <td>{job.result}</td> */}
                            <td>
                                {/* <Button
                                onClick={()=>{navigate(`/jobs/${job.id}`) }}
                                variant="primary"
                                >
                                    <FaEdit
                                    size={25}
                                    />
                                    Edit
                                </Button> */}
                                <Button
                                onClick={()=> obrisiJob(job.id)}
                                variant="danger"
                                >
                                <FaTrash
                                size={25}/>
                                Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    const PartDropdown = ({parts, setParts}) => {
        return(
            <FormGroup className="mb-3" controlId="part">
                <Form.Label>Select a Part:</Form.Label>
                <Form.Select
                value={idPart}
                onChange={e =>{
                    dohvatiJobsWithPart(e.target.value);
                }}>
                    {parts.map((part, index)=>(
                        <option key={index} value={part.id}>
                            {part.partName}
                        </option>
                    ))}
                </Form.Select>
            </FormGroup>
        );
    };

    return(
        <Container>
            <Link to={RouteNames.JOB_NEW} className="btn btn-success siroko">
                <IoIosAdd
                size={25}                
                />
                Add New Print Job
            </Link>

            <PartDropdown
            parts={parts}
            />
            <JobsTable jobs={jobs}/>

        </Container>
    )
    
}