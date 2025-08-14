import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/assets/logo/logo.png";
import "../../styles/HeaderStyle.css";
import { useState } from "react";

export default function Header() {
  const [nav, setNav] = useState(false);

  const changeValueOnScroll = () => {
    const scrollValue = document.documentElement.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  window.addEventListener("scroll", changeValueOnScroll);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${nav === true ? "sticky" : ""}`}
      >
        <Container>
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="img-fluid" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <a href="#hero" className="nav-link">
                Home
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#menu" className="nav-link">
                Menu
              </a>
              <a href="#blog" className="nav-link">
                Blog
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
              <a to="/" className="nav-link">
                <div className="cart">
                  <i className="bi bi-cart2"></i>
                  <em className="roundpoint">2</em>
                </div>
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
