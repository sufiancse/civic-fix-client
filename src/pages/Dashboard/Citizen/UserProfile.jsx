import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaUserCircle,
  FaEnvelope,
  FaCrown,
  FaEdit,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
  FaShieldAlt,
  FaCalendarAlt,
  FaFileInvoice,
  FaRocket,
  FaCheckDouble,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../utils";
import axios from "axios";
import InvoicePDF from "../../../components/Shared/InvoicePDF/InvoicePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function UserProfile() {
  const axiosSecure = useAxiosSecure();
  const { user: userDetail } = useAuth();
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();

  const { data = [], isLoading: userDataLoading } = useQuery({
    queryKey: ["userProfile", userDetail?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/users?email=${userDetail?.email}&role=citizen`
      );
      return res.data;
    },
  });

  const user = data.result?.[0];
  const payment = data.boosted;

  const openModal = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    });
    setImagePreview(user?.image);
    setIsModalOpen(true);
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedUserData) => {
      return axiosSecure.patch(`/api/user/${user._id}/update`, updatedUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      setIsModalOpen(false);
      setImagePreview(null);
      toast.success("Profile update successfully.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const imageFile = e.target.image.files[0];

    try {
      let imageURL = user?.image;
      
      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">No user data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Blocked Warning Banner */}
        {user.isBlocked && (
          <div className="bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-xl p-6 flex items-start gap-4 animate-pulse">
            <div className="bg-white/20 p-3 rounded-full">
              <FaExclamationTriangle className="text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Account Blocked</h3>
              <p className="text-red-50 text-sm">
                Your account has been blocked. Please contact support to resolve this issue.
              </p>
            </div>
          </div>
        )}

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Premium Badge Overlay */}
              {user?.isPremium && (
                <div className="bg-linear-to-r from-yellow-400 via-yellow-500 to-orange-500 p-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-white font-bold">
                    <FaCrown className="animate-bounce" />
                    <span>Premium Member</span>
                  </div>
                </div>
              )}

              {/* Profile Image Section */}
              <div className="relative pt-8 pb-6 bg-linear-to-br from-blue-500 to-indigo-600">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={user?.image}
                      alt={user?.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                    />
                    {user?.isPremium && (
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                        <FaCrown className="text-lg" />
                      </div>
                    )}
                  </div>
                  
                  <h2 className="mt-4 text-2xl font-bold text-white text-center">
                    {user?.name}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {user?.isPremium ? "Premium User" : "Free User"}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaEnvelope className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FaShieldAlt className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Status</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {user.isBlocked ? "Blocked" : "Active"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FaUserCircle className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Role</p>
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={openModal}
                  className="w-full mt-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Subscription & Stats */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Subscription Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <FaRocket className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Subscription Plan</h3>
                    <p className="text-indigo-100 text-sm">
                      {user.isPremium ? "Premium Access" : "Free Tier"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {!user.isPremium ? (
                  <div className="space-y-6">
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <FaCheckDouble className="text-green-500 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">Unlimited Issues</p>
                          <p className="text-xs text-gray-500">Report as many as you want</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <FaCheckDouble className="text-green-500 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">Priority Support</p>
                          <p className="text-xs text-gray-500">Get faster responses</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <FaCheckDouble className="text-green-500 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">Advanced Analytics</p>
                          <p className="text-xs text-gray-500">Track your impact</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <FaCheckDouble className="text-green-500 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">Issue Boosting</p>
                          <p className="text-xs text-gray-500">Prioritize your reports</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Limitation */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <FaExclamationTriangle className="text-yellow-600 mt-1" />
                        <div>
                          <p className="font-semibold text-yellow-800">
                            Free Tier Limitation
                          </p>
                          <p className="text-sm text-yellow-700 mt-1">
                            You can only submit 3 issues. Upgrade to premium for unlimited access.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Subscribe Button */}
                    <button
                      onClick={handleSubscribe}
                      className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                    >
                      <FaCrown className="text-xl" />
                      Upgrade to Premium - ৳1000
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                      <FaCrown className="text-4xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Premium Active
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You're enjoying all premium features
                    </p>
                    
                    {/* Premium Features */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="text-center p-3">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FaCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <p className="text-xs font-semibold text-gray-700">Unlimited</p>
                      </div>
                      <div className="text-center p-3">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FaCheckCircle className="text-blue-600 text-xl" />
                        </div>
                        <p className="text-xs font-semibold text-gray-700">Priority</p>
                      </div>
                      <div className="text-center p-3">
                        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FaCheckCircle className="text-purple-600 text-xl" />
                        </div>
                        <p className="text-xs font-semibold text-gray-700">Analytics</p>
                      </div>
                      <div className="text-center p-3">
                        <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FaCheckCircle className="text-orange-600 text-xl" />
                        </div>
                        <p className="text-xs font-semibold text-gray-700">Boosting</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Invoice Download Card */}
            {payment && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <FaFileInvoice className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Payment Invoice</h3>
                      <p className="text-sm text-gray-500">Download your payment receipt</p>
                    </div>
                  </div>
                  
                  <PDFDownloadLink
                    document={<InvoicePDF payment={payment} />}
                    fileName={`Invoice_${payment._id}.pdf`}
                    className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                  >
                    {({ loading }) => (
                      <>
                        <FaFileInvoice />
                        {loading ? "Preparing..." : "Download PDF"}
                      </>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setImagePreview(null);
                }}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition cursor-pointer"
              >
                <FaTimes />
              </button>
              <h3 className="text-2xl font-bold">Edit Profile</h3>
              <p className="text-blue-100 text-sm mt-1">Update your information</p>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image Preview */}
              {imagePreview && (
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />
                </div>
              )}

              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile Picture
                </label>
                <input
                  name="image"
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: Square image, max 2MB
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setImagePreview(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
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