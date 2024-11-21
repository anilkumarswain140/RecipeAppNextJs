"use client";

import "./RecipeDetails.css";
import { rateRecipe } from "../../api/apiService";
import Rating from "@/app/components/Ratings/AddRating";
import Comments from "@/app/components/Comments/comment";
import { useToast } from "../../contexts/ToastContext";

const RecipeDetailsClient = ({ recipe }) => {
  const { showToast } = useToast();

  const handleRatingChange = async (newRating) => {
    try {
      const response = await rateRecipe(recipe._id, newRating);
      showToast("Form submitted successfully!", "success");
      return response;
    } catch (error) {
      console.error("Error submitting rating:", error);
      showToast("Error submitting rating:", "error");
    }
  };

  return (
    <div className="recipe-details-container">
      {/* Recipe Image */}
      <div className="recipe-header" role="banner">
        <img
          tabIndex={0}
          className="recipe-image"
          src={recipe.image}
          alt={`Image of ${recipe.title}`} // Ensure descriptive alt text for images
          aria-labelledby="recipe-title" // Associate image with the recipe title for context
          loading="lazy" // Improve performance by lazy loading images
        />
        <div className="recipe-title-info">
          <h1 id="recipe-title" className="recipe-title" tabIndex={0}>
            {recipe.title}
          </h1>
          <p className="author" tabIndex={0}>
            <strong>By</strong> <span>{recipe.author.username}</span>
          </p>
          <div className="recipe-info">
            <span>
              <strong tabIndex={0}>Prep Time:</strong> {recipe.preparationTime}{" "}
              mins
            </span>
            <span>
              <strong tabIndex={0}>Rating:</strong> {recipe.averageRating} ★
            </span>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div
        className="recipe-section"
        role="region"
        aria-labelledby="ingredients-section"
        tabIndex={0}
      >
        <h2 id="ingredients-section" tabIndex={0}>
          Ingredients
        </h2>
        <ul className="ingredients-list" tabIndex={0}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} role="listitem" tabIndex={0}>
              {ingredient}
            </li> // Add role="listitem" for clarity
          ))}
        </ul>
      </div>

      {/* Preparation Steps */}
      <div
        className="recipe-section"
        role="region"
        aria-labelledby="steps-section"
        tabIndex={0}
      >
        <h2 id="steps-section" tabIndex={0}>
          Preparation Steps
        </h2>
        <ol className="steps-list">
          {recipe.steps.map((step, index) => (
            <li key={index} role="listitem" tabIndex={0}>
              {step}
            </li> // Add role="listitem" for clarity
          ))}
        </ol>
      </div>

      {/* User Ratings */}
      <div
        className="recipe-section"
        role="region"
        tabIndex={0}
        aria-labelledby="ratings-section"
      >
        <h2 id="ratings-section" tabIndex={0}>
          User Ratings
        </h2>
        <div className="ratings" tabIndex={0}>
          <p>
            <strong>Average Rating:</strong> {recipe.averageRating} ★
          </p>
        </div>
      </div>

      {/* Rating Section */}
      <h2 tabIndex={0}>
        Rate this recipe <span>(add your rating)</span>
      </h2>
      <Rating
        initialRating={recipe.averageRating}
        isEditable={true}
        onRatingChange={handleRatingChange}
        aria-label={`Rate the recipe ${recipe.title}`} // Provide aria-label for rating widget
      />

      {/* Comments Section */}
      <div
        className="recipe-section"
        role="region"
        aria-labelledby="comments-section"
        tabIndex={0}
      >
        <h2 id="comments-section" tabIndex={0}>
          Comments
        </h2>
        <div className="comments">
          <Comments recipeId={recipe._id} initialComments={recipe.comments} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsClient;
