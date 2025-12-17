import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaUserCircle,
  FaEnvelope,
  FaCrown,
  FaEdit,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../utils";
import axios from "axios";

export default function UserProfile() {
  const axiosSecure = useAxiosSecure();
  const { user: userDetail } = useAuth();
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // useQuery for fetching data from db
  const { data = [], isLoading: userDataLoading } = useQuery({
    queryKey: ["userProfile", userDetail?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${userDetail?.email}&role=citizen`);
      return res.data;
    },
  });

  const user = data?.[0];

  const openModal = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    });
    setIsModalOpen(true);
  };

  // data update using useMutation
  const updateMutation = useMutation({
    mutationFn: async (updatedUserData) => {
      return axiosSecure.patch(`/api/user/${user._id}/update`, updatedUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      setIsModalOpen(false);
      toast.success("Profile update successfully.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const imageFile = e.target.image.files[0];

    try {
      // upload image for hosting using img bb
      const imageURL = await imageUpload(imageFile);

      // ===== DUMMY DB SAVE =====
      const updatedUserData = {
        name,
        image: imageURL,
      };

      updateMutation.mutate(updatedUserData);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleSubscribe = async () => {
    const paymentInfo = {
      userId: user?._id,
      email: user?.email,
      name: user?.name,
      price: 1000,
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data?.url;
  };

  if (userDataLoading) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center py-10">No user data found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Blocked Warning */}
      {user.isBlocked && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
          <FaExclamationTriangle className="text-xl mt-0.5" />
          <div>
            <p className="font-semibold">Your account is blocked</p>
            <p className="text-sm">
              Please contact the concerned authority for resolution.
            </p>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={user?.name}
              className="w-15 max-h-15 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {user?.name}
                {user?.isPremium && (
                  <span className="flex items-center gap-1 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                    <FaCrown /> Premium
                  </span>
                )}
              </h2>
              <p className="text-sm opacity-90">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={openModal}
            className="cursor-pointer flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm"
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Personal Information
            </h3>

            <div className="flex items-center gap-3 text-sm">
              <FaUserCircle className="text-gray-500" />
              <span>{user.name}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaEnvelope className="text-gray-500" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaCheckCircle className="text-green-500" />
              <span>
                Account Status: {user.isPremium ? "Premium User" : "Free User"}
              </span>
            </div>
          </div>

          {/* Subscription Box */}
          <div className="bg-gray-50 rounded-2xl p-5 border text-center">
            <h3 className="font-semibold text-gray-700 mb-2">
              Subscription Status
            </h3>

            {!user.isPremium ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Free users can submit only 3 issues. Upgrade to premium for
                  unlimited access.
                </p>
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium cursor-pointer"
                >
                  Subscribe for ৳1000
                </button>
              </>
            ) : (
              <div className="text-green-600 font-medium flex items-center justify-center gap-2">
                <FaCrown />
                You are a Premium User
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  name="name"
                  defaultValue={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Image </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
