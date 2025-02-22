import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftBottomPopUp from "../Components/LeftBottomPopUp";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);
  const [alert, setAlert] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();
  const closepopup = () => {
    setTimeout(() => {
      setPopup(null);
      setAlert(null);
    }, 2000);
  };

  useEffect(() => {
    const CheckingAuth = async () => {
      try {
        const res = await axios.get(
          "https://blog-api-three-psi.vercel.app/user/CheckAuth",
          { withCredentials: true }
        );
        console.log("Cookies in CheckAuth: ", document.cookie);
        if (res.status === 201 || res.status === 200) {
          console.log("User is authenticated");
          // window.location.href = "/profile";
          navigate("/profile");
        } else {
          setAllowed(true);
        }
      } catch (error) {
        setAllowed(true);
        console.log(error);
      }
    };
    CheckingAuth();
  }, []);
  console.log("Cookies in CheckAuth: ", document.cookie); 
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const res = await axios.post(
        "https://blog-api-three-psi.vercel.app/auth/login",
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        window.location.href = "/";
      }
      // console.log("Cookies in CheckAuth: ", document.cookie); 
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          setPopup("red");
          setAlert("Invalid Details");
          closepopup();
        } else if (
          error.response.status === 401 ||
          error.response.status === 404
        ) {
          setPopup("red");
          setAlert("Something went wrong");
          closepopup();
        }
      } else {
        setPopup("red");
        setAlert("Network error");
        closepopup();
      }
    }
  };

  return (
    <>
      {allowed && (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-[#0f172a] to-[#1e304b]">
          {popup && (
            <LeftBottomPopUp
              text={alert}
              state={popup}
              onClose={() => setPopup(null)}
            />
          )}
          <div className="w-[80%] md:w-[40%] lg:w-[30%] bg-[#0B1120] p-8 rounded-lg shadow-lg">
            <h2 className="mb-6 text-3xl font-semibold text-center text-white">
              Login
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-white">
                  Enter your Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#293546]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-white">
                  Enter Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#293546]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-[#293546] rounded-lg hover:bg-[#293546d3]"
              >
                Login
              </button>
            </form>
            <div className="mt-6">
              <p className="mt-4 text-sm text-white">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#fff] underline">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
