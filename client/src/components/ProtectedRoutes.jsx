import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, loading, initialized } = useSelector((state) => state.user);

  // ✅ Wait until the user fetch attempt is complete
  if (!initialized || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading...</p>
      </div>
    );
  }

  // ✅ After initialization, if no user → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Otherwise render the protected route
  return <Outlet />;
}
