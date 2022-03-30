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
  const [newUserId, setNewUserId] = useState();

  useEffect(() => {
    // set current user id
    db.collection("users")
      .where("email", "==", state.user.email)
      .onSnapshot((snapshot) => {
        let userId = snapshot.docs[0].id;
        if (userId) {
          dispatch({
            type: actionTypes.SET_DB_UID,
            dbUserId: userId,
          });
        }
      });
  }, []);

  useEffect(() => {
    // set current user chats
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

    // create the other user
    db.collection("users")
      .where("email", "==", input.email)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          // controllo se viene usato il setNewUserId
          console.log("user alredy present");
          setNewUserId(snapshot.docs[0].id);
          let docId = snapshot.docs[0].id;
          // check if new user is in current user contacts
          db.collection("/users/" + state.dbUserId + "/contacts/")
            .where("id", "==", docId)
            .onSnapshot((snapshot) => {
              if (snapshot.docs.length === 0) {
                // add new user to current user contacts
                console.log("add new user to current user contacts");
                db.collection("/users/" + state.dbUserId + "/contacts/").add({
                  id: docId,
                  email: input.email,
                  name: input.name,
                  profileURL: input.profileURL,
                });
              }
            });
          // check if current user is in new user contacts
          db.collection("/users/" + docId + "/contacts/")
            .where("id", "==", state.dbUserId)
            .onSnapshot((snapshot) => {
              if (snapshot.docs.length === 0) {
                // add current user to new user contacts
                console.log(" add current user to new user contacts");
                db.collection("/users/" + docId + "/contacts/").add({
                  id: state.dbUserId,
                  email: state.user.email,
                  name: state.user.displayName,
                  profileURL: input.profileURL,
                });
              }
            });
        } else {
          // add new user
          console.log("create user");
          db.collection("users")
            .add({
              email: input.email,
              name: input.name,
            })
            .then((doc) => {
              // add new user to current user contacts
              db.collection("/users/" + state.dbUserId + "/contacts/").add({
                id: doc.id,
                email: input.email,
                name: input.name,
                profileURL: input.profileURL,
              });

              // add current user to new user contacts
              db.collection("/users/" + doc.id + "/contacts/").add({
                id: state.dbUserId,
                email: state.user.email,
                name: state.user.displayName,
                profileURL: input.profileURL,
              });
            });
        }
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
