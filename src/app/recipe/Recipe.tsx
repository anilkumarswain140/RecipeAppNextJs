import Link from "next/link";
import StarRating from "../components/Ratings/StartRating";

const RecipeCard = ({
  id,
  title,
  image,
  rating,
  authorName,
  preparationTime,
}) => {
  return (
    <Link
      href={`/recipedetails/${id}`}
      aria-label={`View details for ${title}`}
      className="focus:outline-none"
      tabIndex={0} // Makes the link focusable via keyboard navigation
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={image}
          alt={`Image of ${title}`}
          aria-labelledby="recipe-image"
          tabIndex={0}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4">
            <h2 id="recipe-title" className="text-lg font-bold">
              {title}
            </h2>
            <p className="prep-time">
              <span className="sr-only" tabIndex={0}>
                Preparation Time:
              </span>
              <span tabIndex={0}>{preparationTime} mins</span>
            </p>
            <StarRating
              rating={rating}
              aria-label={`Rating: ${rating} stars`}
            />
          </div>

          {/* Right column - Author section */}
          <div
            className="flex items-center justify-center p-4 border-l-2"
            tabIndex={0}
          >
            <div className="text-center">
              <p className="text-sm text-gray-600" tabIndex={0}>
                Recipe by:
              </p>
              <p
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
                aria-labelledby="authorName"
              >
                <span id="authorName" tabIndex={0}>
                  {authorName}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
