import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    toast.error("This feature is Not Implemented Yet!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    try {
      const response = await postRequest("/api/users/login", {
        email,
        password,
      });

      if (response.token) {
        localStorage.setItem("accessToken", response.token);
        toast.success("Login Successful");
        navigate("/notes");
      } else {
        toast.error("Invalid Email or Password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred during login!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 md:py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6">
        <div className="text-center">
          <img
            className="mx-auto mb-2"
            src={require("../images/logo2.png")}
            alt="Logo"
            style={{ width: "180px" }}
          />
          <p className="text-gray-500 text-sm md:text-base">
            Sign in to continue
          </p>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <FcGoogle className="mr-2" size={24} />
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-700 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-900">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() =>
                toast.error("This Feature is Not Implemented Yet!")
              }
              className="text-blue-700 hover:text-blue-500 text-sm focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-medium py-2 rounded-lg shadow-sm hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/Register"
              className="text-blue-700 hover:text-blue-500 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
