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
import { useStateValue } from "../state/StateProvider";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [state] = useStateValue();

  useEffect(() => {
    if (chatId) {
      console.log(chatId);
      // db.collection("chats")
      //   .doc(chatId)
      //   .collection("messages")
      //   .orderBy("timestamp", "asc")
      //   .onSnapshot((snapshot) =>
      //     setMessages(
      //       snapshot.docs.map((doc) => ({
      //         data: doc.data(),
      //       }))
      //     )
      //   );

      // /users/qL9RwwDxMgSVZoeM3sbB/contacts/I8vIQ0Lw94V8Gt45fxYR/messages
      db.collection(
        "/users/" + state.dbUserId + "/contacts/" + chatId + "/messages/"
      )
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          console.log(snapshot.docs[0].data());
          setMessages(
            snapshot.docs.map((doc) => ({
              message: doc.data().message,
              timestamp: doc.data().timestamp,
            }))
          );
        });
      console.log(messages);
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
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
            <p className={`chat__message ${true && "chat__receiver"}`}>
              <span className="chat__name"></span>
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
