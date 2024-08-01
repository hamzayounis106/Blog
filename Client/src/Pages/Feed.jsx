import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../Components/PostCard";
import { Audio } from "react-loader-spinner";
function Feed() {
  const [posts, setPosts] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https://blog-api-three-psi.vercel.app/user/CheckAuth",
          { withCredentials: true }
        );
        if (response.status === 201 || response.status === 200) {
          console.log(response.data);
          setAllowed(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          "https://blog-api-three-psi.vercel.app/post/getPosts",
          { withCredentials: true }
        );
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex ">
        <div className="w-1/4 bg-gray-100 md:block">
          {/* Left sidebar content */}
        </div>
        <div className="w-full p-4 bg-gray-100 md:w-1/2">
          <div>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                author={post.userName}
                content={post.content}
                imageUrl={post.imageUrl}
                userImage={post.userProfileImage}
                permission={allowed}
                saved={post.saved}
              />
            ))}
          </div>
        </div>
        <div className="w-1/4 bg-gray-100 md:block">
          {/* Right sidebar content */}
        </div>
      </div>
    </div>
  );
}

export default Feed;
