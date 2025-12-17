import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={ ({ isActive }) =>
        isActive ? "text-primary font-semibold flex items-center justify-center gap-1" : `flex items-center justify-center gap-1 ${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;