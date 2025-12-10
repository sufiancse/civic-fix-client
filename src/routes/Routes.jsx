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
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      
    ],
  },
]);
