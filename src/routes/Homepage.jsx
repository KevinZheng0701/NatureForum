import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { supabase } from "../../server.js";
import Postcard from "../components/Postcard.jsx";

const Homepage = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase.from("Post").select().limit(20);
        setPostList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const navigateCreate = () => {
    window.location = "/create";
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img
          id="background-image"
          src="../../../src/assets/background.jpeg"
          alt="background"
        />
        <div className="overlay">
          <h1>Welcome to Nature Nexus</h1>
          <h3>
            Here you will find different posts of beautiful nature sights.
          </h3>
        </div>
      </div>
      <h3>Explore the wild</h3>{" "}
      <div className="posts-container">
        {postList ? (
          postList.map((post) => (
            <Postcard
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              content={post.content}
              time={post.created_time}
              upvote={post.upvote}
            />
          ))
        ) : (
          <>
            <p> Nothing posted here yet. Come share your photos.</p>
            <button
              id="create-button"
              onClick={navigateCreate}
              style={{ width: "10%" }}
            >
              Create a post
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
