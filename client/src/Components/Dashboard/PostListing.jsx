import React, { useEffect, useState } from "react";
import "./postListing.css";
import PostView from "./PostView";
import { useGlobalContext } from "../../context/postsContext";

const PostListing = () => {
  const { posts, setPosts, filteredPosts, setFilteredPosts } =
    useGlobalContext();

  // proxy:http:127.0.0.1:5555
  // fetch API
  const fetchPosts = () => {
    fetch("/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // run side effect on initial render/once
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-listing-container">
      {posts.map((post) => {
        return <PostView key={post.id} {...post} />;
      })}
    </div>
  );
};

export default PostListing;