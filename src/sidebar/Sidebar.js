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
  const [state, dispatch] = useStateValue();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(state.chats);
  }, [state.chats]);

  const randomSeed = () => {
    return Math.floor(Math.random() * 5000);
  };

  const avatarURL = () => {
    return `https://avatars.dicebear.com/api/human/${randomSeed()}.svg`;
  };

  const addNewUserToContacts = (docId, input) => {
    // check if new user is in current user contacts
    const createContactForNewUser = db
      .collection("/users/" + state.dbUserId + "/contacts/")
      .where("id", "==", docId)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          // add new user to current user contacts
          db.collection("/users/" + state.dbUserId + "/contacts/").add({
            id: docId,
            email: input.email,
            name: input.name,
            profileURL: avatarURL(),
          });
        }
        createContactForNewUser();
      });
  };

  const addUserToContacts = (docId) => {
    // check if current user is in new user contacts
    const createContactForUser = db
      .collection("/users/" + docId + "/contacts/")
      .where("id", "==", state.dbUserId)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          // add current user to new user contacts
          db.collection("/users/" + docId + "/contacts/").add({
            id: state.dbUserId,
            email: state.user.email,
            name: state.user.displayName,
            profileURL: avatarURL(),
          });
        }
        createContactForUser();
      });
  };

  const addNewUser = async (input) => {
    return db
      .collection("users")
      .add({
        email: input.email,
        name: input.name,
      })
      .then((doc) => {
        return doc.id;
      });
  };

  const checkOrAddNewUser = (input) => {
    const handleNewUserRequest = db
      .collection("users")
      .where("email", "==", input.email)
      .onSnapshot((snapshot) => {
        let docId;
        if (snapshot.docs.length > 0) {
          docId = snapshot.docs[0].id;
          handleNewUserRequest();
        } else {
          addNewUser(input).then((res) => {
            docId = res;
          });
        }
        if (docId) {
          addNewUserToContacts(docId, input);
          addUserToContacts(docId);
        }
      });
  };

  const createChat = (input) => {
    checkOrAddNewUser(input);

    dispatch({
      type: actionTypes.SET_SHOW_NEWCHAT_FORM,
      showNewChatForm: false,
    });
  };

  const getInputData = (input) => {
    createChat(input);
  };

  const closeForm = (toClose) => {
    if (toClose) {
      dispatch({
        type: actionTypes.SET_SHOW_NEWCHAT_FORM,
        showNewChatForm: false,
      });
    }
  };

  const openForm = () => {
    dispatch({
      type: actionTypes.SET_SHOW_NEWCHAT_FORM,
      showNewChatForm: true,
    });
  };

  const searchChat = (e) => {
    const filtered = state.chats.filter((c) => {
      return c.name.includes(e.target.value);
    });
    setChats(filtered);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={state.user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={() => openForm()}>
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
          <input
            type="text"
            placeholder="Search"
            className="searchChatInput"
            onChange={searchChat}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        {state.showNewChatForm && (
          <NewChatForm
            sendInputData={getInputData}
            showForm={state.showNewChatForm}
            closeForm={closeForm}
          />
        )}
        {state.chats &&
          chats.map((chat) => {
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
