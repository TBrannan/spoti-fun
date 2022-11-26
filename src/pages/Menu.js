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

  useEffect(() => {
    const get_skip = async () => {
      const res = await axios.get(process.env.REACT_APP_GET_SKIP, {});
      const skip = res.data;
      const len = Object.keys(skip).length;
      if (!len) {
        setSkip(0 + " people want to skip this song");
      } else {
        const skipnumber = evaluate(skip);
        console.log(skipnumber);
      }
    };

    const evaluate = (skip) => {
      var arr = [];
      Object.values(skip).map((value, index) => {
        arr.push(value);
        get_count(arr);
      });
    };

    const get_count = (arr) => {
      arr.forEach(function (x) {
        arr[x] = (arr[x] || 0) + 1;
      });
      console.log(arr[id]);
      setSkip(arr[id] + " people want to skip this song");
    };

    get_skip();
  }, []);

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
        <Skip get_skip={get_data} get_song_id={id} />
      </div>
      <div className="limit">{skipNumber}</div>
    </div>
  );
};

export default Menu;
