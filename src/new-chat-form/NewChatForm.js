import React, { useState } from "react";
import "./NewChatForm.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";

function NewChatForm({ sendInputData, showForm, closeForm }) {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");

  return (
    <div className={`newChat__form ${showForm ? "slideIn" : ""}`}>
      <div className="newChat__header">
        <IconButton onClick={() => closeForm(true)}>
          <ArrowBackIcon />
        </IconButton>
        <h2>New chat</h2>
      </div>
      <div className="newChat__body">
        <input
          type="text"
          value={emailInputValue}
          placeholder="Enter e-mail"
          onChange={(e) => {
            setEmailInputValue(e.target.value);
          }}
        />
        <input
          type="text"
          value={nameInputValue}
          placeholder="Enter name"
          onChange={(e) => {
            setNameInputValue(e.target.value);
          }}
        />
        <Button
          onClick={() =>
            sendInputData({ email: emailInputValue, name: nameInputValue })
          }
        >
          CHAT
        </Button>
      </div>
    </div>
  );
}

export default NewChatForm;
