import React, { useState, useEffect } from "react";
import "./Postcard.css";
import { supabase } from "../../server.js";
import { Link } from "react-router-dom";

const Postcard = () => {
  useEffect;
  return (
    <div className="post-container">
      <Link to="/">
        <h1>example</h1>
        <h3>By: Kevin</h3>
        <p className="description-container">Description</p>
      </Link>
    </div>
  );
};

export default Postcard;
