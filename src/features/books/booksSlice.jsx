import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	books: [],
	status: 'idle',
	error: null,
}

// Thunk para pegar os livros no backend
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
	const response = await axios.get('http://localhost:3001/api/books')
	return response.data
})

// Thunk para adicionar um livro ao backend
export const addBook = createAsyncThunk('books/addBook', async (book) => {
	const response = await axios.post('http://localhost:3001/api/books', book)
	return response.data
})

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.books = action.payload
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(addBook.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.books.push(action.payload);
			  });
	},
})

export const selectAllBooks = (state) => state.books.books
export const getBooksStatus = (state) => state.books.status
export const getBooksError = (state) => state.books.error

export default booksSlice.reducer
