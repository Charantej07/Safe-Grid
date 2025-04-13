import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronDown, FaShieldAlt, FaVideo, FaBell } from "react-icons/fa";

// Text animation on scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="fixed w-full px-6 py-4 flex justify-between items-center bg-gray-800 shadow-lg z-50">
        <h1 className="text-2xl font-semibold">SafeGrid</h1>
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              className="hover:text-blue-400 flex items-center transition"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Features <FaChevronDown className="ml-1" />
            </button>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bg-gray-800 p-2 mt-2 rounded shadow-lg"
              >
                <Link
                  to="/live-feed"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Live Feed
                </Link>
                <Link
                  to="/incident-logs"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Incident Logs
                </Link>
              </motion.div>
            )}
          </div>
          <Link to="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>
        </div>
        <Link
          to="/login"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section with GIF Background */}
      <header className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/safe_grid_bg2.mp4" type="video/mp4" />
        </video>
        <motion.h1
          className="text-5xl font-bold relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          AI-Powered Real-Time Threat Detection
        </motion.h1>
        <motion.p
          className="text-lg mt-4 max-w-2xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          SafeGrid is an AI-powered security system that monitors live CCTV
          feeds and instantly detects threats.
        </motion.p>
        <Link
          to="/dashboard"
          className="mt-6 bg-gray-900 px-6 py-3 rounded-lg hover:bg-gray-700 transition relative z-10"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-900">
        <h2 className="text-3xl font-bold text-center">Why Choose SafeGrid?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[
            {
              icon: FaShieldAlt,
              title: "AI-Powered Security",
              text: "Advanced AI detects violent activities in real time.",
            },
            {
              icon: FaVideo,
              title: "Live Surveillance",
              text: "Monitor real-time CCTV footage from anywhere.",
            },
            {
              icon: FaBell,
              title: "Instant Alerts",
              text: "Receive instant notifications when a threat is detected.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <feature.icon className="text-5xl mx-auto text-blue-400" />
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-8 bg-blue-600 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
        >
          Stay One Step Ahead of Threats
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
        >
          Secure your premises with SafeGrid’s AI-powered surveillance system.
          Sign up today to experience real-time security.
        </motion.p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-gray-900 px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
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
