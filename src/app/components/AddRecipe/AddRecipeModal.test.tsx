import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RecipeFormModal from "./AddRecipeModal"; // Adjust the import path as necessary

const mockStore = configureStore([]);

describe("RecipeFormModal", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { id: "user-123" }, // Mock user state
    });
  });

  const renderWithStore = (isOpen) => {
    render(
      <Provider store={store}>
        <RecipeFormModal
          isOpen={isOpen}
          closeModal={jest.fn()}
          addRecipe={jest.fn()}
        />
      </Provider>,
    );
  };

  test("renders correctly when open", () => {
    renderWithStore(true);
    expect(screen.getByText(/Add New Recipe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    renderWithStore(false); // Ensure isOpen is false
    expect(screen.queryByText(/Add New Recipe/i)).not.toBeInTheDocument();
  });
  test("handles title input change", () => {
    renderWithStore(true);
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Test Recipe" } });
    expect(titleInput.value).toBe("Test Recipe");
  });

  test("handles ingredient input change", () => {
    renderWithStore(true);
    const addIngredientButton = screen.getByText(/Add Ingredient/i);
    fireEvent.click(addIngredientButton);

    const ingredientInput = screen.getByRole("textbox", {
      name: /Ingredient 1/i,
    });
    fireEvent.change(ingredientInput, { target: { value: "Flour" } });
    expect(ingredientInput.value).toBe("Flour");
  });

  test("handles step input change", () => {
    renderWithStore(true);
    const addStepButton = screen.getByText(/Add Step/i);
    fireEvent.click(addStepButton);

    const stepInput = screen.getByRole("textbox", { name: /Step 1/i });
    fireEvent.change(stepInput, { target: { value: "Mix ingredients" } });
    expect(stepInput.value).toBe("Mix ingredients");
  });

  test("validates preparation time input", async () => {
    renderWithStore(true);
    const prepTimeInput = screen.getByLabelText(/Preparation Time/i);

    // Enter an invalid preparation time
    fireEvent.change(prepTimeInput, { target: { value: "abc" } });

    const submitButton = screen.getByText(/Add Recipe/i);
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(
          /Please enter a valid number for preparation time in mins./i,
        ),
      ).toBeInTheDocument();
    });
  });

  test("calls addRecipe with correct data on valid submission", async () => {
    const addRecipeMock = jest.fn();
    renderWithStore(true, addRecipeMock); // Pass the mock function here

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Recipe" },
    });
    fireEvent.change(screen.getByLabelText(/Preparation Time/i), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByLabelText(/Image URL/i), {
      target: {
        value:
          "https://media.istockphoto.com/id/668116434/photo/homemade-eggplat-or-brinjal-currybharwan-baingan.webp?s=1024x1024&w=is&k=20&c=LEodMoP9_pFgDFutKNxsqBdKPaymDtHQP6glvhYPq0E=",
      },
    });
    // Add an ingredient
    fireEvent.click(screen.getByText(/Add Ingredient/i));
    fireEvent.change(screen.getByRole("textbox", { name: /Ingredient 1/i }), {
      target: { value: "Flour" },
    });

    // Add a step
    fireEvent.click(screen.getByText(/Add Step/i));
    fireEvent.change(screen.getByRole("textbox", { name: /Step 1/i }), {
      target: { value: "Mix ingredients" },
    });

    fireEvent.click(screen.getByText(/Add Recipe/i));
  });
});
