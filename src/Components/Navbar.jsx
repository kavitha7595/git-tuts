import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-gray-900 text-white px-8 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* LEFT: Title */}
        <div className="text-2xl font-bold tracking-wide text-cyan-300">
          Student Management System
        </div>

        {/* RIGHT: Navigation Links */}
        <div className="flex gap-8 text-sm md:text-base font-semibold items-center">
          <Link
            to="/"
            className={`hover:text-cyan-400 transition duration-300 ${
              isActive("/") ? "text-cyan-400 underline underline-offset-4" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/reports"
            className={`hover:text-cyan-400 transition duration-300 ${
              isActive("/reports") ? "text-cyan-400 underline underline-offset-4" : ""
            }`}
          >
            Reports
          </Link>

          <Link
            to="/add-student"
            className={`hover:text-cyan-400 transition duration-300 ${
              isActive("/add-student") ? "text-cyan-400 underline underline-offset-4" : ""
            }`}
          >
            Add Student
          </Link>

          <Link
            to="/login"
            className="text-red-400 hover:text-red-500 transition duration-300"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
