import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./User.css";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
    });
    console.log(response.data);
    if (response.data === true) {
      toast(
        'Please choose another user name "' + unique_user + '" already exists'
      );
      return "dupe";
    } else if (response.data === "racist") {
      toast(
        "hey, " +
          unique_user +
          ", Please don't be racist and choose another name"
      );
    } else {
      localStorage.setItem("user", unique_user);
      console.log(response.data);
      sendtomenu();
    }
  };

  const sendtomenu = () => {
    navigate("/menu");
  };

  const get_user = async (e) => {
    e.preventDefault();
    const unique_user = e.target[0].value;
    sendtoapi(unique_user);
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="app">
        <div className="btn">
          <div className="limit">Welcome to the Party 🎃</div>
        </div>
        <h1 className="limit">Add your Nickname</h1>
        <form onSubmit={get_user}>
          <input type="text" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default User;
