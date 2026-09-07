import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext';

function App() {

  const providerValue = {
    // Define your context value here
  };

  return (
    <div className= "main">
      <MyContext.Provider value={providerValue}>
        <Sidebar />
        <ChatWindow />
        <Chat />
      </MyContext.Provider>
    </div>
  )
}

export default App
