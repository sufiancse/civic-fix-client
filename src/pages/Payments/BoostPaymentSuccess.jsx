import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const BoostPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios.post(
        `${import.meta.env.VITE_API_URL}/issue-boost-payment-success`,
        {
          sessionId,
        }
      );
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center mt-15">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
        <Link
          to={`/all-issues`}
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
        >
          View All Issues
        </Link>
      </div>
    </div>
  );
};

export default BoostPaymentSuccess;
