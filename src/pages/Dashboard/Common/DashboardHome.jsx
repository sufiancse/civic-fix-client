import AdminDashboard from "../../../components/Dashboard/Shared/AdminDashboard";
import StuffDashboard from "../../../components/Dashboard/Shared/StuffDashboard";
import UserDashboard from "../../../components/Dashboard/Shared/UserDashboard";

const DashboardHome = () => {
  return (
    <div>
   
      <UserDashboard />
      <AdminDashboard />
      <StuffDashboard />
    </div>
  );
};

export default DashboardHome;
