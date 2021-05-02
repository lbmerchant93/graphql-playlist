import React from 'react'
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries'

const BookDetails = (props) => {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: {
            id: props.bookId
        }
    }); 
    if (props.bookId === '') {
        return(
            <div>
                No data to display..
            </div>
        )
    }
   
    if (loading) return <p>loading...</p>
    if (error) return <p>Something went wrong..</p>
    if (data.book) {
        return (
            <div>
                <h2>{data.book.name}</h2>
                <p>{data.book.genre}</p>
                <p>{data.book.author.name}</p>
                <p>All the books by the author: </p>
                <ul className="other-books">
                    {data.book.author.books.map(item =>{
                        return<li key={item.id}>{item.name}</li>
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default BookDetails;