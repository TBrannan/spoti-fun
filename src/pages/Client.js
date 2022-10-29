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

  const Clicker = async () => {
    console.log("Click");
  };

  const renderArtists = () => {
    console.log(tracks);
    return tracks.map((tracks) => (
      <div className="grid-container" key={tracks.id} onClick={Clicker}>
        <div className="grid-item">
          {tracks.name}
          <br></br>
          {tracks.artists[0].name}
        </div>
        {tracks.album.images.length ? (
          <img width={"50%"} src={tracks.album.images[0].url} alt="" />
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
