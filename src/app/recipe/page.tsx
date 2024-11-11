"use client"

import React, { useEffect, useState } from 'react';
import RecipeCard from './Recipe';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addRecipe, fetchRecipes } from '../store/slices/recipeSlice';
import RecipeFilter from '../components/Filter/Filter';
import Pagination from '../components/Pagination/paginatin';
import AddRecipeButton from '../components/AddRecipe/addRecipeButton';
import { useToast } from '../contexts/ToastContext';

const RecipeGrid = () => {
  const dispatch = useAppDispatch(); // Using typed dispatch
  const { recipes, loading, error, totalPages, currentPage } = useAppSelector((state) => state.recipes);
  const { showToast } = useToast();

  // State to hold filter criteria
  const [filter, setFilter] = useState({ rating: '', preparationTime: '' });

  // Fetch recipes when the component mounts or filter changes
  useEffect(() => {
    if (filter.rating || filter.preparationTime) {
      dispatch(fetchRecipes(filter)); // Search recipes based on filter
    } else {
      dispatch(fetchRecipes({ page: currentPage, limit: 10 })); // Fetch all recipes when there's no filter
    }
  }, [dispatch, filter, currentPage]);

  // Function to handle adding a new recipe
  const handleAddRecipe = async (newRecipe: any) => {
    try{
      await dispatch(addRecipe(newRecipe)).unwrap(); // Add the new recipe
      dispatch(fetchRecipes({ page: currentPage, limit: 10 })); // Refresh recipes after adding a new one
      showToast("Recipe added successfully",'success');
    }catch(error){
      console.error(error);
      showToast("Something went wrong please try again.",'error');
    }

  };

  // Function to handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Function to handle pagination changes
  const handlePageChange = (page) => {
    dispatch(fetchRecipes({ page, limit: 10 })); // Fetch recipes for the selected page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative">
      <RecipeFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            ingredients={recipe.ingredients}
            image={recipe.image}
            rating={recipe.averageRating}
            authorName={recipe?.author?.username}
            preparationTime={recipe.preparationTime}
            id={recipe._id}
          />
        ))}
      </div>

      <AddRecipeButton addRecipe={handleAddRecipe} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RecipeGrid;