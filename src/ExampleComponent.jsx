import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function ExampleComponent() {
    return (
        <Container>
            <Row class="text-center">
                <Button>Button in Row 1</Button>
            </Row>
            <Row class="text-center">
                <Button>Button in Row 1</Button>
            </Row>
            <Row class="text-center">
                <Button>Button in Row 1</Button>
            </Row>
        </Container>
    )

}