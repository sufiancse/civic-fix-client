import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-primary font-semibold" : `${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;