import React from 'react'
import Layout from './components/Layout'
import BooksList from './features/books/BooksList'
import { Routes, Route } from 'react-router-dom'
import AddBookForm from './features/books/AddBookForm'
import UsersList from './features/users/UsersList'
import BookSearch from './features/books/BookSearch'
import Cadastro from './components/Cadastro'
import TabelaUsuarios from './components/TabelaUsuarios'
import { useState } from 'react'
import Login from './components/Login'

function App() {
	const [atualizaTabela, setAtualizaTabela] = useState(false)
	const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)

	function handleAtualizaTabela() {
		setAtualizaTabela(!atualizaTabela)
	}

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Login />} />
				<Route  element={<BooksList />} />

				<Route path='book'>
					<Route index element={<AddBookForm />} />
				</Route>

				<Route path='cadastro'>
					<Route
						index
						element={
							<Cadastro
								onCadastrado={handleAtualizaTabela}
								usuarioSelecionado={usuarioSelecionado}
								setUsuarioSelecionado={setUsuarioSelecionado}
							/>
						}
					/>
				</Route>

				<Route path='tabelaUsuarios'>
					<Route
						index
						element={
							<TabelaUsuarios
								atualizaTabela={atualizaTabela}
								onAtualizaTabela={handleAtualizaTabela}
								setUsuarioSelecionado={setUsuarioSelecionado}
							/>
						}
					/>
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
