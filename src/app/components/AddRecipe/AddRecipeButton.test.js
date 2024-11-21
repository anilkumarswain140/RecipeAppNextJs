import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddRecipeButton from "./addRecipeButton";

jest.mock("./AddRecipeModal", () => {
  return jest.fn(({ isOpen, closeModal }) => {
    return (
      isOpen && (
        <div role="dialog">
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )
    );
  });
});

describe("AddRecipeButton Component", () => {
  test("renders the Add Recipe button", () => {
    render(<AddRecipeButton addRecipe={jest.fn()} />);
    const button = screen.getByRole("button", { name: /add recipe/i });
    expect(button).toBeInTheDocument(); // Check if the button is rendered
  });

  test("opens modal when Add Recipe button is clicked", () => {
    render(<AddRecipeButton addRecipe={jest.fn()} />);
    const button = screen.getByRole("button", { name: /add recipe/i });

    fireEvent.click(button); // Simulate button click

    const modal = screen.getByRole("dialog"); // Check if modal is opened
    expect(modal).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(<AddRecipeButton addRecipe={jest.fn()} />);
    const button = screen.getByRole("button", { name: /add recipe/i });

    fireEvent.click(button); // Open modal

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton); // Close modal

    const modal = screen.queryByRole("dialog"); // Check if modal is closed
    expect(modal).not.toBeInTheDocument();
  });
});
