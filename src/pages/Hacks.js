import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./User.css";
import "react-toastify/dist/ReactToastify.css";

const Hacks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast("🎉🎉🎉 Bix Hax Activated");
    const sendtomenu = () => {
      navigate("/menu");
    };
    const loginCheck = async () => {
      const loggedin = localStorage.getItem("user");
      loggedin ? sendtomenu() : console.log("Not Logged in");
    };

    loginCheck();
  }, [navigate]);

  const sendtoapi = async (unique_user) => {
    console.log(unique_user);
    const response = await axios.post(process.env.REACT_APP_POST_USER, {
      name: unique_user,
      mod: true,
    });
    console.log(response);
    if (response.duplicate === true) {
      toast(
        'Please choose another user name "' + unique_user + '" already exists'
      );
      return "dupe";
    } else if (response.mod === true) {
      toast("You cant' keep hacking, choose a mod name now lol");
    } else if (response.racist === true) {
      toast(
        "hey, " +
          unique_user +
          ", Please don't be racist and choose another name"
      );
    } else {
      localStorage.setItem("user", unique_user);
      localStorage.setItem("mod", true);
      sendtomenu();
    }
  };

  const sendtomenu = () => {
    navigate("/menu");
  };

  const sendtohacks = () => {
    navigate("/hacks");
  };

  const get_user = async (e) => {
    e.preventDefault();
    const unique_user = e.target[0].value;
    console.log(unique_user);
    sendtoapi(unique_user);
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="app">
        <div className="btn">
          <div className="limit">You have been Chosen as a Moderator</div>
        </div>
        <h1 className="limit">Add your Mod Name</h1>
        <form onSubmit={get_user}>
          <input type="text" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Hacks;
