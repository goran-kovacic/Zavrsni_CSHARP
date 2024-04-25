import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import useError from "../../hooks/useError";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import Service from "../../services/PrinterService";
import { FaAdjust, FaEdit, FaTrash } from "react-icons/fa";
import { Fa0 } from "react-icons/fa6";


export default function Printers() {

    const [printers, setPrinters] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function dohvatiPrinters() {
        const odgovor = await Service.get('Printer');
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setPrinters(odgovor.podaci);
    }

    async function obrisiPrinter(id) {
        const odgovor = await Service.obrisi('Printer', id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiPrinters();
        }
    }

    async function resetFep(id){
        const odgovor = await Service.reset('Printer', id);
        // prikaziError(odgovor.podaci);
        if(odgovor.ok){
            dohvatiPrinters();
        }
    }

    useEffect(() => {
        dohvatiPrinters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Link to={RouteNames.PRINTER_NEW} className="btn btn-success siroko">
                <IoIosAdd
                    size={25}
                /> Add New Printer
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Printer Name</th>
                        <th>Manufacturer</th>
                        <th>Printer Time</th>
                        <th>Current FEP Count</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {printers && printers.map((printer,index)=>(
                        <tr key={index}>
                            <td>{printer.printerName}</td>
                            <td>{printer.manufacturer}</td>
                            <td>{printer.printerTime}</td>
                            <td>{printer.fepCount}
                                <Button 
                                variant="primary"
                                >
                                    <Fa0
                                    size={25} 
                                    onClick={resetFep}                                   
                                    />
                                </Button>
                            </td>
                            <td className="sredina">
                                <Button
                                variant="primary"
                                onClick={()=>{navigate(`/printers/${printer.id}`)}}
                                >
                                    <FaEdit
                                    size={25}
                                    />
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiPrinter(printer.id)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}