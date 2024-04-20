import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <div className="link-container">
          <Link to="/">
            <li>Hub</li>
          </Link>
          <Link to="create">
            <li>Create a post</li>
          </Link>
          <Link to="view">
            <li>View posts</li>
          </Link>
          <Link to="explore">
            <li>Explore</li>
          </Link>
        </div>
        <div className="search-bar">
          <Searchbar />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
