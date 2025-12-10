import { useState } from "react";
import { FaUser, FaCrown, FaLock, FaUnlock, FaSearch } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Abu Sufian",
      email: "sufian@email.com",
      subscription: "premium",
      isBlocked: false,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@email.com",
      subscription: "free",
      isBlocked: false,
    },
    {
      id: 3,
      name: "Sara Ahmed",
      email: "sara@email.com",
      subscription: "premium",
      isBlocked: true,
    },
    {
      id: 4,
      name: "Ali Khan",
      email: "ali@email.com",
      subscription: "free",
      isBlocked: false,
    },
  ]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubscription, setFilterSubscription] = useState("all");

  const toggleBlock = (userId) => {
    const user = users.find((u) => u.id === userId);
    const action = user.isBlocked ? "unblock" : "block";

    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
    }
  };

  // Filtered & searched users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubscription =
      filterSubscription === "all" || user.subscription === filterSubscription;

    return matchesSearch && matchesSubscription;
  });

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <select
          value={filterSubscription}
          onChange={(e) => setFilterSubscription(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/4"
        >
          <option value="all">All Users</option>
          <option value="free">Free Users</option>
          <option value="premium">Premium Users</option>
        </select>
      </div>

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
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className={`border-b hover:bg-gray-50 ${
                user.isBlocked ? "bg-red-50" : ""
              }`}
            >
              <td className="p-3 flex items-center gap-2">
                <FaUser className="text-gray-500" /> {user.name}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {user.subscription === "premium" ? (
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
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => toggleBlock(user.id)}
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
          {filteredUsers.length === 0 && (
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
