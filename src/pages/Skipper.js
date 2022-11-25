import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Skipper.css";

const Skipper = () => {
  const [token, setToken] = useState("");
  const [playing, setPlaying] = useState([]);

  useEffect(() => {
    const get_token = async () => {
      const { data } = await axios.get(process.env.REACT_APP_GET_ADDRESS, {});
      setToken(data.token);
      return data.token;
    };

    const update_playlist = async () => {
      const local_token = await get_token();
      const { data } = await axios
        .get(`https://api.spotify.com/v1/me/player/currently-playing`, {
          headers: {
            Authorization: `Bearer ${local_token}`,
          },
        })
        .catch((err) => {
          console.log(err);
        });

      setPlaying(data.item);

      // localStorage.setItem("current", JSON.stringify(data.item));
    };
    // const data = JSON.parse(localStorage.getItem("current"));
    // setPlaying(data);

    update_playlist();
  }, []);

  const renderNull = () => {
    return (
      <div className="skip-grid-container" key="nullboi" value="nullsky">
        <div className="skip-grid-item">
          <div className="skip-limit">
            <p className="waiting">Waiting for Next Song...</p>
          </div>
          <br></br>
        </div>
      </div>
    );
  };

  const renderArtists = () => {
    if (!playing || playing.length === 0) {
      console.log("null playlist");
      return renderNull();
    } else {
      return (
        <div className="App">
          <div className="skip-grid-container">
            <div className="skip-grid-item">
              <div className="skip-limit">
                {playing.name}
                <br></br>
                {playing.artists[0].name}
              </div>

              {playing.album.images.length ? (
                <img width={"100"} src={playing.album.images[0].url} alt="" />
              ) : (
                <div>No Image</div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{renderArtists()}</>;
};

export default Skipper;
