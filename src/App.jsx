import ExLayoutComponent from "./components/ExLayoutComponent";
import { Navbar, Container, Nav } from "react-bootstrap";

// App component is essentially the top most component in a
// React-based application, from whom all other components are children of
function App() {
  return (
    <>
      {/* reach function must return exactly one root element, so the navbar and ExLayoutComponent are wrapped in an empty tag */}

      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-primary"
      >
        <Container>
          <Navbar.Brand href="#">NHL Database Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Example Link 1</Nav.Link>
            <Nav.Link href="#home">Example Link 2</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <ExLayoutComponent/>
    </>
  );
}

export default App;
