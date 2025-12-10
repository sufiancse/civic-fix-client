import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ViewPayments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      user: "Abu Sufian",
      email: "sufian@email.com",
      subscription: "Premium",
      amount: 1000,
      status: "Success",
      date: "2025-12-01",
    },
    {
      id: 2,
      user: "John Doe",
      email: "john@email.com",
      subscription: "Free",
      amount: 0,
      status: "Success",
      date: "2025-12-03",
    },
    {
      id: 3,
      user: "Sara Ahmed",
      email: "sara@email.com",
      subscription: "Premium",
      amount: 1000,
      status: "Pending",
      date: "2025-12-05",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filtered & searched payments
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Dummy monthly chart data
  const chartData = [
    { month: "Jan", amount: 2000 },
    { month: "Feb", amount: 1500 },
    { month: "Mar", amount: 3000 },
    { month: "Apr", amount: 1000 },
    { month: "May", amount: 2500 },
    { month: "Jun", amount: 2000 },
    { month: "Jul", amount: 3500 },
    { month: "Aug", amount: 3000 },
    { month: "Sep", amount: 4000 },
    { month: "Oct", amount: 2500 },
    { month: "Nov", amount: 3000 },
    { month: "Dec", amount: 4500 },
  ];

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by user or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/4"
        >
          <option value="all">All Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payments Table */}
      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">User</th>
            <th className="p-3">Email</th>
            <th className="p-3">Subscription</th>
            <th className="p-3">Amount (TK)</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.user}</td>
              <td className="p-3">{p.email}</td>
              <td className="p-3">{p.subscription}</td>
              <td className="p-3">{p.amount}</td>
              <td
                className={`p-3 font-semibold ${
                  p.status === "Success"
                    ? "text-green-600"
                    : p.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {p.status}
              </td>
              <td className="p-3">{p.date}</td>
            </tr>
          ))}
          {filteredPayments.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Optional Chart */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Monthly Payments (TK)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
