import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm={6} lg={3} className="mb-4 mb-lg-0">
            <div className="text-center">
              <h5>Location</h5>
              <p>5505 Waterford District</p>
              <p>Dr, Miami, FL 33126</p>
              <p>United States</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
