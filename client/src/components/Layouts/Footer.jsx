import { Col, Container, Row } from "react-bootstrap";
import "../../styles/FooterStyle.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollBtnCheck = () => {
    let scrollValue =
      document.body.scrollTop || document.documentElement.scrollTop;

    scrollValue > 250 ? setShowBtn(true) : setShowBtn(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollBtnCheck);
    return () => {
      window.removeEventListener("scroll", scrollBtnCheck);
    };
  }, []);

  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <div className="text-center">
                <h5>Location</h5>
                <p>Stop No. 09</p>
                <p>Farid Town Sahiwal</p>
                <p>Pakistan</p>
              </div>
            </Col>
            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <div className="text-center">
                <h5>Working Hours</h5>
                <p>Mon-Fri: 9:00AM - 10:00PM</p>
                <p>Saturday: 10:00AM - 8:30PM</p>
                <p>Sunday: 12:00PM - 5:00PM</p>
              </div>
            </Col>
            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <div className="text-center">
                <h5>Order Now</h5>
                <p>Contact us for your favorite meals</p>
                <p>
                  <Link className="calling" to="tel:3020620626">
                    +92 302 0620626
                  </Link>
                </p>
              </div>
            </Col>
            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <div className="text-center">
                <h5>Follow Us</h5>
                <p>Stay connected through our social media</p>
                <ul className="list-unstyled text-center mt-2">
                  <li>
                    <Link to="https://www.facebook.com">
                      <i className="bi bi-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.twitter.com">
                      <i className="bi bi-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.instagram.com">
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.youtube.com">
                      <i className="bi bi-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="copy-right">
            <Col>
              <div>
                <ul className="list-unstyled text-center mb-0">
                  <li>
                    <Link to="/">
                      © 2024 <span>Grill & Cheese</span>. All Rights Reserved
                    </Link>
                  </li>
                  <li>
                    <Link to="/">About Us</Link>
                  </li>
                  <li>
                    <Link to="/">Terms Of Use</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {showBtn && (
        <div className="scroll-top" onClick={scrollTop}>
          <i className="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
}
