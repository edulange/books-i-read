import React from 'react'
import Layout from './components/Layout'
import BooksList from './features/books/BooksList'
import { Routes, Route } from 'react-router-dom'
import AddBookForm from './features/books/AddBookForm'
import UsersList from './features/users/UsersList'
import BookSearch from './features/books/BookSearch'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<BooksList />} />

				<Route path='book'>
					<Route index element={<AddBookForm />} />
				</Route>
				<Route path='search'>
					<Route index element={<BookSearch />} />
				</Route>

				<Route path='user'>
					<Route index element={<UsersList />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App