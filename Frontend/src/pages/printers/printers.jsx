import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import useError from "../../hooks/useError";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import Service from "../../services/PrinterService";
import { FaAccusoft, FaAdjust, FaEdit, FaTrash } from "react-icons/fa";
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
        const odgovor = await Service.reset('Printer/ResetFEP', id);
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
                        <th>Printer Time (hours)</th>
                        <th>Current FEP Count</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {printers && printers.map((printer,index)=>(
                        <tr key={index}>
                            <td>{printer.printerName}</td>
                            <td>{printer.manufacturer}</td>
                            <td>{printer.printerTime / 60}</td>
                            <td>{printer.fepCount}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button 
                                variant="primary"
                                onClick={()=>{resetFep(printer.id)}}
                                >
                                    <FaAccusoft
                                    size={25}                        
                                    />
                                    Reset FEP Counter
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
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiPrinter(printer.id)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}