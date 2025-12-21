import { useState } from "react";
import { FaFilter, FaExclamationCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

export default function AssignedPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const { data: assignedData = {}, isLoading } = useQuery({
    queryKey: ["AssignedIssues", user?.email, filterStatus, filterPriority, currentPage],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/all-issues?assignedStaffEmail=${user?.email}&status=${filterStatus}&priority=${filterPriority}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  const assignedIssues = assignedData.issues || [];
  const totalPages = assignedData.totalPages || 1;

  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: ({ id, newStatus }) =>
      axiosSecure.patch(`/api/issues/${id}/status`, {
        newStatus,
        changedBy: "staff",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["AssignedIssues", user.email]);
      toast.success("Status change successful.");
    },
  });

  const STATUS_FLOW = {
    Pending: ["In-progress"],
    "In-progress": ["Working"],
    Working: ["Resolved"],
    Resolved: ["Closed"],
  };

  const [rowStatus, setRowStatus] = useState({});

  const handleStatusChange = (id, newStatus) => {
    setRowStatus((prev) => ({ ...prev, [id]: "" }));
    statusMutation.mutate({ id, newStatus });
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    if (filterType === "status") {
      setFilterStatus(value);
    } else if (filterType === "priority") {
      setFilterPriority(value);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Assigned Issues</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In-progress">In-progress</option>
            <option value="Working">Working</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-gray-500" />
          <select
            value={filterPriority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Issues Table */}
      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedIssues.map((issue) => (
            <tr key={issue._id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {issue.isBoosted && (
                  <span className="text-xs text-white bg-red-500 px-2 py-1 rounded mr-2">
                    Boosted
                  </span>
                )}
                {issue.title}
              </td>
              <td className="p-3">{issue.category}</td>

              <td
                className={`p-3 font-semibold ${
                  issue.isBoosted ? "text-red-600" : "text-gray-600"
                }`}
              >
                {issue.isBoosted ? "High" : "Normal"}
              </td>

              <td className="p-3">{issue.status}</td>
              <td className="p-3">
                {issue.status === "Rejected" ? (
                  <span className="text-red-500 font-bold">Rejected Issue</span>
                ) : issue.status !== "Closed" ? (
                  <select
                    value={rowStatus[issue._id] || ""}
                    onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                    className="border rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="" disabled>
                      Change Status
                    </option>

                    {STATUS_FLOW[issue.status]?.map((nextStatus) => (
                      <option key={nextStatus} value={nextStatus}>
                        {nextStatus}
                      </option>
                    ))}
                  </select>
                ) : null}
              </td>
            </tr>
          ))}
          {assignedIssues.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No issues found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg border font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <FaChevronLeft size={12} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg border font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}