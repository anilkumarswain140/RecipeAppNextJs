"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignUp } from "../../hooks/useSignUp";
import Loader from "../Loading/Loader";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { handleSignUp, loading, error } = useSignUp();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on field change
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case "username":
        if (!value) {
          errors.username = "Username is required";
        } else {
          errors.username = "";
        }
        break;
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email is invalid";
        } else {
          errors.email = "";
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 6) {
          errors.password = "Password must be at least 6 characters";
        } else {
          errors.password = "";
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateForm()) {
      await handleSignUp(formData);
      setIsLoading(false);
    }
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const errors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <div className="h-screen md:flex">
      {/* Loader visible when isLoading is true */}
      {isLoading && <Loader loading={isLoading} />}
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
          <div className="flex flex-col items-start mb-4">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              className="pl-2 outline-none border-2 rounded-2xl w-full py-2 px-3"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="username-error"
              tabIndex={1}
            />
            {formErrors.username && (
              <p
                id="username-error"
                className="text-red-500 text-sm mt-1"
                style={{ marginLeft: "8px" }}
              >
                {formErrors.username}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start mb-4">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              className="pl-2 outline-none border-2 rounded-2xl w-full py-2 px-3"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="email-error"
              tabIndex={2}
            />
            {formErrors.email && (
              <p
                id="email-error"
                className="text-red-500 text-sm mt-1"
                style={{ marginLeft: "8px" }}
              >
                {formErrors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              className="pl-2 outline-none border-2 rounded-2xl w-full py-2 px-3"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="password-error"
              tabIndex={3}
            />
            {formErrors.password && (
              <p
                id="password-error"
                className="text-red-500 text-sm mt-1"
                style={{ marginLeft: "8px" }}
              >
                {formErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            disabled={loading}
            tabIndex={4}
            aria-live="assertive"
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
