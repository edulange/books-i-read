import { useState } from 'react'
import { bookAdded } from './booksSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function BookSearch() {
	const dispatch = useDispatch()
	const [query, setQuery] = useState('')
	const [booksSearched, setBooksSearched] = useState([])

	const API_KEY = 'AIzaSyBvNISArxveorwGdJGbiVl1xpg-SXpW3Fc'

	const handleChange = (event) => setQuery(event.target.value)

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

	const onAddBookClick = (event) => {
		dispatch(bookAdded(title, author, pages))
	}

	return (
		<section>
			<h2>Pesquise um livro:</h2>
			<div>
				<label htmlFor='bookTitle'>Book Title:</label>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						id='bookTitle'
						name='bookTitle'
						value={query}
						onChange={handleChange}
						autoComplete='off'
					/>
					<button type='submit'>Search</button>
				</form>
				<ul>
					{booksSearched.map((book) => (
						<div key={book.id} className='book-returned' onClick={onAddBookClick}>
							<li>{book.volumeInfo.title}</li>
							<li>{book.volumeInfo.pageCount}</li>
							<li>
								{book.volumeInfo.authors ? book.volumeInfo.authors : 'Autor não cadastrado'}{' '}
							</li>
							{book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
								<li>
									<img
										src={book.volumeInfo.imageLinks.thumbnail}
										alt={book.volumeInfo.title}
									/>
								</li>
							)}
						</div>
					))}
				</ul>
			</div>
		</section>
	)
}

export default BookSearch
