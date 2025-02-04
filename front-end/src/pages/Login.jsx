// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/slices/authSlice";
// import { loginUser } from "../api/authApi";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const data = await loginUser(username, password);
//       dispatch(loginSuccess({ user: data.user, token: data.token }));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-96 p-6 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-semibold text-center mb-4">SafeGrid Login</h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//         />
//         <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gray-900 text-white">
        <h2 className="text-3xl font-semibold mb-6">Welcome back</h2>

        {/* Social Login Buttons */}
        <div className="flex space-x-4 mb-6">
          <button className="flex items-center w-1/2 justify-center bg-white text-gray-900 py-2 px-4 rounded-lg">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          <button className="flex items-center w-1/2 justify-center bg-white text-gray-900 py-2 px-4 rounded-lg">
            <FaApple className="mr-2" /> Sign in with Apple
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Email & Password Inputs */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <div className="flex justify-between text-sm mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded text-white font-semibold"
        >
          Sign in to your account
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </p>
      </div>

      {/* Right side - Image / Info */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center p-16 text-white">
        <h2 className="text-3xl font-bold mb-4">Safe Grid - AI powered real time threat detection</h2>
        <p className="text-lg">
            Safe Grid is an AI-powered real-time threat detection system designed to enhance security by instantly identifying and responding to potential risks.
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
          <p className="ml-4 text-lg">Over <strong>15.7k</strong> Happy Customers</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
