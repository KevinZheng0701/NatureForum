import React, { useEffect, useState } from "react";
import "./Viewpage.css";
import { useParams } from "react-router-dom";
import { supabase } from "../../server";
import Postcard from "../components/Postcard.jsx";

const Viewpage = () => {
  const { query } = useParams();
  const [postList, setPostList] = useState([]);
  const [selected, setSelected] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase.from("Post").select();
        setPostList(data);
        setFilteredList(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPostsByName = async () => {
      try {
        const { data } = await supabase
          .from("Post")
          .select()
          .ilike("title", `%${query}%`);
        setPostList(data);
        setFilteredList(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (query) {
      fetchPostsByName();
    } else {
      fetchPosts();
    }
  }, [query]);

  useEffect(() => {
    const sortByPopularity = () => {
      setFilteredList([...postList].sort((a, b) => b.upvote - a.upvote));
    };
    const sortByNewest = () => {
      setFilteredList(
        [...postList].sort(
          (a, b) => new Date(b.created_time) - new Date(a.created_time)
        )
      );
    };
    const sortByOldest = () => {
      setFilteredList(
        [...postList].sort(
          (a, b) => new Date(a.created_time) - new Date(b.created_time)
        )
      );
    };
    if (selected === "popular") {
      sortByPopularity();
    } else if (selected === "newest") {
      sortByNewest();
    } else if (selected === "oldest") {
      sortByOldest();
    } else {
      setFilteredList(postList);
    }
  }, [selected]);

  return (
    <div className="view-container">
      <div className="order-container">
        <p>Order by</p>
        <button
          className={`${selected === "popular" ? "selected" : ""}`}
          id="popular-button"
          onClick={() => {
            selected === "popular" ? setSelected("") : setSelected("popular");
          }}
        >
          Popularity
        </button>
        <button
          className={`${selected === "newest" ? "selected" : ""}`}
          id="new-button"
          onClick={() => {
            selected === "newest" ? setSelected("") : setSelected("newest");
          }}
        >
          Newest
        </button>
        <button
          className={`${selected === "oldest" ? "selected" : ""}`}
          id="old-button"
          onClick={() => {
            selected === "oldest" ? setSelected("") : setSelected("oldest");
          }}
        >
          Oldest
        </button>
      </div>
      <div className="posts-container">
        {filteredList ? (
          filteredList.map((post) => (
            <Postcard
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              content={post.content}
              time={post.created_time}
              upvote={post.upvote}
            />
          ))
        ) : (
          <p> Nothing posted here.</p>
        )}
      </div>
    </div>
  );
};

export default Viewpage;
