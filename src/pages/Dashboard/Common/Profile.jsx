import React from "react";
import UserProfile from "../Citizen/UserProfile";
import AdminProfile from "../Admin/AdminProfile";
import StaffProfile from "../Stuff/StaffProfile";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
const Profile = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <div>
      {role === "citizen" && <UserProfile />}
      {role === "admin" && <AdminProfile />}
      {role === "staff" && <StaffProfile />}
    </div>
  );
};

export default Profile;
