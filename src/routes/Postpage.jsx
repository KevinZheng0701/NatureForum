import React, { useState, useEffect } from "react";
import "./Postpage.css";
import { supabase } from "../../server.js";
import { useParams } from "react-router-dom";

const Postpage = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
    time: "",
    upvote: 0,
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("Post").select().eq("id", id);
      const date = new Date(data[0].created_time);
      const formattedDate = date.toLocaleDateString("en-US");
      setPostDetails({
        title: data[0].title,
        author: data[0].author,
        content: data[0].content,
        image: data[0].image,
        time: formattedDate,
        upvote: data[0].upvote,
      });
    };
    fetchPost();
  }, [id]);

  const handleEdit = (e) => {
    window.location = `/edit/${id}`;
  };

  const handleUpvote = async () => {
    setPostDetails((prev) => ({ ...prev, upvote: prev.upvote + 1 }));
    await supabase
      .from("Post")
      .update({ upvote: postDetails.upvote + 1 })
      .eq("id", id);
  };

  return (
    <div className="post-page">
      {postDetails && (
        <div>
          <h1>{postDetails.title}</h1>
          <p>Posted on {postDetails.time}</p>
          <h3>By: {postDetails.author}</h3>
          <img id="post-image" src={postDetails.image} alt="Image" />
          <p>{postDetails.content}</p>
          <div className="upvote-container">
            <h4>Upvote Counts: {postDetails.upvote}</h4>
            <button id="upvote-button" onClick={handleUpvote}>
              Like
            </button>
          </div>
          <button id="edit-button" onClick={handleEdit}>
            You are the publisher? Edit here
          </button>
        </div>
      )}
    </div>
  );
};

export default Postpage;
