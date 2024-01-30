import React from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-container">
      <div className="hero">
        <h1 className="title" data-text="Stay Curious.">
          Stay Curious.
        </h1>
        <p className="phrase">
          Discover intresting articles that will help you learn, debug and build
          your coding expertise.
        </p>
        <div className="btn-container">
          <button className="hero-btn" onClick={(e) => navigate("/dashboard")}>
            Start reading
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
