import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Client.css";

const Client = (props) => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  const sendtomenu = () => {
    navigate("/menu");
  };

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

    sendtoapi(data.items);
    setTracks("");
  };

  const sendtoapi = (playlist) => {
    axios.post(process.env.REACT_APP_POST_PLAYLIST, {
      playlist: JSON.stringify(playlist),
    });
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
    <div className="App">
      <header className="App-header">
        <h1>Add Song to Spooky Playlist</h1>
        <form onSubmit={mobilesearchArtists}>
          <input type="text" />
          <button>Search</button>
        </form>

        {tracks ? renderArtists() : console.log("Empty")}
        <ToastContainer />
        <br></br>
        <button className="btn" onClick={sendtomenu}>
          back to menu
        </button>
      </header>
    </div>
  );
};

export default Client;
