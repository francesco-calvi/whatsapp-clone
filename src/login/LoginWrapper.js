import React, { useEffect } from "react";
import Login from "./Login";
import { actionTypes } from "../state/reducer";
import db from "../firebase";
import { useStateValue } from "../state/StateProvider";

function LoginWrapper() {
  const [state, dispatch] = useStateValue();

  // useEffect(() => {
  //   db.collection("users")
  //     .where("email", "==", state.user.email)
  //     .onSnapshot((snapshot) => {
  //       dispatch({
  //         type: actionTypes.SET_DB_UID,
  //         dbUserId: snapshot.docs[0].id,
  //       });
  //     });
  // }, [state]);

  return <Login />;
}

export default LoginWrapper;
