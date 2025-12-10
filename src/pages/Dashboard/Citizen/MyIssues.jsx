import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
} from "react-icons/fa";

// ================= DUMMY DATA =================
const initialIssues = [
  {
    id: 1,
    title: "Street light not working",
    category: "Electricity",
    status: "Pending",
    date: "2025-01-10",
    description: "Street light in front of my house is broken",
  },
  {
    id: 2,
    title: "Water leakage",
    category: "Water",
    status: "Resolved",
    date: "2025-01-08",
    description: "Continuous water leakage from pipe",
  },
  {
    id: 3,
    title: "Road damage near market",
    category: "Road",
    status: "Pending",
    date: "2025-01-05",
    description: "Big potholes causing traffic",
  },
];

// ================= COMPONENT =================
export default function MyIssues() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState(initialIssues);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingIssue, setEditingIssue] = useState(null);

  const filteredIssues = issues.filter((issue) => {
    return (
      (statusFilter === "All" || issue.status === statusFilter) &&
      (categoryFilter === "All" || issue.category === categoryFilter)
    );
  });

  const handleDelete = (id) => {
    setIssues((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIssues((prev) =>
      prev.map((i) => (i.id === editingIssue.id ? editingIssue : i))
    );
    setEditingIssue(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Issues
        </h1>
        <p className="text-gray-500">Manage and track your submitted issues</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm">
          <FaFilter className="text-gray-400" />
          <select
            className="outline-none text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm">
          <FaFilter className="text-gray-400" />
          <select
            className="outline-none text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Electricity</option>
            <option>Water</option>
            <option>Road</option>
          </select>
        </div>
      </div>

      {/* Issues List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{issue.title}</h3>
              <p className="text-sm text-gray-500">
                {issue.category} • {issue.date}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  issue.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {issue.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/issues/${issue.id}`)}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                <FaEye />
              </button>

              {issue.status === "Pending" && (
                <button
                  onClick={() => setEditingIssue(issue)}
                  className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                >
                  <FaEdit />
                </button>
              )}

              <button
                onClick={() => handleDelete(issue.id)}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Issue</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingIssue.title}
                onChange={(e) =>
                  setEditingIssue({ ...editingIssue, title: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
              <textarea
                rows="3"
                value={editingIssue.description}
                onChange={(e) =>
                  setEditingIssue({
                    ...editingIssue,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingIssue(null)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
