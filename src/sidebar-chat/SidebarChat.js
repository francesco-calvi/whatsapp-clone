import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, name, id, profileURL }) {
  const createChat = () => {};

  // https://lh3.googleusercontent.com/a-/AOh14GgqI1tekc3PuRRjlynE8Nbw7oEYOJdSdB_CBHML=s96-c
  // https://avatars.dicebear.com/api/human/${seed}.svg
  return !addNewChat ? (
    <Link to={`/chats/${id}`}>
      <div className="sidebarChat">
        <Avatar src={profileURL} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message ...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
