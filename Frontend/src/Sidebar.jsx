import "./Sidebar.css";
import { useContext,useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";
import Login from "./Login";
import Register from "./Register";


function Sidebar() {

    const [showAuth, setShowAuth] = useState(false);
    const [authPage, setAuthPage] = useState(null);
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("user"))
    );
    const [showUserMenu, setShowUserMenu] = useState(false);

const {
    allThreads,
    setAllThreads,
    setPrevChats,
    currThreadID,
    setCurrThreadID,
    newChat,
    setNewChat,
    setPrompt,
    setReply,
    refreshThreads
} = useContext(MyContext);

  const getAllThreads = async ()=>{
    try{
      const token = localStorage.getItem("token");

      const response = await fetch(
          "http://localhost:8080/api/thread",
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );
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
    if (user) {
        getAllThreads();
    } else {
        setAllThreads([]);
    }
}, [user, currThreadID, refreshThreads]);


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
      const token = localStorage.getItem("token");

      const response = await fetch(
          `http://localhost:8080/api/thread/${newthreadId}`,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );
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
      const token = localStorage.getItem("token");

      const response = await fetch(
          `http://localhost:8080/api/thread/${threadId}`,
          {
              method: "DELETE",
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );
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

  {/* Login / Username button */}
  <button
    className="login-button"
    onClick={() => {
      if (user) {
        setShowUserMenu(!showUserMenu);
      } else {
        setShowAuth(!showAuth);
      }
    }}
  >
    <i className="fa-solid fa-user"></i>
    {user ? user.name : "Login"}
  </button>


  {/* Login / Sign Up options */}
  {!user && showAuth && (
    <div className="auth-options">

      <button
        onClick={() => setAuthPage("login")}
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        Login
      </button>

      <button
        onClick={() => setAuthPage("signup")}
      >
        <i className="fa-solid fa-user-plus"></i>
        Sign Up
      </button>

    </div>
  )}


  {/* Logout option */}
  {user && showUserMenu && (
    <div className="user-menu">

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setUser(null);

          setAllThreads([]);
          setPrevChats([]);
          setPrompt("");
          setReply(null);
          setNewChat(true);
          setCurrThreadID(uuidv1());

          setShowUserMenu(false);
          setAuthPage(null);
          setShowAuth(false);
        }}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </button>

    </div>
  )}


  {/* Login form */}
  {authPage === "login" && (
    <Login
      onLogin={(loggedInUser) => {
        setUser(loggedInUser);
        setAuthPage(null);
        setShowAuth(false);
        setShowUserMenu(false);
      }}
    />
  )}


  {/* Sign Up form */}
  {authPage === "signup" && (
    <Register
      onRegister={() => {
        setAuthPage(null);
        setShowAuth(false);
      }}
    />
  )}


  <p>By Sangita Dinda &hearts;</p>

</div>

    </section>
  );
}
export default Sidebar;