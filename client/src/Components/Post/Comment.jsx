import React from "react";
import "./comment.css";

const Comment = ({ content, created_at, username }) => {
  return (
    <div className="comment">
      <div className="comment-author-time">
        <h3 className="author">{username}</h3>
        <p className="time">{created_at}</p>
      </div>

      <div className="comment-content">{content}</div>
    </div>
  );
};

export default Comment;
