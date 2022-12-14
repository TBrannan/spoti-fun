import { Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";
import Client from "./pages/Client";
import User from "./pages/User";
import Chatsky from "./pages/chatsky";
import Hacks from "./pages/Hacks";
import Mod from "./pages/Mod";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/client" element={<Client />} />
        <Route path="/api/callback/*" element={<Login />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/chat" element={<Chatsky />} />
        <Route path="/hacks" element={<Hacks />} />
        <Route path="/mod" element={<Mod />} />
      </Routes>
    </div>
  );
}

export default App;
