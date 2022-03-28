import React from "react";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./chat/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./state/StateProvider.js";
import Login from "./login/Login";

function App() {
  const [state] = useStateValue();

  return (
    <div className="app">
      {!state.user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/chats/:contactName/:chatId" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
