import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../../components/Shared/InvoicePDF/InvoicePdf";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ViewPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const axiosSecure = useAxiosSecure();

  // React Query for fetching payments
  const {
    data: payments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure("/api/payments");
      return res.data;
    },
  });

  // Filter & search
  const filteredPayments = payments.filter((p) => {
    const searchMatch =
      p?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p?.issueBoostedBy?.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      filterStatus === "all" || p.paymentType === filterStatus;

    return searchMatch && statusMatch;
  });

  // Monthly chart data
  const chartData = Object.values(
    payments.reduce((acc, p) => {
      const month = new Date(p.createAt).toLocaleString("default", {
        month: "short",
      });
      acc[month] = acc[month] || { month, amount: 0 };
      acc[month].amount += p.amount;
      return acc;
    }, {})
  );

  return (
    <div className="p-4 max-w-full">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Payments Dashboard
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-1/2 shadow-sm">
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
          className="border rounded-lg px-3 py-2 w-full md:w-1/4 shadow-sm"
        >
          <option value="all">All Payment Types</option>
          <option value="Subscription">Subscription</option>
          <option value="Boost Issue">Boost Issue</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                Payment Type
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                Amount (TK)
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                Status
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                Date
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                Invoice(PDF)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-red-500">
                  Failed to fetch payments.{" "}
                  <button onClick={refetch} className="underline text-blue-600">
                    Retry
                  </button>
                </td>
              </tr>
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No payments found.
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {p.email || p.issueBoostedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {p.paymentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {p.amount}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap font-semibold ${
                      p.paymentType === "Subscription"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    Success
                  </td>

                  {/* invoice pdf */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {new Date(p.createAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <PDFDownloadLink
                      document={<InvoicePDF payment={p} />}
                      fileName={`Invoice_${p._id}.pdf`}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition cursor-hover"
                    >
                      {({ loading }) => (loading ? "Loading..." : "Download")}
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Monthly Chart */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Monthly Payments (TK)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
