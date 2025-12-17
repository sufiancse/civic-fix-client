import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import AllIssues from "../pages/AllIssues/AllIssues";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
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
        element: <ContactUs />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/issue-boost-payment-success",
        element: <BoostPaymentSuccess />
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
        element: <AllIssuesAdminPage />,
      },
      {
        path: "admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "admin/manage-staff",
        element: <ManageStaff />,
      },
      {
        path: "admin/view-payments",
        element: <ViewPayments />,
      },

      // stuff only routes
      {
        path: "stuff/assigned-issues",
        element: <AssignedIssues />,
      },

      //users only routes
      {
        path: "user/my-issues",
        element: <MyIssues />,
      },
      {
        path: "user/report-issue",
        element: <ReportIssue />,
      },
    ],
  },
]);
