import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination.tsx";

describe("Pagination Component", () => {
  const totalPages = 5; // Total pages for testing
  let onPageChangeMock;

  beforeEach(() => {
    onPageChangeMock = jest.fn(); // Mock the onPageChange function
  });

  test("renders the correct number of page buttons", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />,
    );
    const pageButtons = screen.getAllByRole("button", { name: /\d+/ });
    expect(pageButtons.length).toBe(totalPages);
  });

  test("disables the Previous button on the first page", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />,
    );
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  test("disables the Next button on the last page", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={totalPages}
        onPageChange={onPageChangeMock}
      />,
    );
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  test("calls onPageChange with the correct page number when a page button is clicked", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />,
    );
    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with the correct page number when Previous button is clicked", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />,
    );
    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange with the correct page number when Next button is clicked", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />,
    );
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3); // Adjusting this according to the expected behavior
  });
});
