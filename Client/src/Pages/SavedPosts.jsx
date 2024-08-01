import React from "react";
import axios from "axios";
import AccessDenied from "../Components/AccessDenied";
import SmallPostCard from "../Components/SmallPostCard";
import { Audio } from "react-loader-spinner";
import { useState, useEffect } from "react";
function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAllowed = async () => {
      try {
        const response = await axios.get(
          "https://blog-api-three-psi.vercel.app/user/checkAuth",
          { withCredentials: true }
        );
        if (response.status === 200) {
          getSavedPosts();
          setAllowed(true);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAllowed();
  }, []);
  const getSavedPosts = async () => {
    const response = await axios.get(
      "https://blog-api-three-psi.vercel.app/post/savedPosts",
      { withCredentials: true }
    );
    if (response.status === 200) {
      if (response.data.length === 0) {
        setSavedPosts(null);
        return;
      }
      setSavedPosts(response.data);
      console.log(response.data);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {" "}
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
  if (!loading && allowed && !savedPosts) {
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold">Your saved will appear here</h1>
    </div>;
  }
  if (!allowed) {
    return <AccessDenied />;
  }
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        {allowed && (
          <>
            {savedPosts && (
              <>
                {" "}
                <div className="flex flex-col items-center justify-center w-full py-4">
                  <div className="grid items-center grid-cols-3 gap-4 p-4">
                    {savedPosts.map((post) => (
                      <SmallPostCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        picture={post.imageUrl}
                        postedBy={post.userName}
                        authorImage={post.userProfileImage}
                        excerpt={post.excrept}
                        saved={post.saved}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SavedPosts;
