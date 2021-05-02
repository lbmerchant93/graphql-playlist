import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

export default function AddBook() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBookMut] = useMutation(addBookMutation);
  
    const handleSubmit = (e) =>{
        e.preventDefault();
        addBookMut({
            variables: {
              name: name,
              genre: genre,
              authorId: authorId,
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }
    let displayAuthors = () => {
        return data.authors.map(author => {
            return <option key={author.id} value={author.id}>{ author.name }</option>
        })
    }

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                    <label>Book name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} >
                        <option>Select author</option>
                        {loading && <option disabled>Loading Authors...</option>}
                        {data && displayAuthors() }
                        {error && <option disabled>{error}</option>}
                    </select>
                </div>
                <button>+</button>
        </form>
    )
}
