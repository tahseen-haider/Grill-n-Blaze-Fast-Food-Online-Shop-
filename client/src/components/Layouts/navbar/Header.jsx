import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "/assets/logo/logo.png";
import "../../../styles/HeaderStyle.css";
import { useState, useEffect } from "react";
import ProfileHeaderButton from "./AuthNav";
import CartBtn from "./CartDropdown";

export default function Header() {
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const changeValueOnScroll = () => {
      setNav(document.documentElement.scrollTop > 100);
    };
    window.addEventListener("scroll", changeValueOnScroll);
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${nav ? "sticky" : ""} px-2 px-lg-5`}
      >
        {/* LEFT SIDE - Logo */}
        <Link to="/" className="logo navbar-brand">
          <img src={logo} alt="Logo" className="img-fluid" />
        </Link>

        {/* RIGHT SIDE (Mobile) */}
        <div className="d-flex align-items-center d-lg-none ms-auto gap-3">
          <div className="me-2 d-flex gap-3 justify-content-center align-items-center">
            {/* Profile */}
            <ProfileHeaderButton />
            <CartBtn/>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>

        {/* CENTER (Desktop) */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto text-center">
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
          </Nav>

          {/* For Desktop */}
          <div className="d-none d-lg-flex ms-lg-3 gap-4 align-items-center justify-content-center">
            {/* Profile */}
            <ProfileHeaderButton />
            {/* Cart */}
            <CartBtn/>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
