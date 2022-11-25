import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Playlist.css";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const sendtomenu = () => {
    navigate("/menu");
  };

  useEffect(() => {
    const get_token = async () => {
      const { data } = await axios.get(process.env.REACT_APP_GET_ADDRESS, {});
      setToken(data.token);
      return data.token;
    };
    const update_playlist = async () => {
      const local_token = await get_token();
      const { data } = await axios
        .get(
          `https://api.spotify.com/v1/playlists/${process.env.REACT_APP_PLAYLIST_ID}/tracks?`,
          {
            headers: {
              Authorization: `Bearer ${local_token}`,
            },
          }
        )
        .catch((err) => {
          console.log(err);
        });

      setPlaylist(data.items.reverse());
    };

    update_playlist();
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
        <div>
          <button className="btn" onClick={sendtomenu}>
            back to menu
          </button>
        </div>
      </header>
    </div>
  );
};

export default Playlist;
