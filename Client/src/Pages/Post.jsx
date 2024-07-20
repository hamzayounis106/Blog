import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DetailedPost() {
  const [postData, setPostData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const { id: postId } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;
      try {
        const response = await axios.get(`https://blog-api-three-psi.vercel.app/post/getPost/${postId}`,{ withCredentials: true });
        if (response.status === 200) {
          setPostData(response.data);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        alert("404 Post not found");
        console.log(error);
        setIsValid(false);
      }
    };
    fetchPostData();
  }, [postId]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      {isValid ? (
        <div className="w-full max-w-3xl p-10 space-y-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900">{postData.title}</h1>
          {postData.imageUrl && (
            <div className="mt-6">
              <img
                src={postData.imageUrl}
                alt={postData.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="mt-6 prose text-gray-700 max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: postData.content }}
            ></div>
          </div>
        
        </div>
      ) : (
        <p className="text-gray-700">Loading...</p>
      )}
    </div>
  );
}

export default DetailedPost;
