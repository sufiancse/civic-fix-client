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
const SideNav = () => {
  const { logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Dashboard"
        >
          {/* User icon */}
          <BiHome size={30}></BiHome>
          <span className="is-drawer-close:hidden">Dashboard</span>
        </NavLink>
      </li>
      {/*--------------------------- Admin */}
      <li>
        <NavLink
          to="/dashboard/manage-user"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Users"
        >
          {/* User icon */}
          <BiUser size={30}></BiUser>
          <span className="is-drawer-close:hidden">Manage Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/all-loans"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="All Loans"
        >
          {/* Money icon */}
          <BiMoney size={30}></BiMoney>
          <span className="is-drawer-close:hidden">All Loans</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/loan-application"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Loan Application"
        >
          {/* Newspaper icon */}
          <IoNewspaperOutline size={30}></IoNewspaperOutline>
          <span className="is-drawer-close:hidden">Loan Application</span>
        </NavLink>
      </li>

      {/*------------------- Manager */}
      <li>
        <NavLink
          to="/dashboard/manage-loan"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Loan"
        >
          <MdManageAccounts size={30}></MdManageAccounts>
          <span className="is-drawer-close:hidden">Manage Loan</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/approved-loan"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Approved Loan"
        >
          <BsFillBookmarkCheckFill size={30}></BsFillBookmarkCheckFill>
          <span className="is-drawer-close:hidden">Approved Loan</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pending-loan"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Pending Loan"
        >
          <MdOutlinePendingActions size={30}></MdOutlinePendingActions>
          <span className="is-drawer-close:hidden">Pending Loan</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/add-loan"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Add Loan"
        >
          <IoAddCircleSharp size={30}></IoAddCircleSharp>
          <span className="is-drawer-close:hidden">Add Loan</span>
        </NavLink>
      </li>
      {/*--------------------------- User */}
      <li>
        <NavLink
          to="/dashboard/my-loan"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Loan"
        >
          {/* Newspaper icon */}
          <GiReceiveMoney size={30}></GiReceiveMoney>
          <span className="is-drawer-close:hidden">My Loan</span>
        </NavLink>
      </li>
      {/* Profile */}
      <li>
        <NavLink
          to="/profile"
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
    <div className="flex flex-col items-baseline h-screen pt-18 pb-5 w-full bg-gray-200">
      <ul className="menu gap-4 w-full grow text-xl font-semibold">
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