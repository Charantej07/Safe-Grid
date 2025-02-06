import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronDown, FaShieldAlt, FaVideo, FaBell } from "react-icons/fa";

// Animated text variants
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

// Card variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
};

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center fixed top-0 w-full shadow-lg z-50">
        <h1 className="text-2xl font-semibold">SafeGrid</h1>
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <div className="relative group">
            <button className="hover:text-blue-400 flex items-center transition duration-300">
              Features <FaChevronDown className="ml-1" />
            </button>
            <div className="absolute hidden group-hover:block bg-gray-800 p-2 mt-2 rounded shadow-lg">
              <Link to="/live-feed" className="block px-4 py-2 hover:bg-gray-700 rounded">Live Feed</Link>
              <Link to="/incident-logs" className="block px-4 py-2 hover:bg-gray-700 rounded">Incident Logs</Link>
            </div>
          </div>
          <Link to="/dashboard" className="hover:text-blue-400 transition duration-300">Dashboard</Link>
        </div>
        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="h-screen flex flex-col justify-center items-center bg-blue-600 text-center">
        <motion.h1
          className="text-5xl font-bold"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          AI-Powered Real-Time Threat Detection
        </motion.h1>
        <motion.p
          className="text-lg mt-4 max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          SafeGrid is an AI-powered security system that monitors live CCTV feeds and instantly detects threats.
        </motion.p>
        <Link to="/dashboard" className="mt-6 bg-gray-900 px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300">
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-900">
        <h2 className="text-3xl font-bold text-center">Why Choose SafeGrid?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            initial="hidden" animate="visible" variants={cardVariants}>
            <FaShieldAlt className="text-5xl mx-auto text-blue-400" />
            <h3 className="text-xl font-semibold mt-4">AI-Powered Security</h3>
            <p className="mt-2">Our advanced AI detects violent activities in real time.</p>
          </motion.div>

          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            initial="hidden" animate="visible" variants={cardVariants}>
            <FaVideo className="text-5xl mx-auto text-blue-400" />
            <h3 className="text-xl font-semibold mt-4">Live Surveillance</h3>
            <p className="mt-2">Monitor real-time CCTV footage from anywhere.</p>
          </motion.div>

          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            initial="hidden" animate="visible" variants={cardVariants}>
            <FaBell className="text-5xl mx-auto text-blue-400" />
            <h3 className="text-xl font-semibold mt-4">Instant Alerts</h3>
            <p className="mt-2">Receive instant notifications when a threat is detected.</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-8 bg-blue-600 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Stay One Step Ahead of Threats
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Secure your premises with SafeGrid’s AI-powered surveillance system. Sign up today to experience real-time security.
        </motion.p>
        <Link to="/signup" className="mt-6 inline-block bg-gray-900 px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300">
          Get Started for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 text-center">
        <p>© 2025 SafeGrid. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
