import AdminDashboard from "../../../components/Dashboard/Shared/AdminDashboard";
import StuffDashboard from "../../../components/Dashboard/Shared/StuffDashboard";
import UserDashboard from "../../../components/Dashboard/Shared/UserDashboard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";

const DashboardHome = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <div>
      {role === "citizen" && <UserDashboard />}
      {role === "admin" && <AdminDashboard />}
      {role === "staff" && <StuffDashboard />}
    </div>
  );
};

export default DashboardHome;
