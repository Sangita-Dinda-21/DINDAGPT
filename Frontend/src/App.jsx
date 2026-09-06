import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

function App() {

  return (
    <div className= "main">
      <Sidebar />
      <ChatWindow />
      <Chat />
    </div>
  )
}

export default App
