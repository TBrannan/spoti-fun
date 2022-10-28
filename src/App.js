import Login from "./pages/Login";
import Host from "./pages/Host";
import Client from "./pages/Client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/host" element={<Host />} />
          <Route path="/client" element={<Client />} />
          <Route path="/api/callback/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>

    // <Route path="/host">
    //   <Host />
    // <Route/>
    // <Route path="/client">
    //   <Client />
    // <Route/>
  );
}

export default App;
