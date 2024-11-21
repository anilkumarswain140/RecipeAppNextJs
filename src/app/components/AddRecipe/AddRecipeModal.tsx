import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RecipeFormModal = ({ isOpen, closeModal, addRecipe }) => {
  const [prepTimeError, setPrepTimeError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [ingredientsError, setIngredientsError] = useState("");
  const [imageError, setImageError] = useState("");
  const [stepsError, setStepsError] = useState("");

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    image: "",
    steps: [""], // Start with one empty step
    preparationTime: 0,
    author: "",
  });

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    // Reset the form when the user changes
    setRecipe({
      title: "",
      ingredients: [""],
      image: "",
      steps: [""],
      preparationTime: 0,
      author: "", // Reset author field
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });

    // Validation onChange
    switch (name) {
      case "title":
        setTitleError(value.length === 0 ? "Title is required." : "");
        break;
      case "image":
        setImageError(value.length === 0 ? "Image URL is required." : "");
        break;
      case "preparationTime":
        if (isNaN(value) || value === "") {
          setPrepTimeError(
            "Please enter a valid number for preparation time in mins.",
          );
        } else {
          setPrepTimeError("");
        }
        break;
      case "ingredients":
        // We will validate ingredients onSubmit, so no need for instant validation.
        break;
      case "steps":
        // We will validate steps onSubmit, so no need for instant validation.
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!recipe.title) {
      setTitleError("Title is required.");
    }
    if (recipe.ingredients.some((ingredient) => ingredient.trim() === "")) {
      setIngredientsError("Please enter at least one ingredient.");
    }
    if (!recipe.image) {
      setImageError("Image URL is required.");
    }
    if (
      isNaN(recipe.preparationTime) ||
      recipe.preparationTime === 0 ||
      recipe.preparationTime === null
    ) {
      setPrepTimeError("Please enter a valid number for preparation time.");
    }
    if (recipe.steps.some((step) => step.trim() === "")) {
      setStepsError("Please enter at least one step.");
    }

    // If there are no errors, proceed with the recipe submission
    if (
      !titleError &&
      !ingredientsError &&
      !imageError &&
      !prepTimeError &&
      !stepsError
    ) {
      const newRecipe = {
        ...recipe,
        author: user?.id, // Attach user ID during form submission
      };

      // Call addRecipe API function
      addRecipe(newRecipe);

      // Clear the recipe form fields after submission
      setRecipe({
        title: "",
        ingredients: [""],
        image: "",
        steps: [""],
        preparationTime: 0,
        author: "", // Clear author after submission
      });

      closeModal(); // Close the modal after adding the recipe
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter(
      (ingredient, i) => i !== index,
    ); // Rename `_` to `ingredient`
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...recipe.steps];
    newSteps[index] = value;
    setRecipe({ ...recipe, steps: newSteps });
  };

  const addStep = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
  };

  const removeStep = (index) => {
    const newSteps = recipe.steps.filter((step, i) => i !== index);
    setRecipe({ ...recipe, steps: newSteps });
  };

  return (
    <div
      data-testid="RecipeModal"
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-screen overflow-y-auto">
        {isOpen ? (
          <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
        ) : (
          <p>Modal is closed</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
            {titleError && <p className="text-red-500">{titleError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="ingredients">
              Ingredients
            </label>
            <div className="mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center mb-2">
                  <label htmlFor={`ingredient-${index}`} className="sr-only">
                    Ingredient {index + 1}
                  </label>
                  <textarea
                    id={`ingredient-${index}`} // Unique ID for each textarea
                    name="ingredients"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    className="w-full border rounded px-4 py-2 h-16 resize-y overflow-auto"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                data-testid="add-ingredient-button"
                type="button"
                onClick={addIngredient}
                className="text-blue-500"
              >
                Add Ingredient
              </button>
            </div>
            {ingredientsError && (
              <p className="text-red-500">{ingredientsError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={recipe.image}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="steps">
              Steps
            </label>
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex items-center mb-2">
                <label htmlFor={`step-${index}`} className="sr-only">
                  Step {index + 1}
                </label>{" "}
                {/* Add this label */}
                <textarea
                  id={`step-${index}`} // Change this to a unique id
                  name="steps"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="w-full border rounded px-4 py-2 h-16 resize-y overflow-auto"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addStep} className="text-blue-500">
              Add Step
            </button>
            {stepsError && <p className="text-red-500">{stepsError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="preparationTime">
              Preparation Time
            </label>
            <input
              id="preparationTime"
              type="text"
              name="preparationTime"
              value={recipe.preparationTime}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
            {prepTimeError && <p className="text-red-500">{prepTimeError}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Close
            </button>
            <button
              data-testid="add-recipe"
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeFormModal;
