"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignUp } from "../../hooks/useSignUp";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { handleSignUp, loading, error } = useSignUp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignUp(formData);
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Recipe Market
          </h1>
          <p className="text-white mt-1">
            Add your innovations and explore more
          </p>
          <button
            type="button"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            aria-label="Explore the Recipe Market"
            tabIndex={0} // Ensure the button is tabbable
          >
            Explore
          </button>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="username-error"
              tabIndex={1} // Make sure it is the first input to be focused
            />
            {error && (
              <p id="username-error" className="text-red-500">
                {error}
              </p>
            )}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="email-error"
              tabIndex={2} // Second input field
            />
            {error && (
              <p id="email-error" className="text-red-500">
                {error}
              </p>
            )}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="password-error"
              tabIndex={3} // Password input field
            />
            {error && (
              <p id="password-error" className="text-red-500">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            disabled={loading}
            tabIndex={4} // Submit button as the last tabbable element
            aria-live="assertive" // Announce any dynamic content updates like error messages
          >
            Signup
          </button>
          <p className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Already have an account?
            <Link href="/login" className="text-blue-500 ml-1" tabIndex={5}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
