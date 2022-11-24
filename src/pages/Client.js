import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Client = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Add Song to Spooky Playlist</h1>
        <form onSubmit={props.search}>
          <input type="text" />
          <button>Search</button>
        </form>

        {props.tracks ? props.render() : console.log("Empty")}
        <ToastContainer />
      </header>
    </div>
  );
};

export default Client;
