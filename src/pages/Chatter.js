import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatter.css";

function Chatter() {
  const [messages, setMessages] = useState([]);
  const [userName, setUser] = useState([]);
  const [text, setText] = useState([]);

  var ws;
  useEffect(() => {
    var ws = new WebSocket("ws://192.168.254.19:8000/ws");
    ws.onmessage = function (event) {
      var messages = document.getElementById("messages");
      var message = document.createElement("li");
      var content = document.createTextNode(event.data);
      message.appendChild(content);
      messages.appendChild(message);
    };
  }, []);

  const sendtoapi = async (name, msg) => {
    const response = await axios.post(process.env.REACT_APP_POST_CHAT, {
      stamp: Date.now().toString(),
      name: name,
      message: msg,
    });
    setMessages(response.data);
  };

  function sendMessage(event) {
    event.preventDefault();
    const data = event.target[0].value;
    ws.send(data);
    data = "";
  }

  return (
    <div className="container">
      <h1>Chat</h1>
      <div className="chat-container">
        <div className="chat">
          {messages?.map((msg, index) => {
            if (msg.name === userName) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="message">{msg.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">name : {userName}</p>
                    <p className="message">{"Something"}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
          <form onSubmit={(e) => sendMessage(e)}>
            <input
              className="input-chat"
              type="text"
              placeholder="Chat message ..."
            ></input>
            <button className="submit-chat">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatter;
