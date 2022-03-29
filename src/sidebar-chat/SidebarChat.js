import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../state/StateProvider";

function SidebarChat({ name, id, profileURL }) {
  return (
    <Link to={`/chats/${id}`}>
      <div className="sidebarChat">
        <Avatar src={profileURL} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message ...</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
