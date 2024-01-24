import React from "react";
import "./about.css";
import codeImage from "../../assets/codeImage.jpg";
import graduateImage from "../../assets/graduateImage.jpg";
import personDebuggingImage from "../../assets/personDebuggingImage.jpg";
import studentsGroupImage from "../../assets/studentsGroupImage.jpg";

function About(){
  return (
    <div className="about-container">
      <div className="about">
        <div className="explore-build-change">
          <h2 className="discover-build-debug-blog">
            <span>Discover. </span>
            <span>Build. </span>
            <span>Debug. </span>
            <span>Blog.</span>
          </h2>
          <p className="about">
            Welcome to the Moringa Blog Application – your immersive platform
            for a transformative learning journey. Discover a wealth of
            knowledge in diverse articles and resources, learning from industry
            experts and mentors. Build skills through hands-on tutorials and
            collaborative projects that inspire growth. Don't fear challenges –
            debug your code with troubleshooting guides and community support.
            Progress on your learning adventure and blog about your experiences,
            contributing to our dynamic knowledge-sharing environment. Embrace
            the journey with the Moringa Blog App as your companion.
          </p>
          <div className="cards">
            <div className="card">
              <div className="card-image">
                <img src={personDebuggingImage} alt="" />
              </div>
              <div className="image-caption">Solve Blockers</div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src={codeImage} alt="" />
              </div>
              <div className="image-caption">Build Career</div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src={studentsGroupImage} alt="" />
              </div>
              <div className="image-caption">Network</div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src={graduateImage} alt="" />
              </div>
              <div className="image-caption">Level Up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;