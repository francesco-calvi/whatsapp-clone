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
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [state] = useStateValue();
  const [chatInfo, setChatInfo] = useState([]);
  const [lastSeenMessage, setLastSeenMessage] = useState("");

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

      setChatInfo(state.chats.find((c) => c.id === chatId));
    }
  }, [chatId, state.chats, state.dbUserId]);

  const getDaysBetween = (messageDate) => {
    const today = new Date();
    const difference = Math.trunc(
      (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return difference;
  };

  useEffect(() => {
    const createLastSeenMessage = (timestamp) => {
      const messageDate = new Date(timestamp.toDate());
      let difference = getDaysBetween(messageDate);

      let daysDiff;
      if (difference === 0) {
        daysDiff = "today";
      } else if (difference === 1) {
        daysDiff = "yesterday";
      } else {
        daysDiff = difference + " days ago";
      }

      return "Last seen " + daysDiff + ", " + dateTimeFormatter(messageDate);
    };

    const findLastMsg = () => {
      const contactMessages = messages.filter((msg) =>
        chatInfo?.email.toLowerCase().includes(msg.sender.toLowerCase())
      );
      if (contactMessages.length > 0) {
        setLastSeenMessage(
          createLastSeenMessage(
            contactMessages[contactMessages.length - 1].timestamp
          )
        );
      }
    };

    setLastSeenMessage("");
    findLastMsg();
  }, [messages, chatInfo.email]);

  const dateTimeFormatter = (date) => {
    return (
      date.getHours() +
      ":" +
      (date.getMinutes().toString().length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes())
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // create message in current user chat
    db.collection(
      "/users/" + state.dbUserId + "/contacts/" + chatId + "/messages/"
    ).add({
      message: inputValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      sender: state.user.email,
    });

    // create message in contact chat
    db.collection("/users/" + state.dbUserId + "/contacts/")
      .doc(chatId)
      .onSnapshot((snapshot) => {
        let contactId = snapshot.data().id;
        db.collection("/users/" + contactId + "/contacts/")
          .where("id", "==", state.dbUserId)
          .onSnapshot((snapshot) => {
            let docId = snapshot.docs[0].id;
            db.collection(
              "/users/" + contactId + "/contacts/" + docId + "/messages/"
            ).add({
              message: inputValue,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              sender: state.user.email,
            });
          });
      });

    setInputValue("");
  };

  const getMessageDateTime = (message) => {
    const date = new Date(message.timestamp.toDate());
    const difference = getDaysBetween(date);

    if (difference === 0) {
      return dateTimeFormatter(date);
    } else {
      return date.toLocaleDateString() + " " + dateTimeFormatter(date);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={chatInfo?.profileURL} />
        <div className="chat__headerInfo">
          <h3>{chatInfo?.name}</h3>
          <p>{`${lastSeenMessage ? lastSeenMessage : ""}`}</p>
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
            message.timestamp && (
              <p
                className={`chat__message ${
                  message.sender === state.user.email && "chat__receiver"
                }`}
                key={message.id}
              >
                <span className="chat__timestamp">
                  {getMessageDateTime(message)}
                </span>
                {message.message}
              </p>
            )
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
