import { motion } from "framer-motion";
import { FaEdit, FaBolt, FaTag, FaMapMarkerAlt } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import UpVote from "../../components/UpVote/UpVote";
import BoostIssue from "../../components/BoostIssue/BoostIssue";
import DeleteIssue from "./DeleteIssue";
import { useState } from "react";
import { imageUpload } from "../../../utils";
import toast from "react-hot-toast";
import IssueDescription from "./IssueDescription";

export default function IssueDetailsPage() {
  const [editingIssue, setEditingIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { id } = useParams();

  const { data: userData = [] } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${user?.email}`);
      return res.data.result;
    },
  });

  const isBlocked = userData[0]?.isBlocked;

  const {
    data: issueData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issueDetails"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/issue/${id}`);
      return res.data;
    },
  });

  const issue = issueData?.result;
  const timeLines = issueData?.timeLine;

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
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <title>CivicFix | Issue Details</title>

      {/* Issue Card */}
      <motion.div
        className={`rounded-2xl overflow-hidden mb-8 shadow-xl transition-all duration-300 ${
          issue?.isBoosted
            ? "border-4 border-red-500"
            : "border border-gray-200 hover:border-primary"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
          {/* LEFT : Image */}
          <div className="w-full h-64 md:h-full">
            <img
              src={issue?.image}
              alt={issue?.title}
              className="w-full h-full object-cover rounded-l-2xl md:rounded-none"
            />
          </div>

          {/* RIGHT : Content */}
          <div className="p-6 flex flex-col justify-between space-y-6 bg-white">
            {/* Title + Status */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h1
                  className={`text-3xl capitalize font-extrabold tracking-tight ${
                    issue?.isBoosted ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {issue?.title}
                </h1>

                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm ${
                      issue?.status === "Rejected"
                        ? "bg-red-500"
                        : issue?.status === "Pending"
                        ? "bg-yellow-500"
                        : issue?.status === "In-Progress"
                        ? "bg-blue-500"
                        : issue?.status === "Resolved"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {issue?.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-sm ${
                      issue?.isBoosted ? "bg-red-600" : "bg-gray-400"
                    }`}
                  >
                    <FaBolt className="text-sm" />
                    {issue?.isBoosted ? "High" : "Normal"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <IssueDescription description={issue?.description} />

              {/* Meta info */}
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FaTag className="text-gray-400" /> <strong>Category:</strong>{" "}
                  {issue?.category}
                </p>
                <p className="flex items-center gap-2 capitalize">
                  <FaMapMarkerAlt className="text-gray-400" />{" "}
                  <strong>Location:</strong> {issue?.location}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
              <UpVote issue={issue} />

              <div className="flex gap-2 flex-wrap">
                {user?.email === issue?.issueBy &&
                  issue?.status === "Pending" && (
                    <button
                      onClick={() => {
                        if (isBlocked) {
                          return toast.error(
                            "You are blocked and cannot edit issues.Contact with authority!"
                          );
                        }
                        setEditingIssue(issue);
                      }}
                      className={`flex items-center gap-1 px-4 py-2 rounded-md text-white transition-all text-sm font-medium ${
                        isBlocked
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                      }`}
                    >
                      <FaEdit /> Edit
                    </button>
                  )}

                {user?.email === issue?.issueBy && (
                  <DeleteIssue issue={issue} />
                )}

                {!issue?.isBoosted && <BoostIssue issue={issue} />}
              </div>
            </div>

            {/* Assigned Staff */}
            {issue?.assignedStaff && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50 text-sm space-y-1">
                <p>
                  <strong>Assigned Staff:</strong> {issue?.assignedStaff}
                </p>
                <p>
                  <strong>Email:</strong> {issue?.assignedStaffEmail}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stepper Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">Issue Timeline</h2>
        <div className="flex flex-col relative">
          {timeLines?.map((item) => (
            <div key={item._id} className="flex items-start mb-8 last:mb-0">
              {/* Vertical Line */}
              <div className="flex flex-col items-center mr-4">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center z-10">
                  <AiFillClockCircle />
                </span>
                {!timeLines?.length && (
                  <div className="w-1 h-full bg-gray-300"></div>
                )}
              </div>
              {/* Timeline Content */}
              <motion.div
                className="bg-gray-50 p-4 rounded-md shadow-sm flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 * 0.2 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      item?.status === "Working"
                        ? "bg-black"
                        : item?.status === "Boosted"
                        ? "bg-primary font-bold"
                        : item?.status === "Rejected"
                        ? "bg-red-500"
                        : item?.status === "Pending"
                        ? "bg-yellow-500"
                        : item?.status === "In-Progress"
                        ? "bg-blue-500"
                        : item?.status === "Resolved"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {item?.status}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(item?.createAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{item?.message}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Updated by: {item?.updatedBy}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
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
