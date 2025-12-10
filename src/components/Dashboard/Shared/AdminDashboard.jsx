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
  LineChart,
  Line,
} from "recharts";

// ================= DUMMY DATA =================
const stats = [
  {
    title: "Total Issues",
    value: 342,
    icon: FaBug,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Resolved Issues",
    value: 198,
    icon: FaCheckCircle,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Pending Issues",
    value: 96,
    icon: FaClock,
    color: "from-yellow-400 to-yellow-500",
  },
  {
    title: "Rejected Issues",
    value: 48,
    icon: FaTimesCircle,
    color: "from-red-500 to-red-600",
  },
  {
    title: "Total Payments",
    value: "৳ 1,25,000",
    icon: FaMoneyBillWave,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Registered Users",
    value: 512,
    icon: FaUsers,
    color: "from-indigo-500 to-indigo-600",
  },
];

const issueStatusData = [
  { name: "Resolved", value: 198, color: "#22C55E" },
  { name: "Pending", value: 96, color: "#FACC15" },
  { name: "Rejected", value: 48, color: "#EF4444" },
];

const monthlyIssues = [
  { month: "Jan", issues: 28 },
  { month: "Feb", issues: 35 },
  { month: "Mar", issues: 42 },
  { month: "Apr", issues: 50 },
  { month: "May", issues: 63 },
  { month: "Jun", issues: 74 },
];

const latestIssues = [
  { id: 1, title: "Water leakage", status: "Pending", date: "2025-01-10" },
  { id: 2, title: "Broken street light", status: "Resolved", date: "2025-01-09" },
  { id: 3, title: "Road damage", status: "Rejected", date: "2025-01-08" },
];

const latestPayments = [
  { id: 1, user: "Rahim", amount: "৳1200", date: "2025-01-10" },
  { id: 2, user: "Karim", amount: "৳800", date: "2025-01-09" },
  { id: 3, user: "Sadia", amount: "৳1500", date: "2025-01-08" },
];

const latestUsers = [
  { id: 1, name: "Rahim Ahmed", email: "rahim@gmail.com" },
  { id: 2, name: "Sadia Khan", email: "sadia@gmail.com" },
  { id: 3, name: "Jahid Hasan", email: "jahid@gmail.com" },
];

// ================= COMPONENT =================
export default function AdminDashboard() {
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
              className={`rounded-2xl p-4 text-white bg-linear-to-r ${item.color} shadow-lg relative overflow-hidden`}
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
              <BarChart data={monthlyIssues} barSize={40}>
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
          <h3 className="text-lg font-semibold mb-4">Issue Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={issueStatusData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {issueStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Latest Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Issues */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold mb-3">Latest Issues</h3>
          <ul className="space-y-3">
            {latestIssues.map((issue) => (
              <li key={issue.id} className="flex justify-between text-sm">
                <span>{issue.title}</span>
                <span className="text-gray-500">{issue.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Payments */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold mb-3">Latest Payments</h3>
          <ul className="space-y-3 text-sm">
            {latestPayments.map((pay) => (
              <li key={pay.id} className="flex justify-between">
                <span>{pay.user}</span>
                <span className="font-medium">{pay.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Users */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold mb-3">Latest Users</h3>
          <ul className="space-y-3 text-sm">
            {latestUsers.map((user) => (
              <li key={user.id} className="flex justify-between">
                <span>{user.name}</span>
                <span className="text-gray-500">{user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
