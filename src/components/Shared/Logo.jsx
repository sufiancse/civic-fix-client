import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <div className="navbar-start jost  w-fit">
        <Link
          to={"/"}
          className="btn border-none bg-transparent shadow-none text-3xl font-bold text-primary"
        >
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold">CF</span>
          </div>
          CivicFix
        </Link>
      </div>
    </div>
  );
};

export default Logo;