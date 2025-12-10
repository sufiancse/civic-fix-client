import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  FaHeading,
  FaRegFileAlt,
  FaMapMarkerAlt,
  FaImage,
  FaCrown,
  FaCloudUploadAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

// ================= DUMMY USER STATE =================
const userInfo = {
  isPremium: false, // change to true to allow unlimited issues
  totalIssues: 1, // already reported
  maxFreeIssues: 3,
};

export default function ReportIssue() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //image preview system in form
  const [preview, setPreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const isLimitReached =
    !userInfo.isPremium && userInfo.totalIssues >= userInfo.maxFreeIssues;

  const onSubmit = (data) => {
    if (isLimitReached) return;

    // ===== DUMMY DB SAVE =====
    const issuePayload = {
      ...data,
      status: "Pending",
      createdAt: new Date().toISOString(),
      timeline: [
        {
          action: "Issue Created",
          date: new Date().toISOString(),
        },
      ],
    };

    console.log("Saved issue:", issuePayload);

    toast.success("Report an issue submit successful.");

    // reset form & redirect
    reset();
    setPreview(null);

    navigate("/dashboard/user/my-issues");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Report an Issue
        </h1>
        <p className="text-gray-500">
          Submit a civic issue for authority action & tracking
        </p>
      </div>

      {/* LIMIT WARNING */}
      {isLimitReached && (
        <div className="max-w-3xl mx-auto mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-yellow-700 text-sm">
            You have reached the free issue limit (3 issues).
          </p>
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium"
          >
            <FaCrown /> Upgrade to Premium
          </button>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 ${
          isLimitReached && "opacity-60 pointer-events-none"
        }`}
      >
        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-1">
              <FaHeading /> Issue Title
            </label>
            <input
              type="text"
              placeholder="Street light not working"
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded-lg p-2"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border rounded-lg p-2"
            >
              <option value="" >
                Select category
              </option>
              <option>Electricity</option>
              <option>Water</option>
              <option>Road</option>
              <option>Waste</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description – full width */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium flex items-center gap-2 mb-1">
              <FaRegFileAlt /> Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the issue in detail"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded-lg p-2"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <FaImage /> Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
              id="issue-image"
              className="hidden"
            />

            <label
              htmlFor="issue-image"
              className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 rounded-lg cursor-pointer
             hover:bg-gray-50 transition text-sm font-medium text-gray-700"
            >
              <FaCloudUploadAlt className="text-lg" />
              Choose Image
            </label>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 max-h-48 object-cover rounded-xl ring-1 ring-gray-300 shadow-sm"
                />
              </div>
            )}

            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-1">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              placeholder="Area / Street name"
              {...register("location", { required: "Location is required" })}
              className="w-full border rounded-lg p-2"
            />
            {errors.location && (
              <p className="text-xs text-red-500 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 text-right">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
}
