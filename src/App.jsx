import ExLayoutComponent from "./components/ExLayoutComponent";
import {Navbar, Container} from 'react-bootstrap'

// App component is essentially the top most component in a
// React-based application, from whom all other components are children of
function App() {
  return (
    <>
      <Navbar expand="lg" variant="dark" className="bg-body-primary">
        <Container>
          <Navbar.Brand href="#">NHL Database</Navbar.Brand>
        </Container>
      </Navbar>
      <ExLayoutComponent></ExLayoutComponent>
    </>
  );
}

export default App;
