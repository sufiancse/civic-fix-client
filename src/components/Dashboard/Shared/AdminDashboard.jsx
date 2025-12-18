import React from "react";
import {
  FaBug,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin-dashboard");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load dashboard</p>
    );
  }

  // ✅ SAFE: data available now
  const stats = [
    {
      title: "Total Issues",
      value: data.stats.totalIssues,
      icon: FaBug,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Resolved Issues",
      value: data.stats.resolvedIssues,
      icon: FaCheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Pending Issues",
      value: data.stats.pendingIssues,
      icon: FaClock,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      title: "Rejected Issues",
      value: data.stats.rejectedIssues,
      icon: FaTimesCircle,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Total Payments",
      value: `৳ ${data.stats.totalPayments}`,
      icon: FaMoneyBillWave,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Registered Users",
      value: data.stats.totalUsers,
      icon: FaUsers,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">
          System overview, latest activities & statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`rounded-2xl p-4 text-white bg-linear-to-r ${item.color} shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">{item.title}</p>
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Icon className="text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">Monthly Issues</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyIssues} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issues" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-4">
            Issue Status Distribution
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={data.issueStatusData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {data.issueStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center mt-4 gap-4">
            {data.issueStatusData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-sm">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Issues */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold mb-3">Latest Issues</h3>
          <ul className="space-y-2 text-sm">
            {data.latestIssues.map((issue) => (
              <li key={issue._id} className="flex justify-between">
                <span>{issue.title}</span>
                <span>{issue.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Payments */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold mb-3">Latest Payments</h3>
          <ul className="space-y-2 text-sm">
            {data.latestPayments.map((pay) => (
              <li key={pay._id} className="flex justify-between">
                <span>{pay.name}</span>
                <span>৳{pay.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Users */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold mb-3">Latest Users</h3>
          <ul className="space-y-2 text-sm">
            {data.latestUsers.map((user) => (
              <li key={user._id} className="flex justify-between">
                <span>{user.name}</span>
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
