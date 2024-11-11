"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import { useSignUp } from '../../hooks/useSignUp';


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
          <h1 className="text-white font-bold text-4xl font-sans">Recipe Market</h1>
          <p className="text-white mt-1">Add your innovations and explore more</p>
          <button type="button" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Explore</button>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input className="pl-2 outline-none border-none" type="password" name="password" placeholder="Password" value={formData.password}  onChange={handleChange} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" disabled={loading}>Signup</button>
          <p className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Already have an account?
            <Link href="/login" className="text-blue-500 ml-1">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
