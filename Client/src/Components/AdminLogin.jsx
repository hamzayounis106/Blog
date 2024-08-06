import React, { useState } from "react";
import axios from "axios";
import LeftBottomPopUp from "../Components/LeftBottomPopUp";
function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const handleAdminLogin = async (e) => {
    console.log(username + " " + password);
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/admin/adminLogin",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        console.log("Login successful");
        window.location.reload();
      }
      // Handle successful login
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {errorMessage && (
        <>
          <LeftBottomPopUp
            text={errorMessage}
            state="red"
            onClose={() => setErrorMessage(null)}
          />
        </>
      )}
      <form
        onSubmit={handleAdminLogin}
        className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Admin Login
        </h2>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
