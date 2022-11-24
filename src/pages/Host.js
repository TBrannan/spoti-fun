import { useState } from "react";

const Host = () => {
  const [dat, setDat] = useState([]);

  // const renderArtists = () => {
  //   return props?.data.map((tracks) => (
  //     <div
  //       className="grid-container"
  //       key={tracks.track.id}
  //       value={tracks.track.id}
  //     >
  //       <div className="limit">
  //         {tracks.track.name}
  //         <br></br>
  //         {tracks.track.artists[0].name}
  //       </div>
  //       {tracks.track.album.images.length ? (
  //         <img width={"100%"} src={tracks.track.album.images[0].url} alt="" />
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //     </div>
  //   ));
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spooky Playlist</h1>
        {/* {renderArtists()} */}
      </header>
    </div>
  );
};

export default Host;
