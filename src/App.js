import Login from "./pages/Login";
import Host from "./components/Host";
import Client from "./components/Client";
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
