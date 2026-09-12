import React from "react";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import { CircleLoader } from "react-spinners";

function ChatWindow() {

 const {
    prompt,
    setPrompt,
    reply,
    setNewChat,
    setReply,
    currThreadID,
    prevChats,
    setPrevChats,
    setRefreshThreads
} = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const getReply = async () => {

    if (loading || !prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    // Login ke time save hua token
    const token = localStorage.getItem("token");

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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

      if (!response.ok) {
        alert(res.error);
        return;
      }

      setReply(res.answer);
      setRefreshThreads(prev => prev + 1);

    } catch (error) {

      console.error("Error fetching reply:", error);

    } finally {

      setLoading(false);

    }
  };


  // Append chat
  useEffect(() => {

    if (prompt && reply) {

      setPrevChats((prevChats) => (

        [
          ...prevChats,

          {
            role: "user",
            content: prompt
          },

          {
            role: "assistant",
            content: reply
          }
        ]

      ));

    }

    setPrompt("");

  }, [reply]);


  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };


  return (

    <div className="chatWindow">

      <div className="navbar">

        <span>
          DindaGPT&nbsp;
          <i className="fa-solid fa-angle-down"></i>
        </span>

        <div
          className="userIconDiv"
          onClick={handleProfileClick}
        >

          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>

        </div>

      </div>


      {
        isOpen &&

        <div className="dropDown">

          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i>
            Upgrade Plan
          </div>

          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i>
            Settings
          </div>
        </div>
      }


      <Chat />


      <CircleLoader
        color="#36D7B7"
        loading={loading}
      >
      </CircleLoader>


      <div className="chatInput">

        <div className="userInput">

          <input
            placeholder="ask anything"
            value={prompt}

            onChange={(e) =>
              setPrompt(e.target.value)
            }

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getReply();
              }
            }}
          />

          <div
            id="submit"
            onClick={getReply}
          >

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