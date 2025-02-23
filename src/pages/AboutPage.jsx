import {Col, Container, ListGroup, Row, Image} from "react-bootstrap"
import "./AboutPage.css"
import pandasLogo from "../assets/pandas-logo.png"
import pythonLogo from "../assets/python-logo.png"
import supabaseIcon from "../assets/supabase-logo-icon.svg"
import reactLogo from "../assets/React-icon.png"
import bootstrapLogo from "../assets/bootstrap-logo.png"
import vercelLogo from "../assets/logo-vercel.svg"
import postgresIcon from "../assets/postgresql-icon.png"
import ProfileCard from "../components/ProfileCard.jsx";

const drea = {
    name: 'Drea Esposito',
    bio: 'Computer Science @ U of M',
    profileImage: 'https://avatars.githubusercontent.com/u/108188633?v=4',
    socialLinks: {
        github: 'https://github.com/dreaesposito',
        linkedin: 'https://www.linkedin.com/in/drea-esposito/'
    }
}

const ethan = {
    name: 'Ethan Robson',
    bio: 'Data Science @ U of M',
    profileImage: 'https://avatars.githubusercontent.com/u/97577286?v=4',
    socialLinks: {
        github: 'https://github.com/ethanrobson10',
        linkedin: 'https://www.linkedin.com/in/ethan-robson-0a2176323/'
    }
}

const luc = {
    name: 'Luc Benedictson',
    bio: 'Computer Science @ U of M',
    profileImage: 'https://avatars.githubusercontent.com/u/108703609?v=4',
    socialLinks: {
        github: 'https://github.com/lucbenedictson',
        linkedin: 'https://www.linkedin.com/in/luc-benedictson/'
    }
}


function AboutPage() {
    return (
        <Container className="mt-3 mb-2">
            <Row>
                <h2>About</h2>
                <p className="fs-5 my-2">
                    We built this project to bring NHL stats to life in a way that goes beyond just basic numbers. Our
                    database covers over eight years of player and game statistics, capturing key aspects of the
                    league—like how players, teams, and games connect. With our strong background in hockey, we wanted
                    to create a system that reflects the true depth of the sport and offers interesting insights.
                </p>

                <p className="fs-5 my-2">
                    Instead of just listing stats, our project digs deeper. We track everything from individual player
                    performance and referee involvement, to team schedules and even specific hockey plays. Whether
                    you're a casual fan curious about the game or an analyst looking for some detailed data,
                    we wanted to make it easy to explore the NHL like never before. <a
                    className="text-muted custom-link"
                    href="https://www.kaggle.com/datasets/martinellis/nhl-game-data"
                    target="_blank">data source</a>
                </p>
            </Row>

            <Row>
                <h2 className="mt-3 mb-4">Technology Used</h2>
                <Col md={3} lg={3} className="pb-3">
                    <ListGroup className="card-style">
                        <ListGroup.Item variant="dark"><h2>Preprocessing</h2></ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={pythonLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Python</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={pandasLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Pandas</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>


                <Col md={3} lg={3} className="pb-3">
                    <ListGroup className="card-style">
                        <ListGroup.Item variant="dark"><h2>Database</h2></ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={postgresIcon} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>PostgreSQL</h5>
                                </div>
                            </div>
                            <p>wagwe</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="card-style">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={supabaseIcon} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Supabase</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3} lg={3} className="pb-3">
                    <ListGroup className="card-style">
                        <ListGroup.Item variant="dark"><h2>Backend</h2></ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={pythonLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Heroku</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={pandasLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Java</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>


                <Col md={3} lg={3} className="pb-3">
                    <ListGroup className="card-style">
                        <ListGroup.Item variant="dark"><h2>Frontend</h2></ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={reactLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>React</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={bootstrapLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Bootstrap</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="card-style">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Image
                                    src={vercelLogo} // Replace with your image URL
                                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                                />
                                <div>
                                    <h5>Vercel</h5>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Row>
                <h2 className="mt-3 mb-2">Contributors</h2>
                <ProfileCard user={drea}/>
                <ProfileCard user={ethan}/>
                <ProfileCard user={luc}/>
            </Row>


            {/*<Row>*/}
            {/*    <p className="fs-4 pt-3">*/}
            {/*        <a href="https://www.kaggle.com/datasets/martinellis/nhl-game-data" target="_blank">Data Source</a>*/}
            {/*    </p>*/}
            {/*</Row>*/}
        </Container>
    )
}

export default AboutPage;