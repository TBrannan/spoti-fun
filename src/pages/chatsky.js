import "./Chatsky.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect(process.env.REACT_APP_CHAT);

function Chatsky() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState("");

  const joinRoom = () => {
    setUsername(localStorage.getItem("user"));
    setRoom("party");
    if (username !== "" && room !== "") {
      setUsername(localStorage.getItem("user"));
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="chat-App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom()}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chatsky;
