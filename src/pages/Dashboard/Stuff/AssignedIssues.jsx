import { useState } from "react";
import { FaFilter, FaTasks, FaExclamationCircle } from "react-icons/fa";

export default function AssignedPage() {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Street light not working",
      category: "Electricity",
      status: "Pending",
      priority: "High",
      boosted: true,
    },
    {
      id: 2,
      title: "Water leakage in main pipe",
      category: "Water",
      status: "In-progress",
      priority: "Normal",
      boosted: false,
    },
    {
      id: 3,
      title: "Road pothole near school",
      category: "Road",
      status: "Working",
      priority: "High",
      boosted: true,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const statusOptions = ["In-progress", "Working", "Resolved", "Closed"];

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
    // TODO: update db & add tracking record here
  };

  // Filtered & sorted issues
  const filteredIssues = issues
    .filter((issue) =>
      (filterStatus === "all" || issue.status === filterStatus) &&
      (filterPriority === "all" || issue.priority === filterPriority)
    )
    .sort((a, b) => b.boosted - a.boosted); // boosted first

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Assigned Issues</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
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
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Priority</option>
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
          {filteredIssues.map((issue) => (
            <tr key={issue.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {issue.boosted && (
                  <span className="text-xs text-white bg-red-500 px-2 py-1 rounded mr-2">
                    Boosted
                  </span>
                )}
                {issue.title}
              </td>
              <td className="p-3">{issue.category}</td>
              <td
                className={`p-3 font-semibold ${
                  issue.priority === "High" ? "text-red-600" : "text-gray-600"
                }`}
              >
                {issue.priority}
              </td>
              <td className="p-3">{issue.status}</td>
              <td className="p-3">
                {issue.status !== "Closed" && (
                  <select
                    value={issue.status}
                    onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                    className="border rounded-lg px-2 py-1 text-sm"
                  >
                    {statusOptions
                      .filter((s) => {
                        // Only allow valid transitions
                        if (issue.status === "Pending") return s === "In-progress";
                        if (issue.status === "In-progress") return s === "Working";
                        if (issue.status === "Working") return s === "Resolved";
                        if (issue.status === "Resolved") return s === "Closed";
                        return false;
                      })
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
          {filteredIssues.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No issues found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
