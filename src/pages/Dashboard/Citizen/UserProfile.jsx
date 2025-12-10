import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaCrown,
  FaEdit,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function UserProfile() {

  // ✅ Dummy user data
  const [user, setUser] = useState({
    name: "Abu Sufian",
    email: "sufian@email.com",
    phone: "+880 17xxxxxxx",
    status: "free", // free | premium
    isBlocked: true,
  });

  const handleSubscribe = () => {
    alert("✅ Payment Successful (Dummy)");
    setUser({ ...user, role: "premium" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 🔴 Blocked Warning */}
      {user.isBlocked && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
          <FaExclamationTriangle className="text-xl mt-0.5" />
          <div>
            <p className="font-semibold">Your account is blocked</p>
            <p className="text-sm">
              Please contact the concerned authority for resolution.
            </p>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-6xl" />
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {user.name}
                {user.role === "premium" && (
                  <span className="flex items-center gap-1 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                    <FaCrown /> Premium
                  </span>
                )}
              </h2>
              <p className="text-sm opacity-90">{user.email}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm">
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Personal Information
            </h3>

            <div className="flex items-center gap-3 text-sm">
              <FaEnvelope className="text-gray-500" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaPhoneAlt className="text-gray-500" />
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaCheckCircle className="text-green-500" />
              <span>
                Account Status:{" "}
                {user.role === "premium" ? "Premium User" : "Free User"}
              </span>
            </div>
          </div>

          {/* Subscription Box */}
          <div className="bg-gray-50 rounded-2xl p-5 border text-center">
            <h3 className="font-semibold text-gray-700 mb-2">
              Subscription Status
            </h3>

            {user.status === "free" ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Free users can submit only 3 issues.  
                  Upgrade to premium for unlimited access.
                </p>
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                  Subscribe for ৳1000
                </button>
              </>
            ) : (
              <div className="text-green-600 font-medium flex items-center justify-center gap-2">
                <FaCrown />
                You are a Premium User
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
