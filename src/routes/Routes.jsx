import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetailsPage from "../pages/IssueDetailsPage/IssueDetailsPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import DashboardHome from "../pages/Dashboard/Common/DashboardHome";
import AllIssuesAdminPage from "../pages/Dashboard/Admin/AllIssuesAdminPage";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
import ViewPayments from "../pages/Dashboard/Admin/ViewPayments";
import AssignedIssues from "../pages/Dashboard/Stuff/AssignedIssues";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import ReportIssue from "../pages/Dashboard/Citizen/ReportIssue";
import Profile from "../pages/Dashboard/Common/Profile";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import BoostPaymentSuccess from "../pages/Payments/BoostPaymentSuccess";
import StaffRoute from "./StaffRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

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
        element: (
          <PrivateRoute>
            <IssueDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/issue-boost-payment-success",
        element: (
          <PrivateRoute>
            <BoostPaymentSuccess />
          </PrivateRoute>
        ),
      },
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
        path: "home",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // admin only routes
      {
        path: "admin/all-issues",
        element: (
          <AdminRoute>
            <AllIssuesAdminPage />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-staff",
        element: (
          <AdminRoute>
            <ManageStaff />
          </AdminRoute>
        ),
      },
      {
        path: "admin/view-payments",
        element: (
          <AdminRoute>
            <ViewPayments />
          </AdminRoute>
        ),
      },

      // stuff only routes
      {
        path: "staff/assigned-issues",
        element: (
          <StaffRoute>
            <AssignedIssues />
          </StaffRoute>
        ),
      },

      //users only routes
      {
        path: "user/my-issues",
        element: (
          <UserRoute>
            <MyIssues />
          </UserRoute>
        ),
      },
      {
        path: "user/report-issue",
        element: (
          <UserRoute>
            <ReportIssue />
          </UserRoute>
        ),
      },
    ],
  },
]);
