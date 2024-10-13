import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pizza from '../../assets/about/pizza.png'
import Salad from '../../assets/about/salad.png'
import Delivery from '../../assets/about/delivery-bike.png'

const mockData = [
  {
    image: Pizza,
    title: "Original",
    paragraph: `Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus`,
  },
  {
    image: Salad,
    title: "Qualty Foods",
    paragraph: `Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus`,
  },
  {
    image: Delivery,
    title: "Fastest Delivery",
    paragraph: `Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus`,
  },
  // Add more mock data objects as needed
];


export default function Section2() {
  return (
    <>
      <section className="about-section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <h2>The burger tastes better when you eat it with your family</h2>
              <p>
                Porta semper lacus cursus, feugiat primis ultrice a ligula risus
                auctor an tempus feugiat dolor lacinia cubilia curae integer
                orci congue and metus integer primis in integer metus
              </p>
              <Link to="/" className="btn order_now btn_red">
                Explore Full Menu
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about-wrapper">
        <Container>
          <Row className="justify-content-md-center ">
            {mockData.map((item, index) => (
              <Col key={index} md={6} lg={4} className=" mb-4 mb-md-0">
                <div className="about-box text-center">
                  <div className="about-icon">
                    <img src={item.image} alt="icon" className="img-fluid"/>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.paragraph}</p>
                </div>
              </Col>
            )
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}
