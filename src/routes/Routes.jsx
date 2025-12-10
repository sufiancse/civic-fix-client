import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Stuff/MyInventory";
import ManageOrders from "../pages/Dashboard/Stuff/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import AddIssue from "../pages/Dashboard/Stuff/AddIssue";
import AllIssues from "../pages/AllIssues/AllIssues";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import IssueDetailsPage from "../pages/IssueDetailsPage/IssueDetailsPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-issues",
        element: <AllIssues />,
      },
      {
        path: "/issue-details/:id",
        element: <IssueDetailsPage />,
      },
      {
        path: "/l",
        element: <LoadingSpinner />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />
      }
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-plant",
        element: (
          <PrivateRoute>
            <AddIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
