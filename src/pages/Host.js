// import React from "react";
// import axios from "axios";
// import { useState } from "react";

const Host = () => {};

export default Host;

// const Host = () => {
//   const [playlist, setPlaylist] = useState("");

//   const get_playlist = async () => {
//     const { data } = await axios.get(process.env.REACT_APP_GET_PLAYLIST, {});
//     const parsed = JSON.parse(data);
//     renderPlaylist(parsed.items);
//     setPlaylist(parsed.items);
//   };

//   const renderPlaylist = () => {
//     return playlist.map((items) => (
//       <div className="grid-container">
//         {items.track.name}
//         {console.log("HERE")}
//       </div>
//     ));
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Add Song to Spooky Playlist</h1>
//         Search
//         {renderPlaylist()}
//       </header>
//     </div>
//   );
// };

// export default Host;
