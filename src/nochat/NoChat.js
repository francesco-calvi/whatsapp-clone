import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./NoChat.css";
import { useStateValue } from "../state/StateProvider";
import { actionTypes } from "../state/reducer";

function NoChat() {
  const [state, dispatch] = useStateValue();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (state.chats && state.chats.length === 0) {
      setShowButton(true);
    }

    console.log(showButton);
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
        <Button className="startChat__button" onClick={openForm}>
          Start chat
        </Button>
      )}
    </div>
  );
}

export default NoChat;
