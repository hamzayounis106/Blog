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
      const res = await axios.post(
        "https://blog-api-three-psi.vercel.app/post/deletePostAdminC",
        {
          postId: props.id,
        },
        { withCredentials: true }
      );

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
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-[#1F2937] shadow-md w-[80%] pr-8"
        id={props.id} key={props.id}
      >
        <Link
          to={`/post/${props.id}`}
          target="_blank"
          className="flex items-center gap-4 "
        >
          <img
            src={props.picture}
            alt={props.title}
            className="object-cover w-20 h-20 rounded-lg"
          />
          <div>
            <h2 className="text-sm font-semibold">{props.title}</h2>
            <p className="text-sm text-gray-600">{props.excerpt}</p>
          </div>
        </Link>
        <div className="flex gap-5">
          {" "}
          <div className="flex items-center gap-4">
            <img src={props.authorImage} className="w-10 rounded-full" alt="" />
            <p className="font-semibold">{props.postedBy}</p>
          </div>
          <button
            onClick={handleDelete}
            className="relative top-0 text-gray-600 hover:text-gray-900"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </>
  );
}

export default MyPostCard;
