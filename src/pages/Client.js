import { useState } from "react";
import axios from "axios";

const Client = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);

  const mobilesearchArtists = async (e) => {
    e.preventDefault();
    await get_token();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    setTracks(data.tracks.items);
  };

  const get_token = async () => {
    const { data } = await axios.get(process.env.REACT_APP_GET_ADDRESS, {});
    setToken(data.token);
  };

  const Clicker = async (e, song_id) => {
    console.log(song_id);
    e.preventDefault();
    await axios.post(
      `https://api.spotify.com/v1/playlists/${process.env.REACT_APP_PLAYLIST_ID}/tracks?uris=spotify:track:${song_id}`,
      {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      }
    );
  };

  const renderArtists = () => {
    return tracks.map((tracks) => (
      <div
        className="grid-container"
        key={tracks.id}
        value={tracks.id}
        onClick={(e) => Clicker(e, tracks.id)}
      >
        <div className="limit">
          {tracks.name}
          <br></br>
          {tracks.artists[0].name}
        </div>
        {tracks.album.images.length ? (
          <img width={"100%"} src={tracks.album.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Song Fucker Upper</h1>
        <form onSubmit={mobilesearchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"} onClick={mobilesearchArtists}>
            Search
          </button>
        </form>

        {/* {clicked ? rendershit() : <div>NO</div>} */}

        {renderArtists()}
      </header>
    </div>
  );
};

export default Client;
