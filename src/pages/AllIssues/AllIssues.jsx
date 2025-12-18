import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Shared/Card/Card";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useDebounce from "../../hooks/useDebounce";
import Heading from "../../components/Shared/Heading";

const categories = ["Road", "Electricity", "Water", "Waste"];
const statuses = ["Pending", "In Progress", "Resolved"];
const priorities = ["High", "Normal"];

const AllIssues = () => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const axiosSecure = useAxiosSecure();

  const {
    data: allIssues = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "allReportedIssues",
      debouncedSearch,
      filterCategory,
      filterStatus,
      filterPriority,
      currentPage,
    ],
    queryFn: async () => {
      const res = await axiosSecure("/api/all-issues", {
        params: {
          search: debouncedSearch,
          category: filterCategory,
          status: filterStatus,
          priority: filterPriority,
          page: currentPage,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const { issues = [], totalPages = 0 } = allIssues;

  if (isLoading && !allIssues?.issues) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className=" -mt-10 bg-gray-50 min-h-screen">
        <title>CivicFix | All Issues</title>

        <Heading title={"All Issues"} subtitle={"View and manage all reported civic issues in one place. Use search and filters to quickly find specific problems."} center={true}/>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-4 mb-6">
          {/* Search */}
          <div className="flex items-center mb-4 md:mb-0 max-w-md w-full">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search issues..."
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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

        <div className="w-full text-center mt-10">
          {!issues.length && (
            <span className="font-semibold text-lg text-gray-400">
              No issues found
            </span>
          )}
        </div>

        {isFetching && (
          <div className="text-center text-sm text-gray-400 mb-4">
            Loading...
          </div>
        )}

        {/* Issues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {issues.map((issue) => (
            <Card key={issue._id} issue={issue} />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages).keys()].map((num) => {
            const page = num + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`cursor-pointer px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </Container>
  );
};

export default AllIssues;
