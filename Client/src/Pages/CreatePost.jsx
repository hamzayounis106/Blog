import React from "react";
import PostEditor from "../Components/PostEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import AccessDenied from "../Components/AccessDenied";
function CreatePost() {
  const [allowed, setAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://blog-api-three-psi.vercel.app/user/CheckAuth",{ withCredentials: true });
        if (response.status === 201 || response.status === 200) {
        }
      } catch (error) {
        setAllowed(false);
        console.log(error);
      } finally {
        
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
if(!allowed){
  return <AccessDenied/>
}
  return (
    <>
      {allowed && (
        <div className="container p-4 pt-6 mx-auto md:p-6 lg:p-12">
          {loading ? (
            <div className="flex items-center justify-center w-full ">
              <p className="text-lg font-bold">Loading...</p>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full my-5">
              {allowed ? (
                <div className="w-[70%]">
                  <PostEditor />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <p className="text-lg font-bold">
                    You are not authorized to create a post. Please register or
                    log in.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) }
    </>
  );
}

export default CreatePost;
