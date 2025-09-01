import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "/assets/logo/logo.png";
import "../../../styles/HeaderStyle.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileNavBtn from "./ProfileNavBtn";
import CartBtn from "./CartDropdown";
import { fetchUserData } from "../../../store/userSlice";

export default function Header() {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    const changeValueOnScroll = () => {
      setNav(document.documentElement.scrollTop > 100);
    };
    window.addEventListener("scroll", changeValueOnScroll);
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);

  const links = [
    { title: "HOME", link: "#hero" },
    { title: "About", link: "#about" },
    { title: "Menu", link: "#menu" },
    { title: "Blog", link: "#blog" },
    { title: "Contact", link: "#contact" },
  ];

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
            {loading ? (
              <div style={{ minWidth: "40px" }}></div>
            ) : user ? (
              <>
                <ProfileNavBtn user={user} />
                <CartBtn />
              </>
            ) : (
              isHomePage && (
                <button
                  className="btn btn_yellow"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login / Signup
                </button>
              )
            )}
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>

        {/* CENTER (Desktop) */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto text-center">
            {isHomePage &&
              links.map((ele, i) => (
                <a key={i} href={ele.link} className="nav-link">
                  {ele.title}
                </a>
              ))}
          </Nav>

          {/* For Desktop */}
          <div className="d-none d-lg-flex ms-lg-3 gap-4 align-items-center justify-content-center">
            {loading ? (
              <div style={{ minWidth: "40px" }}></div>
            ) : user ? (
              <>
                <ProfileNavBtn user={user} />
                <CartBtn />
              </>
            ) : (
              isHomePage && (
                <button
                  className="btn btn_yellow"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login / Signup
                </button>
              )
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
