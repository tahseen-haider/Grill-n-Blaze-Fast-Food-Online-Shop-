import { Col, Container, Row } from "react-bootstrap";
import Burger from "/assets/hero/hero-2.png";
import AddToCartBtn from "../../components/AddToCartBtn";

export default function Section1() {
  return (
    <section id="hero" className="hero-section">
      <Container>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <img src={Burger} className="img-fluid" alt="Hero" />
              <div className="price-badge">
                <div className="badge-text">
                  <h4 className="h4_xs">Only</h4>
                  <h4 className="h3_lg">600/-</h4>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="hero-text text-center">
              <h1 className="text-white">New Burger</h1>
              <h2 className="text-white">With Onion</h2>
              <p className="text-white pt-2 pb-4">
                Savor the juiciest burger, grilled to perfection and topped with
                fresh lettuce, ripe tomatoes, melted cheese, and our signature
                smoky sauce. Served hot with crispy fries—get yours now and
                taste the flavor explosion!
              </p>
              <AddToCartBtn
                className={"order_now"}
                id={"special-burger"}
                image={Burger}
                title={"Special Burger"}
                price={600}
                rating={5}
                text={"ORDER NOW"}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
