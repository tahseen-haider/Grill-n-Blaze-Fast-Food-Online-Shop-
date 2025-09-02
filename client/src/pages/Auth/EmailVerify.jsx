import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EmailVerify() {
  const [searchParams] = useSearchParams();
  const [msg, setMsg] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return setMsg("Invalid verification link");

    fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify-email/${token}`)
      .then(res => res.json())
      .then(data => setMsg(data.msg))
      .catch(() => setMsg("Verification failed"));
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>{msg}</h2>
      <a className="btn btn_red" href="/login">Login</a>
    </div>
  );
}
