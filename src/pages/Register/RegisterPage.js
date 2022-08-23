import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPageStyle.css";

function RegisterPage() {
  const [users, setUsers] = useState({});

  const [formData, setFormData] = useState({});

  const [username, setUsername] = useState("");
  const [correctUsername, setCorrectUsername] = useState(false);

  const [firstName, setFirstName] = useState("");

  const [secondName, setSecondName] = useState("");

  const [password, setPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const onFocus = () => setPasswordFocus(true);
  const onBlur = () => setPasswordFocus(false);

  const [lengthIssue, setLengthIssue] = useState(false);
  const [capitalLetterIssue,setCapitalLetterIssue] = useState(false);
  const [numberIssue, setNumbersIssue] = useState(false);


  const [confirmPassword, setConfirmPassword] = useState("");

  const [matchingPasswords, setMatchingPasswords] = useState(true);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/users`)
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    setCorrectUsername(true);

    setFormData({
      username: username,
      first_name: firstName,
      second_name: secondName,
      password: password,
    });
  },[username])

  useEffect(() => {

    setFormData({
      username: username,
      first_name: firstName,
      second_name: secondName,
      password: password,
    });
    
  },[firstName])

  useEffect(() => {

    setFormData({
      username: username,
      first_name: firstName,
      second_name: secondName,
      password: password,
    });

  },[secondName])

  useEffect(() =>{
    setCapitalLetterIssue(false);
    setLengthIssue(false);
    setNumbersIssue(false);
    setCorrectPassword(true);

    if(password.length <=8 && password.length > 0){
        setLengthIssue(true);
        setCorrectPassword(false);
    }
    
    const CAPITAL_REGEX = /[A-Z]/g;
    if(!CAPITAL_REGEX.test(password) && password.length > 0){
        setCapitalLetterIssue(true);
        setCorrectPassword(false);
    }

    const NMBR_REGEX = /[0-9]/g;
    if(!NMBR_REGEX.test(password)  && password.length > 0){
        setNumbersIssue(true);
        setCorrectPassword(false);
    }

    setFormData({
      username: username,
      first_name: firstName,
      second_name: secondName,
      password: password,
    });

  },[password])

  useEffect(() => {
        setMatchingPasswords(true);
        setFormData({
          username: username,
          first_name: firstName,
          second_name: secondName,
          password: password,
        });
  },[confirmPassword])

  const handleSignUpButton = () => {

    if(users.filter(user => user.username === username
    ).length > 0){
        setCorrectUsername(false);
        return;
    }

    if(password !== confirmPassword){
        setMatchingPasswords(false);
        return;
    }

    if(matchingPasswords && correctPassword && correctUsername)
    axios({
      method: 'post',
      url: 'http://localhost:8080/users/create_user',
      data: formData,
    }).then(resp => {
      navigate("/login");
      console.log(formData);
    }).catch(err => {
      console.log(err);
    });
  };

  const navigate = useNavigate();
  const handleLogInButton = () =>{
    navigate("/login");
  }

  return (
    <div className="RegisterPage-container">
      <div className="RegisterPage">
        <span className="title">Register :)</span>
        <form>
          <span> Username: </span>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <div className={correctUsername ? "hide" : "wrong-message"}>
            This username have been already taken.
          </div>
          <span> First name: </span>
          <input
            type="text"
            id="first_name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
          <span> Second name: </span>
          <input
            type="text"
            id="second_name"
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
            value={secondName}
          />
          <span> Password: </span>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <div className={correctPassword ? "hide" : "wrong-message"}>
            {lengthIssue ? "• The password must have at least 8 charachters.\n" : null}
            {capitalLetterIssue ? `• The password must have at least one capital letter.\n` : null}
            {numberIssue ? `• The password must have at least one number \n` : null}
          </div>
          <span> Confirm password: </span>
          <input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
          <div className={matchingPasswords ? "hide" : "wrong-message" }>
            The passwords are not matching.
          </div>

          <button
            type="button"
            className="signup-button"
            onClick={handleSignUpButton}
            disabled={
              !correctPassword ||
              !confirmPassword ||
              !firstName ||
              !secondName ||
              !username
            }
          >
            Sign up
          </button>

          <span className="existing-acc">Already having an account?</span>
          <button type="button" className="login-button" onClick={handleLogInButton}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
