import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Section7() {
  return (
    <>
      <section id="contact" className="contact-section">
        <Container>
          <Row className="text-center justify-content-center">
            <Col sm={8} className="text-center">
              <h4>We Guarantee</h4>
              <h2>30 Minutes Delivery!</h2>
              <p>
                Our fast food service ensures that your favorite meals arrive
                fresh and hot within 30 minutes. We prioritize speed and quality
                to give you the best dining experience right at your doorstep.
                Whether it&apos;s a quick snack or a hearty meal, we&apos;ve got you
                covered, anytime, anywhere!
              </p>
              <Link to="/" className="btn btn_red px-4 py-2 rounded-0">
                Call: 0302 0620626
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
