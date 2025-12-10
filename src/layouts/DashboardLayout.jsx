

import React from "react";
import { Outlet } from "react-router";
import DashNav from "../components/Dashboard/DashNav/DashNav";
import DashFooter from "../components/Dashboard/DashFooter/DashFooter";
import SideNav from "../components/Dashboard/SideNav/SideNav";
const DashboardLayout = () => {
  return (
    <>
      <div className="drawer lg:drawer-open arimo">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <DashNav></DashNav>
          {/* Page content here */}
          <div className="">
            <div className="mt-20 p-4 min-h-screen">
              <Outlet></Outlet>
            </div>
            <footer>
              <DashFooter></DashFooter>
            </footer>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full justify-center items-center flex-col bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <SideNav></SideNav>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;