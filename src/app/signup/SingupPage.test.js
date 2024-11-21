// __tests__/SignupPage.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import dynamic from "next/dynamic";

// Mock dynamic import for SignUpForm
jest.mock("next/dynamic", () => {
  return (importFn) => {
    // Mock the imported component
    const MockComponent = () => (
      <div data-testid="mock-signup-form">Mock SignUpForm Component</div>
    );
    MockComponent.displayName = "MockDynamicSignUpForm";
    return MockComponent;
  };
});

import SignupPage from "./page"; // Adjust the path if needed

describe("SignupPage Component", () => {
  test("renders SignUpForm component", () => {
    render(<SignupPage />);

    // Check if the mock SignUpForm is rendered
    const signUpForm = screen.getByTestId("mock-signup-form");
    expect(signUpForm).toBeInTheDocument();
    expect(signUpForm).toHaveTextContent("Mock SignUpForm Component");
  });
});
