import { useState } from "react";
import { FaUser, FaEnvelope, FaEdit } from "react-icons/fa";
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

  // data fetching using useQuery
  const { data = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["adminProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/users?email=${user.email}&role=admin`
      );
      return res.data;
    },
  });

  const admin = data?.[0];


  const openModal = () => {
    setFormData({
      name: admin?.name || "",
      email: admin?.email || "",
      role: admin?.role || "",
    });
    setIsModalOpen(true);
  };

  // data update use mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedAdminData) => {
      return axiosSecure.patch(
        `/api/user/${admin._id}/update`,
        updatedAdminData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminProfile"]);
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
      const updatedAdminData = {
        name,
        image: imageURL,
      };

      updateMutation.mutate(updatedAdminData);
      
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }

  };

  if (isLoading) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  if (!admin) {
    return <p className="text-center py-10">No admin data found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
        {/* IMAGE */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={admin.image}
            alt="Admin"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <span className="text-sm text-gray-500">{admin.role}</span>
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-4">
          <p className="flex items-center gap-2">
            <FaUser className="text-gray-400" />
            <strong>Name:</strong> {admin.name}
          </p>

          <p className="flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            <strong>Email:</strong> {admin.email}
          </p>

          <p>
            <strong>Role:</strong> {admin.role}
          </p>

          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
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
                <label className="text-sm font-medium">Email</label>
                <input
                  defaultValue={formData.email}
                  readOnly
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Role</label>
                <input
                  defaultValue={formData.role}
                  readOnly
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
