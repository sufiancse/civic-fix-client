import { useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaCamera } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../../../../utils";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

export default function ManageStaff() {
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserProfile } = useAuth();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useQuery fo fetching data
  const {
    data: staffList = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["staffList"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?role=staff`);
      return res.data;
    },
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({});
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  // Open Add Modal
  const openAddModal = () => {
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (staff) => {
    setCurrentStaff(staff);
    setUpdateIsModalOpen(true);
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedStaffData) => {
      return axiosSecure.patch(
        `/api/staff/${currentStaff._id}/update`,
        updatedStaffData
      );
    },
    onSuccess: () => {
      toast.success("Staff update successfully.");

      refetch();

      setIsModalOpen(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/api/staff/${id}/delete`);
    },
    onSuccess: () => {
      toast.success("Staff delete successfully");

      refetch();
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const image = e.target.image.files[0];

    try {
      // upload image for hosting using img bb
      const imageURL = await imageUpload(image);

      // ===== DUMMY DB SAVE =====
      const updatedStaffData = {
        name,
        phone,
        image: imageURL,
      };

      updateMutation.mutate(updatedStaffData);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }

    setUpdateIsModalOpen(false);
  };

  // Submit form
  const onSubmit = async (data) => {
    const { name, image, email, phone, password } = data;
    const imageFile = image[0];

    try {
      // upload image for hosting using img bb
      const imageURL = await imageUpload(imageFile);

      // User Registration
      await createUser(email, password);

      // userData for save in DB
      const userData = {
        name,
        email,
        image: imageURL,
        phone: Number(phone),
        role: "staff",
        status: "available",
      };

      // Add new staff
      await saveOrUpdateUser(userData);

      // Save username & profile photo
      // await updateUserProfile(name, imageURL);

      toast.success("Staff create successful");

      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }

    setIsModalOpen(false);
  };

  // Delete staff
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this staff?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmed",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Manage Staff</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <FaUserPlus /> Add Staff
        </button>
      </div>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
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
              <tr key={staff._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {staff.image ? (
                    <img
                      src={staff.image}
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
                <td className="p-3 flex gap-2 mt-3">
                  <button
                    onClick={() => openEditModal(staff)}
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg cursor-pointer text-sm"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg cursor-pointer text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {staffList.map((staff) => (
          <div
            key={staff._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col  gap-3"
          >
            <div className="flex items-center justify-around gap-13">
              {staff.image ? (
                <img
                  src={staff.image}
                  alt="Staff"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <FaCamera />
                </div>
              )}
              <div>
                <p className="font-semibold">{staff.name}</p>
                <p className="text-sm text-gray-600">{staff.email}</p>
                <p className="text-sm text-gray-600">{staff.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(staff)}
                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
              >
                <FaEdit /> Update
              </button>
              <button
                onClick={() => handleDelete(staff._id)}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isUpdateModalOpen && (
        <Dialog
          open={isUpdateModalOpen}
          onClose={() => setUpdateIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <Dialog.Panel className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Update Staff
            </Dialog.Title>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={currentStaff?.name}
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                defaultValue={currentStaff?.email}
                readOnly
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                defaultValue={currentStaff?.phone}
                className="w-full border rounded-lg p-2"
                required
              />

              {/* Photo upload */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUpdateIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      )}

      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <Dialog.Panel className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add Staff
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded-lg p-2"
                required
                {...register("name")}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg p-2"
                required
                {...register("email")}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full border rounded-lg p-2"
                required
                {...register("phone")}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg p-2"
                required
                {...register("password")}
              />

              {/* Photo upload */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  {...register("image")}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
}
