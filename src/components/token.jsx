const Token = (req, res) => {
  try {
    console.log("INFO: Host was sent to Spotify login");
    let redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const data = new Map();
    data["response_type"] = "code";
    data["client_id"] = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    data["scope"] =
      "user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-top-read playlist-read-collaborative playlist-read-private";
    data["redirect_uri"] = redirect_uri;
    // console.log(data);
    const jj = JSON.stringify(data);
    console.log(jj);

    res.redirect(
      process.env.REACT_APP_SPOTIFY_ADDRESS +
        "/authorize?" +
        JSON.stringify(data)
    );
  } catch (error) {
    console.log("SoMETing wENT Wrong");
    console.log(error);
  }
};

export default Token;

// const data = new Map();
// data["response_type"] = code
// data["client_id"] = process.env.SPOTIFY_CLIENT_ID
// data["scope"] = "user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state user-top-read playlist-read-collaborative playlist-read-private"
// data["redirect_uri"] = redirect_uri
