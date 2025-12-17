import React from "react";
import UserProfile from "../Citizen/UserProfile";
import AdminProfile from "../Admin/AdminProfile";
import StaffProfile from "../Stuff/StaffProfile";
const Profile = () => {
  return (
    <div>
      <AdminProfile />
      <UserProfile />
      <StaffProfile />
    </div>
  );
};

export default Profile;
