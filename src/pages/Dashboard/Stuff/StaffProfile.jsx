import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaImage } from "react-icons/fa";

export default function StaffProfile() {
  const [staff, setStaff] = useState({
    name: "John Doe",
    email: "staff@example.com",
    phone: "0123456789",
    role: "Staff",
    image: null,
  });

  const [preview, setPreview] = useState(staff.image);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: staff.name,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStaff({ ...staff, name: formData.name, image: preview });
    setIsEditing(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Staff Profile</h2>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Photo */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-4xl font-bold">{staff.name.charAt(0)}</span>
            )}
          </div>

          {isEditing && (
            <label
              htmlFor="profile-image"
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-sm"
            >
              <FaImage /> Change Image
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          <p className="text-sm text-gray-500">Role: {staff.role}</p>
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

              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    value={staff.email}
                    disabled
                    className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <FaPhone /> Phone
                  </label>
                  <input
                    type="text"
                    value={staff.phone}
                    disabled
                    className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
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
                <span className="font-medium">Name:</span> {staff.name}
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <span className="font-medium">Email:</span> {staff.email}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                <span className="font-medium">Phone:</span> {staff.phone}
              </div>
              <div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 flex items-center gap-2 bg-primary/90 hover:bg-primary cursor-pointer text-white px-4 py-2 rounded-lg"
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
