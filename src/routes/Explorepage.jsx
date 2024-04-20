import React, { useState, useEffect } from "react";
import "./Explorepage.css";
const UPSPLASH_KEY = import.meta.env.VITE_UPSPLASH_ACCESS_KEY;

const Explorepage = () => {
  const [imageList, setImageList] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random/?count=30&query=nature&client_id=${UPSPLASH_KEY}`
      );
      const json = await response.json();
      setImageList(json);
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  return (
    <div className="explore-container">
      <h2>Explore the nature</h2>
      <button id="explore-button" onClick={fetchImages}>
        Explore
      </button>
      {imageList.length > 0 && (
        <div className="image-list">
          {imageList.map((image) => (
            <div key={image.id}>
              <img
                id="image-item"
                src={image.urls.regular}
                alt={image.alt_description}
              />
              <div className="photographer">
                Photo by{" "}
                <a
                  href={`${image.user.links.html}?utm_source=your_app_name&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="photographer-link"
                >
                  {image.user.name}
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="website-link"
                >
                  Unsplash
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explorepage;
