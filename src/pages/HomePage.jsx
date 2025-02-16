import BasicCard from "../components/BasicCard.jsx";
import {Col, Container, Row} from "react-bootstrap";

const HomePage = () => {
    return (
        <Container className="my-3">
            <Row className="justify-content-center">
                <h1>HOME PAGE</h1>
            </Row>

            <Row>
                <Col>
                    <BasicCard title={"All Players"} text={"text"} link={"/all-players"}/>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage