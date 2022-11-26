import axios from "axios";
import "./Skip.css";

const Skip = (props) => {
  // const get_skip = async () => {
  //   const res = await axios.get(process.env.REACT_APP_GET_SKIP, {});
  //   return res.data;
  // };

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
    console.log(song_id);
    const user_id = localStorage.getItem("user");
    const number = await sendtoapi(user_id, song_id);
    if (number !== "duper") {
      props.get_skip(number);
      // const skip = await get_skip();
      if (number === 3) {
        skipSong();
        console.log("Skipping Song");
        sendtoapi("reset", "reset");
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
