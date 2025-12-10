import React from "react";
import {
  FaBug,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaMoneyBillWave,
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

// ---------------- DUMMY DATA ----------------
const stats = [
  {
    title: "Total Issues",
    value: 128,
    icon: FaBug,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Pending Issues",
    value: 42,
    icon: FaClock,
    color: "from-yellow-400 to-yellow-500",
  },
  {
    title: "In Progress",
    value: 31,
    icon: FaSpinner,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Resolved",
    value: 55,
    icon: FaCheckCircle,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Total Payments",
    value: "৳ 32,500",
    icon: FaMoneyBillWave,
    color: "from-emerald-500 to-emerald-600",
  },
];

const barData = [
  { name: "Pending", count: 42 },
  { name: "In Progress", count: 31 },
  { name: "Resolved", count: 55 },
];

const pieData = [
  { name: "Pending", value: 42, color: "#FACC15" },
  { name: "In Progress", value: 31, color: "#8B5CF6" },
  { name: "Resolved", value: 55, color: "#22C55E" },
];

// ---------------- COMPONENT ----------------
export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          User Dashboard
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Overview of your issues & payments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-r ${item.color} text-white shadow-lg p-5 flex items-center justify-between`}
            >
              <div>
                <p className="text-sm opacity-90">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Icon className="text-2xl" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Issue Status (Bar Chart)
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#FACC15", "#8B5CF6", "#22C55E"][i]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Issue Distribution
          </h3>
          <div className="w-full h-72 flex flex-col sm:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
