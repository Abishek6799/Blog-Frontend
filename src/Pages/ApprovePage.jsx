import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";

const ApprovePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog, isAdmin } = location.state;

  if (!blog) {
    return <div>No blog details available</div>;
  }

  const approveBlog = async () => {
    try {
      const response = await api.patch(`/post/${blog._id}/approve`);
      toast.success(response.data.message);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve post");
    }
  };

  const rejectBlog = async () => {
    try {
      const response = await api.delete(`/post/delete/${blog._id}`);
      toast.success(response.data.message);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject post");
    }
  };

  return (
    <div className="mx-auto py-12 px-4 md:px-16 lg:px-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-contain mb-4 rounded-md"
      />
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      ></div>
      <p className="text-md font-bold mt-4">Author: {blog.user.name}</p>

      {isAdmin && (
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={approveBlog}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Approve
          </button>
          <button
            onClick={rejectBlog}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition duration-300"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ApprovePage;
