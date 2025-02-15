import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '/images/nhl-logo.png'
import './CustomNavbar.css'

export default function CustomNavbar() {
    return (
        <Navbar
            expand="lg"
            bg="light"
            collapseOnSelect
            data-bs-theme="light"
            className="bg-body-secondary custom-navbar"
            style={{fontFamily: 'Poppins, sans-serif'}}
        >
            <Container>
                <Navbar.Brand href="#" className="text-bold custom-text" style={{fontSize: "1.2rem", padding: "10px"}}>
                    <img
                        src={logo}
                        className="d-inline-block align-bottom"
                        alt="NHL logo"
                    />{' '}
                    NHL Database
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="pt-1 custom-text" style={{fontSize: "1.1rem"}}>
                        <Nav.Link href="#about">About the project</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}