import "./Sidebar.css";
function Sidebar() {
  return (
    <section className="sidebar">
        {/*new chat button*/}
        <button className="new-chat-button">
          <img src="src/assets/logo.webp" alt="gpt logo" className="logo" />
          <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>

        {/*histroy of chats*/}
        <ul className="history">
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
        </ul>

        {/*signin button*/}
        <div className="signin">
          <p>By Sangita Dinda &hearts;</p>
        </div>
    </section>
  );
}
export default Sidebar;