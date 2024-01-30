import React from "react";
import logo from "../../assets/logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="register-login-btns">
        <button className="sign-in" onClick={(e) => navigate("/signin")}>
          Sign in
        </button>
        <button className="get-started" onClick={(e) => navigate("/signup")}>
          Get started
        </button>
      </div>
    </div>
  );
}

export default Navbar;
