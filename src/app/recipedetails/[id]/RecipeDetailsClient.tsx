// 'use client'
// import React, { useEffect, useState } from 'react';
// import './RecipeDetails.css';
// import { addComment, getRecipeDetails, rateRecipe } from '../../api/apiService';
// import Rating from '../../components/Ratings/AddRating';
// import { useSelector } from 'react-redux';
// import Toast from '../../components/Notification/Notification';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { useParams } from 'next/navigation';

// const RecipeDetails = () => {
//     const [recipe, setRecipe] = useState<Recipe | null>(null);
//     const [toastMessage, setToastMessage] = useState('');
//     const [showToast, setShowToast] = useState(false);
//     const [comment, setComment] = useState('');
//     const { id } = useParams();
//     const [error, setError] = useState('');
//     const commentCount = recipe?.comments?.length || 0;
//     useEffect(() => {
//         const fetchRecipe = async () => {
//             try {
//                 const response = await getRecipeDetails(id);
//                 setRecipe(response);
//             } catch (error: any) {
//                 console.error("error fetching records");
//                 setError(error.message || "error fetching records");
//             }
//         }
//         if (id) {
//             fetchRecipe();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [id])
//     const user = useSelector((state: any) => state.user);
//     const handleRatingChange = async (recipeId, newRating) => {
//         // console.log(`Recipe ID: ${recipeId}, New Rating: ${newRating}`);
//         // showSpinner();
//         try {
//             const response = await rateRecipe(recipeId, newRating);
//             setToastMessage('Rating added successfully!');
//             setShowToast(true); // Show toast
//             setTimeout(() => setShowToast(false), 3000);
//             return response;
//         } catch (error) {
//             console.error('Error submitting rating:', error);

//         }
//     };

//     const handleCommentChange = (e) => {
//         const { value } = e.target;
//         setComment(value);
//     }

//     const handleSubmit = async () => {
//         await addComment(id, comment);
//         window.location.reload();
//     }
//     return (
//         <div className="recipe-details-container" data-testid="recipecontainer" lang="en">
//             {error && <p className="text-red-500 font-semibold mt-2" role="alert">{error}</p>}
//             {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />} {/* Show toast if active */}

//             {/* Recipe Image */}
//             <div className="recipe-header">
//                 <img
//                     className="recipe-image"
//                     src={recipe?.image}
//                     alt={recipe?.title || "Recipe Image"} // Improved alt text for accessibility
//                     aria-describedby="recipe-title"
//                 />
//                 <div className="recipe-title-info">
//                     <h1 id="recipe-title">{recipe?.title}</h1>
//                     <p className="author">
//                         By <strong>{recipe?.author?.username}</strong>
//                     </p>
//                     <div className="recipe-info">
//                         <span><strong>Prep Time:</strong> {recipe?.preparationTime} mins</span>
//                         <span><strong>Rating:</strong> {recipe?.averageRating} ★</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Ingredients */}
//             <div className="recipe-section">
//                 <h2 id="ingredients-section">Ingredients</h2>
//                 <ul className="ingredients-list" aria-labelledby="ingredients-section">
//                     {recipe?.ingredients && recipe?.ingredients?.map((ingredient, index) => (
//                         <li key={index}>{ingredient}</li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Preparation Steps */}
//             <div className="recipe-section">
//                 <h2 id="preparation-steps-section">Preparation Steps</h2>
//                 <ol className="steps-list" aria-labelledby="preparation-steps-section">
//                     {recipe?.steps?.map((step, index) => (
//                         <li key={index}>{step}</li>
//                     ))}
//                 </ol>
//             </div>

//             {/* Comments & Ratings Section */}
//             <div className="recipe-section">
//                 <h2 id="ratings-section">User Ratings</h2>
//                 <div className="ratings" aria-labelledby="ratings-section">
//                     <p><strong>Average Rating:</strong> {recipe?.averageRating} ★</p>
//                 </div>
//             </div>

//             <h2>Rate this recipe <span>(add your rating)</span></h2>
//             <Rating
//                 isEditable={true}
//                 onRatingChange={(newRating) => handleRatingChange(recipe?._id, newRating)}
//                 aria-label="Rate this recipe"
//             />

//             {/* Comments */}
//             <div className="recipe-section">
//                 <h2 id="comments-section">Comments</h2>
//                 <div className="comments" aria-labelledby="comments-section">
//                     <textarea
//                         value={comment}
//                         onChange={handleCommentChange} // Update comment on change
//                         placeholder="Write your comment here..."
//                         rows={4}
//                         className="comment-box"
//                         aria-label="Write your comment"

//                     />
//                     <button
//                         onClick={handleSubmit}
//                         className="comment-btn"
//                         aria-label="Submit your comment"
//                     >
//                         Submit
//                     </button>

//                     {commentCount > 0 ? (
//                         recipe?.comments.map((comment, index) => (
//                             <div key={index} className="comment">
//                                 <small>
//                                     <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
//                                     - {comment.author.username}
//                                 </small>
//                                 <p>{comment.content}</p>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No comments yet.</p>
//                     )}
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default RecipeDetails;

'use client'

import './RecipeDetails.css';
import { rateRecipe } from '../../api/apiService';
import Rating from '@/app/components/Ratings/AddRating';
import Comments from '@/app/components/Comments/comment';
import { useToast } from '../../contexts/ToastContext';

const RecipeDetailsClient = ({ recipe }) => {
    const { showToast } = useToast();
    const handleRatingChange = async (newRating) => {
        try {
            const response = await rateRecipe(recipe._id, newRating);
            showToast("Form submitted successfully!",'success');
            // Optionally, you could hide the toast after some delay
            return response;
        } catch (error) {
            console.error('Error submitting rating:', error);
            showToast("Error submitting rating:",'error');
        }
    };

    return (
        <div className="recipe-details-container">
            {/* Recipe Image */}
            <div className="recipe-header">
                <img className="recipe-image" src={recipe.image} alt={recipe.title} />
                <div className="recipe-title-info">
                    <h1>{recipe.title}</h1>
                    <p className="author">By <strong>{recipe.author.username}</strong></p>
                    <div className="recipe-info">
                        <span><strong>Prep Time:</strong> {recipe.preparationTime} mins</span>
                        <span><strong>Rating:</strong> {recipe.averageRating} ★</span>
                    </div>
                </div>
            </div>

            {/* Ingredients */}
            <div className="recipe-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            {/* Preparation Steps */}
            <div className="recipe-section">
                <h2>Preparation Steps</h2>
                <ol className="steps-list">
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>

            {/* User Ratings */}
            <div className="recipe-section">
                <h2>User Ratings</h2>
                <div className="ratings">
                    <p><strong>Average Rating:</strong> {recipe.averageRating} ★</p>
                </div>
            </div>
            <h2>Rate this recipe <span>(add your rating)</span></h2>
            <Rating initialRating={recipe.averageRating} isEditable={true} onRatingChange={handleRatingChange} />

            {/* Comments Section */}
            <div className="recipe-section">
                <h2>Comments</h2>
                <div className="comments">
                    
                    <Comments recipeId={recipe._id} initialComments={recipe.comments} />
                    {/* <button onClick={handleCommentSubmit} className="comment-btn">Submit</button> */}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsClient;

