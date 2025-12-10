import { useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaCamera } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

export default function ManageStaff() {
  // Dummy staff data
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@staff.com",
      phone: "0123456789",
      photo: null,
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara@staff.com",
      phone: "0987654321",
      photo: null,
    },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
    password: "",
  });
  const [preview, setPreview] = useState(null);

  // Open Add Modal
  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentStaff({
      name: "",
      email: "",
      phone: "",
      photo: null,
      password: "",
    });
    setPreview(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (staff) => {
    setIsEditMode(true);
    setCurrentStaff(staff);
    setPreview(staff.photo || null);
    setIsModalOpen(true);
  };

  // Handle photo preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentStaff({ ...currentStaff, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing staff
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === currentStaff.id ? { ...currentStaff } : s
        )
      );
    } else {
      // Add new staff
      setStaffList((prev) => [
        ...prev,
        { ...currentStaff, id: Date.now() },
      ]);
    }
    setIsModalOpen(false);
  };

  // Delete staff
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Staff</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaUserPlus /> Add Staff
        </button>
      </div>

      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {staff.photo ? (
                  <img
                    src={preview ? preview : URL.createObjectURL(staff.photo)}
                    alt="Staff"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <FaCamera />
                  </div>
                )}
              </td>
              <td className="p-3">{staff.name}</td>
              <td className="p-3">{staff.email}</td>
              <td className="p-3">{staff.phone}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => openEditModal(staff)}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(staff.id)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <Dialog.Panel className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {isEditMode ? "Update Staff" : "Add Staff"}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={currentStaff.name}
                onChange={(e) =>
                  setCurrentStaff({ ...currentStaff, name: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={currentStaff.email}
                onChange={(e) =>
                  setCurrentStaff({ ...currentStaff, email: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={currentStaff.phone}
                onChange={(e) =>
                  setCurrentStaff({ ...currentStaff, phone: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              {!isEditMode && (
                <input
                  type="password"
                  placeholder="Password"
                  value={currentStaff.password}
                  onChange={(e) =>
                    setCurrentStaff({ ...currentStaff, password: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              )}

              {/* Photo upload */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 mt-2 object-cover rounded-full"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
}
