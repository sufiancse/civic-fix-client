import React from "react";

const DashFooter = () => {
  return (
    <footer className="bg-accent py-4 mt-10">
      <div className="text-center">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} CivicFix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default DashFooter;