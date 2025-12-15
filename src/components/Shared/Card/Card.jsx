import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaThumbsUp, FaMapMarkerAlt } from "react-icons/fa";
import UpVote from "../../UpVote/UpVote";

const Card = ({ issue }) => {
  const navigate = useNavigate();
  const loggedInUserId = 1; // Dummy current user ID

  // Upvote function
  const handleUpvote = (issueId) => {
    // const issue = issues.find((i) => i.id === issueId);
    // if (!loggedInUserId) {
    //   alert("Please login to upvote");
    //   navigate("/login");
    //   return;
    // }
    // if (issue.userId === loggedInUserId) {
    //   alert("You cannot upvote your own issue");
    //   return;
    // }
    // setIssues((prev) =>
    //   prev.map((i) => (i.id === issueId ? { ...i, upvotes: i.upvotes + 1 } : i))
    // );

    console.log(issueId);
  };
  return (
    <motion.div
      key={issue.id}
      className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col"
      whileHover={{ scale: 1.03 }}
    >
      {/* Issue Image */}
      <img
        src={issue?.image}
        alt={issue?.title}
        className="w-full h-48 object-cover"
      />

      {/* Issue Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {issue?.title}
          </h2>

          {/* Category */}
          <p className="text-sm text-gray-500 mb-2">{issue?.category}</p>

          {/* Status & Priority Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                issue.status === "Resolved"
                  ? "bg-green-100 text-green-800"
                  : issue.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {issue?.status}
            </span>

            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                issue?.isBoosted
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {issue?.isBoosted ? "High" : "Normal"}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <FaMapMarkerAlt /> {issue?.location}
          </div>
        </div>

        {/* Actions: Upvote & View Details */}
        <div className="flex justify-between items-center mt-4">
          {/* Upvote Button */}
         <UpVote issue={issue} />

          {/* View Details Button */}
          <button
            onClick={() => navigate(`/issue-details/${issue._id}`)}
            className="cursor-pointer px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
