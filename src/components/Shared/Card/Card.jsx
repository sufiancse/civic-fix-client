import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import UpVote from "../../UpVote/UpVote";

const Card = ({ issue }) => {
  const navigate = useNavigate();

  return (
   <motion.div
  className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition flex flex-col overflow-hidden"
  whileHover={{ scale: 1.03 }}
>
  {/* Image */}
  <div className="relative">
    <img
      src={issue?.image}
      alt={issue?.title}
      className="w-full h-40 object-cover"
    />

    <span
      className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[11px] text-white font-semibold ${
        issue.status === "Rejected"
          ? "bg-red-600"
          : issue.status === "Resolved"
          ? "bg-green-600"
          : issue.status === "Pending"
          ? "bg-yellow-600"
          : "bg-blue-600"
      }`}
    >
      {issue?.status}
    </span>
  </div>

  {/* Content */}
  <div className="p-4 flex flex-col ">
    <h2 className="text-base font-semibold text-gray-900 line-clamp-2 capitalize">
      {issue?.title}
    </h2>

    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-500">{issue?.category}</span>

      <span
        className={`px-2 py-0.5 rounded-full font-medium ${
          issue?.isBoosted
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {issue?.isBoosted ? "High" : "Normal"}
      </span>
    </div>

    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-1 text-gray-500 text-xs">
        <FaMapMarkerAlt className="text-primary" />
        <span className="line-clamp-1 capitalize">{issue?.location}</span>
      </div>

      <UpVote issue={issue} />
    </div>

    <button
      onClick={() => navigate(`/issue-details/${issue._id}`)}
      className="mt-2 text-sm font-medium text-primary hover:underline self-end cursor-pointer"
    >
      View details →
    </button>
  </div>
</motion.div>

  );
};

export default Card;
