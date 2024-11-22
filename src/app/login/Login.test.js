import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./page"; // Correct component name
import useLogin from "../hooks/useLogin";

// Mocking the hook
jest.mock("../hooks/useLogin");

describe("Login Component", () => {
  let handleUserLoginMock;

  beforeEach(() => {
    // Initialize the mock function
    handleUserLoginMock = jest.fn();

    // Mock the useLogin hook return value
    useLogin.mockReturnValue({
      handleUserLogin: handleUserLoginMock,
      loading: false,
      error: null,
    });
  });

  it("renders the form correctly", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("displays validation error when email is missing", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for validation error for email
    await waitFor(() =>
      expect(screen.getByText("Email is required")).toBeInTheDocument(),
    );
  });

  it("displays validation error when password is missing", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for validation error for password
    await waitFor(() =>
      expect(screen.getByText("Password is required")).toBeInTheDocument(),
    );
  });

  it("calls handleUserLogin on valid form submission", async () => {
    render(<Login />);

    // Populate form fields
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the mock function to be called
    await waitFor(() =>
      expect(handleUserLoginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      }),
    );

    expect(handleUserLoginMock).toHaveBeenCalledTimes(1);
  });
});
