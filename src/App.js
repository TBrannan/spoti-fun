import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Client from "./pages/Client";
import Host from "./pages/Host";
import { useState } from "react";
import "./App.css";
import Menu from "./pages/Menu";

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
        <Route path="/" element={<Host />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/api/callback/*" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/host" element={<Host data={dooter} />} /> */}
        <Route path="/client" element={<Client getter={set_state} />} />
      </Routes>
    </div>
  );
}

export default App;
