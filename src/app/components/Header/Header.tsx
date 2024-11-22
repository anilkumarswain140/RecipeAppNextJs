"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { fetchRecipes } from "../../store/slices/recipeSlice";
import debounce from "lodash.debounce";
import Link from "next/link";
import { deleteCookie } from "../../../../utils/cookieUtils";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setIsLoading(true);
    deleteCookie("authToken");
    setDropdownOpen(false);
    dispatch(logout());
    navigate.push("/");
    setIsLoading(false);
  };

  // Debounced function for searching recipes
  const debouncedSearchRef = useRef(
    debounce((term: string) => {
      if (term) {
        (dispatch as any)(fetchRecipes({ search: term }));
      } else {
        (dispatch as any)(fetchRecipes({ search: "" }));
      }
    }, 1000),
  );

  // Use the debounced function directly when needed

  // Handle changes in the search input
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    // debouncedSearch(value); // Call the debounced function
    debouncedSearchRef.current(value);
  };

  // Cleanup function to cancel the debounced call if the component unmounts
  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [debouncedSearch]);

  return (
    <header className="bg-cyan-500 shadow">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Logo */}
        <h1 className="text-lg md:text-2xl font-bold text-white">
          <Link href={"/recipe"}>Recipe Market</Link>
        </h1>

        {/* Search bar and user menu container */}
        <div className="flex items-center space-x-3 md:space-x-4 w-full md:w-auto">
          {/* Responsive search bar */}
          <input
            value={searchTerm}
            onChange={handleChange}
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-1 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-auto"
          />

          {/* User menu */}
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
                alt="User"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-32 md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-[1]"
                tabIndex={0}
              >
                <div
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
