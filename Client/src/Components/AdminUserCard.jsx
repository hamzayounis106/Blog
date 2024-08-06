import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import LeftBottomPopUp from "./LeftBottomPopUp";

function AdminUserCard(props) {
  const [lastDate, setLastDate] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  const [showPopUp, setShowPopUp] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.post("https://blog-api-three-psi.vercel.app/admin/statOfUser", { userID: props.userId }, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setLastDate(res.data.lastDate);
          setTotalPosts(res.data.totalPosts);
          // console.log(res.data);
        }
      } catch (error) {
        setLastDate("Never");
        setTotalPosts(0);
      }
    };
    getStats();
  }, [props.userId]);

  const autoClosePopup = () => {
    setTimeout(() => {
      setShowPopUp(null);
    }, 2000);
  };

  const handleDelete = async () => {
    setShowPopUp(null);
    try {
      const res = await axios.post(
        "https://blog-api-three-psi.vercel.app/admin/deleteUserAdminC",
        { userID: props.userId },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data === "User Deleted Successfully") {
        props.onUserDeletion(props.userId);
        setShowPopUp("removed");
        console.log("User deleted successfully, popup should appear.");
      } else {
        console.log("Unexpected response:", res);
      }
    } catch (error) {
      setShowPopUp("yellow");
      console.log("Error deleting user:", error);
    }
    autoClosePopup();
  };

  return (
    <>
      {showPopUp === "removed" && (
     <>
        <p className="text-[23rem]">adsdfs</p>
        <LeftBottomPopUp
          text="User Removed"
          state="green"
          onClose={() => setShowPopUp(null)}
        />
     </>
      )}
      {showPopUp === "yellow" && (
        <LeftBottomPopUp
          text="Unknown error occurred :("
          state="yellow"
          onClose={() => setShowPopUp(null)}
        />
      )}
      <div
        className="w-[400px] flex rounded-lg border-x-gray-600 shadow-lg shadow-slate-400 flex-col justify-center items-center p-4 gap-3"
        id={props.userId}
        key={props.userId}
      >
        <div className="flex justify-end w-full">
          <button
            onClick={handleDelete}
            className="relative top-0 text-gray-600 hover:text-gray-900"
          >
            <MdDelete />
          </button>
        </div>
        <img
          src={props.userPicture}
          className="rounded-full w-[100px] my-1"
          alt={props.userName}
        />
        <h2 className="text-lg font-semibold text-center">{props.userName}</h2>
        <p className="text-center text-md">{props.userEmail}</p>
        <p className="text-center text-md">
          Last Post: {lastDate ? lastDate : "Never"}
        </p>
        <p className="text-center text-md">
          Total Posts: {totalPosts ? totalPosts : 0}
        </p>
      </div>
    </>
  );
}

export default AdminUserCard;