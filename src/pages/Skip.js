import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Skip.css";

const Skip = (props) => {
  const navigate = useNavigate();
  // const get_skip = async () => {
  //   const res = await axios.get(process.env.REACT_APP_GET_SKIP, {});
  //   return res.data;
  // };

  const sendtologin = () => {
    navigate("/user");
  };

  const sendtoapi = async (new_user, song_id) => {
    const response = await axios.post(process.env.REACT_APP_POST_SKIP, {
      user: new_user,
      song_id: song_id,
    });
    return response.data;
  };

  const get_token = async () => {
    const { data } = await axios.get(process.env.REACT_APP_GET_ADDRESS, {});
    return data.token;
  };

  const skipSong = async () => {
    const local_token = await get_token();
    const config = {
      headers: { Authorization: `Bearer ${local_token}` },
    };

    const bodyParameters = {
      key: "value",
    };

    axios
      .post(process.env.REACT_APP_SKIP, bodyParameters, config)
      .catch(console.log);
  };

  const voteskip = async () => {
    const song_id = props.get_song_id;
    const user_id = localStorage.getItem("user");
    if (!user_id) {
      sendtologin();
    }
    const number = await sendtoapi(user_id, song_id);
    if (number !== "duper") {
      props.get_skip(number);
      if (number === 3) {
        skipSong();
        console.log("Skipping Song");
        sendtoapi("reset", "reset");
        props.get_skip(0);
      }
    } else {
      props.toaster();
    }
  };

  return (
    <div className="skip-app">
      <button className="skip-btn" onClick={voteskip}>
        Skip Song
      </button>
    </div>
  );
};

export default Skip;
