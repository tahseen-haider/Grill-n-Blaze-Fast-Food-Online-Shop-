import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/user/admin/dashboard`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (data.admin) {
          if (data.admin.role !== "admin") {
            navigate("/"); // Redirect if not admin
            return;
          }
          setAdmin(data.admin);
          setUsers(data.users);
        } else {
          navigate("/"); // Redirect if no admin
        }
      } catch (err) {
        console.error(err);
        navigate("/"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {admin?.name}</h2>
      <p>Email: {admin?.email}</p>

      <h3>All Users:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
