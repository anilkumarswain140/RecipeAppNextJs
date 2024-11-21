import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, createRecipe } from "../../api/apiService"; // Import your API service functions

// Define the state interface
interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  image: string;
  averageRating: number;
  preparationTime: number;
  author: { username: string };
}

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

// Fetch recipes from the API
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (search?: any) => {
    try {
      const response = await getRecipes(search); // Fetch the list of recipes
      return response; // Assuming it returns an object { recipes, totalPages, currentPage }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Failed to fetch recipes");
      }
      // Handle cases where error is not an instance of Error
      throw new Error("An unexpected error occurred");
    }
  },
);

// Add a new recipe to the API
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (newRecipe: any) => {
    try {
      const response = await createRecipe(newRecipe); // Call your API function to add the recipe
      return response; // Assuming it returns the newly added recipe
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Failed to add recipe");
      }
      // Handle cases where error is not an instance of Error
      throw new Error("An unexpected error occurred");
    }
  },
);

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming action.payload is an object with properties: recipes, totalPages, and currentPage
        state.recipes = action.payload.recipes;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload); // Add the newly added recipe to the list
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add recipe";
      });
  },
});

export default recipeSlice.reducer;
