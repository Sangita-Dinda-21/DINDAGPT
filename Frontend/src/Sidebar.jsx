import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";



function Sidebar() {

  const {allThreads, setAllThreads,setPrevChats,currThreadID,setCurrThreadID,newChat,setNewChat,setPrompt,setReply} = useContext(MyContext);

  const getAllThreads = async ()=>{
    try{
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map(thread =>({threadID: thread.threadId, title: thread.title}));
      // console.log(filteredData);
      setAllThreads(filteredData);
      //threadid
      //title
    }catch(e){
      console.log(e);
    }
  };

  useEffect(()=>{
    getAllThreads();
  },[currThreadID]);


  const createNewChat = ()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadID(uuidv1());
    setPrevChats([])

  }

  const changeThread= async (newthreadId)=>{
    setCurrThreadID(newthreadId);

    try{
      const response = await fetch(`http://localhost:8080/api/thread/${newthreadId}`);
      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    }catch(e){
      console.log(e);
    }
  }

  const deleteThread= async (threadId)=>{
    try{
      const response =await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"});
      const res = await response.json();
      console.log(res);

      setAllThreads(pre => pre.filter(thread => thread.threadID !== threadId));

      if(threadId === currThreadID){
        createNewChat();
      }

      
    }catch(e){
      console.log(e);
    }
  }



  return (
    <section className="sidebar">
        {/*new chat button*/}
        <button className="new-chat-button" onClick={createNewChat}>
          <img src="src/assets/logo.webp" alt="gpt logo" className="logo" />
          <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        {/*histroy of chats*/}
        <ul className="history">
          {
            allThreads?.map((thread, idx)=>(
              <li key={idx} 
              onClick={(e) => changeThread(thread.threadID)}
              className={thread.threadID === currThreadID ? "highlighted" :" " }
              >
                {thread.title}
                <i className="fa-solid fa-trash"
                   onClick={(e)=>{
                    e.stopPropagation();
                    deleteThread(thread.threadID);
                   }}
                ></i>
              </li>
            ))
          }
        </ul>

        {/*signin button*/}
        <div className="signin">
          <p>By Sangita Dinda &hearts;</p>
        </div>
    </section>
  );
}
export default Sidebar;