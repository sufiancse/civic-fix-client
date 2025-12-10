import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Message sent successfully!");

    // reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Container>
        <title>CivicFix | Contact</title>
      {/* SECTION TITLE */}

      <Heading
        title="Contact Us"
        subtitle="Have questions, feedback, or need support? Reach out to us and we’ll
            get back to you as soon as possible."

            center="true"
      />

  
      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
              <FaEnvelope />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">support@civicfix.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
              <FaPhoneAlt />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+880 1234-567890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Location</h4>
              <p className="text-gray-600">Dhaka, Bangladesh</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <FaPaperPlane />
            Send Message
          </button>
        </motion.form>
      </div>
    </Container>
  );
}
