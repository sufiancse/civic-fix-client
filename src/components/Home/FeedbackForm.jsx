import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegCommentDots } from "react-icons/fa";
import Heading from "../Shared/Heading";
import Container from "../Shared/Container";

const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your feedback has been submitted!");
    setFormData({ name: "", email: "", title: "", description: "" });
  };

  return (

      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title + Description */}

        <Heading
          title={"Feedback & Suggestions"}
          subtitle={
            "We value your input! Share your feedback, complaints, or suggestions to help us improve our platform and better serve the community."
          }
          center="true"
        />

       

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info Text */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaRegCommentDots className="text-primary text-3xl" />
              Why Your Feedback Matters
            </h3>
            <p className="text-gray-600 text-lg">
              Your opinions help us enhance the platform experience. Every
              suggestion or complaint is carefully reviewed by our team to
              ensure positive changes.
            </p>
            <p className="text-gray-600 text-lg">
              Providing clear and detailed feedback enables us to respond
              effectively and improve our services for everyone.
            </p>
            <p className="text-gray-600 text-lg">
              Join our community of engaged users and help us create a better
              platform together!
            </p>
          </div>

          {/* Right Side - Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-xl flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                required
              />
            </div>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feedback Title"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your feedback here..."
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none h-32 w-full"
              required
            />

            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition font-medium mt-2 cursor-pointer"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </Container>
 
  );
};

export default FeedbackSection;
