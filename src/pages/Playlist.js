import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Playlist.css";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [song, setSong] = useState([]);
  const navigate = useNavigate();

  const sendtomenu = () => {
    navigate("/menu");
  };

  useEffect(() => {
    const get_song = async () => {
      const res = await axios.get(process.env.REACT_APP_GET_SONG, {});
      console.log(res.data);
      setSong(res.data.song_id);
    };

    const get_token = async () => {
      const { data } = await axios.get(process.env.REACT_APP_GET_ADDRESS, {});
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
    get_song();
  }, []);

  const renderArtists = () => {
    return playlist?.map((tracks) => (
      <div
        className={
          tracks.track.id === song
            ? "playlist-current-grid-container"
            : "playlist-grid-container"
        }
        key={tracks.track.id}
        value={tracks.track.id}
      >
        <div>
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
