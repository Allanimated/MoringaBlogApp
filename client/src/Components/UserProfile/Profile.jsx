import React from "react";
import "./profile.css";
import Header from "../Header/Header";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PostView from "../Dashboard/PostView";
import profile from "../../assets/profile.jpg";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      <Header />
      <div className="cols">
        <div className="left-col">
          <div className="img-container">
            <img src={profile} alt="" />
            <span></span>
          </div>
          <h2>{currentUser.username}</h2>
          <p>Software Engineer</p>
          <p>{currentUser.email}</p>

          <ul className="user-about">
            <li>
              <span>
                {currentUser.votes
                  ? currentUser.votes.filter((vote) => {
                      return vote.vote_type === true;
                    }).length
                  : 0}
              </span>
              Upvotes
            </li>
            <li>
              <span>{currentUser.posts ? currentUser.posts.length : 0}</span>
              Posts
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
          <div className="posts">
            {currentUser.posts
              ? currentUser.posts.map((post) => {
                  return (
                    <div className="post-cards" key={post.id}>
                      <h6 className="post-title">{post.title}</h6>
                      <p>{post.content.slice(0, 250) + "..."}</p>
                      <hr />
                      <span>
                        Posted on: <em>{post.created_at}</em>
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
