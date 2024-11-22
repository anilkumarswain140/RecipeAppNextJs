"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addRecipe, fetchRecipes } from "../store/slices/recipeSlice";
import RecipeFilter from "../components/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";
import AddRecipeButton from "../components/AddRecipe/addRecipeButton";
import { ToastProvider, useToast } from "../contexts/ToastContext";
import dynamic from "next/dynamic";
import Loader from "../components/Loading/Loader";
const RecipeCard = dynamic(() => import("./Recipe"));
interface Filter {
  rating: string;
  preparationTime: string;
}

interface Recipe {
  title: string;
  ingredients: string[];
  image: string;
  averageRating: number;
  preparationTime: number;
  author: { username: string };
  _id: string;
}

const RecipeGrid = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { recipes, loading, error, totalPages, currentPage } = useAppSelector(
    (state) => state.recipes,
  );
  const { showToast } = useToast();

  const [filter, setFilter] = useState<Filter>({
    rating: "",
    preparationTime: "",
  });

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (filter.rating || filter.preparationTime) {
        dispatch(fetchRecipes(filter));
      } else {
        dispatch(fetchRecipes({ page: currentPage, limit: 10 }));
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [dispatch, filter, currentPage]);

  const handleAddRecipe = async (newRecipe: Recipe) => {
    try {
      setIsLoading(true);
      await dispatch(addRecipe(newRecipe)).unwrap();
      dispatch(fetchRecipes({ page: currentPage, limit: 10 }));
      showToast("Recipe added successfully", "success");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      showToast("Something went wrong, please try again.", "error");
    }
  };

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchRecipes({ page, limit: 10 }));
  };

  if (loading) return <p aria-live="assertive">Loading...</p>;
  if (error) return <p aria-live="assertive">{error}</p>;
  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="relative">
      {isLoading && <Loader loading={isLoading} />}
      <RecipeFilter onFilterChange={handleFilterChange} />

      <div role="region" aria-labelledby="recipe-grid">
        <h2 id="recipe-grid" className="sr-only">
          Recipe Grid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          {recipes.map((recipe) => (
            <ToastProvider key={recipe._id}>
              <RecipeCard
                title={recipe.title}
                image={recipe.image}
                rating={recipe.averageRating}
                authorName={recipe?.author?.username}
                preparationTime={recipe.preparationTime}
                id={recipe._id}
              />
            </ToastProvider>
          ))}
        </div>
      </div>

      <AddRecipeButton
        addRecipe={handleAddRecipe}
        aria-label="Add a new recipe"
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        aria-label="Recipe pagination"
      />
    </div>
  );
};

export default RecipeGrid;
