import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash, FaEye, FaFilter } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../utils";

export default function MyIssues() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingIssue, setEditingIssue] = useState(null);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: issuesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userIssues", user?.email, statusFilter, categoryFilter],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/all-issues?email=${user?.email}&status=${statusFilter}&category=${categoryFilter}`
      );
      return res.data.issues
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      return axiosSecure.delete(`/api/issue/${id}/delete`, {
        data: { email },
      });
    },
    onSuccess: () => {
      toast.success("Issue delete successfully");

      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this issue?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmed",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ id, email: user?.email });
      }
    });
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return axiosSecure.patch(
        `/api/issue/${editingIssue._id}/update`,
        updatedData
      );
    },
    onSuccess: () => {
      toast.success("Issue update successfully.");

      setEditingIssue(null);

      refetch();
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const imageFile = e.target.image.files[0];

    try {
      let imageURL = editingIssue.image;

      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

      const updatedData = {
        title: editingIssue.title,
        description: editingIssue.description,
        category: editingIssue.category,
        location: editingIssue.location,
        image: imageURL,
      };

      updateMutation.mutate(updatedData);
    } catch (error) {
      console.log("Issue updated error:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

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
            <option>In-Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
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
            <option>Waste</option>
          </select>
        </div>
      </div>

      {/* when no data available */}
      <div className="w-full text-center">
        {!issuesData.length && (
          <span className="text-3xl font-semibold text-gray-400 ">
            No Data Available
          </span>
        )}
      </div>

      {/* Issues List */}
      <div className="grid grid-cols-1 gap-4">
        {issuesData.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{issue.title}</h3>
              <p className="text-sm text-gray-500">
                {issue.category} • {new Date(issue.createdAt).toLocaleString()}
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
                onClick={() => navigate(`/issue-details/${issue._id}`)}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
              >
                <FaEye />
              </button>

              {issue.status === "Pending" && (
                <button
                  onClick={() => setEditingIssue(issue)}
                  className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer"
                >
                  <FaEdit />
                </button>
              )}

              <button
                onClick={() => handleDelete(issue._id)}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Issue */}
      {editingIssue && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Issue</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={editingIssue.title}
                  onChange={(e) =>
                    setEditingIssue({ ...editingIssue, title: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium">Description</label>
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
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={editingIssue.category}
                  onChange={(e) =>
                    setEditingIssue({
                      ...editingIssue,
                      category: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2"
                >
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Road">Road</option>
                  <option value="Waste">Waste</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={editingIssue.location || ""}
                  onChange={(e) =>
                    setEditingIssue({
                      ...editingIssue,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm font-medium">Change Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIssue(null);
                  }}
                  className="px-4 py-2 rounded-lg border cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer"
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
