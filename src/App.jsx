import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import BooksList from './features/books/BooksList'
import AddBookForm from './features/books/AddBookForm'
import UsersList from './features/users/UsersList'
import BookSearch from './features/books/BookSearch'
import Cadastro from './components/Cadastro'
import TabelaUsuarios from './components/TabelaUsuarios'
import Login from './components/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './hooks/useAuth'

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<BooksList />} />
					<Route path='book' element={<AddBookForm />} />
					<Route path='cadastro' element={<Cadastro />} />
					<Route path='tabelaUsuarios' element={<TabelaUsuarios />} />
					<Route path='search' element={<BookSearch />} />
					<Route path='user' element={<UsersList />} />
				</Route>
			</Routes>
		</AuthProvider>
	)
}

export default App
