import React from 'react'
import { useQuery, gql } from '@apollo/client';

const getBooksQuery = gql`
    {
        books{
            name 
            id
        }
    }
`

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    let display;
    if (!loading) {
        display = data.books.map(book => {
            return <li key={book.id}>{ book.name }</li>
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
        </div>
    )
}

export default BookList;