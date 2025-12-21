import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaPhone,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../../utils";
import toast from "react-hot-toast";

export default function StaffProfile() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // data fetching using useQuery
  const { data = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["staffProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/users?email=${user.email}&role=staff`
      );
      return res.data.result;
    },
  });

  const staff = data?.[0];

  const openModal = () => {
    setFormData({
      name: staff?.name || "",
      email: staff?.email || "",
      role: staff?.role || "",
    });
    setIsModalOpen(true);
  };

  // data update using useMutation
  const updateMutation = useMutation({
    mutationFn: async (updatedStaffData) => {
      return axiosSecure.patch(
        `/api/user/${staff._id}/update`,
        updatedStaffData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staffProfile"]);
      setIsModalOpen(false);
      toast.success("Profile update successfully.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const name = formData.name;
    const imageInput = document.querySelector('input[name="image"]');
    const imageFile = imageInput?.files?.[0];

    try {
      // upload image for hosting using img bb
      const imageURL = await imageUpload(imageFile);

      // ===== DUMMY DB SAVE =====
      const updatedStaffData = {
        name,
        image: imageURL,
      };

      updateMutation.mutate(updatedStaffData);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 font-semibold text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-10 max-w-md">
          <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FaUser className="text-4xl text-slate-400" />
          </div>
          <p className="text-slate-700 font-semibold text-lg">
            No staff data found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Staff Profile
          </h2>
          <p className="text-slate-600">
            View and manage your profile information
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative Header */}
          <div className="h-32 sm:h-48 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>

          <div className="px-6 sm:px-8 lg:px-12 pb-8">
            <div className="flex flex-col lg:flex-row gap-8 -mt-16 sm:-mt-20">
              {/* Profile Image Section */}
              <div className="shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-linear-to-br from-white to-slate-50 p-1 shadow-2xl">
                    <img
                      src={staff.image}
                      alt="staff"
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider whitespace-nowrap">
                    {staff.role}
                  </div>
                </div>

                <div className="hidden lg:block mt-10">
                  <button
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/40 hover:-translate-y-1 cursor-pointer"
                  >
                    <FaEdit className="text-lg" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 mt-6 lg:mt-0">
                {/* Name and Edit Button */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                      {staff.name}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Staff Member Profile
                    </p>
                  </div>

                  <button
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/40 hover:-translate-y-1 cursor-pointer"
                  >
                    <FaEdit className="text-lg" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Card */}
                  <div className="group bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FaUser className="text-white text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">
                          Full Name
                        </p>
                        <p className="text-slate-800 font-bold text-lg truncate">
                          {staff.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="group bg-linear-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-5 border border-indigo-200/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FaEnvelope className="text-white text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wide">
                          Email Address
                        </p>
                        <p className="text-slate-800 font-bold text-lg truncate">
                          {staff.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group bg-linear-to-br from-purple-50 to-purple-100/50 rounded-2xl p-5 border border-purple-200/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FaPhone className="text-white text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-purple-600 font-semibold mb-1 uppercase tracking-wide">
                          Phone Number
                        </p>
                        <p className="text-slate-800 font-bold text-lg">
                          0{staff.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role Card */}
                  <div className="group bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-5 border border-emerald-200/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FaUser className="text-white text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-emerald-600 font-semibold mb-1 uppercase tracking-wide">
                          User Role
                        </p>
                        <p className="text-slate-800 font-bold text-lg capitalize">
                          {staff.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 px-6 py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Edit Profile
                  </h3>
                  <p className="text-white/90 text-sm">
                    Update your profile information
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 hover:rotate-90 cursor-pointer"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    name="name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 pl-12 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-800"
                    placeholder="Enter your full name"
                    required
                  />
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Profile Picture
                </label>
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-200 group">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <FaCamera className="text-white text-2xl" />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-700 font-semibold mb-1">
                          Click to upload image
                        </p>
                        <p className="text-slate-500 text-xs">
                          PNG, JPG or JPEG (Max 5MB)
                        </p>
                      </div>
                    </div>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                     
                    />
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3.5 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
