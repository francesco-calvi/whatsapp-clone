import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./NoChat.css";
import { useStateValue } from "../state/StateProvider";
import { actionTypes } from "../state/reducer";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton } from "@mui/material";

function NoChat() {
  const [state, dispatch] = useStateValue();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (state.chats?.length === 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [state.chats, showButton]);

  const openForm = () => {
    dispatch({
      type: actionTypes.SET_SHOW_NEWCHAT_FORM,
      showNewChatForm: true,
    });
  };

  return (
    <div className="container">
      {showButton && (
        <IconButton className="startChat__button" onClick={openForm}>
          <ChatIcon />
        </IconButton>
      )}
    </div>
  );
}

export default NoChat;
