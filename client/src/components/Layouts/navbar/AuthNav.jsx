import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProfileNavBtn from "./ProfileNavBtn";
import { fetchUserData } from "../../../store/userSlice";

export default function ProfileHeaderButton() {
  const dispatch = useDispatch();

  // ✅ Get user and loading state from Redux
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user data from API when component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  // ✅ While checking session, render placeholder (to avoid flicker)
  if (loading) return <div style={{ minWidth: "40px" }}></div>;

  return (
    <div>
      {user ? (
        <ProfileNavBtn /> // ProfileNavBtn now reads user from Redux
      ) : (
        <button
          className="btn btn_yellow"
          onClick={() => (window.location.href = "/login")}
        >
          Login / Signup
        </button>
      )}
    </div>
  );
}
