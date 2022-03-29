import React, { useEffect } from "react";
import "./Login.css";
import { actionTypes } from "../state/reducer";
import { auth, provider } from "../firebase";
import db from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { Button } from "@mui/material";

function Login() {
  const [state, dispatch] = useStateValue();

  const updateUser = (authData) => {
    dispatch({
      type: actionTypes.SET_USER,
      user: authData.user,
    });
  };

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        updateUser(result);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    if (state.user) {
      db.collection("users")
        .where("email", "==", state.user.email)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_DB_UID,
            dbUserId: snapshot.docs[0].id,
          });
        });
    }
  }, [state.user]);

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
