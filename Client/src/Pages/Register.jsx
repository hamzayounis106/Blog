import { useEffect, useState } from "react";
import axios from "axios";
import LeftBottomPopUp from "../Components/LeftBottomPopUp";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  const [alert, setAlert] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [Gender, setGender] = useState(null);
  const closepopup = () => {
    setTimeout(() => {
      setPopup(null);
      setAlert(null);
    }, 2000);
  };
  useEffect(() => {
    const CheckingAuth = async () => {
      try {
        await axios
          .get("https://blog-api-three-psi.vercel.app/user/CheckAuth", {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201 || res.status === 200) {
              console.log("User is authenticated");
              window.location.href = "/profile";
              navigate("/profile");
              setAllowed(false);
            } else {
              setAllowed(true);
            }
          });
      } catch (error) {
        setAllowed(true);

        console.log(error);
      }
    };
    CheckingAuth();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    const data = { name, email, password, Gender };
    try {
      console.log(name, email, password);
      await axios
        .post("https://blog-api-three-psi.vercel.app/auth/register", data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if (res.data === 11000) {
            setPopup("red");
            setAlert("User already exists");
            closepopup();
            return;
          }
          if (res.data === undefined) {
            setPopup("red");
            closepopup();
            setAlert("Something went wrong");
          }
          navigate("/profile");
        });
    } catch (error) {
      if (error.response.status === 401) {
        setPopup("red");
        setAlert("User already exists");
        closepopup();
        return;
      }
      setPopup("yellow");
      setAlert("Something went wrong");
      closepopup();
      console.log(error);
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
              Register
            </h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-white">
                  Enter your name:
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#293546]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mb-2 text-white">Gender</h3>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="radio"
                      id="Male"
                      name="gender"
                      value="Male"
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="Male" className="text-white">
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Female"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      value="Female"
                      className="mr-2"
                      required
                    />
                    <label htmlFor="Female" className="text-white">
                      Female
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Other"
                      name="gender"
                      value="Other"
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="Other" className="text-white">
                      Other
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-white">
                  Enter your Email:
                </label>
                <input
                  type="email"
                  required
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
                  required
                  id="password"
                  className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#293546]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-[#293546] rounded-lg hover:bg-[#293546d3]"
              >
                Submit
              </button>
            </form>
            <div className="mt-6">
              <p className="mt-4 text-sm text-white">
                Already have a account?{" "}
                <Link to="/login" className="text-[#fff] underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
