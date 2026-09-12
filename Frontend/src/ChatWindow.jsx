import React from "react";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext,useState,useEffect } from "react";
import { MyContext } from "./MyContext";
import {CircleLoader} from "react-spinners";

function ChatWindow() {
  const { prompt, setPrompt, reply,setNewChat, setReply, currThreadID, setCurrThreadID, prevChats, setPrevChats } = React.useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const[isOpen,setIsOpen] = useState(false);


  const getReply = async () => {

  if (loading || !prompt.trim()) return;

  setLoading(true);
  setNewChat(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
      threadId: currThreadID,
    }),
  };

  try {
    const response = await fetch(
      "http://localhost:8080/api/chat",
      options
    );

    const res = await response.json();

    console.log(res);

    setReply(res.answer);

  } catch (error) {
    console.error("Error fetching reply:", error);
  }

  setLoading(false);
};


  //append chat 
  useEffect(() => {
    if(prompt && reply){
      setPrevChats((prevChats) =>(
        [...prevChats,{
          role: "user",
          content: prompt
        },{
          role: "assistant",
          content: reply
        }]
      ));
    }
    setPrompt("");
  },[reply]);

  const handleProfileClick =()=>{
    setIsOpen(!isOpen);
  }


  return (
    <div className="chatWindow">


        <div className="navbar">
          <span>DindaGPT  <i className="fa-solid fa-angle-down"></i></span>
          <div className="userIconDiv" onClick={handleProfileClick}>
            <span className="userIcon"><i className="fa-solid fa-user"></i></span>
          </div>


        </div>
        {
          isOpen &&
          <div className="dropDown">
          <div className="dropDownItem"> <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
          <div className="dropDownItem"> <i className="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem"> <i className="fa-solid fa-right-from-bracket"></i> Log out</div>
          </div>
        }

        <Chat />
        <CircleLoader color="#36D7B7" loading={loading} >
          
        </CircleLoader>

        <div className="chatInput">

          <div className="userInput">
            <input placeholder="ask anything"  value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {  e.key === 'Enter' ? getReply() : ''  }}
            >

            </input>
            <div id="submit" onClick={getReply}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>

          <p className="info">
            DindaGPT can make mistakes. Check important info.
          </p>

        </div>
    </div>
  );
}
export default ChatWindow;