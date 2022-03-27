import React, {useState} from 'react'
import './Chat.css'
import { Avatar , IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import {useParams} from 'react-router-dom'


function Chat() {
  const [inputValue, setInputValue] = useState("")
  const {chatId} = useParams();

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(inputValue)
    setInputValue("")
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>          
          <IconButton>
            <MoreVertIcon />
          </IconButton>

        </div>
      </div>
      <div className='chat__body'>
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className='chat__name'>Francesco</span>
          Hey Guy
          <span className='chat__timestamp'>3:43pm</span>
        </p>

      </div>
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input type="text" value={inputValue} placeholder="Type a message" 
          onChange={(e) => {setInputValue(e.target.value)}}/>
          <button onClick={sendMessage} type="submit"></button>
        </form>
        <MicIcon />
      </div>
      
    </div>
  )
}

export default Chat