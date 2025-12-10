import { useState } from "react";
import { FaUserPlus, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { Dialog } from "@headlessui/react"; // modal library for simplicity

export default function AllIssues() {
  // ✅ Dummy issues data
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Street light not working",
      category: "Electricity",
      status: "pending",
      priority: "high",
      boosted: true,
      assignedStaff: null,
    },
    {
      id: 2,
      title: "Water leakage in main pipe",
      category: "Water",
      status: "pending",
      priority: "normal",
      boosted: false,
      assignedStaff: "John Doe",
    },
    {
      id: 3,
      title: "Road pothole near school",
      category: "Road",
      status: "pending",
      priority: "high",
      boosted: true,
      assignedStaff: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIssueId, setCurrentIssueId] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  // Dummy staff list
  const staffList = ["John Doe", "Jane Smith", "Ali Khan", "Sara Ahmed"];

  const openAssignModal = (issueId) => {
    setCurrentIssueId(issueId);
    setSelectedStaff("");
    setIsModalOpen(true);
  };

  const assignStaff = () => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === currentIssueId
          ? { ...issue, assignedStaff: selectedStaff }
          : issue
      )
    );
    setIsModalOpen(false);
  };

  const rejectIssue = (issueId) => {
    if (window.confirm("Are you sure you want to reject this issue?")) {
      setIssues((prev) => prev.filter((issue) => issue.id !== issueId));
    }
  };

  // Sort boosted issues on top
  const sortedIssues = [...issues].sort((a, b) => b.boosted - a.boosted);

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Issues</h2>
      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Assigned Staff</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedIssues.map((issue) => (
            <tr
              key={issue.id}
              className={`border-b hover:bg-gray-50 ${
                issue.boosted ? "bg-yellow-50 font-semibold" : ""
              }`}
            >
              <td className="p-3">{issue.title}</td>
              <td className="p-3">{issue.category}</td>
              <td className="p-3 capitalize">{issue.status}</td>
              <td className="p-3 capitalize">
                {issue.priority === "high" ? (
                  <span className="text-red-600 font-medium">{issue.priority}</span>
                ) : (
                  <span className="text-gray-600">{issue.priority}</span>
                )}
              </td>
              <td className="p-3">
                {issue.assignedStaff || (
                  <span className="text-gray-400">Not assigned</span>
                )}
              </td>
              <td className="p-3 flex gap-2">
                {/* Assign Staff */}
                {!issue.assignedStaff && (
                  <button
                    onClick={() => openAssignModal(issue.id)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <FaUserPlus /> Assign Staff
                  </button>
                )}

                {/* Reject Issue */}
                {issue.status === "pending" && (
                  <button
                    onClick={() => rejectIssue(issue.id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <FaTrash /> Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Staff Modal */}
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <Dialog.Panel className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <Dialog.Title className="font-semibold text-lg mb-4">
              Assign Staff
            </Dialog.Title>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            >
              <option value="">Select Staff</option>
              {staffList.map((staff, i) => (
                <option key={i} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={assignStaff}
                disabled={!selectedStaff}
                className={`px-4 py-2 rounded-lg text-white ${
                  selectedStaff ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Assign
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
}
