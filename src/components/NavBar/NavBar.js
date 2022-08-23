import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import './NavBarStyle.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';

function NavBar(props) {
  const {loggedIn,setLoggedIn,client, setClient} = props;
  const navigate = useNavigate();
  const handleOnProfileClick = () =>{
    
    !loggedIn ? navigate("/login") : navigate("/logout");
  }

  const handleOnLogoClick = () =>{
      navigate("/");
  }

  return (
    <div className='NavBar'>
    <div className='Logo' onClick={handleOnLogoClick}> TMD-BOOK-CLUB</div>
     
      <div className='Login' onClick={handleOnProfileClick}>
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{(!loggedIn) ? "Login" : `${client.username}`}
        </div>
    </div>
  )
}

export default NavBar;