import React from "react";
import "./Postcard.css";
import { Link } from "react-router-dom";

const Postcard = (props) => {
  return (
    <div className="post-container">
      <Link to={`/${props.id}`}>
        <h1>{props.title}</h1>
        <h3>By: {props.author}</h3>
        <h5>Upvotes: {props.upvote}</h5>
        <p className="description-container">{props.content}</p>
      </Link>
    </div>
  );
};

export default Postcard;
