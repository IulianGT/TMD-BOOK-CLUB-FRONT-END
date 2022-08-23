import React from 'react'
import './BookCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

function BookCard(props) {
  const { title, author } = props;

  return (
    <div className='book-card-container'>
        <FontAwesomeIcon icon={faBook} className="book-logo"/>
        <span className='title'>{title}</span>
        <span className='author'>{author}</span>
    </div>
  )
}

export default BookCard