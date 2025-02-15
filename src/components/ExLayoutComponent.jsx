import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import BasicCard from "./BasicCard";
import "./ExLayoutComponent.css";

// References:
// Grid: https://react-bootstrap.netlify.app/docs/layout/grid/
// ListGroup: https://react-bootstrap.netlify.app/docs/components/list-group
// Images: https://react-bootstrap.github.io/docs/components/images

export default function ExLayoutComponent() {
  return (
    <Container className="bg-500">
      <Row>
        {/*custom styled className using css file*/}
        <Col className="custom-column">
          <h2>Row 1: Col 1 of 2</h2>
        </Col>
        <Col>
          <p style={{color: "green"}}>
            Row 1: Col 2 of 2 (height of this row is based on content inside the
            columns)
          </p>
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png"
            width={"50%"}
          />
        </Col>
      </Row>

      {/* Alternative inline styling without using css file targets*/}
      <Row style={{ background: "linear-gradient(to bottom right, orange, red)" }}>
        <Col style={{ borderColor: "black",  borderStyle: "solid"}}>
          <ListGroup>
            <ListGroup.Item variant="primary">Item 1</ListGroup.Item>
            <ListGroup.Item>Item 2</ListGroup.Item>
          </ListGroup>
        </Col>
        {/* bootstrap also offers keywords to perform inline css styling using 'className' - these keywords center the content within the column */}
        <Col className="d-flex justify-content-center">
          <BasicCard />
        </Col>
      </Row>
    </Container>
  );
}
