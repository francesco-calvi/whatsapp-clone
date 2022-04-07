import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/StateProvider.js";
import db from "../firebase";

function SidebarChat({ name, id, profileURL }) {
  const [messages, setMessages] = useState([]);
  const [state] = useStateValue();

  useEffect(() => {
    if (id) {
      db.collection(
        "/users/" + state.dbUserId + "/contacts/" + id + "/messages/"
      )
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              message: doc.data().message,
              timestamp: doc.data().timestamp,
              sender: doc.data().sender,
            }))
          );
        });
    }
  }, [state.dbUserId, id]);

  return (
    <Link to={`/chats/${id}`}>
      <div className="sidebarChat">
        <Avatar src={profileURL} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{`${
            messages[0]?.message ? messages[0].message : "Say hi to " + name
          }`}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
