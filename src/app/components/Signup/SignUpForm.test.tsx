import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "./SignupForm"; // Adjust path as needed
import { useSignUp } from "../../hooks/useSignUp"; // Import the hook

// Mock the useSignUp hook manually
jest.mock("../../hooks/useSignUp", () => ({
  useSignUp: jest.fn(),
}));

// Define the type for the return value of useSignUp
interface UseSignUpReturnType {
  handleSignUp: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<any>;
  loading: boolean;
  error: string | null;
}

describe("SignUpForm Component", () => {
  let mockHandleSignUp: jest.Mock;

  beforeEach(() => {
    mockHandleSignUp = jest.fn();

    // Manually mock the return value of the useSignUp hook
    (useSignUp as jest.Mock<UseSignUpReturnType>).mockReturnValue({
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

    const usernameInput = screen.getByPlaceholderText(
      /Username/,
    ) as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");

    const emailInput = screen.getByPlaceholderText(
      /Email Address/,
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    const passwordInput = screen.getByPlaceholderText(
      /Password/,
    ) as HTMLInputElement;
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

  // test("displays error message when error is present", () => {
  //   // Mock the hook with an error
  //   (useSignUp as jest.Mock<UseSignUpReturnType>).mockReturnValue({
  //     handleSignUp: mockHandleSignUp,
  //     loading: false,
  //     error: "Something went wrong!",
  //   });

  //   render(<SignUpForm />);

  //   const errorMessages = screen.getAllByText(/Something went wrong!/);

  //   expect(errorMessages).toHaveLength(3);

  //   errorMessages.forEach((errorMessage) => {
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });

  test("disables the signup button when loading is true", () => {
    (useSignUp as jest.Mock<UseSignUpReturnType>).mockReturnValue({
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
