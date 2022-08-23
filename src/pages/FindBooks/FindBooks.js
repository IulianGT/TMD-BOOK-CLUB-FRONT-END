import React, {useState, useEffect} from 'react'
import './FindBooksStyles.css'
import { useNavigate } from 'react-router-dom';

import BookCard from '../../components/BookCard/BookCard';
import axios from 'axios';

function FindBooks(props) {
    const navigate = useNavigate();
    const { loggedIn, setLoggedIn, client, setClient } = props;

    const [books,setBooks] = useState([]);

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/books`)
        .then((resp) => {
          setBooks(resp.data);
        })
        .catch((err) => console.log(`Error: ${err}`));

    },[])

    useEffect(() => {
    },[books])

    useEffect(() => {
        if(loggedIn === false)  
        navigate("/");
    },[loggedIn])
  return (
    <div className='rent-a-book-container'>
        {books ? books.map(book => <BookCard key={book.book_id} title={book.title} author={book.author} />) : null}
    </div>
  )
}

export default FindBooks