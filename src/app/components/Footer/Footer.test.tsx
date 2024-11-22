import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders the footer element", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("displays the current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    const yearText = screen.getByText(
      `© ${currentYear} Recipe App. All Rights Reserved.`,
      { exact: false },
    );
    expect(yearText).toBeInTheDocument();
  });

  test("displays the creator's name", () => {
    render(<Footer />);
    const creatorName = screen.getByText(/Created by \[Anil kumar swain\]/i);
    expect(creatorName).toBeInTheDocument();
  });

  test("displays the application description", () => {
    render(<Footer />);
    const description = screen.getByText(
      /A simple and user-friendly application to explore and share delicious recipes/i,
    );
    expect(description).toBeInTheDocument();
  });

  test("has the correct CSS classes applied", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer");
    const containerElement = screen.getByText(/Recipe App/i).parentElement;
    expect(containerElement).toHaveClass("container");
  });
});
