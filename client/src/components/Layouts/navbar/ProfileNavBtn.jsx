/* eslint-disable react/prop-types */
export default function ProfileNavBtn({ profile }) {
  const logout = async () => {
    const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) window.location.href = "/";
    else console.log("failed");
  };
  return (
    <div className="dropdown">
      {/* Image as the toggle button */}
      <button
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="border-0 bg-transparent p-0" // removes Bootstrap button styles
      >
        <img
          src={profile?.image || "/images/default-avatar.webp"}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </button>

      {/* Align dropdown so it never overflows */}
      <ul className="dropdown-menu dropdown-menu-end px-2">
        <div className="gap-0 d-flex flex-column text-center">
          <li>
            <div className="dropdown-item" href="#">
              {profile?.name || "User"}
            </div>
          </li>
          <li>
            <div className="dropdown-item text-secondary fs-7" href="#">
              {profile?.email || "user@email.com"}
            </div>
          </li>
          <li>
            <button
              className="dropdown-item bg-danger text-white rounded mt-3"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}
