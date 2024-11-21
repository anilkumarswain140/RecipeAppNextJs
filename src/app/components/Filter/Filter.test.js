import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecipeFilter from "./Filter";

describe("RecipeFilter Component", () => {
  test("renders filter options for rating and preparation time", () => {
    render(<RecipeFilter onFilterChange={() => {}} />);

    // Check for rating label and dropdown
    expect(screen.getByLabelText(/Minimum Rating \(≥\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Minimum Rating \(≥\):/i)).toHaveValue("");

    // Check for preparation time label and dropdown
    expect(
      screen.getByLabelText(/Maximum Preparation Time \(≤ minutes\):/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Maximum Preparation Time \(≤ minutes\):/i),
    ).toHaveValue("");
  });

  test("calls onFilterChange with the selected rating", () => {
    const mockOnFilterChange = jest.fn();
    render(<RecipeFilter onFilterChange={mockOnFilterChange} />);

    // Select a rating value
    fireEvent.change(screen.getByLabelText(/Minimum Rating \(≥\):/i), {
      target: { value: "4" },
    });

    // Expect onFilterChange to be called with rating and default preparation time
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      rating: "4",
      preparationTime: "",
    });
  });

  test("calls onFilterChange with the selected preparation time", () => {
    const mockOnFilterChange = jest.fn();
    render(<RecipeFilter onFilterChange={mockOnFilterChange} />);

    // Select a preparation time value
    fireEvent.change(
      screen.getByLabelText(/Maximum Preparation Time \(≤ minutes\):/i),
      { target: { value: "30" } },
    );

    // Expect onFilterChange to be called with default rating and preparation time
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      rating: "",
      preparationTime: "30",
    });
  });

  test("updates both filters and calls onFilterChange with correct values", () => {
    const mockOnFilterChange = jest.fn();
    render(<RecipeFilter onFilterChange={mockOnFilterChange} />);

    // Select a rating value
    fireEvent.change(screen.getByLabelText(/Minimum Rating \(≥\):/i), {
      target: { value: "5" },
    });

    // Select a preparation time value
    fireEvent.change(
      screen.getByLabelText(/Maximum Preparation Time \(≤ minutes\):/i),
      { target: { value: "45" } },
    );

    // Expect onFilterChange to be called with both rating and preparation time
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      rating: "5",
      preparationTime: "45",
    });
  });

  test("reset filters to default values", () => {
    const mockOnFilterChange = jest.fn();
    render(<RecipeFilter onFilterChange={mockOnFilterChange} />);

    // Select a rating and preparation time value
    fireEvent.change(screen.getByLabelText(/Minimum Rating \(≥\):/i), {
      target: { value: "2" },
    });
    fireEvent.change(
      screen.getByLabelText(/Maximum Preparation Time \(≤ minutes\):/i),
      { target: { value: "30" } },
    );

    // Reset rating and preparation time to defaults
    fireEvent.change(screen.getByLabelText(/Minimum Rating \(≥\):/i), {
      target: { value: "" },
    });
    fireEvent.change(
      screen.getByLabelText(/Maximum Preparation Time \(≤ minutes\):/i),
      { target: { value: "" } },
    );

    // Expect onFilterChange to be called with empty values
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      rating: "",
      preparationTime: "",
    });
  });
});
