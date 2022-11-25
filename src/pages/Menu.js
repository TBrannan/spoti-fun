import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Current from "./Current";
import Skip from "./Skip";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Menu.css";

const Menu = () => {
  const [skipNumber, setSkip] = useState([]);

  useEffect(() => {
    const get_skip = async () => {
      const res = await axios.get(process.env.REACT_APP_GET_SKIP, {});
      setSkip(res.data + " people want to skip this song");
    };

    get_skip();
  }, []);

  const get_data = (data) => {
    if (data === 5) {
      setSkip("This song is getting Skipped 😂");
    } else {
      setSkip(data + " people want to skip this song");
    }
  };

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
      <div className="btn">
        <div className="limit">Welcome to the Party 🎃</div>
      </div>
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
      <div className="grid-menu-item">
        <Skip get_skip={get_data} />
      </div>
      <div className="limit">{skipNumber}</div>
    </div>
  );
};

export default Menu;
