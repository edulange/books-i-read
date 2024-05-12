import { useSelector } from 'react-redux'
import { selectAllBooks } from './booksSlice'
import { selectAllUsers } from '../users/usersSlice'

const BooksList = () => {
	const books = useSelector(selectAllBooks)
	const users = useSelector(selectAllUsers)

	const renderedBooks = books.map((book) => (
		<article key={book.id}>
			<h3>{book.title}</h3>
			<p>{book.author}</p>
			<p>{book.pages}</p>
			<p>{book.genre}</p>
			<img src={book.thumbnail} alt={book.title} />
		</article>
	))

	return (
		<section>
			<h2>Books</h2>
			<button>butão</button>
			{renderedBooks}
		</section>
	)
}

export default BooksList

/* o que eu quero que apareça aqui no bookList?
os livros com a foto do livro, nome do autor embaixo em itálico */
