import React, { useState } from 'react'
import axios from 'axios'

function BookSearch() {
	const [query, setQuery] = useState('')
	const [booksSearched, setBooksSearched] = useState([])

	const API_KEY = 'AIzaSyBvNISArxveorwGdJGbiVl1xpg-SXpW3Fc'

	const handleChange = (event) => {
		setQuery(event.target.value)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
			)
			setBooksSearched(response.data.items)
            console.log(response.data.items)
		} catch (error) {
			console.error('Error fetching books:', error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' value={query} onChange={handleChange} />
				<button type='submit'>Search</button>
			</form>
			<ul>
				{booksSearched.map((book) => (
					<li key={book.id}>{book.volumeInfo.title}</li>
				))}
			</ul>
		</div>
	)
}

export default BookSearch
