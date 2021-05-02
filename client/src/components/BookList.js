import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState('');

    let display;
    if (!loading) {
        display = data.books.map(book => {
            return <li key={book.id} onClick={() => {setSelected(book.id)}}>{ book.name }</li>
        })
    }
   
    return (
        <div>
            {loading && <div>Loading books..</div>}
            {data && 
                <ul id="book-list">
                    {display}
                </ul>
            }
            {error && <div>{error}</div>}
            <BookDetails bookId={selected}/>
        </div>
    )
}

export default BookList;