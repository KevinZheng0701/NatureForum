import React, { useState } from "react";
import "./Createpage.css";
import { supabase } from "../../server.js";

const Createpage = () => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
    secret: 0,
  });

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (input.secret < 100000) {
      alert("Need a secret key with at least 6 digits without leading 0s");
      return;
    }
    const imageUrlPattern =
      /^(data:image\/(png|jpg|jpeg|gif|svg\+xml);base64,|https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    if (!imageUrlPattern.test(input.image)) {
      alert("Please enter a valid image URL");
      return;
    }
    await supabase.from("Post").insert({
      title: input.title.trim(),
      author: input.author.trim(),
      content: input.content.trim(),
      image: input.image,
      secret: input.secret,
    });
    setInput({ title: "", author: "", content: "", image: "", secret: 0 });
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
        <h4>Image URL:</h4>
        <input
          type="text"
          name="image"
          value={input.image}
          placeholder="URL"
          onChange={handleInput}
          id="image-input"
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
        <div className="secret-container">
          <p>Add a secret key to your post:</p>
          <input
            type="number"
            name="secret"
            value={input.secret}
            placeholder="Secret Key"
            onChange={handleInput}
            id="secret-input"
            required
          />
          <button type="submit" id="create-button">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createpage;
