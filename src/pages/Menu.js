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
  const [id, setid] = useState("");

  const get_data = (data) => {
    if (data === 3) {
      setSkip("This song is getting Skipped 😂");
    } else {
      setSkip(data + " people want to skip this song");
    }
  };

  const get_id = (id) => {
    setid(id);
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

  const send_toast = () => {
    toast(
      "You can only vote once per song..." +
        " You need 5 people to skip this shit song"
    );
  };

  return (
    <div className="app">
      <div className="btn">
        <div className="limit">
          Welcome to the Party {localStorage.getItem("user")}! 🎃
        </div>
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
      <Current get_song_id={get_id} />
      <br></br>
      <div className="grid-menu-item">
        <Skip get_skip={get_data} get_song_id={id} toaster={send_toast} />
      </div>
      <div className="limit">{skipNumber}</div>
    </div>
  );
};

export default Menu;
