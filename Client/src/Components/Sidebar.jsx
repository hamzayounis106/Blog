import React from "react";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar({ setCurrentView, handleLogout }) {
  return (
    <div className="w-[300px] max-h-full p-4 text-white bg-[#152036e7] flex flex-col items-start justify-start pt-8">
      <h2 className="mb-8 text-xl font-semibold ">Admin Dashboard</h2>
      <Link
        to="/admin/posts"
        className="flex items-center w-full  pl-5 p-3 mb-4 text-lg font-semibold transition-colors duration-200 bg-[#1F2937] rounded hover:bg-[#364760]"
        onClick={() => setCurrentView("posts")}
      >
        <FaClipboardList className="mr-2" />
        Posts
      </Link>
      <Link
        to="/admin/Users"
        className="flex items-center w-full  pl-5 p-3 mb-4 text-lg font-semibold transition-colors duration-200 bg-[#1F2937] rounded hover:bg-[#364760]"
        onClick={() => setCurrentView("users")}
      >
        <FaUsers className="mr-2" />
        Users
      </Link>
      <Link
        to="/admin/editProfile"
        className="flex items-center w-full  pl-5 p-3 mb-4 text-lg font-semibold transition-colors duration-200 bg-[#1F2937] rounded hover:bg-[#364760]"
        onClick={() => setCurrentView("editProfile")}
      >
        <FaUsers className="mr-2" />
        Edit Profile
      </Link>
      <Link
        to="/admin"
        className="flex items-center w-full  pl-5 p-3 mb-4 text-lg font-semibold transition-colors duration-200 bg-[#1F2937] rounded hover:bg-[#364760]"
        onClick={handleLogout}
      >
        <FaUsers className="mr-2" />
        Log Out
      </Link>
    </div>
  );
}

export default Sidebar;
