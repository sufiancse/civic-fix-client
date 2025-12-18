import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import useAuth from "../../../hooks/useAuth";

export default function StuffDashboard() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["staffDashboard", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/staff-dashboard?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard.</p>;

  const { stats, charts } = data;

  const statItems = [
    {
      title: "Assigned Issues",
      value: stats.totalAssigned,
      icon: FaClipboardList,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Resolved Issues",
      value: stats.resolved,
      icon: FaCheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: FaTasks,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Tasks",
      value: stats.pending,
      icon: FaCalendarDay,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      title: "Today Assigned",
      value: stats.todayAssigned,
      icon: FaTasks,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Today Pending",
      value: stats.todayPending,
      icon: FaCalendarDay,
      color: "from-red-400 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Staff Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statItems.map((item, i) => {
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
        {/* Bar Chart */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Issue Priority Overview
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.priorityData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#6366F1" />
              </BarChart>
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
                  data={charts.taskStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {charts.taskStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend with title and value */}
          <div className="flex justify-around mt-4">
            {charts.taskStatusData.map((entry, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div
                  className="w-4 h-4 mb-1 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {entry.name}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
