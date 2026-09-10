import React from "react";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext,useState } from "react";
import { MyContext } from "./MyContext";
import {CircleLoader} from "react-spinners";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadID, setCurrThreadID } = React.useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const getReply = async () => {
    setLoading(true);
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

    try{
      const response =await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.answer);

    }catch(error){
      console.error("Error fetching reply:", error);
    }
    setLoading(false);
  }

  return (
    <div className="chatWindow">


        <div className="navbar">
          <span>DindaGPT  <i className="fa-solid fa-angle-down"></i></span>
          <div className="userIconDiv">
            <span><i className="fa-solid fa-user"></i></span>
          </div>
        </div>


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