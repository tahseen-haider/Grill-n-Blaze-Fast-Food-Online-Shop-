import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setMsg("Not authenticated");
        }
      })
      .catch(() => setMsg("Error loading data"));
  }, []);

  if (!user) return <h2>{msg}</h2>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
