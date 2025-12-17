import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Shared/Card/Card";
import Container from "../../components/Shared/Container";

const categories = ["Road", "Electricity", "Water"];
const statuses = ["Pending", "In Progress", "Resolved"];
const priorities = ["High", "Normal"];

const AllIssues = () => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const axiosSecure = useAxiosSecure();

  const { data: allIssues = [] } = useQuery({
    queryKey: ["allReportedIssues"],
    queryFn: async () => {
      const res = await axiosSecure("/api/all-issues");
      return res.data;
    },
  });

  return (
    <Container>
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <title>CivicFix | All Issues</title>

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
          {allIssues.map((issue) => (
            <Card key={issue._id} issue={issue} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllIssues;
