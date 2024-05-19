import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getToken = () => localStorage.getItem('token')

// Definindo a ação assíncrona para buscar os usuários
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const token = getToken(); // Obtém o token JWT armazenado
	const response = await fetch('http://localhost:3001/api/usuarios', {
	  headers: {
		'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho de autorização
	  },
	});
	const data = await response.json();
	return data; // O payload da ação será os dados dos usuários
  });

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
	const response = await fetch('http://localhost:3001/api/usuarios', newUser)
	const data = await response.json()
	return data
})

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.users = action.payload // Atualiza o estado com os dados dos usuários
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message // Armazena a mensagem de erro
			})
	},
})

export const selectAllUsers = (state) => state.users.users

export default usersSlice.reducer
