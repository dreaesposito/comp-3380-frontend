import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import logo from '../assets/nhl-logo.png'
import './CustomNavbar.css'
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";

// new navbar with prime react component library
const PrimeNavbar = () => {
    const items = [
        {label: 'NHL Database', url: '/'}
    ]

    const start = (
        <div className="flex">
            <img src={logo} className="" height="40" alt="logo"/>
        </div>
    );
    const end = (
        <div className="flex align-items-center gap-2">
            <Link to="/about">
                <Button as={Link} to="/about" label="About the project"/>
            </Link>
        </div>
    );

    return (<>
        {/*<Button>HELLO</Button>*/}
        <Menubar model={items} start={start} end={end}></Menubar>
    </>)
}


// Old navbar with bootstrap
const TestBar = () => {
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
                <Navbar.Brand as={Link} to="/" className="text-bold custom-text"
                              style={{fontSize: "1.2rem", padding: "10px"}}>
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
                        <Nav.Link as={Link} to="/about">About the project</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default TestBar