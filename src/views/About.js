import { Row, Col, Button } from 'react-bootstrap';

function About() {
    return (
        <Row className="my-5" style={{ marginRight: 0 }}>
            <Col className="text-center">
                <Button variant="primary" size="lg">
                    Hello World
                </Button>
            </Col>
        </Row>
    );
}

export default About;
