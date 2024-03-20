import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Check if any user data is stored in sessionStorage
    if (
      sessionStorage.getItem("email") ||
      sessionStorage.getItem("jwt") ||
      sessionStorage.getItem("id")
    ) {
      // Remove user data from sessionStorage
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("id");

      // Redirect to the login page
      navigate("/login");
    } else {
      console.log("Not Logged In");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
