import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';
import { NavItem, NavLink } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';


export default function NavBar() {

    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand
                    className='kursor'
                    onClick={() => navigate(RouteNames.HOME)}
                >3D Print Log App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}>Statistics</Nav.Link>


                                <Nav.Link
                                    href="https://printtracker.runasp.net/swagger/index.html"
                                    target='_blank'>API</Nav.Link>
                                <NavLink
                                    onClick={() => navigate(RouteNames.PROJECT_VIEW)}
                                >Projects</NavLink>

                                <NavLink
                                    onClick={() => navigate(RouteNames.PART_VIEW)}
                                >
                                    Parts
                                </NavLink>

                                <NavLink
                                    onClick={() => navigate(RouteNames.JOB_VIEW)}
                                >
                                    Print Jobs
                                </NavLink>

                                <NavLink
                                    onClick={() => navigate(RouteNames.RESIN_VIEW)}
                                >
                                    Resins
                                </NavLink>

                                <NavLink
                                    onClick={() => navigate(RouteNames.PRINTER_VIEW)}
                                >Printers</NavLink>

                                <Nav.Link onClick={logout}>Odjava</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={() => navigate(RouteNames.LOGIN)}>
                                Prijava
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}