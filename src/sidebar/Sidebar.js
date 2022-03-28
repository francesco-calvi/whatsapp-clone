import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SidebarChat from "../sidebar-chat/SidebarChat";
import db from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { actionTypes } from "../state/reducer";

function Sidebar() {
  //const [chats, setChats] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("users/" + state.dbUserId + "/contacts").onSnapshot(
      (snapshot) => {
        dispatch({
          type: actionTypes.SET_CHATS,
          chats: snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            profileURL: doc.data().profileURL,
          })),
        });
      }
    );
  }, [state.dbUserId]);

  useEffect(() => {
    db.collection("users")
      .where("email", "==", state.user.email)
      .onSnapshot((snapshot) => {
        dispatch({
          type: actionTypes.SET_DB_UID,
          dbUserId: snapshot.docs[0].id,
        });
      });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={state.user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {state.chats.map((chat) => {
          return (
            <SidebarChat
              key={chat.id}
              name={chat.name}
              id={chat.id}
              profileURL={chat.profileURL}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
