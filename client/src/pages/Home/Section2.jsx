import { Col, Container, Row } from "react-bootstrap";
import Pizza from '/assets/about/pizza.png'
import Salad from '/assets/about/salad.png'
import Delivery from '/assets/about/delivery-bike.png'

const mockData = [
  {
    image: Pizza,
    title: "Original",
    paragraph: `Experience the authentic taste of our freshly baked pizza, made with hand-tossed dough, rich tomato sauce, and a generous blend of premium cheeses and toppings.`,
  },
  {
    image: Salad,
    title: "Quality Foods",
    paragraph: `Indulge in our crisp, fresh salads crafted from farm-fresh ingredients, packed with nutrients and vibrant flavors that make every bite refreshing and delicious.`,
  },
  {
    image: Delivery,
    title: "Fastest Delivery",
    paragraph: `Get your favorite meals delivered to your door in record time with our lightning-fast delivery service, ensuring every order arrives fresh and piping hot.`,
  }
  
  // Add more mock data objects as needed
];


export default function Section2() {
  return (
    <>
      <div id="about"></div>
      <section   className="about-section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <h2>The burger tastes better when you eat it with your family</h2>
              <p>
              Gather around and indulge in our mouthwatering burgers, crafted with the freshest ingredients and bursting with flavor. 
              Whether you like it classic, spicy, or loaded, every bite is a moment to savor with your loved ones.
              </p>
              <a href="#menu" className="btn order_now btn_red">
                Explore Full Menu
              </a>
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
