// rafc
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
export const Chat = () => {
  const [userName, setUser] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setUser(localStorage.getItem("user"));

    const get_chat = async () => {
      const response = await axios.get(process.env.REACT_APP_GET_CHAT, {});
      setMessages((list) => [...list, response.data]);
    };
    get_chat();
  }, [userName]);

  const sendtoapi = async (name, msg) => {
    const response = await axios.post(process.env.REACT_APP_POST_CHAT, {
      stamp: Date.now().toString(),
      name: name,
      message: msg,
    });
    setMessages(response.data);
  };

  const submit_message = async (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    sendtoapi(userName, message);
  };

  const rendermessages = () => {
    return messages?.map((msg) => (
      <div className="limit" key={msg.stamp}>
        <div>
          {msg.name} : {msg.message}
          <br></br>
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="modal-container"></div>
      <br></br>
      <div className="limit">Welcome to the party Chat, {userName}🎃</div>
      <div className="modal-container">
        <div className="modal-content">{rendermessages()}</div>
      </div>
      <form onSubmit={submit_message}>
        <input type="text" />
        <button>Submit</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Chat;
