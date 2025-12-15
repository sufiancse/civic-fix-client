import React from "react";

const BoostIssue = ({ issue }) => {
  const handleBoost = () => {
    console.log(issue);
  };
  return (
    <div>
      <button
        onClick={handleBoost}
        className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
      >
        Boost Priority
      </button>
    </div>
  );
};

export default BoostIssue;
