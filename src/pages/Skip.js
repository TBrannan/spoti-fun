import { useState } from "react";
import axios from "axios";
import "./Skip.css";

const Skip = (props) => {
  const [id, setid] = useState("");

  const get_skip = async () => {
    const res = await axios.get(process.env.REACT_APP_GET_SKIP, {});
    return res.data;
  };

  const sendtoapi = (new_user, song_id) => {
    axios.post(process.env.REACT_APP_POST_SKIP, {
      user: new_user,
      song_id: song_id,
    });
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
      .then(console.log)
      .catch(console.log);
  };

  const evaluate = (skip) => {
    var arr = [];
    Object.values(skip).map((value, index) => {
      arr.push(value);
      return 0;
    });

    arr.forEach(function (x) {
      arr[x] = (arr[x] || 0) + 1;
    });
    console.log(arr[id]);
    if (arr[id] >= 3) {
      props.get_skip(3);
      console.log("Skipping Song");
    }
  };

  const voteskip = async () => {
    const song_id = props.get_song_id;
    setid(song_id);
    const user_id = localStorage.getItem("user");
    sendtoapi(user_id, song_id);
    const skip = await get_skip();
    evaluate(skip);
    // const number = await get_skip();
    // console.log(number);
    // const new_number = number + 1;
    // console.log("incrementing");
    // console.log(new_number);
    // props.get_skip(new_number);

    // if (new_number === 5) {
    //   console.log("Skipping Song");
    //   props.get_skip(5);
    //   sendtoapi(0);
    //   // skipSong();
    // } else {
    //   sendtoapi(new_number);
    // }
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
