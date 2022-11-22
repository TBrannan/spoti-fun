import { useEffect, useState } from "react";
import "../App.css";

const Host = () => {
  const data_str = localStorage.getItem("data");
  const final_data = JSON.parse(data_str);

  const [list, setList] = useState(final_data);

  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem("data");
      const parsed_data = JSON.parse(item);
      console.log(parsed_data);

      if (item) {
        setList(parsed_data);
      }
    }

    window.addEventListener("storage", checkUserData);

    return () => {
      localStorage.removeItem("storage", checkUserData);
    };
  }, []);

  const renderArtists = () => {
    return list.map((tracks) => (
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

export default Host;
