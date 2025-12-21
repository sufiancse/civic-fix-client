import axios from "axios";
import React, { use } from "react";
import useAuth from "../../hooks/useAuth";
import { FaBolt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BoostIssue = ({ issue }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = [] } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/api/users?email=${user?.email}`);
      return res.data.result;
    },
  });

  const isBlocked = userData[0]?.isBlocked;

  const handleBoost = async () => {
     // blocked user
    if (isBlocked) {
      return toast.error("You are blocked and cannot boost priority. Contact with authority!");
    }
    const paymentInfo = {
      issueId: issue._id,
      issueTitle: issue.title,
      issueReportedBy: issue.issueBy,
      issueBoostedBy: user?.email,
      price: 100,
    };

    Swal.fire({
      title: "Boost Priority for 100 Tk",
      text: "Confirm to boost this issue's priority. This action cannot be undone!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Boost Now!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.post(
            `${
              import.meta.env.VITE_API_URL
            }/create-issue-boost-checkout-session`,
            paymentInfo
          );
          window.location.href = data?.url;
        } catch (error) {
          Swal.fire({
            title: "Payment Failed",
            text: "Something went wrong while processing your boost. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleBoost}
        className={`flex items-center gap-1 px-3 py-2 rounded-md  text-white transition ${
          isBlocked
            ? "bg-gray-400 cursor-not-allowed"
            : "cursor-pointer bg-green-500  hover:bg-green-600"
        }`}
      >
        <FaBolt /> Boost Priority
      </button>
    </div>
  );
};

export default BoostIssue;
