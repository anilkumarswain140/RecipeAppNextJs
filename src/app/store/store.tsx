import { configureStore } from '@reduxjs/toolkit';
import recipeReducer  from './slices/recipeSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Define the store's state type
export type RootState = {
  recipes: RecipeState; // Adjust according to your state shape
};
export type AppDispatch = typeof store.dispatch;
// Create a store with the appropriate reducer
export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

// Create typed hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;