import React from "react";
import { BiDollar, BiHome, BiMoney, BiPowerOff, BiUser } from "react-icons/bi";
import { Navigate, NavLink } from "react-router";
import { IoAddCircleSharp, IoNewspaperOutline } from "react-icons/io5";
import { BsCashStack, BsFillBookmarkCheckFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdManageAccounts, MdOutlinePendingActions } from "react-icons/md";
import { RiAccountPinBoxFill } from "react-icons/ri";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import {
  FaClipboardCheck,
  FaClipboardList,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaPlusCircle,
  FaTasks,
  FaUserCog,
  FaUsers,
} from "react-icons/fa";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
const SideNav = () => {
  const { logOut } = useAuth();

  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;


  const links = (
    <>
      <li>
        <NavLink
          to="/dashboard/home"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Dashboard"
        >
          {/* User icon */}
          <BiHome size={30}></BiHome>
          <span className="is-drawer-close:hidden">Dashboard</span>
        </NavLink>
      </li>

      {/*--------------------------- Admin */}
      {role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/admin/all-issues"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="All Issues"
            >
              {/*  icon */}
              <FaClipboardCheck size={30}></FaClipboardCheck>
              <span className="is-drawer-close:hidden">All Issues</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/manage-users"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage Users"
            >
              {/*  icon */}
              <FaUsers size={30}></FaUsers>
              <span className="is-drawer-close:hidden">Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/manage-staff"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage Staff"
            >
              {/*  icon */}
              <FaUserCog size={30}></FaUserCog>
              <span className="is-drawer-close:hidden">Manage Staff</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/view-payments"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="View Payments"
            >
              {/*  icon */}
              <FaMoneyCheckAlt size={30}></FaMoneyCheckAlt>
              <span className="is-drawer-close:hidden">View Payments</span>
            </NavLink>
          </li>
        </>
      )}

      {/*------------------- Staff */}
      {role === "staff" && (
        <>
          <li>
            <NavLink
              to="/dashboard/staff/assigned-issues"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Assigned Issues"
            >
              <FaTasks size={30}></FaTasks>
              <span className="is-drawer-close:hidden">Assigned Issues</span>
            </NavLink>
          </li>
        </>
      )}

      {/*--------------------------- Citizen */}
      {role === "citizen" && (
        <>
          <li>
            <NavLink
              to="/dashboard/user/my-issues"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="My Issues"
            >
              {/* Newspaper icon */}
              <FaClipboardList size={30}></FaClipboardList>
              <span className="is-drawer-close:hidden">My Issues</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/report-issue"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Report an Issue"
            >
              <FaPlusCircle size={30}></FaPlusCircle>
              <span className="is-drawer-close:hidden">Report an Issue</span>
            </NavLink>
          </li>
        </>
      )}

      {/* Profile */}
      <li>
        <NavLink
          to="/dashboard/profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Profile"
        >
          {/* Profile icon */}
          <RiAccountPinBoxFill size={30} />
          <span className="is-drawer-close:hidden">My Profile</span>
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch(() => {
        toast.error("Logout failed");
      });
  };

  return (
    <div className="flex flex-col items-baseline  pt-18 pb-5 w-full bg-gray-200 h-screen">
      {/* h-screen */}
      <ul className="menu gap-4 w-full grow text-xl font-semibold flex flex-col h-full justify-center">
        {/* List item */}
        {links}
      </ul>
      <div className="flex flex-col gap-4 items-center justify-center w-full text-center">
        <button
          data-tip="Logout"
          className="btn btn-ghost tooltip tooltip-right"
          onClick={handleLogOut}
        >
          <BiPowerOff size={30}></BiPowerOff>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
