// AllIssues.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaThumbsUp, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

// Dummy Data
const dummyIssues = [
  {
    id: 1,
    title: "Poth er khub kharap obostha",
    category: "Road",
    status: "Resolved",
    priority: "High",
    location: "Dhaka, Bangladesh",
    upvotes: 12,
    boosted: true,
    image: "https://via.placeholder.com/400x200",
    userId: 2,
  },
  {
    id: 2,
    title: "Electricity outage in sector 5",
    category: "Electricity",
    status: "Pending",
    priority: "Normal",
    location: "Chittagong, Bangladesh",
    upvotes: 5,
    boosted: false,
    image: "https://via.placeholder.com/400x200",
    userId: 3,
  },
  {
    id: 3,
    title: "Water leakage near school",
    category: "Water",
    status: "In Progress",
    priority: "High",
    location: "Sylhet, Bangladesh",
    upvotes: 20,
    boosted: true,
    image: "https://via.placeholder.com/400x200",
    userId: 1,
  },
];

const categories = ["Road", "Electricity", "Water"];
const statuses = ["Pending", "In Progress", "Resolved"];
const priorities = ["High", "Normal"];

const AllIssues = () => {
  const [issues, setIssues] = useState(dummyIssues);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const navigate = useNavigate();
  const loggedInUserId = 1; // Dummy current user ID

  // Upvote function
  const handleUpvote = (issueId) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!loggedInUserId) {
      alert("Please login to upvote");
      navigate("/login");
      return;
    }
    if (issue.userId === loggedInUserId) {
      alert("You cannot upvote your own issue");
      return;
    }
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, upvotes: i.upvotes + 1 } : i))
    );
  };

  // Filter and search issues
  const displayedIssues = issues
    .filter((issue) => issue.title.toLowerCase().includes(search.toLowerCase()))
    .filter((issue) =>
      filterCategory === "All" ? true : issue.category === filterCategory
    )
    .filter((issue) =>
      filterStatus === "All" ? true : issue.status === filterStatus
    )
    .filter((issue) =>
      filterPriority === "All" ? true : issue.priority === filterPriority
    )
    .sort((a, b) => (b.boosted ? 1 : 0) - (a.boosted ? 1 : 0));

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">All Issues</h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center mb-4 md:mb-0 max-w-md w-full">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2 md:mb-0"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2 md:mb-0"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priority</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedIssues.map((issue) => (
          <motion.div
            key={issue.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col"
            whileHover={{ scale: 1.03 }}
          >
            {/* Issue Image */}
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-48 object-cover"
            />

            {/* Issue Content */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {issue.title}
                </h2>

                {/* Category */}
                <p className="text-sm text-gray-500 mb-2">{issue.category}</p>

                {/* Status & Priority Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : issue.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {issue.status}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <FaMapMarkerAlt /> {issue.location}
                </div>
              </div>

              {/* Actions: Upvote & View Details */}
              <div className="flex justify-between items-center mt-4">
                {/* Upvote Button */}
                <button
                  onClick={() => handleUpvote(issue.id)}
                  className="flex items-center gap-1 text-primary font-semibold hover:text-secondary transition"
                >
                  <FaThumbsUp /> {issue.upvotes}
                </button>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/issue-details/${issue.id}`)}
                  className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
