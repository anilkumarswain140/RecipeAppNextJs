"use client";
import React, { useState } from "react";
import "./AddRating.css"; // Assuming you have styling for the stars

const Rating = ({ initialRating = 0, onRatingChange, isEditable = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (ratingValue) => {
    if (isEditable) {
      setRating(ratingValue); // Update the rating state when a star is clicked
      onRatingChange(ratingValue); // Pass the new rating to the parent component
    }
  };

  const handleMouseEnter = (ratingValue) => {
    if (isEditable) {
      setHoverRating(ratingValue); // Temporarily show stars on hover
    }
  };

  const handleMouseLeave = () => {
    if (isEditable) {
      setHoverRating(0); // Reset hover state when mouse leaves
    }
  };

  return (
    <div className="rating" tabIndex={0}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          tabIndex={0}
          data-testid={`star-${star}`}
          key={star}
          className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isEditable ? "pointer" : "default" }} // Show pointer cursor only when editable
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
