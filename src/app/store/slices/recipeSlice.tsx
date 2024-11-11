import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes, createRecipe } from '../../api/apiService'; // Import your API service functions

// Fetch recipes from the API
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (search?: any) => {
  try{
    const response = await getRecipes(search); // Fetch the list of recipes
    return response; // Assuming it returns an array of recipes
  }catch(error){
    
  }
 
});

// Add a new recipe to the API
export const addRecipe = createAsyncThunk('recipes/addRecipe', async (newRecipe: any) => {
    await createRecipe(newRecipe); // Call your API function to add the recipe
    return newRecipe; // Return the new recipe (this can also be adjusted based on your API response)
});
const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
  };
const recipeSlice = createSlice({
    name: 'recipes',
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
          state.recipes = action.payload.recipes;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch recipes';
        });
    },
  });

export default recipeSlice.reducer;
