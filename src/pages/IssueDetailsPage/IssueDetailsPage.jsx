
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaBolt } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import UpVote from "../../components/UpVote/UpVote";
import BoostIssue from "../../components/BoostIssue/BoostIssue";

export default function IssueDetailsPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { id } = useParams();

  const { data: issueData = [], isLoading } = useQuery({
    queryKey: ["issueDetails"],
    queryFn: async () => {
      const res = await axiosSecure(`/api/issue/${id}`);
      return res.data;
    },
  });

  const issue = issueData?.result;
  const timeLines = issueData?.timeLine;

  const handleEdit = () => alert("Edit issue (open form/modal)");
  const handleDelete = () => alert("Delete issue (confirm dialog)");
  

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <title>CivicFix | Issue Details</title>
      {/* Issue Card */}
      <motion.div
        className={`rounded-xl overflow-hidden mb-6 shadow-lg ${
          issue?.isBoosted
            ? "border-4 border-red-500"
            : "border border-gray-200"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={issue?.image}
          alt={issue?.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h1
              className={`text-2xl font-bold ${
                issue?.isBoosted ? "text-red-600" : "text-primary"
              }`}
            >
              {issue.title}
            </h1>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <motion.span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  issue?.status === "Rejected"
                    ? "bg-red-500"
                    : issue?.status === "Pending"
                    ? "bg-yellow-500"
                    : issue?.status === "In-Progress"
                    ? "bg-blue-500"
                    : issue?.status === "Resolved"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {issue?.status}
              </motion.span>
              <motion.span
                className={`px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${
                  issue?.isBoosted ? "bg-red-600 shadow-lg" : "bg-gray-400"
                }`}
                animate={{ rotate: issue.boosted ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaBolt /> {issue?.isBoosted ? "High" : "Normal"}
              </motion.span>
            </div>
          </div>

          <p className="text-gray-600">
            <strong>Category:</strong> {issue?.category}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {issue?.location}
          </p>

          <div className="flex items-center justify-between">
            {/* upvote */}

            <UpVote issue={issue} />

            <div className="flex gap-2">
              {user?.email === issue?.issueBy &&
                issue?.status === "Pending" && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              {user?.email === issue?.issueBy && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              )}
              {!issue.isBoosted && (
                <BoostIssue issue={issue} />
              )}
            </div>
          </div>

          {/* Staff Info */}
          {issue?.assignedStaff && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <h2 className="font-semibold text-lg mb-1">Assigned Staff</h2>
              <p>
                <strong>Name:</strong> {issue?.assignedStaff}
              </p>
              <p>
                <strong>Email:</strong> {issue?.assignedStaffEmail}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stepper Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">Issue Timeline</h2>
        <div className="flex flex-col relative">
          {timeLines?.map((item) => (
            <div key={item._id} className="flex items-start mb-8 last:mb-0">
              {/* Vertical Line */}
              <div className="flex flex-col items-center mr-4">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center z-10">
                  <AiFillClockCircle />
                </span>
                {!timeLines?.length && (
                  <div className="w-1 h-full bg-gray-300"></div>
                )}
              </div>
              {/* Timeline Content */}
              <motion.div
                className="bg-gray-50 p-4 rounded-md shadow-sm flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 * 0.2 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      item?.status === "Rejected"
                        ? "bg-red-500"
                        : item?.status === "Pending"
                        ? "bg-yellow-500"
                        : item?.status === "In-Progress"
                        ? "bg-blue-500"
                        : item?.status === "Resolved"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {item?.status}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(item?.createAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{item?.message}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Updated by: {item?.updatedBy}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
