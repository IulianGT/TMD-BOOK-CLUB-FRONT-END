import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./WelcomeAllPageStyle.css"


function WelcomeAllPage(props) {

  const navigate = useNavigate();
  const {loggedIn,setLoggedIn, client, setClient } = props;
  // this are some "shortcuts" from the props.loggedIn classic way

  const handleRentABookButton = () =>{
    navigate("/client/findBooks");
  }

  const handleMyBooksButton = () =>{
    navigate("/client/myBooks");
  }

  return (
    <div className='WelcomeAllPage'>{loggedIn ? 
      `Thank you, ${client.second_name} for using our application!`
      : "Welcome stranger to our application. :)"}{/*I use loggedIn state in order to display the right message in the welcome page*/}
      
      {loggedIn? <button className='rent-a-book-button' onClick={handleRentABookButton}>I want to rent a book</button> : null}

      {loggedIn? <button className='see-my-books-button' onClick={handleMyBooksButton}>List of my books</button> : null}
      </div>
  )
}

export default WelcomeAllPage