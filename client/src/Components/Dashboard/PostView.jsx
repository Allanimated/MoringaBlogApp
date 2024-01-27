import React, { useState } from "react";
import "./postview.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";

const PostView = ({
  title,
  phase,
  content,
  created_at,
  resources,
  user,
  votes,
  comments,
}) => {
  // console.log(votes[0].vote_type);

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

      <div className="post-content">{content}</div>

      <div className="post-bottom">
        <div className="vote-details">
          <ThumbUpIcon />
          <span>{numberOfVotes.length}</span>
          <ThumbDownIcon />
        </div>
        <div className="comment-details">
          <CommentIcon />
          <span>{comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PostView;