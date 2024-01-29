import React from "react";
import "./hero.css";

function Hero() {
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
          <button className="hero-btn">Start reading</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
