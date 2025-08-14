import { Carousel, Container, Row } from "react-bootstrap";
import user1 from '/assets/blog/AR.jpg'
import user2 from '/assets/blog/Pasha.jpg'
import user3 from '/assets/blog/Arman.jpg'
import user4 from '/assets/blog/Talha.jpg'

export default function Section6() {
  return (
    <>
      <section className="review-section">
        <Container>
          <Row>
            <Carousel>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user-img">
                    <img src={user1} alt="user" className="img-fluid"/>
                  </div>
                  <p>The burger was a delightful experience! The juicy patty was perfectly cooked, bursting with flavor, and seasoned just right. Topped with fresh lettuce, ripe tomatoes, and creamy mayonnaise, each bite was incredibly satisfying.</p>
                  <div className="items-rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY ABDUL REHMAN</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user-img">
                    <img src={user2} alt="user" className="img-fluid"/>
                  </div>
                  <p>The burger was juicy and packed with flavor. The perfectly melted cheese and fresh veggies added a nice crunch. The bun was soft, but it held everything together well. Overall, a delicious and satisfying meal!</p>
                  <div className="items-rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY ABDUL WAHAB</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user-img">
                    <img src={user3} alt="user" className="img-fluid"/>
                  </div>
                  <p>Great burger with a smoky flavor, but the patty was a bit overcooked for my liking. The toppings were fresh, and the sauce had a nice tang. Could use a bit more seasoning, but still enjoyable.</p>
                  <div className="items-rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY ARMAN SAJJAD</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user-img">
                    <img src={user4} alt="user" className="img-fluid"/>
                  </div>
                  <p>This burger hit the spot! The combination of crispy bacon, melted cheese, and a perfectly cooked beef patty was fantastic. The bun was a little too soft, but the overall taste made up for it.</p>
                  <div className="items-rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY TALHA QAYUM</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </section>
    </>
  );
}
