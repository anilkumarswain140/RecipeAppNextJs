// Toast.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "./Notification";

describe("Toast Component", () => {
  const message = "This is a toast notification";
  let onCloseMock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    render(<Toast message={message} onClose={onCloseMock} />);
  });

  test("renders the toast with the correct message", () => {
    const toastElement = screen.getByText(message);
    expect(toastElement).toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: /×/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("displays the close button", () => {
    const closeButton = screen.getByRole("button", { name: /×/i });
    expect(closeButton).toBeInTheDocument();
  });
});
