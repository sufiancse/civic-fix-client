import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: "Abu Sufian",
    email: "admin@example.com",
    phone: "0123456789",
    role: "Administrator",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(admin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmin(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Photo */}
        <div className="shrink-0 flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold">
            {admin.name.charAt(0)}
          </div>
          <p className="text-sm text-gray-500">Role: {admin.role}</p>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FaUser /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FaPhone /> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                <span className="font-medium">Name:</span> {admin.name}
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <span className="font-medium">Email:</span> {admin.email}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                <span className="font-medium">Phone:</span> {admin.phone}
              </div>
              <div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
