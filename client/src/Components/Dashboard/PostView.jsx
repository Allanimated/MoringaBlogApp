import React, { useState } from "react";
import "./postview.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import { useGlobalUserContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const PostView = ({
  id,
  title,
  phase,
  content,
  created_at,
  resources,
  user,
  votes,
  comments,
}) => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const { token } = useGlobalUserContext();
  const navigate = useNavigate();
  const toggleReadMore = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  function handleUpvote(e) {
    fetch("/votes", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        vote_type: 1,
      }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => console.log(data));
      } else {
        resp.json().then((err) => console.log(err));
      }
    });
  }

  function handleDownVote(e) {
    fetch("/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        vote_type: 2,
      }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => console.log(data));
      } else {
        resp.json().then((err) => console.log(err));
      }
    });
  }

  const numberOfVotes = votes.filter((vote) => {
    return vote.vote_type === true;
  });

  return (
    <div className="single-post">
      <div className="post-owner">
        <h4>{user.full_name}</h4>
        <p>Phase: {phase}</p>
      </div>

      <div className="title">
        <h3>{title}</h3>
      </div>

      <div className="post-content">
        {isFullTextVisible ? (
          <div>{content}</div>
        ) : (
          <div>
            {content.length > 300 ? `${content.slice(0, 300)}` : content}
          </div>
        )}
        {content.length > 300 && (
          <span className="read-more" onClick={toggleReadMore}>
            {isFullTextVisible ? "Read Less" : "Read More"}
          </span>
        )}
      </div>

      <div className="post-bottom">
        <div className="vote-details">
          <ThumbUpIcon onClick={handleUpvote} />
          <span>{numberOfVotes.length}</span>
          <ThumbDownIcon onClick={handleDownVote} />
        </div>
        <div className="comment-details">
          <CommentIcon
            onClick={(e) => {
              navigate(`/posts/${id}`);
            }}
          />
          <span>{comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PostView;
