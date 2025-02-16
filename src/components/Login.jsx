import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message)
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 relative">
        <div className="absolute inset-0 z-0">
          {/* Your Particle Background Component Goes Here */}
        </div>
      
        <div className="relative z-10 w-full max-w-lg bg-gray-800/30 border border-gray-500 shadow-lg rounded-xl p-10 mt-[-250px]">
          
          <h2 className="text-center text-2xl font-bold text-gray-200">Sign in to your account</h2>
          
          <p className="mt-2 text-center text-base text-gray-300">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-gray-400 hover:text-gray-200 transition duration-300"
            >
              Sign Up
            </Link>
          </p>
          
          <p className="mt-2 text-center text-base text-gray-300">
            <Link
              to="/forget"
              className="font-medium text-gray-400 hover:text-gray-200 transition duration-300"
            >
              Forgot password?
            </Link>
          </p>
      
          {error && <p className="text-red-400 text-center mt-3">{error}</p>}
      
          <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <Input
                placeholder="Enter your Email"
                type="email"
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
              <Input
                placeholder="Enter your Password"
                type={isPasswordVisible ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
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
      
            <Button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition duration-300"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
      

      
    )
}

export default Login
