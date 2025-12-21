import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpVote = ({ issue }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: userData = [] } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${user?.email}`);
      return res.data.result;
    },
  });

  const isBlocked = userData[0]?.isBlocked;

  const { mutate: upvoteIssue, isLoading } = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/api/issue/${issue._id}/upvote`, {
        userEmail: user?.email,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Upvote failed");
    },
  });

  const handleUpVote = () => {
    // blocked user
    if (isBlocked) {
      return toast.error("You are blocked and cannot upvote. Contact with authority!");
    }

    // not logged in
    if (!user) {
      toast.error("Please login to upvote");
      return navigate("/login");
    }

    // own issue
    if (issue?.issueBy === user.email) {
      return toast.error("You cannot upvote your own issue");
    }

    // already upvoted
    if (issue.upVotedBy?.includes(user.email)) {
      return toast.error("You already upvoted this issue");
    }

    upvoteIssue();
  };

  return (
    <div
      onClick={handleUpVote}
      className={`flex items-center gap-2 
        ${isBlocked || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <FaThumbsUp className="text-primary" />
      <span>{issue.upVotes}</span>
    </div>
  );
};

export default UpVote;