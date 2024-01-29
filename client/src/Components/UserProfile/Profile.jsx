import React from "react";
import "./profile.css";
import Header from "./Header";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

function Profile() {
  return (
    <div className="profile-container">
      <Header />
      <div className="cols">
        <div className="left-col">
          <div className="img-container">
            <img
              src="https://images.unsplash.com/photo-1706018167918-a1b9ef373eac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <span></span>
          </div>
          <h2>Allan Njoroge</h2>
          <p>Software Engineer</p>
          <p>allan.njoroge@student.moringaschool.com</p>

          <ul className="user-about">
            <li>
              <span>1000</span>Likes
            </li>
            <li>
              <span>25</span>Posts
            </li>
          </ul>
          <div className="user-bio">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam
              erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl
              ligula egestas nulla.
            </p>
            <ul>
              <li>
                <span>
                  <GitHubIcon />
                </span>
              </li>
              <li>
                <span>
                  <LinkedInIcon />
                </span>
              </li>
              <li>
                <span>
                  <AlternateEmailIcon />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-col">
          <nav>
            <ul>
              <li>My posts</li>
            </ul>
          </nav>
          <div className="posts"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
