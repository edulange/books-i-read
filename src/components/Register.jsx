import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleRegister = async () => {
		try {
            await axios.post('http://localhost:3001/api/register', { name, password });
            alert('Registro bem-sucedido!');
            await navigate('/login');
		} catch (error) {
			alert('Erro ao fazer login. Verifique as credenciais e tente novamente.')
		}
	}
	return (
		<form>
			<input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Username'
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
            <button onClick={handleRegister}>Submit</button>
		</form>
	)
}

export default Register
