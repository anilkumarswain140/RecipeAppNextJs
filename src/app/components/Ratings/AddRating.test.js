// Rating.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Rating from "./AddRating";

describe("Rating Component", () => {
  const onRatingChangeMock = jest.fn(); // Mock function to track rating changes

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous calls to the mock function
  });

  test("renders the correct initial rating", () => {
    render(
      <Rating
        initialRating={3}
        onRatingChange={onRatingChangeMock}
        isEditable={true}
      />,
    );

    const filledStars = screen.getAllByText("★", { selector: ".filled" });
    expect(filledStars.length).toBe(3); // Expect 3 stars to be filled
  });

  test("updates rating on star click", () => {
    render(
      <Rating
        initialRating={0}
        onRatingChange={onRatingChangeMock}
        isEditable={true}
      />,
    );

    const star = screen.getByTestId("star-1", { selector: ".star" }); // Get the first star
    fireEvent.click(star); // Click the first star

    expect(onRatingChangeMock).toHaveBeenCalledWith(1); // Check if the rating change was called with the correct value
  });

  test("shows correct stars on hover", () => {
    render(
      <Rating
        initialRating={0}
        onRatingChange={onRatingChangeMock}
        isEditable={true}
      />,
    );

    const stars = screen.getAllByText("★", { selector: ".star" });

    // Hover over the second star
    fireEvent.mouseEnter(stars[1]);
    const filledStars = screen.queryAllByText("★", { selector: ".filled" });
    expect(filledStars).toHaveLength(2);

    // Leave hover
    fireEvent.mouseLeave(stars[1]);
    expect(screen.queryByText("★", { selector: ".filled" })).toBeNull(); // Expect no stars to be filled after leaving hover
  });

  test("does not update rating when not editable", () => {
    render(
      <Rating
        initialRating={2}
        onRatingChange={onRatingChangeMock}
        isEditable={false}
      />,
    );

    const star = screen.getByTestId("star-1", { selector: ".star" });
    fireEvent.click(star); // Click the first star

    expect(onRatingChangeMock).not.toHaveBeenCalled(); // Check that the rating change was not called
  });

  test("displays correct number of stars", () => {
    render(<Rating />); // Example component

    const stars = screen.getAllByText("★"); // This will return an array of elements with '★'

    expect(stars).toHaveLength(5);
  });
});
