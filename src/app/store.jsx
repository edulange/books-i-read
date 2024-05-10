import { configureStore } from "@reduxjs/toolkit";
import booksReducer from '../features/books/booksSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
    reducer: {
        books: booksReducer,
        users: usersReducer
    }
})