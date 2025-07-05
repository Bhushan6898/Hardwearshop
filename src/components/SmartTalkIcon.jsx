import React from "react";
import { BsChatDots } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

const SmartTalkIcon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/chatbox") {
      navigate("/chatbox");
    }
  };

  const handleDoubleClick = () => {
    if (location.pathname === "/chatbox") {
      navigate("/");
    }
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className="smart-talk-icon"
    >
      <BsChatDots size={40} color="white" />
      <span>SmartTalk</span>
    </div>
  );
};

export default SmartTalkIcon;
