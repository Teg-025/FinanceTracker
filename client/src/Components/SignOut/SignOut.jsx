import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut({ setLoginState }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");  // Clear the token
    setLoginState(false);                       // Update login state
    navigate("/login", { replace: true }); // Navigate to login page
  }, [setLoginState, navigate]);

  return <p>Signing out...</p>;
}

