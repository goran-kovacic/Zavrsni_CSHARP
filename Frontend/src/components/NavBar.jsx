import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const navigate = useNavigate();

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
                        <Nav.Link 
                        // href="https://kovacicg-001-site1.ltempurl.com/swagger/index.html"
                        href="https://printtracker.runasp.net/swagger/index.html"
                        target='_blank'>API</Nav.Link>                        
                        <NavDropdown title="MENU" id="collapsible-nav-dropdown">
                            <NavDropdown.Item 
                            onClick={() => navigate(RouteNames.PROJECT_VIEW)}>
                                Projects</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Printers
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Resins</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Users
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}