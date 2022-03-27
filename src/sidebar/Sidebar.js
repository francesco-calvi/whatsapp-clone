import React, {useState, useEffect }from 'react'
import "./Sidebar.css"
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidebarChat from '../sidebar-chat/SidebarChat'
import db from '../firebase'
import { useStateValue } from '../state/StateProvider';


function Sidebar() {

  const [chats, setChats] = useState([]);
  const [{user}, dispatch] = useStateValue();
  

  useEffect(() => {
    // const unsubscribe = db.collection('users')
    // //.doc(userId)
    // .onSnapshot(snapshot =>
    //   setChats(snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     data: doc.data()
    //   }))
    //   )
    // )

    let userId;

    db.collection('users')
    .where("email", "==", user.email)
    .onSnapshot(snapshot => {    
      userId = snapshot.docs[0].id     
      
    })    
  
    
    db.collection("users")
    .doc(userId).collection("contacts")
    .onSnapshot(snapshot => {    
      console.log(snapshot) 
      snapshot.forEach(e => {
        console.log(e)
      })    
      
    })    


    // I8vIQ0Lw94V8Gt45fxYR
    

  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar />
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>          
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat addNewChat />
        {
          chats.map(chat => {
            <SidebarChat key={chat.id} name={chat.data.name} id={chat.id}/>
          })
        }
      </div>        
    </div>
  )
}

export default Sidebar