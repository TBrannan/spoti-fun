import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Client from "./pages/Client";
import "./App.css";
import Menu from "./pages/Menu";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <div className="background-boi">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/api/callback/*" element={<Login />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/client" element={<Client />} />
      </Routes>
    </div>
  );
}

export default App;
