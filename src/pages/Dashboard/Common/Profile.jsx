import React from "react";
import UserProfile from "../Citizen/UserProfile";
import AdminProfile from "../Admin/AdminProfile";
import StuffProfile from "../Stuff/StuffProfile";

const Profile = () => {
  return (
    <div>
      <AdminProfile />
      <UserProfile />
      <StuffProfile />
    </div>
  );
};

export default Profile;
