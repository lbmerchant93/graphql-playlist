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
    return (
        <div>
            <ul id="book-list">
                <li>Book Name</li>
            </ul>
        </div>
    )
}

export default BookList;