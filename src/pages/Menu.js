import "./Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const sendtoclient = () => {
    navigate("/client");
  };

  const sendtoplaylist = () => {
    navigate("/playlist");
  };

  return (
    <div className="app">
      <div className="grid-item">
        <button className="btn" onClick={sendtoclient}>
          Add Song
        </button>
      </div>

      <div className="grid-item">
        <button className="btn" onClick={sendtoplaylist}>
          Current Playlist
        </button>
      </div>

      <div className="grid-item">
        <button className="btn">Party Chat</button>
      </div>

      <div className="grid-item">
        <button className="btn">testy boi</button>
      </div>
    </div>
  );
};

export default Menu;
