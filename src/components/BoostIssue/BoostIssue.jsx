import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaBolt } from "react-icons/fa";
import Swal from "sweetalert2";

const BoostIssue = ({ issue }) => {
  const { user } = useAuth();

  const handleBoost = async () => {
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
          `${import.meta.env.VITE_API_URL}/create-issue-boost-checkout-session`,
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
        className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
      >
        <FaBolt /> Boost Priority
      </button>
    </div>
  );
};

export default BoostIssue;
