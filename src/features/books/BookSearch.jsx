import { useState } from 'react'
import {  selectAllBooks, addBook} from './booksSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

function BookSearch() {
	const dispatch = useDispatch()
	const [query, setQuery] = useState('')
	const [booksSearched, setBooksSearched] = useState([])


	const books = useSelector(selectAllBooks)

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
	const onAddBookClick = async (title, author, pages, thumbnail) => {
		const newBook = {
		  title,
		  author,
		  pages,
		  thumbnail,
		};
		await dispatch(addBook(newBook));
		console.log('Livro adicionado:', newBook);
		console.log(books);
	  };
	

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
						<div
							key={book.id}
							className='book-returned'
							onClick={() =>
								onAddBookClick(
									book.volumeInfo.title,
									book.volumeInfo.authors[0],
									book.volumeInfo.pageCount,
									book.volumeInfo.imageLinks.thumbnail
								)
							}
						>
							<li>{book.volumeInfo.title}</li>
							<li>{book.volumeInfo.pageCount}</li>
							<li>
								{book.volumeInfo.authors ? book.volumeInfo.authors : 'Autor não cadastrado'}
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
