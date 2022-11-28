import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import "./Chat.css";

function Chat1({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/user");
    }
    const get_chat = async () => {
      const response = await axios.get(process.env.REACT_APP_GET_CHAT, {});

      setMessageList(response.data);
    };
    get_chat();
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendtoapi = async (name, msg) => {
    const response = await axios.post(process.env.REACT_APP_POST_CHAT, {
      stamp: Date.now().toString(),
      name: name,
      message: msg,
      mod: localStorage.getItem("mod"),
    });
    console.log(response.data);
    setMessageList(response.data);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        mod: localStorage.getItem("mod"),
      };

      await socket.emit("send_message", messageData);
      sendtoapi(messageData["author"], messageData["message"]);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const sendtomenu = () => {
    navigate("/menu");
  };

  const get_stamp = (data) => {
    if (data.length === 13) {
      const number = parseInt(data);
      const new_data =
        new Date(number).getHours() + ":" + new Date(number).getMinutes();
      return new_data;
    } else {
      return data;
    }
  };

  const mods = (user) => {
    if (user.mod) {
      return "mod";
    } else if (username === user.author) {
      return "you";
    } else {
      return "other";
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={mods(messageContent)}
                // id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{get_stamp(messageContent.time)}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      <br></br>
      <br></br>
      <div className="box">
        <button className="btn" onClick={sendtomenu}>
          back to menu
        </button>
      </div>
    </div>
  );
}

export default Chat1;
