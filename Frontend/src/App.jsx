import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext';
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadID, setCurrThreadID] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads,setAllThreads] = useState([]);

  const providerValue = {
    // Define your context value here
    prompt,setPrompt,
    reply,setReply,
    currThreadID,setCurrThreadID,
    newChat,setNewChat,
    prevChats,setPrevChats,
    allThreads,setAllThreads
  };

  return (
    <div className= "main">
      <MyContext.Provider value={providerValue}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App
