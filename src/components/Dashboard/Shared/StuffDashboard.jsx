import React from "react";
import {
  FaTasks,
  FaCheckCircle,
  FaClipboardList,
  FaCalendarDay,
  FaChartLine,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// ================= DUMMY DATA =================
const stats = [
  {
    title: "Assigned Issues",
    value: 24,
    icon: FaClipboardList,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Resolved Issues",
    value: 17,
    icon: FaCheckCircle,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Today's Tasks",
    value: 5,
    icon: FaTasks,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Pending Tasks",
    value: 7,
    icon: FaCalendarDay,
    color: "from-yellow-400 to-yellow-500",
  },
];

const activityData = [
  { day: "Mon", assigned: 4, resolved: 2 },
  { day: "Tue", assigned: 6, resolved: 4 },
  { day: "Wed", assigned: 3, resolved: 3 },
  { day: "Thu", assigned: 8, resolved: 6 },
  { day: "Fri", assigned: 5, resolved: 2 },
  { day: "Sat", assigned: 2, resolved: 0 },
  { day: "Sun", assigned: 1, resolved: 0 },
];

const taskStatusData = [
  { name: "Completed", value: 17, color: "#22C55E" },
  { name: "In Progress", value: 8, color: "#3B82F6" },
  { name: "Pending", value: 6, color: "#FACC15" },
];

const priorityData = [
  { name: "Low", count: 10 },
  { name: "Medium", count: 9 },
  { name: "High", count: 5 },
];

// ================= COMPONENT =================
export default function StuffDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Stuff Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Monitor your assigned issues, tasks & performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`relative rounded-2xl p-5 text-white bg-linear-to-r ${item.color} shadow-lg overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Icon className="text-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-20 text-7xl">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-500" /> Weekly Issue Activity
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="assigned"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#22C55E"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Task Status Distribution
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={taskStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {taskStatusData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart - Extra Stats */}
      <div className="mt-6 bg-white rounded-2xl shadow-md p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Issue Priority Overview
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
