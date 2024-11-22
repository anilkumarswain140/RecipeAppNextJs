import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { useRouter } from "next/navigation";
import { AnyAction } from "redux";
import { Dispatch } from "redux";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Define the state type for the mock store
interface RootState {
  // Define your store's state structure
  user?: { name: string; loggedIn: boolean };
}

// Create the mock store with proper typing
const mockStore = configureMockStore<RootState, Dispatch<AnyAction>>();

describe("Header Component", () => {
  let store: MockStoreEnhanced<RootState, Dispatch<AnyAction>>; // Properly typed mock store
  const mockPush = jest.fn();

  beforeEach(() => {
    store = mockStore({
      user: { name: "Test User", loggedIn: true }, // Example initial state
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush, // Mock the navigate.push functionality
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Header component with elements", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    // Check for title
    expect(screen.getByText("Recipe Market")).toBeInTheDocument();

    // Check for search input
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();

    // Check for user avatar
    expect(screen.getByAltText("User")).toBeInTheDocument();
  });

  test("updates search input value", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search...",
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Pizza" } });

    // Assert input value updates
    expect(searchInput).toHaveValue("Pizza");
  });

  test("handles logout button click", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    // Open the dropdown
    const userButton = screen.getByRole("button");
    fireEvent.click(userButton);

    // Ensure dropdown is visible
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    // Simulate logout click
    fireEvent.click(logoutButton);

    // Assert navigate.push was called
    expect(mockPush).toHaveBeenCalledWith("/");

    // Check Redux logout action was dispatched
    expect(store.getActions()).toEqual([{ type: "user/logout" }]);
  });
});
