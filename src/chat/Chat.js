import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "../state/StateProvider";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const { contactName, chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [state] = useStateValue();

  useEffect(() => {
    if (chatId) {
      db.collection(
        "/users/" + state.dbUserId + "/contacts/" + chatId + "/messages/"
      )
        .orderBy("timestamp", "asc")
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
  }, [chatId]);

  const splitName = () => {
    const splitted = state.user.displayName.split(" ");
    return splitted[0];
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const sender = splitName();

    db.collection(
      "/users/" + state.dbUserId + "/contacts/" + chatId + "/messages/"
    ).add({
      message: inputValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      sender: sender,
    });

    setInputValue("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{contactName}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              className={`chat__message ${
                message.sender === splitName(state.user.displayName) &&
                "chat__receiver"
              }`}
              key={message.id}
            >
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={inputValue}
            placeholder="Type a message"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button onClick={sendMessage} type="submit"></button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
