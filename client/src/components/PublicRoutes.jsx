import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { user, loading, initialized } = useSelector((state) => state.user);

  // Wait until the user initialization finishes
  if (!initialized || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is logged in, redirect them away from public routes
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the public route (e.g. login, signup, forgot password)
  return <Outlet />;
}
