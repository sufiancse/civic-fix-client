import { useState } from "react";
import { FaUserPlus, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { Dialog } from "@headlessui/react"; // modal library for simplicity
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AllIssues() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");
  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const { data: allIssues = [], isLoading } = useQuery({
    queryKey: ["allIssuesAdminPage"],
    queryFn: async () => {
      const res = await axiosSecure("/api/all-issues");
      return res.data.issues
    },
  });

  const { data: staffList = [] } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?role=staff`);
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async () => {
      const staff = staffList.find((s) => s._id === selectedStaff);

      return axiosSecure.patch(`/api/issues/${currentIssue._id}/assign`, {
        staffEmail: staff.email,
        staffName: staff.name,
      });
    },
    onSuccess: () => {
      toast.success("Staff assigned successfully");

      queryClient.invalidateQueries(["allIssuesAdminPage"]);

      setIsModalOpen(false);
      setSelectedStaff("");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (issueId) => {
      return axiosSecure.patch(`/api/issues/${issueId}/reject`);
    },
    onSuccess: () => {
      toast.success("Issue reject successfully.");
      queryClient.invalidateQueries(["allIssuesAdminPage"]);
    },
  });

  const openAssignModal = (issue) => {
    setCurrentIssue(issue);
    setSelectedStaff("");
    setIsModalOpen(true);
  };

  const assignStaff = () => {
    if (!selectedStaff) {
      toast.error("Please select a staff");
      return;
    }
    assignMutation.mutate();
    setIsModalOpen(false);
  };

  const rejectIssue = (issue) => {
    Swal.fire({
      title: "Reject this issue?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmed",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(issue._id);
      }
    });
  };

  // Sort boosted issues on top
  const sortedIssues = allIssues.sort((a, b) => {
    // Not Assigned প্রথম
    if (!a.assignedStaff && b.assignedStaff) return -1;
    if (a.assignedStaff && !b.assignedStaff) return 1;

    // Priority High -> Low
    if (a.isBoosted && !b.isBoosted) return -1;
  if (!a.isBoosted && b.isBoosted) return 1;
  });

  if (isLoading) return <LoadingSpinner />;

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
              key={issue._id}
              className={`border-b hover:bg-gray-50 ${
                issue.isBoosted ? "bg-yellow-50 font-semibold" : ""
              }`}
            >
              <td className="p-3">{issue.title}</td>
              <td className="p-3">{issue.category}</td>
              <td className="p-3 ">{issue.status}</td>
              <td className="p-3 capitalize">
                {issue.isBoosted ? (
                  <span className="text-red-600 font-medium">High</span>
                ) : (
                  <span className="text-gray-600">Normal</span>
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
                    onClick={() => openAssignModal(issue)}
                    className="cursor-pointer flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <FaUserPlus /> Assign Staff
                  </button>
                )}

                {/* Reject Issue */}
                {issue.status === "Pending" && (
                  <button
                    onClick={() => rejectIssue(issue)}
                    className="cursor-pointer flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
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
                <option key={i} value={staff._id}>
                  {staff.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={assignStaff}
                disabled={!selectedStaff}
                className={`px-4 py-2 rounded-lg text-white cursor-pointer  ${
                  selectedStaff
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
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
