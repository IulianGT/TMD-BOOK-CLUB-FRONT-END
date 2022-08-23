import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPageStyle.css";

function LoginPage(props) {
  const url = "http://localhost:8080/";
  const navigate = useNavigate();// I'm using navigate to change the route of the page

  const [username, setUsername] = useState("alexia");
  const [password, setPassword] = useState("alexia");

  const [inputFocus, setInputFocus] = useState(false);
  const onFocus = () => setInputFocus(true);
  const onBlur = () => setInputFocus(false);
  // I made use of the inputFocus in order to hide the incorrect username or password message when i put focus back on username or password

  const [users, setUsers] = useState([]);
  // users hold the users fetched from the api
  
  const [btnClicked,setBtnClicked] = useState(false);
  // I used the btnClicked state in order to know when

  const {loggedIn, setLoggedIn, client, setClient} = props;

  const userExists = (users.find(
    (user) => user.username === username && user.password === password
  ));

  useEffect(() => {
     axios
      .get(`${url}users`)
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => console.log(`Error: ${err}`));
      
  }, []);
  // in this useEffect i fetch the data from the api and store it inside users array

  const hanldeOnChangeUsername = (e) => {
    setUsername(e.target.value);
};

  const hanldeOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmitButton = async e => {
    e.preventDefault();
    setBtnClicked(true);
    if (
        userExists
    ) {
      setLoggedIn(true);
      const user =users.find(
        (user) => user.username === username && user.password === password
      );

      setClient(user);
      // I directly set the client as the user that matches the password and username.
    
      navigate("/");
      //then i directly navigate to the main page
      
    } else console.log("try again.");
  };

  useEffect(() =>{
    setBtnClicked(false);
  },[inputFocus])
  // if the btn was clicked and the message is shown, if u put foucs back on the input fields the message wont be shown anymore, think that you have read the message.

  const handleOnSignUpButton = () =>{
    navigate("/register");
    // this button only changes the page from the login to sign up page.
  }

  return (
    <div className="LoginPage">
      <div className="loginForm-container">
        <form className="loginForm">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={hanldeOnChangeUsername}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={hanldeOnChangePassword}
          ></input>
          <span className={btnClicked && !loggedIn? "show" : "hide"}>Username or password is incorrect.</span>
            <button
              type="button"
              className="login-button"
              onClick={handleOnSubmitButton}
              disabled={!username || !password}
            >
              Log in
            </button>
            <span className="no-account">Don't have an account?</span>
            <button
              type="button"
              className="signup-button"
              onClick={handleOnSignUpButton}
            >
              Sign up
            </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
