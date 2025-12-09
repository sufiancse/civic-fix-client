import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Animated 404 Text */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-bold text-[#1a4dbe] mb-4"
      >
        404
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-gray-700 text-center max-w-xl mb-8 text-lg md:text-xl"
      >
        Oops! The page you are looking for does not exist or has been moved.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* Primary Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-[#1a4dbe] text-white px-6 py-3 rounded-full hover:bg-[#198754] transition font-medium"
        >
          <FaHome />
          Go to Home
        </button>

        {/* Outline Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border-2 border-[#1a4dbe] text-[#1a4dbe] px-6 py-3 rounded-full hover:bg-[#1a4dbe] hover:text-white transition font-medium"
        >
          <FaArrowLeft />
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
