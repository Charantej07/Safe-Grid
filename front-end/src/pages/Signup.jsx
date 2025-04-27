import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("security");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const data = await registerUser(username, password, role);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Signup Form */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gray-900 text-white">
        <h2 className="text-3xl font-semibold mb-6">Create an Account</h2>

        {/* Social Signup Buttons */}
        <div className="flex space-x-4 mb-6">
          <button className="flex items-center w-1/2 justify-center bg-white text-gray-900 py-2 px-4 rounded-lg">
            <FaGoogle className="mr-2" /> Sign up with Google
          </button>
          <button className="flex items-center w-1/2 justify-center bg-white text-gray-900 py-2 px-4 rounded-lg">
            <FaApple className="mr-2" /> Sign up with Apple
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* UserName & Password Inputs */}
        <input
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 mb-4 bg-gray-800 border border-gray-700 rounded text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-3/4 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 pr-12 mb-4 bg-gray-800 border border-gray-700 rounded text-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-3/4 text-gray-400 hover:text-gray-200"
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </button>
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="admin">Admin</option>
          <option value="security">Security</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded text-white font-semibold"
        >
          Create Account
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>

      {/* Right side - Info Section */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center p-16 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Safe Grid - AI powered real-time threat detection
        </h2>
        <p className="text-lg">
          Safe Grid is an AI-powered real-time threat detection system designed
          to enhance security by instantly identifying and responding to
          potential risks.
        </p>
        <div className="mt-6 flex items-center">
          <img
            src="./images/happy_customer_1.jpg"
            className="w-12 h-12 rounded-full border-2 border-white"
            alt="user1"
          />
          <img
            src="./images/happy_customer_2.jpg"
            className="w-12 h-12 rounded-full border-2 border-white -ml-2"
            alt="user2"
          />
          <img
            src="./images/happy_customer_3.jpg"
            className="w-12 h-12 rounded-full border-2 border-white -ml-2"
            alt="user3"
          />
          <p className="ml-4 text-lg">
            Over <strong>15.7k</strong> Happy Customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
