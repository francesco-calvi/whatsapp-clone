import React from 'react'
import "./App.css"
import Sidebar from './sidebar/Sidebar'
import Chat from './chat/Chat'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useStateValue} from './state/StateProvider.js'
import Login from './login/Login'


function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className='app'>
      {!user ? (
          <Login />
        ) : (
          <div className='app__body'>
              <Sidebar />
              <Router>
                <Routes>
                <Route path="/chats/:chatId" component={Chat} /> 
                </Routes>              
              </Router>
          </div>        
        )
      }
    </div>
  )
}

export default App