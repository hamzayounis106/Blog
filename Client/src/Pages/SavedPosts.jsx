import React from "react";
import axios from "axios";
import AccessDenied from "../Components/AccessDenied";
import SmallPostCard from "../Components/SmallPostCard";
import { useState, useEffect } from "react";
function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState(null);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const checkAllowed = async () => {
      const response = await axios.get("/api/user/checkAuth");
      if (response.status === 200) {
        setAllowed(true);
        getSavedPosts();
      }
    };
    checkAllowed();
  }, []);
  const getSavedPosts = async () => {
    const response = await axios.get("/api/post/savedPosts");
    if (response.status === 200) {
      if (response.data.length === 0) {
        setSavedPosts(null);
        return;
      }
      setSavedPosts(response.data);
      console.log(response.data);
    }
  };
  return (
    <div className="w-full h-screen bg-gray-50">
      {allowed ? (
        <>
          {savedPosts ? (
            <>
              {" "}
              <div className="flex flex-col items-center justify-center w-full py-4">
                <h1 className="text-2xl font-bold">Saved Posts</h1>
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-3xl font-bold">
                Your saved will appear here
              </h1>
            </div>
          )}
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}

export default SavedPosts;
