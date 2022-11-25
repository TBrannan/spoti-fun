import { useState } from "react";
import axios from "axios";
import "./Skip.css";

const Skip = () => {
  const [skip, setSkip] = useState("");

  const get_skip = async () => {
    const res = await axios.get(process.env.REACT_APP_GET_SKIP, {});
    return res.data;
  };

  const sendtoapi = (number) => {
    axios.post(process.env.REACT_APP_POST_SKIP, {
      skip: number,
    });
  };

  const voteskip = async () => {
    const number = await get_skip();
    const new_number = number + 1;
    console.log("incrementing");
    console.log(number);

    if (new_number === 5) {
      console.log("Skipping Song");
      sendtoapi(0);
    } else {
      sendtoapi(new_number);
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
