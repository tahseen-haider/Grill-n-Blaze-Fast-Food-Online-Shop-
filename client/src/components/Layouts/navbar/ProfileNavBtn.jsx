/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/userSlice";

export default function ProfileNavBtn({ user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="border-0 bg-transparent p-0"
      >
        <img
          src={user?.profilePic || "/images/default-avatar.webp"}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </button>

      <ul className="dropdown-menu dropdown-menu-end px-2">
        <div className="gap-0 d-flex flex-column text-center">
          <li>
            <div className="dropdown-item">{user?.name || "User"}</div>
          </li>
          <li>
            <div className="dropdown-item text-secondary fs-7">
              {user?.email || "user@email.com"}
            </div>
          </li>
          <li>
            <button
              className="dropdown-item bg-danger text-white rounded mt-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}
