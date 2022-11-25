import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

  const sendtomenu = () => {
    navigate("/menu");
  };

  const get_user = (e) => {
    e.preventDefault();
    const unique_user = e.target[0].value;
    localStorage.setItem("user", unique_user);
    sendtomenu();
  };

  return (
    <div className="App">
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
