import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const DeleteIssue = ({ issue }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const deleteMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      return axiosSecure.delete(`/api/issue/${id}/delete`, {
        data: { email },
      });
    },
    onSuccess: () => {
      toast.success("Issue delete successfully");

      navigate("/all-issues");
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this issue?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmed",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ id: issue._id, email: user?.email });
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
    >
      <FaTrash /> Delete
    </button>
  );
};

export default DeleteIssue;
