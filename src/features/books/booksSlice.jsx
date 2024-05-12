import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
	{
		id: '1',
		title: 'Lord of the Rings',
		author: 'Tolkien',
		pages: '300',
		thumbnail: 'http://books.google.com/books/content?id=V-HoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
	},
	{
		id: '2',
		title: 'Behavorismo',
		author: 'Skinner',
		pages: '150',
		thumbnail: "http://books.google.com/books/content?id=7-plOlnjnzwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
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
			prepare(title, author, pages, thumbnail) {
				return {
					payload: {
						id: nanoid(),
						title,
						author,
						pages,
						thumbnail
					},
				}
			},
		},
	},
})

export const selectAllBooks = (state) => state.books

export const { bookAdded } = booksSlice.actions

export default booksSlice.reducer