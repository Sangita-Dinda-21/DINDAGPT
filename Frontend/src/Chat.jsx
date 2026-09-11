import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

//react markdown

//rehype-highlight


function Chat(){
    const {newChat,prevChats} = useContext(MyContext);
    return (
        <>
            {newChat && <h1> Start a new chat!</h1>}

            <div className="chats">

                {
                    prevChats?.map((chat,index) => (
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={index}>
                            {
                                chat.role === "user" ? (
                                    <p className="userMessage">{chat.content}</p>
                                ) : (
                                    <div className="gptMessage">
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                            {chat.content}
                                        </ReactMarkdown>
                                    </div>                             
                                )
                            }
                        </div>
                ))}
            </div>
        </>
    )
}
export default Chat;