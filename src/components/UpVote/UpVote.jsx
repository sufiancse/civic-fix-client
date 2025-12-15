import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpVote = ({ issue }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: upvoteIssue, isLoading } = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/api/issue/${issue._id}/upvote`, {
        userEmail: user?.email,
      });
    },

    // instant UI update
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Upvote failed");
    },
  });

  const handleUpVote = () => {
    // not logged in
    if (!user) {
      toast.error("Please login to upvote");
      return navigate("/login");
    }

    // own issue
    if (issue?.issueBy === user.email) {
      return toast.error("You cannot upvote your own issue");
    }

    // already upvoted (UI level check)
    if (issue.upVotedBy?.includes(user.email)) {
      return toast.error("You already upvoted this issue");
    }

    upvoteIssue();
  };

  return (
    <div
      onClick={handleUpVote}
      className={`flex items-center gap-2 cursor-pointer
        ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <FaThumbsUp className="text-primary" />
      <span>{issue.upVotes}</span>
    </div>
  );
};

export default UpVote;
