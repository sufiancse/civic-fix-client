import { useState } from "react";
import { FaFilter, FaTasks, FaExclamationCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

export default function AssignedPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const { data: assignedIssues = [], isLoading } = useQuery({
    queryKey: ["AssignedIssues", user?.email, filterStatus, filterPriority],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/all-issues?assignedStaffEmail=${user?.email}&status=${filterStatus}&priority=${filterPriority}`
      );
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: ({ id, newStatus }) =>
      axiosSecure.patch(`/api/issues/${id}/status`, {
        newStatus,
        changedBy: user.email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["AssignedIssues", user.email]);
      toast.success("Status change successful.");
    },
  });

  const STATUS_FLOW = {
    Pending: ["In-progress"],
    "In-progress": ["Working"],
    Working: ["Resolved"],
    Resolved: ["Closed"],
  };

  const handleStatusChange = (id, newStatus) => {
    statusMutation.mutate({ id, newStatus });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Assigned Issues</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In-progress">In-progress</option>
            <option value="Working">Working</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-gray-500" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Issues Table */}
      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedIssues.map((issue) => (
            <tr key={issue._id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {issue.isBoosted && (
                  <span className="text-xs text-white bg-red-500 px-2 py-1 rounded mr-2">
                    Boosted
                  </span>
                )}
                {issue.title}
              </td>
              <td className="p-3">{issue.category}</td>

              <td
                className={`p-3 font-semibold ${
                  issue.isBoosted ? "text-red-600" : "text-gray-600"
                }`}
              >
                {issue.isBoosted ? "High" : "Normal"}
              </td>

              <td className="p-3">{issue.status}</td>
              <td className="p-3">
                {issue.status === "Rejected"? <span className=" text-red-500 font-bold">Rejected Issue</span> :issue.status !== "Closed" && (
                  <select
                    defaultValue=""
                    onChange={(e) =>
                      handleStatusChange(issue._id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="" disabled>
                      Change Status
                    </option>

                    {STATUS_FLOW[issue.status]?.map((nextStatus) => (
                      <option key={nextStatus} value={nextStatus}>
                        {nextStatus}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
          {assignedIssues.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No issues found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
