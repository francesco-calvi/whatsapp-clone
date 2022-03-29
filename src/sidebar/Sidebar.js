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
import NewChatForm from "../new-chat-form/NewChatForm";

function Sidebar() {
  const [showForm, setShowForm] = useState(false);
  const [state, dispatch] = useStateValue();

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

  const randomSeed = () => {
    return Math.floor(Math.random() * 5000);
  };

  const avatarURL = () => {
    return `https://avatars.dicebear.com/api/human/${randomSeed()}.svg`;
  };

  const createChat = (input) => {
    input.profileURL = avatarURL();
    console.log("creo chat...");
    console.log(input);
    db.collection("/users/" + state.dbUserId + "/contacts/").add({
      email: input.email,
      name: input.name,
      profileURL: input.profileURL,
    });
    setShowForm(false);
  };

  const getInputData = (input) => {
    createChat(input);
  };

  const closeForm = (toClose) => {
    if (toClose) {
      setShowForm(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={state.user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={() => setShowForm(true)}>
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
        {showForm && (
          <NewChatForm
            sendInputData={getInputData}
            showForm={showForm}
            closeForm={closeForm}
          />
        )}
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
