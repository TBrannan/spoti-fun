import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Current from "./Current";
import Skip from "./Skip";
import "react-toastify/dist/ReactToastify.css";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const sendtoclient = () => {
    navigate("/client");
  };

  const sendtoplaylist = () => {
    navigate("/playlist");
  };

  const partytime = () => {
    toast("PARTY PISSER ACTIVATED 💦💦💦");
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
        <button className="btn" onClick={partytime}>
          Party Chat
        </button>
      </div>
      <ToastContainer />
      <br></br>
      <p className="limit">Currently Playing</p>
      <Current />
      <br></br>
      <div className="grid-skip-item">
        <Skip />
      </div>
    </div>
  );
};

export default Menu;
