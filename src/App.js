import './App.css';
import Navbar from './components/Navbar';
import chat from './components/utilites/noun-chat-5344379.svg'
import Login from './components/Login';

function App() {
  return (
    <div>
      <Navbar />
      <Login/>
      <div>
        <a href="#" class="animate-bounce rounded-full w-16 h-16 bg-gray-100 fixed bottom-0 right-0 flex items-center justify-center text-gray-800 mr-8 mb-8 shadow-lg" target="_blank">
          <img src={chat} class="h-10 w-10 mr-2" />
        </a>
      </div>
    </div>
  );
}

export default App;
