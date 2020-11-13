import React, { useState, useEffect } from 'react';
import { Col, Row, Alert, Image } from 'react-bootstrap';
import facade from '../apiFacade';

export default function AllBooks(props) {
    const [books, setBooks] = useState([]);

    const addBook = (book) => {
        setBooks({...books, book});
    }

    useEffect(() => {
        const user = facade.getUser();
        const username = user.username;
        const options = facade.makeOptions("POST", true, user)
        facade.fetchWithOptions(`/book/booksbyuser/`, options).then(data => {
            setBooks(data);
        });
    }, [])


    function createTable() {
        return books.map(b => {
            return <tr key={b.title}><td>{b.title}</td><td>{b.author}</td></tr>
        })
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {createTable()}
            </tbody>
        </table>
        </>
    )
}