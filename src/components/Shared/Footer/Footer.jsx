import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-0">
          
          {/* Left - Project Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold" style={{ color: "#1a4dbe" }}>
              CivicFix
            </h2>
            <p className="text-gray-700 max-w-md text-lg">
              CivicFix is a community-driven platform to report, track, and resolve local issues efficiently. Join our mission to make your city better!
            </p>
            <p className="text-gray-700 text-lg">
              Your feedback matters! Help us improve the platform for everyone.
            </p>
          </div>

          {/* Right - Social Links */}
          <div className="flex gap-4 mt-6 lg:mt-0">
            <a
              href="#"
              className="bg-[#1a4dbe] p-3 rounded-full hover:bg-[#198754] hover:scale-110 transition transform text-white shadow-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-[#1a4dbe] p-3 rounded-full hover:bg-[#198754] hover:scale-110 transition transform text-white shadow-md"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-[#1a4dbe] p-3 rounded-full hover:bg-[#198754] hover:scale-110 transition transform text-white shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-[#1a4dbe] p-3 rounded-full hover:bg-[#198754] hover:scale-110 transition transform text-white shadow-md"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10"></div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          &copy; {currentYear} CivicFix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
