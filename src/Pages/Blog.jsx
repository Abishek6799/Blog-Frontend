import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/post/getpost");
      setBlogs(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (blog) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/blog", { state: blog });
    }
  };

  return (
    <div className="mx-auto py-12 px-6 md:px-16 lg:px-24  min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              className="bg-white p-6 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <p className="font-bold text-gray-600 mb-4">
                Author: {blog.user.name}
              </p>
              <button
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                onClick={() => handleSubmit(blog)}
              >
                View Blog
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
