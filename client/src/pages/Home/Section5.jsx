import { Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StoreIOS from '../../assets/shop/appstore.png'
import StoreGoogle from '../../assets/shop/googleplay.png'
import DownloadImg from '../../assets/shop/e-shop.png'
import Brand1 from '../../assets/brands/brand-11.png'
import Brand2 from '../../assets/brands/brand-12.png'
import Brand3 from '../../assets/brands/brand-13.png'
import Brand4 from '../../assets/brands/brand-14.png'
import Brand5 from '../../assets/brands/brand-15.png'
import Brand6 from '../../assets/brands/brand-16.png'
import Brand7 from '../../assets/brands/brand-17.png'
import Brand8 from '../../assets/brands/brand-18.png'

export default function Section5() {
  return (
    <>
      <section className="shop-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
              <h4>Download Our Mobile App and</h4>
              <h2>Save Up to 20%</h2>
              <p>
                Get exclusive discounts and offers right at your fingertips!
                Download our app today to enjoy up to 20% off your orders and
                stay updated on the latest deals and promotions.
              </p>
              <Link to="/">
                <img src={StoreIOS} alt="IOS" className="img-fluid me-3"/>
              </Link>
              <Link to="/">
                <img src={StoreGoogle} alt="Android" className="img-fluid me-3"/>
              </Link>
            </Col>
            <Col lg={6}>
              <img src={DownloadImg} alt="e-shop" className="img-fluid"/>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="slider-section">
        <Container>
          <Row>
            <Carousel>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="d-flex align-item-center justify-content-between">
                    <div className="brand-img">
                      <img src={Brand1} alt="brand-1" className="img-fluid" />
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </section>
    </>
  );
}
