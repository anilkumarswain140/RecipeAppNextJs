interface RecipeState {
    recipes: Recipe[]; // Replace `Recipe` with the actual type of a recipe object
    loading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
  }