import { Container, Row, Col } from "react-bootstrap";

import Image1 from "/assets/menu/burger-11.jpg";
import Image2 from "/assets/menu/burger-12.jpg";
import Image3 from "/assets/menu/burger-13.jpg";
import Image4 from "/assets/menu/burger-14.jpg";
import Image5 from "/assets/menu/burger-15.jpg";
import Image6 from "/assets/menu/burger-16.jpg";
import Image7 from "/assets/menu/burger-17.jpg";
import Image8 from "/assets/menu/burger-18.jpg";
import Cards from "../../components/Layouts/Cards";
import { Link } from "react-router-dom";

const products = [
  {
    id: "0001",
    image: Image1,
    title: "Crispy Chicken",
    paragraph: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
    rating: 5,
    price: 650,
  },
  {
    id: "0002",
    image: Image2,
    title: "Ultimate Bacon",
    paragraph: "House patty, cheddar cheese, bacon, onion, mustard",
    rating: 4.5,
    price: 560,
  },
  {
    id: "0003",
    image: Image3,
    title: "Black Sheep",
    paragraph: "American cheese, tomato relish, avocado, lettuce, red onion",
    rating: 4,
    price: 560,
  },
  {
    id: "0004",
    image: Image4,
    title: "Vegan Burger",
    paragraph: "House patty, cheddar cheese, bacon, onion, mustard",
    rating: 3.5,
    price: 600,
  },
  {
    id: "0005",
    image: Image5,
    title: "Double Burger",
    paragraph: "2 patties, cheddar cheese, mustard, pickles, tomatoes",
    rating: 3.0,
    price: 560,
  },
  {
    id: "0006",
    image: Image6,
    title: "Turkey Burger",
    paragraph: "Turkey, cheddar cheese, onion, lettuce, tomatoes, pickles",
    rating: 3,
    price: 560,
  },
  {
    id: "0007",
    image: Image7,
    title: "Smokey House",
    paragraph: "patty, cheddar cheese, onion, lettuce, tomatoes, pickles",
    rating: 2.5,
    price: 560,
  },
  {
    id: "0008",
    image: Image8,
    title: "Classic Burger",
    paragraph: "cheddar cheese, ketchup, mustard, pickles, onion",
    rating: 2.0,
    price: 560,
  },
  // Add more mock data objects as needed
];

const renderRatingIcons = (rating) => {
  const starsHTML = [];

  for (let i = 0; i < 5; i++) {
    if (rating > 0.5) {
      starsHTML.push(<i key={i} className="bi bi-star-fill"></i>);
    } else if (rating > 0 && rating < 1) {
      starsHTML.push(<i key={i} className="bi bi-star-half"></i>);
    } else {
      starsHTML.push(<i key={i} className="bi bi-star"></i>);
    }
    rating--;
  }

  return starsHTML;
};

export default function Section3() {
  return (
    <>
      <section id="menu" className="menu-section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
              <h2>OUR CRAZY BURGERS</h2>
              <p className="para">
                Dive into a world of bold flavors with our crazy burgers,
                crafted to perfection with juicy patties, fresh toppings, and
                signature sauces—each bite is an adventure!
              </p>
            </Col>
          </Row>
          <Row>
            {products.map((item, index) => {
              return (
                <Cards
                  key={index}
                  image={item.image}
                  rating={item.rating}
                  title={item.title}
                  paragraph={item.paragraph}
                  price={item.price}
                  renderRatingIcons={renderRatingIcons}
                />
              );
            })}
          </Row>
          <Row className="pt-5">
            <Col sm={6} lg={5}>
              <div className="ads-box ads-img1 mb-5 mb-md-0">
                <h4 className="mb-0">GET YOUR FREE</h4>
                <h5>CHEESE FRIES</h5>
                <Link to="/" className="btn btn_red px-4 rounded-0">
                  Learn More
                </Link>
              </div>
            </Col>
            <Col sm={6} lg={7}>
              <div className="ads-box ads-img2">
                <h4 className="mb-0">GET YOUR FREE</h4>
                <h5>CHEESE FRIES</h5>
                <Link to="/" className="btn btn_red px-4 rounded-0">
                  Learn More
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
