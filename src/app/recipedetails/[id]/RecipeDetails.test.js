import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeDetailsClient from "./RecipeDetailsClient";
import { useToast } from "../../contexts/ToastContext";
import { rateRecipe } from "../../api/apiService";
import Rating from "../../components/Ratings/AddRating";

jest.mock("../../contexts/ToastContext", () => ({
  useToast: jest.fn(),
}));

jest.mock("../../api/apiService", () => ({
  rateRecipe: jest.fn(),
}));

jest.mock("../../components/Ratings/AddRating", () => jest.fn());
jest.mock("../../components/Comments/comment", () => () => (
  <div data-testid="comments">Comments</div>
));

describe("RecipeDetailsClient", () => {
  const mockShowToast = jest.fn();

  const mockRecipe = {
    _id: "123",
    title: "Delicious Pancakes",
    author: { username: "ChefJohn" },
    preparationTime: 20,
    averageRating: 4.5,
    image: "/pancakes.jpg",
    ingredients: ["Flour", "Milk", "Eggs", "Sugar"],
    steps: ["Mix ingredients", "Cook on pan", "Serve hot"],
    comments: [{ user: "JaneDoe", comment: "Loved it!" }],
  };

  beforeEach(() => {
    useToast.mockReturnValue({ showToast: mockShowToast });
    rateRecipe.mockResolvedValue({ success: true });
    Rating.mockImplementation(({ onRatingChange }) => (
      <button onClick={() => onRatingChange(5)} data-testid="rating">
        Rate
      </button>
    ));
    jest.clearAllMocks();
  });

  it("renders the recipe details correctly", () => {
    render(<RecipeDetailsClient recipe={mockRecipe} />);

    expect(screen.getByText(mockRecipe.title)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.author.username)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockRecipe.preparationTime} mins`),
    ).toBeInTheDocument();

    // Check the specific elements containing the rating
    const ratingElements = screen.getAllByText(`${mockRecipe.averageRating} ★`);
    expect(ratingElements.length).toBeGreaterThan(0); // Ensure at least one occurrence
    ratingElements.forEach((ratingElement) => {
      expect(ratingElement).toBeInTheDocument(); // Verify each occurrence is in the document
    });

    // Check ingredients and steps
    mockRecipe.ingredients.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
    mockRecipe.steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it("handles rating submission successfully", async () => {
    render(<RecipeDetailsClient recipe={mockRecipe} />);

    const rateButton = screen.getByTestId("rating");
    fireEvent.click(rateButton);

    await waitFor(() => {
      expect(rateRecipe).toHaveBeenCalledWith(mockRecipe._id, 5);
      expect(mockShowToast).toHaveBeenCalledWith(
        "Form submitted successfully!",
        "success",
      );
    });
  });

  it("handles rating submission failure", async () => {
    rateRecipe.mockRejectedValueOnce(new Error("Failed to rate"));

    render(<RecipeDetailsClient recipe={mockRecipe} />);

    const rateButton = screen.getByTestId("rating");
    fireEvent.click(rateButton);

    await waitFor(() => {
      expect(rateRecipe).toHaveBeenCalledWith(mockRecipe._id, 5);
      expect(mockShowToast).toHaveBeenCalledWith(
        "Error submitting rating:",
        "error",
      );
    });
  });

  it("renders comments correctly", () => {
    render(<RecipeDetailsClient recipe={mockRecipe} />);

    const comments = screen.getByTestId("comments");
    expect(comments).toBeInTheDocument();
  });
});
