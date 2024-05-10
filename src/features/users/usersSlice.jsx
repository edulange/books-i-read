import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 0, name: 'Eduardo Lange'},
    { id: 1, name: 'Teste de pessoa'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer