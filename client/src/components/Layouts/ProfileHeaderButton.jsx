import { useEffect, useState } from "react";

export default function ProfileHeaderButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Helper: Get cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const token = getCookie("token"); // Replace with your cookie name

    console.log(token)
    if (token) {
      setIsLoggedIn(true);

      // Fetch profile data
      fetch("/api/user/profile", {
        credentials: "include", // include cookies in request
      })
        .then((res) => res.json())
        .then((data) => setProfilePic(data.profilePic))
        .catch((err) => console.error(err));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <img
          src={profilePic || "/default-avatar.png"}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      ) : (
        <button
          className="btn btn_yellow"
          onClick={() => (window.location.href = "/login")}
          style={{}}
        >
          Login / Signup
        </button>
      )}
    </div>
  );
}
