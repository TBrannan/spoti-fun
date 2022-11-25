import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const getplaylist = async () => {
      const data = await axios.get(process.env.REACT_APP_GET_PLAYLIST, {});
      const something = JSON.parse(data.data);
      setPlaylist(something.reverse());
    };

    getplaylist();
  }, []);
  const renderArtists = () => {
    return playlist?.map((tracks) => (
      <div
        className="grid-container"
        key={tracks.track.id}
        value={tracks.track.id}
      >
        <div className="limit">
          {tracks.track.name}
          <br></br>
          {tracks.track.artists[0].name}
        </div>
        {tracks.track.album.images.length ? (
          <img width={"100%"} src={tracks.track.album.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spooky Playlist</h1>
        {renderArtists()}
      </header>
    </div>
  );
};

export default Playlist;
