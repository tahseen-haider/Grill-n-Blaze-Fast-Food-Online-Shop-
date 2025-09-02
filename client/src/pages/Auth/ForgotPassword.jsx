import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setMsg(data.msg);
    } catch (error) {
      console.error(error);
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        {msg && <p style={{textAlign: "center"}}>{msg}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <button className="btn btn_yellow" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
