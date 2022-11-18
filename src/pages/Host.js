import React from "react";
import axios from "axios";
import { useState } from "react";

const Host = () => {
  const [playlist, setPlaylist] = useState("");

  const get_playlist = async () => {
    const response = await axios.get(process.env.REACT_APP_GET_PLAYLIST, {});

    renderPlaylist(response.data.items);
    setPlaylist(response.data.items);
  };

  const renderPlaylist = (playlist) => {
    return playlist.map((tracks) => (
      <div
        className="grid-container"
        test={console.log(tracks)}
        key={tracks.id}
        value={tracks.id}
      >
        <div className="limit">
          {tracks.name}
          <br></br>
          {tracks.artists[0].name}
        </div>
      </div>
    ));
  };

  get_playlist();

  return <>{renderPlaylist()}</>;
};

export default Host;
