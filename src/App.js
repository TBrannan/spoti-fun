import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Client from "./pages/Client";
import Host from "./pages/Host";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlist, setplaylist] = useState();

  const mobilesearchArtists = async (e) => {
    e.preventDefault();
    const searchkey = e.target[0].value;
    const local_token = await get_token();
    const { data } = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${local_token}`,
        },
        params: {
          q: searchkey,
          type: "track",
        },
      })
      .catch((err) => {
        console.log(err);
      });

    setTracks(data.tracks.items);
  };

  const get_token = async () => {
    const { data } = await axios.get(process.env.REACT_APP_GET_ADDRESS, {});
    setToken(data.token);
    return data.token;
  };

  const clicker = async (e, song_id, name) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${process.env.REACT_APP_PLAYLIST_ID}/tracks?uris=spotify:track:${song_id}`,
      data: {
        grant_type: "client_credentials",
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
    toast(name + " Added");
    update_playlist();
  };

  const update_playlist = async () => {
    const token = await get_token();
    const { data } = await axios
      .get(
        `https://api.spotify.com/v1/playlists/${process.env.REACT_APP_PLAYLIST_ID}/tracks?`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });

    setplaylist(data.items);
  };

  const renderArtists = () => {
    return tracks.map((tracks) => (
      <div
        className="grid-container"
        key={tracks.id}
        value={tracks.id}
        onClick={(e) => clicker(e, tracks.id, tracks.name)}
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/host" element={<Host items={playlist} />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/client"
            element={
              <Client
                search={mobilesearchArtists}
                clicker={clicker}
                tracks={tracks}
                render={renderArtists}
              />
            }
          />
          <Route path="/api/callback/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
