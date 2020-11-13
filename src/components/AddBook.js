import React, { useState, useEffect } from 'react';
import { Col, Row, Alert, Image } from 'react-bootstrap';
import facade from '../apiFacade';

export default function AddBook(props) {
    const initialValue = {
        title: "",
        author: "",
        username: ""
    }
    const [book, setBook] = useState(initialValue);
    const [message, setMessage]= useState("");

    useEffect(() =>{
        const user = facade.getUser();
        setBook({...book, username: user.username})
    }, [])

    function handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setMessage("");
        setBook({...book, [name]: value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        const options = facade.makeOptions("POST", true, book);
        facade.fetchWithOptions("/book/add", options);
        setMessage("Book added")
    }

    return (
        <>
        <h3>Add a Book</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={book.title} onChange={handleChange} name="title" className="form-control mt-2"/>
            <input type="text" placeholder="Author" value={book.author} onChange={handleChange} name="author" className="form-control mt-2"/>
            <input type="submit" value="Add" className="btn btn-primary mt-2"/>
            {message ? <p>{message}</p> : <p></p>}
        </form>
        </>
    ) 
}