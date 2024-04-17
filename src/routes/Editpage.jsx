import React, { useState, useEffect } from "react";
import "./Editpage.css";
import { supabase } from "../../server.js";
import { useParams } from "react-router-dom";

const Editpage = () => {
  const { id } = useParams();
  const [verfied, setVerified] = useState(false);
  const [data, setData] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
    secret: 0,
  });
  const [secretInput, setSecretInput] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("Post").select().eq("id", id);
      setData({
        title: data[0].title,
        author: data[0].author,
        content: data[0].content,
        image: data[0].image,
        secret: data[0].secret,
      });
    };
    fetchPost();
  }, [id]);

  const verifyKey = (e) => {
    e.preventDefault();
    if (data.secret === parseInt(secretInput)) {
      setVerified(true);
      setSecretInput(0);
    } else {
      alert("Wrong key");
    }
  };

  const handleInput = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSecretInput = (e) => {
    setSecretInput(e.target.value);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    await supabase
      .from("Post")
      .update({
        title: data.title.trim(),
        author: data.author.trim(),
        content: data.content.trim(),
        image: data.image,
      })
      .eq("id", id);
    window.location = "/";
  };

  const deletePost = async (e) => {
    e.preventDefault();
    await supabase.from("Post").delete().eq("id", id);
    window.location = "/";
  };

  return (
    <div className="edit-page">
      {!verfied ? (
        <div className="secret-container">
          <form onSubmit={verifyKey} className="form-container">
            <p>Your secret key:</p>
            <input
              type="text"
              name="secret"
              value={secretInput}
              placeholder="Secret Key"
              onChange={handleSecretInput}
              id="secret-input"
              required
            />
            <button type="submit" id="access-button">
              Access Edit
            </button>
          </form>
        </div>
      ) : (
        <div className="edit-container">
          <h2>Edit your post</h2>
          <form onSubmit={updatePost} className="form-container">
            <h4>Title of post:</h4>
            <input
              type="text"
              name="title"
              value={data.title}
              placeholder="Title"
              onChange={handleInput}
              id="title-input"
              required
            />
            <h4>Your name:</h4>
            <input
              type="text"
              name="author"
              value={data.author}
              placeholder="Name"
              onChange={handleInput}
              id="name-input"
              required
            />
            <h4>Image URL:</h4>
            <input
              type="text"
              name="image"
              value={data.image}
              placeholder="URL"
              onChange={handleInput}
              id="image-input"
              required
            />
            <h4>Description:</h4>
            <textarea
              name="content"
              value={data.content}
              placeholder="Share your thoughts"
              onChange={handleInput}
              id="content-input"
              required
            />
            <br></br>
            <div className="buttons-container">
              <button submit="type" id="update-button">
                Update
              </button>
              <button onClick={deletePost} id="delete-button">
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Editpage;
