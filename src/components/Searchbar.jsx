import React, { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) {
      return;
    }
    navigate(`view/${input}`);
    setInput("");
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          placeholder="Start your journey"
          onChange={handleInput}
          id="search-input"
        />
        <button id="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
