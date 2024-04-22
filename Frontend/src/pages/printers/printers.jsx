import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import useError from "../../hooks/useError";


export default function Printers(){

    const [printers,setPrinters] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function getPrinters(){
        const odgovor = await Service.get('Printer');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setPrinters(odgovor.podaci);
    }



    return(
        <Container>
            
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Printer Name</th>
                    <th>Manufacturer</th>
                    <th>Printer Time</th>
                    <th>Current FEP Count</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </Table>

        </Container>
    )

}