import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      
      {/* Spinner Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="text-[#1a4dbe] text-6xl mb-6"
      >
        <FaSpinner />
      </motion.div>

    

    </div>
  );
};

export default LoadingSpinner;
