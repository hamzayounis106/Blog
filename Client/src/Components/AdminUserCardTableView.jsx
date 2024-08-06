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
        const res = await axios.post(
          "/api/admin/statOfUser",
          { userID: props.userId },
          {
            withCredentials: true,
          }
        );
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
        "/api/admin/deleteUserAdminC",
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
 <tr id={props.userId} className="border-t border-gray-200 hover:bg-gray-100">
          <td className="p-5">
            <img
              src={props.userPicture}
              className="object-cover w-10 h-10 rounded-full"
              alt={props.userName}
            />
          </td>
          <td className="p-3 text-center">
            <h2 className="text-lg font-semibold">{props.userName}</h2>
          </td>
          <td className="p-3 text-center">
            <p className="text-md">{props.userEmail}</p>
          </td>
          <td className="p-3 text-center">
            <p className="text-md">{lastDate ? lastDate : "Never"}</p>
          </td>
          <td className="p-3 text-center">
            <p className="text-md">{totalPosts ? totalPosts : 0}</p>
          </td>
          <td className="p-3 text-center">
            <button
              onClick={handleDelete}
              className="flex justify-center w-full text-gray-600 hover:text-gray-900"
            >
              <MdDelete size={24} />
            </button>
          </td>
        </tr>
    </>
  );
}

export default AdminUserCard;
