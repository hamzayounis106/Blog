import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaHome,
  FaCaretDown,
} from "react-icons/fa";
import axios from "axios";
import { Menu } from "@headlessui/react";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://blog-api-three-psi.vercel.app/user/CheckAuth",{ withCredentials: true });
        setIsLoggedIn(res.status === 200 || res.status === 201);
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };
    checkAuth();
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.post("https://blog-api-three-psi.vercel.app/auth/logout", {}, { withCredentials: true });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 text-white bg-gray-800">
      <Link to="/" className="flex items-center">
        <FaHome className="text-2xl" />
        <span className="ml-2 text-lg font-semibold">GupShap</span>
      </Link>
      <nav className="items-center hidden space-x-4 md:flex">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About
        </Link>
        {isLoggedIn && (
          <Link to="/create-post" className="hover:text-gray-300">
            Upload Post
          </Link>
        )}
      </nav>
      <div>
        {isLoggedIn ? (
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center hover:text-gray-300">
              <FaUserCircle className="text-xl" />
              <span className="hidden ml-1 md:block">Profile</span>
              <FaCaretDown className="ml-1" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/edit-profile"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Edit Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/my-posts"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      My Posts
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/saved-posts"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Saved Posts
                    </Link>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogOut}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        ) : (
          <div className="flex items-center space-x-3">
            <Link to="/login" className="flex items-center hover:text-gray-300">
              <FaSignInAlt className="text-xl" />
              <span className="hidden ml-1 md:block">Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center hover:text-gray-300"
            >
              <FaUserPlus className="text-xl" />
              <span className="hidden ml-1 md:block">Register</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
