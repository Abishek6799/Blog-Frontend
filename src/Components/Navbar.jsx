import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand Section */}
        <Link to={"/"} className="text-3xl font-extrabold text-white tracking-wide uppercase hover:text-yellow-300 transition duration-300">
          Blog
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to={"/"}
            className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          {isAdmin && (
            <Link
              to={"/admin"}
              className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300"
            >
              Admin Panel
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link
                to={"/create"}
                className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300"
              >
                Create Blog
              </Link>
              <button
                onClick={handleLogout}
                className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
