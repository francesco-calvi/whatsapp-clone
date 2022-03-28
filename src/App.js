import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./chat/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./state/StateProvider.js";
import LoginWrapper from "./login/LoginWrapper";
import { actionTypes } from "./state/reducer";
import db from "./firebase";

function App() {
  const [state, dispatch] = useStateValue();

  // useEffect(() => {
  //   console.log(state.user.email);

  //   db.collection("users")
  //     .where("email", "==", state.user.email)
  //     .onSnapshot((snapshot) => {
  //       dispatch({
  //         type: actionTypes.SET_DB_UID,
  //         dbUserId: snapshot.docs[0].id,
  //       });
  //     });
  // }, []);

  return (
    <div className="app">
      {!state.user ? (
        <LoginWrapper />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/chats/:chatId" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
