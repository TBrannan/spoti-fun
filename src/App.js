import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Client from "./pages/Client";
import { useState } from "react";
import "./App.css";
import Menu from "./pages/Menu";
import Playlist from "./pages/Playlist";

function App() {
  const [dooter, setDooter] = useState([]);

  const set_state = (data) => {
    setDooter(data.items.reverse());
  };

  // return (
  //   <div>
  //     <Client getter={set_state} />
  //     <Host data={dooter} />
  //   </div>
  // );

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/api/callback/*" element={<Login />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/client" element={<Client getter={set_state} />} />
      </Routes>
    </div>
  );
}

export default App;
