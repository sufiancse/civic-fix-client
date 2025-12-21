import React, { useState } from "react";
import { useNavigate } from "react-router";
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaFilter, 
  FaTimes, 
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaFileAlt,
  FaImage,
  FaMapMarkerAlt
} from "react-icons/fa";
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
  const [imagePreview, setImagePreview] = useState(null);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = [] } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${user?.email}`);
      return res.data.result;
    },
  });

  const isBlocked = userData[0]?.isBlocked;

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
      return res.data.issues;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      return axiosSecure.delete(`/api/issue/${id}/delete`, {
        data: { email },
      });
    },
    onSuccess: () => {
      toast.success("Issue deleted successfully");
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this issue?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
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
      toast.success("Issue updated successfully.");
      setEditingIssue(null);
      setImagePreview(null);
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
      toast.error("Failed to update issue");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      Pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: FaClock,
        linear: "from-yellow-400 to-orange-500"
      },
      "In-Progress": {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: FaExclamationCircle,
        linear: "from-blue-400 to-indigo-500"
      },
      Resolved: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: FaCheckCircle,
        linear: "from-green-400 to-emerald-500"
      },
      Closed: {
        bg: "bg-gray-100",
        text: "text-gray-700",
        icon: FaCheckCircle,
        linear: "from-gray-400 to-gray-500"
      },
      Rejected: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: FaTimesCircle,
        linear: "from-red-400 to-rose-500"
      }
    };
    return configs[status] || configs.Pending;
  };

  const categoryEmojis = {
    Electricity: "⚡",
    Water: "💧",
    Road: "🛣️",
    Waste: "♻️",
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <FaFileAlt className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
                My Issues
              </h1>
              <p className="text-gray-600">
                Manage and track your submitted issues
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
              <p className="text-xs text-gray-500 font-medium">Total</p>
              <p className="text-2xl font-bold text-gray-900">{issuesData.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
              <p className="text-xs text-gray-500 font-medium">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {issuesData.filter(i => i.status === "Pending").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
              <p className="text-xs text-gray-500 font-medium">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {issuesData.filter(i => i.status === "Resolved").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-gray-500">
              <p className="text-xs text-gray-500 font-medium">Closed</p>
              <p className="text-2xl font-bold text-gray-900">
                {issuesData.filter(i => i.status === "Closed").length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-blue-600" />
            <h3 className="font-bold text-gray-800">Filter Issues</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Status
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
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
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Category
              </label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All</option>
                <option>⚡ Electricity</option>
                <option>💧 Water</option>
                <option>🛣️ Road</option>
                <option>♻️ Waste</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {!issuesData.length && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <FaFileAlt className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Issues Found
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't submitted any issues yet or no issues match your filters.
            </p>
            <button
              onClick={() => navigate("/dashboard/user/report-issue")}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg cursor-pointer"
            >
              Report Your First Issue
            </button>
          </div>
        )}

        {/* Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {issuesData.map((issue) => {
            const statusConfig = getStatusConfig(issue.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={issue._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Issue Image */}
                <div className="relative h-48 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                  />
                  {issue.isBoosted && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      🔥 Boosted
                    </div>
                  )}
                  <div className={`absolute bottom-3 left-3 bg-linear-to-r ${statusConfig.linear} text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5`}>
                    <StatusIcon />
                    {issue.status}
                  </div>
                </div>

                {/* Issue Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1">
                      {issue.title}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-lg">{categoryEmojis[issue.category]}</span>
                      <span className="font-medium">{issue.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className="text-gray-400" />
                      {new Date(issue.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => navigate(`/issue-details/${issue._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold transition-all cursor-pointer"
                    >
                      <FaEye /> View
                    </button>

                    {issue.status === "Pending" && (
                      <button
                        onClick={() => {
                          if (isBlocked) {
                            return toast.error(
                              "You are blocked and cannot edit issues"
                            );
                          }
                          setEditingIssue(issue);
                          setImagePreview(issue.image);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                          isBlocked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer"
                        }`}
                      >
                        <FaEdit /> Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-all cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
              <button
                onClick={() => {
                  setEditingIssue(null);
                  setImagePreview(null);
                }}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition cursor-pointer"
              >
                <FaTimes />
              </button>
              <h3 className="text-2xl font-bold">Edit Issue</h3>
              <p className="text-blue-100 text-sm mt-1">Update your issue details</p>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={editingIssue.title}
                  onChange={(e) =>
                    setEditingIssue({ ...editingIssue, title: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={editingIssue.description}
                  onChange={(e) =>
                    setEditingIssue({
                      ...editingIssue,
                      description: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all resize-none"
                  required
                />
              </div>

              {/* Category & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editingIssue.category}
                    onChange={(e) =>
                      setEditingIssue({
                        ...editingIssue,
                        category: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all bg-white"
                  >
                    <option value="Electricity">⚡ Electricity</option>
                    <option value="Water">💧 Water</option>
                    <option value="Road">🛣️ Road</option>
                    <option value="Waste">♻️ Waste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingIssue.location || ""}
                    onChange={(e) =>
                      setEditingIssue({
                        ...editingIssue,
                        location: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FaImage className="text-blue-600" />
                  Update Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  required
                  onChange={handleImageChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIssue(null);
                    setImagePreview(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}