import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { supabase } from "../../server.js";
import Postcard from "../components/Postcard.jsx";

const Homepage = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase.from("Post").select();
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
        <img id="background-image" src="../../../src/assets/background.jpeg" />
      </div>
      <div className="order-container">
        <p>Order by</p>
        <button id="popular-button">Popularity</button>
        <button id="new-button">Newest</button>
        <button id="old-button">Oldest</button>
      </div>
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
            <p> Nothing posted here.</p>
            <button
              id="create-button"
              onClick={navigateCreate}
              style={{ width: "80%" }}
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
