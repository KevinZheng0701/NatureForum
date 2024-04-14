import React, { useState } from "react";
import "./Createpage.css";
import { supabase } from "../../server.js";

const Createpage = () => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    content: "",
  });

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createPost = async (e) => {
    e.preventDefault();
    await supabase.from("Post").insert({
      title: input.title,
      author: input.author,
      content: input.content,
    });
    setInput({ title: "", author: "", content: "" });
    window.location = "/";
  };

  return (
    <div className="create-container">
      <h2>Create a post</h2>
      <form onSubmit={createPost} className="form-container">
        <h4>Title of post:</h4>
        <input
          type="text"
          name="title"
          value={input.title}
          placeholder="Title"
          onChange={handleInput}
          id="title-input"
          required
        />
        <h4>Your name:</h4>
        <input
          type="text"
          name="author"
          value={input.author}
          placeholder="Name"
          onChange={handleInput}
          id="name-input"
          required
        />
        <h4>Description:</h4>
        <textarea
          name="content"
          value={input.content}
          placeholder="Share your thoughts"
          onChange={handleInput}
          id="content-input"
          required
        />
        <br></br>
        <button type="submit" id="create-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default Createpage;
