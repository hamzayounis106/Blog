import React from "react";
import axios from "axios";
import AccessDenied from "../Components/AccessDenied";
import MyPostCard from "../Components/MyPostCard";
import { useState, useEffect } from "react";
import Link from "react-router-dom";
function MyPosts() {
  const [myposts, setmyposts] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAllowed = async () => {
      try {
        const response = await axios.get(
          "https://blog-api-three-psi.vercel.app/user/checkAuth",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setAllowed(true);
          await getmyposts();
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAllowed();
  }, []);

  const getmyposts = async () => {
    try {
      const response = await axios.get(
        "https://blog-api-three-psi.vercel.app/post/myposts",
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (response.data.length === 0) {
          setmyposts(null);
          return;
        }
        setmyposts(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostRemoval = (postId) => {
    setmyposts(myposts.filter((post) => post._id !== postId));
  };

  return (
    <>
      {Loading ? (
        <p>Loading....</p>
      ) : (
        <div className="flex flex-col bg-gray-50">
          {allowed ? (
            <>
              {myposts ? (
                <div className="flex flex-col items-center justify-center w-full py-4">
                  <h1 className="text-2xl font-bold">My Posts</h1>
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {myposts.map((post) => (
                      <MyPostCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        picture={post.imageUrl}
                        postedBy={post.userName}
                        authorImage={post.userProfileImage}
                        excerpt={post.excrept}
                        saved={post.saved}
                        onPostRemove={handlePostRemoval}
                        className="w-full h-full"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <h1 className="text-2xl font-bold">
                    Your Posts will appear here, to create a post, click{" "}
                    <Link to="/create-post">here</Link>
                  </h1>
                </div>
              )}
            </>
          ) : (
            <AccessDenied />
          )}
        </div>
      )}
    </>
  );
}

export default MyPosts;