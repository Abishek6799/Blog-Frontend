import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnapprovedPosts();
  }, []);

  const fetchUnapprovedPosts = async () => {
    try {
      const response = await api.get("/post/unapprovedpost");
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  const viewBlog = (blog) => {
    navigate("/approve", { state: { blog, isAdmin: true } });
  };

  return (
    <div className="mx-auto py-12 px-6 md:px-16 lg:px-24 min-h-screen">
      {error && (
        <div className="bg-red-100 p-4 mb-6 text-red-600 rounded-lg shadow-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {posts.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
            <p className="font-bold text-gray-600 mb-4">Author: {blog.user.name}</p>
            <button
              onClick={() => viewBlog(blog)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            >
              View Blog
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
