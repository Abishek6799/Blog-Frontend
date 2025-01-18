import React, { useState } from "react";
import api from "../Services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    try {
      const response = await api.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="container mx-auto py-12 px-6 md:px-16 lg:px-24 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 shadow-lg rounded-lg p-10 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Create A New Blog</h2>
        
        {error && (
          <div className="bg-red-100 p-4 mb-6 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="title" className="block text-xl font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter your blog title"
            className="border border-gray-400 w-full p-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-xl font-semibold text-gray-700 mb-2">
            Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="border border-gray-400 w-full p-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-xl font-semibold text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-400 w-full p-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold py-3 px-12 rounded-xl shadow-xl hover:from-teal-500 hover:to-blue-700 transition duration-300"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
