import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "./SignupForm"; // Adjust path as needed
import { useSignUp } from "../../hooks/useSignUp"; // Mock this hook

// Mock the useSignUp hook
jest.mock("../../hooks/useSignUp", () => ({
  useSignUp: jest.fn(),
}));

describe("SignUpForm Component", () => {
  let mockHandleSignUp;

  beforeEach(() => {
    mockHandleSignUp = jest.fn();
    useSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      loading: false,
      error: null,
    });
  });

  test("renders the form fields correctly", () => {
    render(<SignUpForm />);

    expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
  });

  test("can type in the input fields", () => {
    render(<SignUpForm />);

    const usernameInput = screen.getByPlaceholderText(/Username/);
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");

    const emailInput = screen.getByPlaceholderText(/Email Address/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    const passwordInput = screen.getByPlaceholderText(/Password/);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  test("calls handleSignUp with form data on submit", async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText(/Username/), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Signup/));

    await waitFor(() => {
      expect(mockHandleSignUp).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  test("displays error message when error is present", () => {
    useSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      loading: false,
      error: "Something went wrong!",
    });

    render(<SignUpForm />);

    // Use `getAllByText` to get all matching elements
    const errorMessages = screen.getAllByText(/Something went wrong!/);

    // Ensure the array has elements
    expect(errorMessages).toHaveLength(3);

    // Optionally, ensure each element is in the document
    errorMessages.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("disables the signup button when loading is true", () => {
    useSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      loading: true,
      error: null,
    });

    render(<SignUpForm />);

    const submitButton = screen.getByText(/Signup/);
    expect(submitButton).toBeDisabled();
  });

  test('navigates to the login page on "Login" link click', () => {
    render(<SignUpForm />);

    const loginLink = screen.getByText(/Login/);
    expect(loginLink).toBeInTheDocument();
    fireEvent.click(loginLink);
    expect(window.location.pathname).toBe("/");
  });
});
