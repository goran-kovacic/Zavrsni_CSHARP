import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/JobService";
import PartService from "../../services/PartService";
import { Table } from "react-bootstrap";


export default function jobs(){

    const [jobs, setJobs] = useState();
    const navigate = useNavigate();
    const {prikaziError} = useError();
    const {showLoading, hideLoading} = useLoading();

    const [parts, setParts] = useState([]);

    async function dohvatiJobs(){
        showLoading();
        const odgovor = await Service.get('Jobs');
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

    const JobsTable = ({jobs}) => {
        return (
            <Table  striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Part Name</th>
                        <th>Volume</th>
                        <th>Print Time</th>
                        <th>Cost</th>
                        <th>Resin</th>
                        <th>Printer</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs && jobs.map((job, index)=> (
                        <tr key={index}>
                            <td>{job.printer_Name}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        )
    }
    
}