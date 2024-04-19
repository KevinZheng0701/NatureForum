import React, { useEffect, useState } from "react";
import "./Comment.css";
import { supabase } from "../../server";

const Comment = ({ id }) => {
  const [input, setInput] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await supabase
      .from("Comment")
      .insert({ post_id: id, content: input.trim() });
    setInput("");
    fetchComments();
  };

  const fetchComments = async () => {
    const { data } = await supabase.from("Comment").select().eq("post_id", id);
    setCommentList(data);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div className="comment-section">
      <h2>Comment Section</h2>
      <form onSubmit={handleComment} className="comment-form">
        <textarea
          name="comment"
          value={input}
          placeholder="Share your thoughts"
          onChange={handleInput}
          id="comment-input"
          required
        />
        <button id="comment-button" type="submit">
          Comment
        </button>
      </form>
      {commentList.length > 0 ? (
        <div className="comment-feed">
          {commentList.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
