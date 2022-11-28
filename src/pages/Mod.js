import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Mod = () => {
  const navigate = useNavigate();
  const sendtomenu = () => {
    navigate("/menu");
  };

  toast("Hello Moderator " + localStorage.getItem("user"));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mod Page for Costume Contest or something??</h1>
        <ToastContainer />
        <div>
          <br></br>
          <br></br>
          <button className="btn" onClick={sendtomenu}>
            back to menu
          </button>
        </div>
      </header>
    </div>
  );
};

export default Mod;
