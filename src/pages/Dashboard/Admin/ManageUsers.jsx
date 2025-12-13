import { FaUser, FaCrown, FaLock, FaUnlock, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUserData"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?role=citizen`);
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  // Block/Unblock Mutation
  const { mutateAsync: toggleBlock } = useMutation({
    mutationFn: async (user) => {
      const res = await axiosSecure.patch(`/api/user/${user._id}/block`);
      return res.data; // { message, isBlocked }
    },
    onSuccess: (_, user) => {
      // Query invalidate to refresh users list
      queryClient.invalidateQueries(["allUserData"]);
      toast.success(
        `${
          user.isBlocked
            ? `Unblock ${user.name} successfully`
            : `Block ${user.name} successfully`
        }`
      );
    },
    onError: (error) => {
      console.error("Block/unblock failed:", error);
    },
  });

  const handleToggleBlock = async (user) => {
    Swal.fire({
      title: `${
        user.isBlocked ? `Unlock ${user.name}?` : `Block ${user.name}?`
      }`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmed",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleBlock(user);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Users Table */}
      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Subscription</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={`border-b hover:bg-gray-50 ${
                user.isBlocked ? "bg-red-50" : ""
              }`}
            >
              <td className="p-3 flex items-center gap-2">
                <img
                  src={user?.image}
                  alt="User"
                  className="w-10 object-cover rounded-full"
                />
                {user.name}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {user.isPremium ? (
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <FaCrown /> Premium
                  </span>
                ) : (
                  <span className="text-gray-500 font-medium">Free</span>
                )}
              </td>
              <td className="p-3">
                {user.isBlocked ? (
                  <span className="text-red-600 font-semibold">Blocked</span>
                ) : (
                  <span className="text-green-600 font-semibold">Active</span>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleToggleBlock(user)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white text-sm ${
                    user.isBlocked
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.isBlocked ? (
                    <>
                      <FaUnlock /> Unblock
                    </>
                  ) : (
                    <>
                      <FaLock /> Block
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500 font-medium"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
