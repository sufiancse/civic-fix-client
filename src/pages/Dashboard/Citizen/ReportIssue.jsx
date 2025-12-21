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
  FaExclamationTriangle,
  FaTimes,
  FaCheckCircle,
  FaBolt,
  FaLightbulb,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";

export default function ReportIssue() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: userData = [], isLoading: userDataLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${user?.email}`);
      return res.data.result;
    },
  });

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post("/api/report-issue", payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Issue Report Added successfully");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 3,
  });

  const isPremium = userData[0]?.isPremium;
  const totalIssues = userData[0]?.totalIssues;
  const maxFreeIssues = userData[0]?.maxFreeIssues;
  const isLimitReached = !isPremium && totalIssues >= maxFreeIssues;
  const isBlocked = userData[0]?.isBlocked;

  const onSubmit = async (data) => {
    if (isLimitReached) return;

    const { title, description, category, image, location } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const issueData = {
        title,
        description,
        category,
        image: imageURL,
        location,
        issueBy: user?.email,
        assignedStaff: "",
        status: "Pending",
        isBoosted: false,
        createdAt: new Date(),
        upVotes: 0,
      };

      await mutateAsync(issueData);

      reset();
      setPreview(null);

      navigate("/dashboard/user/my-issues");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const categoryIcons = {
    Electricity: "⚡",
    Water: "💧",
    Road: "🛣️",
    Waste: "♻️",
  };

  if (isPending || userDataLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FaBolt className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            Report an Issue
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help improve your community by reporting civic issues. We'll track and resolve them together.
          </p>
        </div>

        {/* Blocked User Warning */}
        {isBlocked && (
          <div className="mb-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-xl p-6 flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
              <FaExclamationTriangle className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Account Blocked</h3>
              <p className="text-red-50 text-sm">
                Your account has been blocked. You cannot submit new issues until this is resolved.
              </p>
            </div>
          </div>
        )}

        {/* Limit Warning */}
        {isLimitReached && (
          <div className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                  <FaExclamationTriangle className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Free Limit Reached</h3>
                  <p className="text-yellow-50 text-sm">
                    You've reached the free tier limit of {maxFreeIssues} issues. Upgrade to continue reporting.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="flex-shrink-0 bg-white text-orange-600 hover:bg-gray-50 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
              >
                <FaCrown /> Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {!isPremium && !isLimitReached && (
          <div className="mb-6 bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Issues Submitted
              </span>
              <span className="text-sm font-bold text-blue-600">
                {totalIssues} / {maxFreeIssues}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(totalIssues / maxFreeIssues) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {maxFreeIssues - totalIssues} issues remaining in free tier
            </p>
          </div>
        )}

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all ${
            isLimitReached ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <FaLightbulb className="text-2xl" />
              <div>
                <h2 className="text-xl font-bold">Issue Details</h2>
                <p className="text-blue-100 text-sm">Fill out the form below to report your issue</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaHeading className="text-blue-600" />
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Street light not working on Main Road"
                  disabled={isBlocked}
                  {...register("title", { required: "Title is required" })}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <FaExclamationTriangle />
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaRegFileAlt className="text-blue-600" />
                  Category
                </label>
                <select
                  disabled={isBlocked}
                  {...register("category", { required: "Category is required" })}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="Electricity">⚡ Electricity</option>
                  <option value="Water">💧 Water</option>
                  <option value="Road">🛣️ Road</option>
                  <option value="Waste">♻️ Waste</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <FaExclamationTriangle />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Block A, Main Street"
                  disabled={isBlocked}
                  {...register("location", { required: "Location is required" })}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {errors.location && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <FaExclamationTriangle />
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaRegFileAlt className="text-blue-600" />
                  Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Provide detailed information about the issue..."
                  disabled={isBlocked}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-3 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <FaExclamationTriangle />
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="lg:col-span-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <FaImage className="text-blue-600" />
                  Upload Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  disabled={isBlocked}
                  {...register("image", {
                    required: "Image is required",
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    },
                  })}
                  id="issue-image"
                  className="hidden"
                />

                {!preview ? (
                  <label
                    htmlFor="issue-image"
                    className={`block border-3 border-dashed rounded-2xl p-8 text-center transition-all ${
                      isBlocked
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-blue-300 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                    }`}
                    style={{ pointerEvents: isBlocked ? "none" : "auto" }}
                  >
                    <FaCloudUploadAlt className={`mx-auto text-5xl mb-3 ${isBlocked ? "text-gray-400" : "text-blue-500"}`} />
                    <p className={`font-semibold mb-1 ${isBlocked ? "text-gray-500" : "text-gray-700"}`}>
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                    <button
                      type="button"
                      onClick={() => setPreview(null)}
                      className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all z-10 cursor-pointer"
                    >
                      <FaTimes />
                    </button>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-96 object-contain rounded-xl"
                    />
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
                      <FaCheckCircle />
                      Image uploaded successfully
                    </div>
                  </div>
                )}

                {errors.image && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <FaExclamationTriangle />
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isBlocked}
                className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 ${
                  isBlocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl"
                }`}
              >
                Submit Issue Report
              </button>
            </div>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" />
            Tips for Better Reports
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <FaCheckCircle className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Be Specific</p>
                <p className="text-xs text-gray-600">Include exact location and details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                <FaCheckCircle className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Clear Photos</p>
                <p className="text-xs text-gray-600">Take well-lit, focused images</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                <FaCheckCircle className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Right Category</p>
                <p className="text-xs text-gray-600">Choose the most relevant option</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                <FaCheckCircle className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Stay Respectful</p>
                <p className="text-xs text-gray-600">Use professional language</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}