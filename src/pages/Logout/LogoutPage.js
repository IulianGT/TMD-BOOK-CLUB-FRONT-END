import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./LogoutPageStyle.css"

function LogoutPage(props) {
    const {loggedIn,setLoggedIn,client, setClient} = props;
    const navigate = useNavigate();


    const handleOnClickLogoutButton = () => {
        setLoggedIn(false);
        //if you log out I'm setting the loggedIn state and client state to default.
        navigate("/");
    }
  return (
    <div className='LogoutPage-container'>
        <div className='LogoutPage'>
            <span className='goodbye-message'>Thank you, {client.username}</span>
            <button className='logout-button' onClick={handleOnClickLogoutButton}>Log out</button>
        </div>
    </div>
  )
}

export default LogoutPage