import React, { useState, useEffect } from "react";
import "./Postcard.css";
import { Link } from "react-router-dom";

const Postcard = (props) => {
  const [time, setTime] = useState({ hour: 0, day: 0 });

  useEffect(() => {
    const formatTime = () => {
      const current = new Date();
      const created = new Date(props.time);
      const difference = current - created;
      const hourDiff = Math.floor(difference / 3600000);
      const dayDiff = Math.floor(hourDiff / 24);
      setTime({ hour: hourDiff % 24, day: dayDiff });
    };
    formatTime(props.time);
  }, [props.time]);

  const handleClick = () => {
    window.location = `/post/${props.id}`;
  };

  return (
    <div className="post-container" onClick={handleClick}>
      <h1>{props.title}</h1>

      <p>
        Posted {time.day} {time.day <= 1 ? "day" : "days"} and {time.hour}{" "}
        {time.hour <= 1 ? "hour" : "hours"} ago
      </p>
      <h5>
        {props.upvote} {props.upvote <= 1 ? "upvote" : "upvotes"}
      </h5>
    </div>
  );
};

export default Postcard;
