import React, { useEffect } from "react";
import "./Login.css";
import { actionTypes } from "../state/reducer";
import { auth, provider } from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { Button } from "@mui/material";
import db from "../firebase";

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

  useEffect(() => {
    // set current user id
    if (state.user) {
      // check if exists
      db.collection("users")
        .where("email", "==", state.user.email)
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            updateUid(snapshot.docs[0].id);
          } else {
            db.collection("users")
              .add({
                email: state.user.email,
                name: state.user.displayName,
              })
              .then((doc) => {
                updateUid(doc.id);
              });
          }
        });
    }

    const updateUid = (value) => {
      dispatch({
        type: actionTypes.SET_DB_UID,
        dbUserId: value,
      });
    };
  }, [state.user, dispatch]);

  useEffect(() => {
    // set current user chats
    if (state.user && state.dbUserId) {
      db.collection("users/" + state.dbUserId + "/contacts").onSnapshot(
        (snapshot) => {
          dispatch({
            type: actionTypes.SET_CHATS,
            chats: snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              profileURL: doc.data().profileURL,
              email: doc.data().email,
            })),
          });
        }
      );
    }
  }, [state.user, state.dbUserId, dispatch]);

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
