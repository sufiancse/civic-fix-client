import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaBolt } from "react-icons/fa";

const BoostIssue = ({ issue }) => {

  const {user} = useAuth()

  const handleBoost = async () => {
    const paymentInfo = {
      issueId: issue._id,
      issueTitle: issue.title,
      issueReportedBy: issue.issueBy,
      issueBoostedBy: user?.email,
      price: 100,
    };

    console.log(paymentInfo);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-issue-boost-checkout-session`,
      paymentInfo
    );
    window.location.href = data?.url;
  };
  return (
    <div>
      <button
        onClick={handleBoost}
        className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
      >
      <FaBolt />  Boost Priority
      </button>
    </div>
  );
};

export default BoostIssue;
