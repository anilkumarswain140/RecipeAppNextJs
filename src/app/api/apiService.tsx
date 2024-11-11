import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const api = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor for Authorization
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor for Global Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors or unexpected response errors
        if (!error.response) {
            console.error("Network Error:", error.message);
            return Promise.reject({
                message: "Network error. Please check your connection.",
                error,
            });
        }

        const status = error.response.status;
        let errorMessage = "Something went wrong. Please try again later.";

        // Handle specific HTTP status errors
        switch (status) {
            case 400:
                errorMessage = "Bad request. Please check your input.";
                break;
            case 401:
                errorMessage = "Unauthorized. Please log in.";
                break;
            case 403:
                errorMessage = "You do not have permission to perform this action.";
                break;
            case 404:
                errorMessage = "Requested resource not found.";
                break;
            case 500:
                errorMessage = "Internal server error. Please try again later.";
                break;
            default:
                errorMessage = error.response.data?.message || errorMessage;
        }

        console.error(`Error ${status}: ${errorMessage}`);
        return Promise.reject({ status, message: errorMessage });
    }
);

// function to register a user
export const signUp = async (formData) => {
    return api.post('/auth/register', formData)
        .then(response => response.data)
        .catch(error => ({ error: error.message }));
};

//function to authenticate a user
export const login = async (formData) => {
    return api.post('/auth/login', formData)
        .then(response => response.data)
        .catch(error => ({ error: error.message }));
};

// functon to fetch all recipes
export const getRecipes = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`recipes?${queryString}`)
        .then(response => response.data)
        .catch(error => { throw error; });
};

// function to create a recipe
export const createRecipe = async (recipe) => {
    return api.post('recipes', recipe)
        .then(response => response.data)
        .catch(error => { throw error; });
};

//function to get a specific recipe details 
export const getRecipeDetails = async (recipeId) => {
    return api.get(`recipes/recipe/${recipeId}`)
        .then(response => response.data)
        .catch(error => { throw error; });
};

// rate a recipe
export const rateRecipe = async (recipeId, newRating) => {
    return api.post(`recipes/${recipeId}/rate`, { value: newRating })
        .then(response => response.data)
        .catch(error => { throw error; });
};

// function to add comment for recipe
export const addComment = async (recipeId, comment) => {
    return api.post('comments', { content: comment, recipeId })
        .then(response => response.data)
        .catch(error => { throw error; });
};
