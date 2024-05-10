import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
	{
		id: '1',
		title: 'Lord of the Rings',
		author: 'Tolkien',
		pages: '300',
		genre: 'fantasy',
	},
	{
		id: '2',
		title: 'Behavorismo',
		author: 'Skinner',
		pages: '150',
		genre: 'Psicologia',
	},
]

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		bookAdded: {
			reducer(state, action) {
				state.push(action.payload)
			},
			prepare(title, author, pages, genre) {
				return {
					payload: {
						id: nanoid(),
						title,
						author,
						pages,
						genre,
						userId,
					},
				}
			},
		},
	},
})

export const selectAllBooks = (state) => state.booksSlice

export const { bookAdded } = booksSlice.actions

export default booksSlice.reducer