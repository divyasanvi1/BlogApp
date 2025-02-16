import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to handle password visibility
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userInfo = await authService.createAccount({
                email: data.email,
                password: data.password,
                name: data.name,
            });
            if (userInfo) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Toggle function for password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 relative">
  <div className="absolute inset-0 z-0">
    {/* Your Particle Background Component Goes Here */}
  </div>

  <div className="relative z-10 w-full max-w-lg bg-gray-800/30 border border-gray-500 shadow-lg rounded-xl p-10 mt-[-250px]">
    <h2 className="text-center text-2xl font-bold text-gray-200">Sign Up to Create your Account</h2>

    <p className="mt-2 text-center text-base text-gray-300">
      Already have an account?&nbsp;
      <Link
        to="/login"
        className="font-medium text-gray-400 hover:text-gray-200 transition duration-300"
      >
        Sign In
      </Link>
    </p>

    {error && <p className="text-red-400 text-center mt-3">{error}</p>}

    <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          {...register("name", { required: true })}
          className="w-full mt-1 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 appearance-none autofill:bg-transparent"
          style={{
            WebkitBoxShadow: "0 0 0px 1000px transparent inset",
            WebkitTextFillColor: "white",
            backgroundClip: "text",
            appearance: "none",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
          })}
          className="w-full mt-1 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 appearance-none autofill:bg-transparent"
          style={{
            WebkitBoxShadow: "0 0 0px 1000px transparent inset",
            WebkitTextFillColor: "white",
            backgroundClip: "text",
            appearance: "none",
          }}
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter your Password"
          {...register("password", { required: true })}
          className="w-full mt-1 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 pr-10 appearance-none autofill:bg-transparent"
          style={{
            WebkitBoxShadow: "0 0 0px 1000px transparent inset",
            WebkitTextFillColor: "white",
            backgroundClip: "text",
            appearance: "none",
          }}
        />
        <button
          type="button"
          className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? "🔓" : "🔒"}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition duration-300"
      >
        Create Account
      </button>
    </form>
  </div>
</div>
    );
}

export default Signup;
