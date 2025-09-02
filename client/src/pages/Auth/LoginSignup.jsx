import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);
      const url = isLogin
        ? `${import.meta.env.VITE_SERVER_URL}/api/auth/login`
        : `${import.meta.env.VITE_SERVER_URL}/api/auth/register`;

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : {
                name: formData.name,
                email: formData.email,
                password: formData.password,
              }
        ),
      });

      const data = await res.json();
      setMessage(data.msg);

      if (res.ok && isLogin) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ paddingTop: "100px" }}>
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {/* OAuth */}
        <a
          href={`${import.meta.env.VITE_SERVER_URL}/api/oauth/google`}
          className="oauth btn btn-primary oauth-btn d-flex justify-content-center align-items-center gap-2"
        >
          Login With
          <img src="/icons/google.svg" width={30} height={30} alt="Google" />
        </a>

        {message && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {isLogin && (
            <div style={{ textAlign: "right" }}>
              <Link to="/forgot-password" style={{ fontSize: "14px" }}>
                Forgot password?
              </Link>
            </div>
          )}
          <div className="d-flex">
            <button
              type="submit"
              className="btn btn_yellow"
              style={{ margin: "0 auto" }}
              disabled={loading}
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm}>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </div>
    </div>
  );
}
