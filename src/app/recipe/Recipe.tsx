
import Link from 'next/link';
import StarRating from '../components/ratings/StartRating';

const RecipeCard = ({ id,title, ingredients, image, rating, authorName, preparationTime }) => {
    return (
        <Link href={`/recipedetails/${id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-48 object-cover" src={image} alt={title} />

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Left column - Title, ingredients, and rating */}
                    <div className="p-4">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <p className="prep-time">Preparation Time <span>{preparationTime} mins</span></p>
                        <StarRating rating={rating} />
                    </div>

                    {/* Right column - Author section */}
                    <div className="flex items-center justify-center p-4 border-l-2">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Recipe by:</p>
                            <p
                                className="text-blue-500 hover:underline"
                                rel="noopener noreferrer"
                            >
                                {authorName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard;