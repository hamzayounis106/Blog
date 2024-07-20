import React, { useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import LeftBottomPopUp from "./LeftBottomPopUp";
import { MdDelete } from "react-icons/md";

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function MyPostCard(props) {
  const [showPopUp, setShowPopUp] = useState(null);

  const autoClosePopup = () => {
    setTimeout(() => {
      setShowPopUp(null);
    }, 2000);
  };
  const handleDelete = async () => {
    setShowPopUp(null);
    try {
      const res = await axios.post("https://blog-api-three-psi.vercel.app/post/deletePost", {
        postId: props.id,
      });

      if (res.status === 200) {
        setShowPopUp("removed");
        props.onPostRemove(props.id);
      }
    } catch (error) {
      setShowPopUp("yellow");
      console.error("Failed to save post:", error);
    }
    autoClosePopup();
  };
  return (
    <>
      {showPopUp == "removed" && (
        <LeftBottomPopUp
          text="Post Removed"
          state="green"
          onClose={() => setShowPopUp(null)}
        />
      )}
      {showPopUp == "yellow" && (
        <LeftBottomPopUp
          text="Unknown error occured :("
          state="yellow"
          onClose={() => setShowPopUp(null)}
        />
      )}

      <div
        className=" p-4 py-7 bg-white rounded-lg shadow-[#1F2937] shadow-md w-[300px]"
        id={props.id}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2 mb-4">
            <img src={props.authorImage} className="w-10 rounded-full" alt="" />
            <p className="font-semibold">{props.postedBy}</p>
          </div>
          <div>
            <button
              onClick={handleDelete}
              className="text-gray-600 hover:text-gray-900"
            >
              <MdDelete /> 
            </button>
          </div>
        </div>
        <Link to={`/post/${props.id}`} target="_blank">
          <img
            src={props.picture}
            alt={props.title}
            className="object-cover w-full h-40 rounded-lg"
          />
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-sm font-semibold">{props.title}</h2>
          </div>
          <p className="mt-4 text-sm text-gray-600">{props.excerpt}</p>
        </Link>
      </div>
    </>
  );
}

export default MyPostCard;
