import React from "react";
import { Link } from "react-router-dom";

const Notfoundpage = () => {
  return (
    <div>
      <h2>Oh, this doesn't seem to exist. </h2>
      <Link to="/" style={{ cursor: "pointer" }}>
        Head back to the hub
      </Link>
    </div>
  );
};

export default Notfoundpage;
