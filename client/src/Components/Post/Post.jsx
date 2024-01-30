import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import { useFormik } from "formik";
import * as Yup from "yup";
import Comment from "./Comment";
// import { useGlobalUserContext } from "../../context/authContext";

const Post = () => {
  // access id url param
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [post, setPost] = useState(null);

  const formik = useFormik({
    initialValues: {
      postComment: "",
    },

    validationSchema: Yup.object({
      postComment: Yup.string().required("Comment required"),
    }),
  });

  useEffect(() => {
    // fetch API - 1
    fetch(`/posts/${id}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            setPost(data);
          });
        } else {
          response.json().then((error) => {
            console.log(error);
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="pv-container">
      {post ? (
        <div className="pv">
          {/* DISPLAY FLEX */}
          <div className="pv-post-owner">
            <h4>{post.user.full_name}</h4>
            <p>Phase {post.phase}</p>
          </div>

          <div className="pv-title">
            <h3>{post.title}</h3>
          </div>

          <div className="pv-post-content">{post.content}</div>

          <div className="pv-post-bottom">
            <div className="pv-vote-details">
              <ThumbUpIcon
                onClick={() => {
                  fetch("/votes", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      // Authorization: `Bearer ${user.auth_token}`,
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      vote_type: 1,
                      post_id: id,
                      // user_id: user.data.id, //already passed on the server side
                    }),
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              />
              {/* <span>{numberOfVotes.length}</span> */}
              <ThumbDownIcon />
            </div>
            <div className="pv-comment-details">
              <CommentIcon />
              {/* <span>{comments.length}</span> */}
            </div>
          </div>

          <form action="" className="pv-comment-form">
            <label className="comment-label" htmlFor="">
              Comment as{" "}
              <span className="pv-username">{currentUser.username}</span>
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="comment-container"
              placeholder="What are your  thoughts?"
            ></textarea>

            <button className="pv-comment-btn">Comment</button>
          </form>

          <div className="comments-container">
            {post.comments &&
              post.comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    {...comment}
                    username={post.user.username}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Post;
