import React, { useState } from "react";
import axios from "axios";
import LeftBottomPopUp from "./LeftBottomPopUp";

function UpdateAdminProfile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const dataToSubmit = {};
  const autoClosePopup = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handleAdminUpdate = async (e) => {
    e.preventDefault();
    if (
      email === "" &&
      username === "" &&
      password === "" &&
      currentPassword === ""
    ) {
      setMessage("Please fill all the fields");
      setMessageType("red");
      autoClosePopup();
      return;
    }
    if (!currentPassword == "" && !password == "") {
      if (currentPassword === password) {
        setMessage("New password can't be same as current password");
        setMessageType("red");
        autoClosePopup();
        return;
      }
    } else if (currentPassword !== "" && password === "") {
      setMessage("Please fill the new password field");
      setMessageType("red");
      autoClosePopup();
      return;
    } else if (currentPassword === "" && password !== "") {
      setMessage("Please fill the current password field");
      setMessageType("red");
      autoClosePopup();
      return;
    }
    if (email !== "") dataToSubmit.email = email;
    if (username !== "") dataToSubmit.username = username;
    if (password !== "") dataToSubmit.password = password;
    if (currentPassword !== "") dataToSubmit.currentPassword = currentPassword;
    console.log(dataToSubmit);
    try {
      const response = await axios.post(
        "https://blog-api-three-psi.vercel.app/admin/adminUpdate",
        dataToSubmit,
        { withCredentials: true }
      );
      setMessage("Profile updated successfully");
      setMessageType("green");
      autoClosePopup();
      try {
 await axios.post("https://blog-api-three-psi.vercel.app/admin/adminLogout", {
          withCredentials: true,
        });
        setMessage("Logout successful");
        setMessageType("green");
        autoClosePopup();
        window.location.reload();
      } catch (error) {
        setMessage("Logout failed");
        setMessageType("red");
        autoClosePopup();
      }
      console.log(response.data);
    } catch (error) {
      setMessage(error.response.data);
      setMessageType("red");
      autoClosePopup();
      console.error("Update failed", error);
    }
  };

  return (
    <>
      {message && <LeftBottomPopUp text={message} state={messageType} />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleAdminUpdate}
          className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Update Admin Profile
          </h2>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
          New Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"  autocomplete="off"
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="username"
            >
            New Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"  autocomplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"  autocomplete="off"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"  autocomplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateAdminProfile;
