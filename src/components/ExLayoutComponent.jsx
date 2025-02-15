import { Container, Row, Col, ListGroup } from "react-bootstrap";
import BasicCard from "./BasicCard";
import "./ExLayoutComponent.css";

// References:
// Grid: https://react-bootstrap.netlify.app/docs/layout/grid/
// ListGroup: https://react-bootstrap.netlify.app/docs/components/list-group
export default function ExampleLayout() {
  return (
    <Container className="bg-500">
      <Row>
        <Col className="custom-column">
          <h2>Row 1: Col 1 of 2</h2>
        </Col>
        {/*custom styled class using css file*/}
        <Col>
          Row 1: Col 2 of 2 (height of column is based on content inside)
        </Col>
      </Row>

      <Row style={{ background: "grey" }}>
        {/* Alternative inline styling without using css file*/}
        <Col>
          <ListGroup>
            <ListGroup.Item variant="primary">Item 1</ListGroup.Item>
            <ListGroup.Item>Item 2</ListGroup.Item>
          </ListGroup>
        </Col>
        {/* bootstrap offers keywords to perform inline css styling using classname - this centers the content within the column */}
        <Col className="d-flex justify-content-center">
          <BasicCard />
        </Col>
      </Row>
    </Container>
  );
}
