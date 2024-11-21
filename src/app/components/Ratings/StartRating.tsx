import React from "react";

const StarRating = ({ rating, maxRating = 5 }) => {
  const validRating = Math.min(rating, maxRating); // Ensure rating does not exceed maxRating
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = Math.max(maxRating - fullStars - (hasHalfStar ? 1 : 0), 0); // Ensure emptyStars is not negative

  return (
    <div className="star-rating" tabIndex={0}>
      {/* Full Stars */}
      {[...Array(fullStars)].map((item, index) => (
        <span key={index}>&#9733;</span> // Unicode for filled star
      ))}

      {/* Half Star */}
      {hasHalfStar && <span>&#9734;</span>}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((item, index) => (
        <span key={index + fullStars} tabIndex={0}>
          &#9734;
        </span> // Unicode for empty star
      ))}
    </div>
  );
};

export default StarRating;
