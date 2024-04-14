import React, { useState, useEffect } from "react";
import "./Postpage.css";
import { supabase } from "../../server.js";

const Postpage = () => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    author: "",
    content: "",
    upvote: "",
  });
};

export default Postpage;
