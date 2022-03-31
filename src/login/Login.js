import React from "react";
import "./Login.css";
import { actionTypes } from "../state/reducer";
import { auth, provider } from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { Button } from "@mui/material";

function Login() {
  const [state, dispatch] = useStateValue();

  const updateState = (authData) => {
    dispatch({
      type: actionTypes.SET_USER,
      user: authData.user,
    });
  };

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        updateState(result);
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/100px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
