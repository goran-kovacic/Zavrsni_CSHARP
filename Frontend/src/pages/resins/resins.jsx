import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import Service from "../../services/ResinService";
import { Button, Container, Table } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import { FaEdit, FaTrash } from "react-icons/fa";



export default function Resins() {
    const [materials, setResins] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function dohvatiResin() {
        const odgovor = await Service.get('Material')
        if (!odgovor.ok) {
            prikaziError(odgovor.podaci);
            return;
        }
        setResins(odgovor.podaci);
    }

    async function obrisiResin(id) {
        const odgovor = await Service.obrisi('Material', id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok) {
            dohvatiResin();
        }
    }

    useEffect(() => {
        dohvatiResin();
    }, []);

    return (
        <Container>
            <Link to={RouteNames.RESIN_NEW} className='btn btn-success siroko'>
                <IoIosAdd
                    size={25}
                />Add New Resin
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Cost</th>
                        <th>Layer Height</th>
                        <th>Lift Distance</th>
                        <th>Lift Speed</th>
                        <th>Light off Delay</th>
                        <th>Retract Speed</th>
                        <th>Exposure</th>
                        <th>Bottom Exposure</th>
                        <th>Bottom lift Speed</th>
                        <th>Bottom lift Distance</th>
                        <th>Bottom retract speed</th>
                        <th>Edit/Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {materials && materials.map((material, index) => (
                        <tr key={index}>
                            <td>{material.materialName}</td>
                            <td>{material.manufacturer}</td>
                            <td>
                                <NumericFormat
                                value={material.costPerUnit}
                                displayType="text"
                                thousandSeparator='.'
                                decimalSeparator=","
                                suffix="€/L"
                                />
                            </td>
                            <td>{material.layerHeight}</td>
                            <td>{material.liftDistance}</td>
                            <td>{material.liftSpeed}</td>
                            <td>{material.lightOffDelay}</td>
                            <td>{material.retractSpeed}</td>
                            <td>{material.calibratedExposure}</td>
                            <td>{material.bottomExposure}</td>
                            <td>{material.bottomLiftSpeed}</td>
                            <td>{material.bottomLiftDistance}</td>
                            <td>{material.bottomRetractSpeed}</td>
                            <td>
                                <Button
                                    onClick={() => obrisiResin(material.id)}
                                    variant='danger'
                                    size='sm'

                                >
                                    <FaTrash
                                        size={25}
                                    />
                                    Delete
                                </Button>

                                <Button
                                    onClick={() => { navigate(`/resins/${material.id}`) }}
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
        </Container>

    )
}