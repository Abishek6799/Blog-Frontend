import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Services/api"; 
import { toast } from "react-toastify"; 

const BlogPage = () => {
  const location = useLocation();
  const blog = location.state;
  const isAdmin = localStorage.getItem("role") === "admin";
  const navigate = useNavigate();

  if (!blog) {
    return <div>No blog details available</div>;
  }


  const handleDelete = async () => {
    try {
      const response = await api.delete(`/post/delete/${blog._id}`);
      toast.success(response.data.message);
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <div className="mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-contain mb-4"
      />
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      ></div>
      <p className="text-md font-bold">Author: {blog.user.name}</p>
      {isAdmin && (
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
