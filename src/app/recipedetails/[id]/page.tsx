import React from 'react';
import RecipeDetailsClient from './RecipeDetailsClient'; // Adjust the import path if necessary
import { getRecipeDetails } from '../../api/apiService'; // Adjust based on your API service

const RecipeDetailsPage = async ({ params }) => {
    const { id } = await params; // Get ID from URL params (ensure params is passed correctly)

    // Fetch recipe details from API based on the `id`
    let recipe;
    try {
        recipe = await getRecipeDetails(id); // Fetch recipe details by ID
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        recipe = null; // Fallback in case of an error
    }

    // If the recipe is not found, return a "not found" message
    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="recipe-details-container">
            <RecipeDetailsClient recipe={recipe} />
        </div>
    );
};

export default RecipeDetailsPage;
