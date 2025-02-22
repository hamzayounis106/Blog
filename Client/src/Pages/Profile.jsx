import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import AccessDenied from "../Components/AccessDenied";import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";

import { BiStats, BiTimeFive, BiLike } from "react-icons/bi";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [lastDate, setLastDate] = useState("Never");
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deneied, setDenied] = useState(false);
  useEffect(() => {
    axios
      .get("https://blog-api-three-psi.vercel.app/user/profile", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setProfileData(res.data);
          // setAllowed(true);
        } else {
          setDenied(true);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
     

        setLoading(false);
      });
    
  }, []);
  const getStats = async () => {
    if (profileData) {
      const res = await axios.get(
        "https://blog-api-three-psi.vercel.app/user/stats",
        { withCredentials: true }
      );
      setLastDate(res.data.lastDate);
      setTotalPosts(res.data.totalPosts);
      console.log(res.data);
    }
  };
  useEffect(() => {
   try {
    getStats();
   } catch (error) {
     console.log(error);
    
   }
  }, [profileData]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
     <Audio
          height="80"
          width="80"
          radius="9"
          color="gray"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
  return (
    <>
      {loading === false && deneied === true && <AccessDenied />}
      { !deneied &&
        profileData != null &&
        loading === false && (
          <div className="container flex flex-row items-stretch flex-grow w-full h-screen justify-stretch bg-gradient-to-r from-[#0f172a] to-[#1e304b]">
            <div className="flex flex-col items-center justify-between w-full p-6 bg-white">
              <div className="flex items-center justify-end w-full mb-6">
                <Link
                  to="/create-post"
                  className="flex items-center gap-2 px-4 py-2 text-white bg-[#293546] rounded-lg hover:bg-[#293546d3]"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2"> New Post</span>
                </Link>
              </div>
              {profileData && (
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center">
                    {profileData.profilePicture ? (
                      <img
                        src={profileData.profilePicture}
                        alt="Profile Picture"
                        className="object-cover rounded-full w-52"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-32 h-32 text-gray-500 bg-gray-600 rounded-full">
                        No Image
                      </div>
                    )}
                    <h2 className="mt-4 text-4xl font-medium text-gray-900">
                      {profileData.name}
                    </h2>
                    <span className="mt-3 text-lg text-gray-600">
                      {profileData.email}
                    </span>
                  </div>
                  <div className="flex flex-col items-center w-full gap-4 mt-6">
                    <div className="flex justify-center gap-6 ">
                      <div className="flex justify-evenly flex-col items-center p-6 rounded-lg shadow-md bg-[#F8FAFC] text-zinc-900">
                        <BiStats className="mb-2 text-4xl " />
                        <p className="font-medium ">Total Posts</p>
                        <h3 className="text-xl font-semibold ">{totalPosts}</h3>
                      </div>
                      <div className="flex justify-evenly flex-col items-center p-6 rounded-lg shadow-md bg-[#F8FAFC] text-zinc-900">
                        <BiTimeFive className="mb-2 text-4xl " />
                        <p className="font-medium ">Last Post Date</p>
                        <h3 className="text-xl font-semibold ">{lastDate}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }
    </>
  );
}

export default Profile;
