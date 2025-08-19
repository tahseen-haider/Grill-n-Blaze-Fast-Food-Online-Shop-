import { useEffect, useState } from "react";
import ProfileNavBtn from "./ProfileNavBtn";

export default function ProfileHeaderButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    (async () => {
      const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/user/profile`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        setProfile(data.user)
      } else {
        setIsLoggedIn(false);
        setProfile(undefined);
      }
      setIsMounted(true);
    })();
  }, []);

  if(!isMounted) return <div style={{minWidth:"40px"}}></div>

  return (
    <div>
      {isLoggedIn ? (
        <ProfileNavBtn profile={profile}/>
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
