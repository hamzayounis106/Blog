import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark, FaShare } from "react-icons/fa";
import LeftBottomPopUp from "./LeftBottomPopUp";
import axios from "axios";
function PostCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPopUp, setShowPopUp] = useState(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const [data, setData] = useState(null);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (props.saved) {
      setSaved(true);
    }
    setAllowed(props.permission);
  },[]);

  const autoClosePopup = () => {
    setTimeout(() => {
      setShowPopUp(null);
    }, 2000);
  };
  const toggleSave = async () => {
    setShowPopUp(null);
    if (allowed) {
      try {
        const res = await axios.post("https://blog-api-three-psi.vercel.app/user/addSavePost", {
          postId: props.id,
        });
        console.log("Done", showPopUp);
        console.log(res);
        if (res.status === 200) {
          setSaved(!saved);
          if(!saved){
            setShowPopUp("green");
          }
          if(saved){
            setShowPopUp("removed");
          }
    
        }
      } catch (error) {
        console.error("Failed to save post:", error);
      }
    } else {
      setShowPopUp("yellow");
    }
    autoClosePopup();
    console.log("Done", showPopUp);
  };
  return (
    <>
      {showPopUp == "removed" && (
        <LeftBottomPopUp
          text="Post Removed from Saved Posts"
          state="green"
          onClose={() => setShowPopUp(null)}
        />
      )}
      {showPopUp == "yellow" && (
        <LeftBottomPopUp
          text="Please Login to save Post"
          state="yellow"
          onClose={() => setShowPopUp(null)}
        />
      )}
      {showPopUp == "green" && (
        <LeftBottomPopUp
          text="Post Saved Successfully"
          state="green"
          onClose={() => setShowPopUp(null)}
        />
      )}
      <div id={props.id} className="p-10 mb-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={props.userImage}
              alt="Profile Picture"
              className="w-10 h-10 mr-2 rounded-full"
            />
            <span className="font-bold">{props.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSave}
              className="text-gray-600 hover:text-gray-900"
            >
              {saved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <FaShare />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-semibold mt-7">{props.title}</h2>
        {props.imageUrl && (
          <img
            src={props.imageUrl}
            alt={props.title}
            className="w-full h-auto mt-4 rounded-lg"
          />
        )}
        <div
          className={`prose mt-6 ${
            expanded ? "max-h-none" : "max-h-24 overflow-hidden"
          }`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
        <button onClick={toggleExpand} className="mt-6 text-blue-500">
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
}

export default PostCard;
