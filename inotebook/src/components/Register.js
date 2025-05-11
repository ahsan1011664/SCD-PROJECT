import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { postRequest } from "../axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleGoogleSignUp = async () => {
    try {
      toast.error("This feature is Not Implemented Yet!");
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await postRequest("/api/users/register", formData);

      if (response.message === "User Registered Successfully") {
        toast.success("Signup successful");
        window.location.href = "/";
      } else {
        toast.error(response.error || "Signup failed!");
      }
    } catch (error) {
      toast.error("An error occurred during Registration!");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <img
            className="mx-auto mb-2 mt-2"
            src={require("../images/logo2.png")}
            alt="Auctrix logo"
            style={{ width: "200px" }}
          />
          <p className="text-gray-500">Sign up to get started</p>
        </div>

        {/* Google Sign-Up Button */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="mr-2" size={24} />
            Sign Up with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter a strong password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-blue-700 text-white hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Already have an account? <Link to="/" className="text-blue-700 hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Register;
