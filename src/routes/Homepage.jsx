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
        console.log(data);
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
      <div className="posts-container">
        {postList ? (
          postList.map((post) => (
            <Postcard
              id={post.id}
              title={post.title}
              author={post.author}
              content={post.content}
              upvote={post.upvote}
            />
          ))
        ) : (
          <>
            <p> Nothing posted here.</p>
            <button onClick={navigateCreate}>Create a post</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
