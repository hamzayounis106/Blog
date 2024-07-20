import React from "react";
import { MdCancel } from "react-icons/md";

function LeftBottomPopUp(props) {
  let mainColor, textColor, borderColor, hoverColor;

  switch (props.state) {
    case "red":
      mainColor = "bg-rose-50";
      textColor = "text-rose-600";
      borderColor = "border-rose-300";
      hoverColor = "hover:bg-rose-100";
      break;
    case "green":
      mainColor = "bg-emerald-50";
      textColor = "text-emerald-600";
      borderColor = "border-emerald-300";
      hoverColor = "hover:bg-emerald-100";
      break;
    case "yellow":
      mainColor = "bg-amber-50";
      textColor = "text-amber-600";
      borderColor = "border-amber-300";
      hoverColor = "hover:bg-amber-100";
      break;
    default:
      mainColor = "bg-gray-50";
      textColor = "text-gray-600";
      borderColor = "border-gray-300";
      hoverColor = "hover:bg-gray-100";
      break;
  }

  return (
    <div
      className={`fixed  gap-5 flex justify-between items-center rounded-lg shadow-md left-10 bottom-10 z-[10000] max-w-[400px] p-4 ${mainColor} border ${borderColor} ${hoverColor}`}
    >
      <p className={`text-sm font-medium ${textColor} truncate`}>{props.text}</p>
      <button
        className={`text-lg font-medium ${textColor} hover:opacity-80 transition duration-300 ease-in-out`}
        onClick={props.onClose}
      >
        <MdCancel size={20} />
      </button>
    </div>
  );
}

export default LeftBottomPopUp;