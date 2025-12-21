import { useState } from "react";
import { FaUser, FaEnvelope, FaEdit, FaCamera, FaTimes } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../../utils";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const { data = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["adminProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/users?email=${user?.email}&role=admin`
      );
      return res.data.result;
    },
  });

  const admin = data?.[0];

  const openModal = () => {
    setFormData({
      name: admin?.name || "",
      email: admin?.email || "",
      role: admin?.role || "",
    });
    setPreviewImage(admin?.image || null);
    setIsModalOpen(true);
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedAdminData) => {
      return axiosSecure.patch(`/api/user/${admin._id}/update`, updatedAdminData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminProfile"]);
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Update failed");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const imageFile = e.target.image.files[0];

    try {
      let imageURL = admin.image;
      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

      const updatedAdminData = { name, image: imageURL };
      updateMutation.mutate(updatedAdminData);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!admin) {
    return <p className="text-center py-20 text-gray-500">No admin profile found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Admin Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 h-32"></div>
          
          <div className="relative px-8 pb-10 pt-20 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-xl">
                  <img
                    src={admin.image || "/default-avatar.png"}
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaCamera className="text-white text-3xl" />
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 text-center md:text-left space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{admin.name}</h3>
                  <p className="text-lg text-indigo-600 font-medium mt-2 capitalize">
                    {admin.role}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-3 text-gray-700">
                    <FaUser className="text-indigo-500 text-xl" />
                    <span className="text-lg">{admin.name}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 text-gray-700">
                    <FaEnvelope className="text-indigo-500 text-xl" />
                    <span className="text-lg">{admin.email}</span>
                  </div>
                </div>

                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-500 scale-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Image Preview */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={previewImage || admin.image}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition">
                    <FaCamera />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={formData.name}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={formData.email}
                  readOnly
                  className="w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  defaultValue={formData.role}
                  readOnly
                  className="w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-not-allowed capitalize"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 transition"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}